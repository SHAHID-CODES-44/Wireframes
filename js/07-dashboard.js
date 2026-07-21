/* ============================================================ DASHBOARD — ArchitectUI-style BI overview ============================================================ */

const KPI_COLORS = {
  purple:["var(--purple-tint)","var(--purple-800)"],
  coral:["var(--coral-tint)","var(--coral-500)"],
  green:["var(--green-tint)","var(--green-600)"],
  amber:["var(--amber-tint)","var(--amber-600)"],
  blue:["var(--blue-tint)","var(--blue-600)"],
  gray:["#f0eef5","var(--muted)"],
};
function formatLakh(n){ return n >= 100000 ? "₹"+(n/100000).toFixed(2)+"L" : inr(n); }

/* Illustrative multi-year revenue + enrollment trend data — same convention as the
   original mock bar chart (a real BI system would source this from an orders table). */
const DASHBOARD_REVENUE_BY_YEAR = {
  2027:[62,78,95,112,98,135,154,128,89,76,92,105],
  2026:[48,55,70,88,76,101,118,99,70,60,71,84],
};
const DASHBOARD_ENROLLMENT_TREND = [180,210,205,240,265,250,290,310,295,330,355,380];
let dashboardRevenueYear = 2027;
let dashboardMostBoughtTab = "books";

function dashboardKpiCard(k){
  const [bg,fg] = KPI_COLORS[k.color];
  return `<div class="kpi-card-compact" onclick="navigate('${k.view}')">
    <div class="kpi-icon-sm" style="background:${bg};color:${fg}">${k.icon}</div>
    <div class="kpi-compact-value">${k.value}</div>
    <div class="kpi-compact-label">${esc(k.label)}</div>
    <div class="kpi-compact-sub">${esc(k.sub)}</div>
  </div>`;
}

function buildRevenueBars(year){
  const data = DASHBOARD_REVENUE_BY_YEAR[year] || DASHBOARD_REVENUE_BY_YEAR[2027];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const max = Math.max(...data);
  return months.map((m,i)=>{
    const h = Math.round(data[i]/max*100);
    const peak = data[i] === max;
    return `<div class="bar-col"><div class="bar ${peak?'peak':''}" style="height:${h}%" title="₹${data[i]}K"></div><span>${m}</span></div>`;
  }).join("");
}
function changeDashboardRevenueYear(year){
  dashboardRevenueYear = parseInt(year);
  document.getElementById('revenueChartBars').innerHTML = buildRevenueBars(dashboardRevenueYear);
}

function buildLineChartSvg(values, color){
  const width = 600, height = 170, pad = 14;
  const max = Math.max(...values), min = Math.min(...values);
  const range = (max - min) || 1;
  const stepX = (width - pad*2) / (values.length - 1);
  const points = values.map((v,i)=>{
    const x = pad + i*stepX;
    const y = height - pad - ((v-min)/range) * (height - pad*2);
    return `${x},${y}`;
  });
  const circles = values.map((v,i)=>{
    const [x,y] = points[i].split(",");
    return `<circle cx="${x}" cy="${y}" r="3.5" fill="${color}"/>`;
  }).join("");
  const areaPoints = `${pad},${height-pad} ${points.join(" ")} ${width-pad},${height-pad}`;
  return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" class="line-chart-svg">
    <polygon points="${areaPoints}" fill="${color}" opacity="0.08"/>
    <polyline points="${points.join(" ")}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    ${circles}
  </svg>`;
}

function buildPieSvg(segments, size){
  const total = segments.reduce((s,x)=>s+x.value,0) || 1;
  let angle = 0;
  const paths = segments.map(seg=>{
    if(seg.value <= 0) return "";
    const pct = seg.value/total*100;
    const a = pct/100*360;
    const start = angle, end = angle+a; angle = end;
    const x1 = 50+40*Math.cos(start*Math.PI/180), y1 = 50+40*Math.sin(start*Math.PI/180);
    const x2 = 50+40*Math.cos(end*Math.PI/180), y2 = 50+40*Math.sin(end*Math.PI/180);
    const largeArc = a > 180 ? 1 : 0;
    return `<path d="M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z" fill="${seg.color}" stroke="#fff" stroke-width="1.5"/>`;
  }).join("");
  return `<div class="pie-center-label"><svg viewBox="0 0 100 100" width="${size}" height="${size}" style="transform:rotate(-90deg)">${paths}</svg><div class="pie-donut-hole"><div class="n">${total}</div><div class="l">Total</div></div></div>`;
}
function pieLegendHtml(segments){
  const total = segments.reduce((s,x)=>s+x.value,0) || 1;
  return segments.map(seg=>`
    <div class="pie-legend-item"><span class="pie-dot" style="background:${seg.color}"></span>${esc(seg.label)} <b>${seg.value}</b><span class="pie-pct">(${Math.round(seg.value/total*100)}%)</span></div>
  `).join("");
}

function rankedBarRow(rank, label, sublabel, value, maxValue, color, view, id){
  const pct = maxValue ? Math.round(value/maxValue*100) : 0;
  const clickAttr = view ? `onclick="navigate('${view}'${id!=null ? ', '+id : ''})"` : "";
  return `<div class="ranked-row ${view?'clickable':''}" ${clickAttr}>
    <span class="ranked-num">#${rank}</span>
    <div class="ranked-info"><div class="ranked-label">${esc(label)}</div>${sublabel ? `<div class="ranked-sub">${esc(sublabel)}</div>` : ""}</div>
    <div class="ranked-bar-track"><div class="ranked-bar-fill" style="width:${pct}%;background:${color}"></div></div>
    <span class="ranked-value">${value}</span>
  </div>`;
}

function renderDashboard(){
  /* ---------- Real, derived numbers (computed straight from the mock STORE — nothing fabricated) ---------- */
  const activeStudents = STUDENTS.filter(s=>s.status==="Active");
  const inactiveStudents = STUDENTS.filter(s=>s.status==="Inactive");
  const pendingReviews = REVIEWS.filter(r=>r.status==="Pending").length;

  const revenueFromBooks = BOOKS.reduce((s,b)=>s+b.price*b.activeSubs, 0);
  const revenueFromBatches = Object.values(BATCHES).reduce((s,b)=>s+b.price*b.enrolled, 0);
  const totalRevenue = revenueFromBooks + revenueFromBatches;

  const coachingCount = COURSES.filter(c=>c.type==="Coaching").length;
  const diplomaCount = COURSES.filter(c=>c.type==="Diploma").length;
  const certificateCount = COURSES.filter(c=>c.type==="Certificate").length;

  const batchList = Object.values(BATCHES);
  const avgAttendance = batchList.length ? Math.round(batchList.reduce((s,b)=>s+b.attendanceAvg,0)/batchList.length) : 0;

  const activeStaffCount = STAFF.filter(s=>s.status==="Active").length;
  const monthlyActiveUsers = activeStudents.length + activeStaffCount;

  const notifSent = NOTIFICATIONS.length;
  const notifRead = NOTIFICATIONS.filter(n=>n.status==="R").length;
  const notifDelivered = notifSent; // no distinct "delivered" tracking in the schema yet — mirrors Sent

  const kpis = [
    { label:"Total Revenue", value:formatLakh(totalRevenue), icon:ICONS.rupee, color:"purple", sub:"Books + batch enrolments", view:"books" },
    { label:"Total Students", value:STUDENTS.length, icon:ICONS.student, color:"blue", sub:`${activeStudents.length} active`, view:"students" },
    { label:"Active Students", value:activeStudents.length, icon:ICONS.checkCircle, color:"green", sub:"Currently enrolled", view:"students" },
    { label:"Inactive Students", value:inactiveStudents.length, icon:ICONS.users, color:"gray", sub:"Not currently active", view:"students" },
    { label:"Total Courses", value:COURSES.length, icon:ICONS.grad, color:"purple", sub:`${COURSES.filter(c=>c.status==='Active').length} active`, view:"courses" },
    { label:"Total Books", value:BOOKS.length, icon:ICONS.book, color:"coral", sub:`${BOOKS.filter(b=>b.status==='Published').length} published`, view:"books" },
    { label:"Total Collections", value:COLLECTIONS.length, icon:ICONS.layers, color:"blue", sub:"Bundled packs", view:"collections" },
    { label:"Total Categories", value:CATEGORIES.length, icon:ICONS.tag, color:"amber", sub:"Subject areas", view:"category" },
    { label:"Monthly Active Users", value:monthlyActiveUsers, icon:ICONS.pulse, color:"green", sub:"Students + staff", view:"students" },
    { label:"Coaching Courses", value:coachingCount, icon:ICONS.grad, color:"purple", sub:"Live coaching programmes", view:"courses" },
    { label:"Diploma Courses", value:diplomaCount, icon:ICONS.grad, color:"amber", sub:"Diploma programmes", view:"courses" },
    { label:"Certificate Courses", value:certificateCount, icon:ICONS.grad, color:"green", sub:"Certificate programmes", view:"courses" },
    { label:"Avg. Attendance", value:avgAttendance+"%", icon:ICONS.checkCircle, color:"green", sub:"Across all batches", view:"courses" },
    { label:"Notifications", value:`${notifSent} / ${notifDelivered} / ${notifRead}`, icon:ICONS.bell, color:"coral", sub:"Sent / Delivered / Read", view:"notifications" },
  ];

  /* Course distribution — real counts, same colour mapping used for course-type badges elsewhere. */
  const courseDist = [
    { label:"Coaching", value:coachingCount, color:"#3a2a56" },
    { label:"Certificate", value:certificateCount, color:"#1f9d63" },
    { label:"Diploma", value:diplomaCount, color:"#e8b13a" },
  ];

  /* Top courses by real total enrolled across their batches. */
  const topCourses = COURSES.map(c=>({
    ...c, enrolled:(c.batchIds||[]).reduce((s,bid)=> s + (BATCHES[bid] ? BATCHES[bid].enrolled : 0), 0)
  })).sort((a,b)=>b.enrolled-a.enrolled).slice(0,5);
  const topCoursesMax = Math.max(...topCourses.map(c=>c.enrolled), 1);

  /* Top collections by real aggregate active-subscriber count of their included books. */
  const topCollections = COLLECTIONS.map(c=>({
    ...c, subs:c.bookIds.reduce((s,bid)=>{ const b=BOOKS.find(x=>x.id===bid); return s+(b?b.activeSubs:0); },0)
  })).sort((a,b)=>b.subs-a.subs).slice(0,5);
  const topCollectionsMax = Math.max(...topCollections.map(c=>c.subs), 1);

  /* Most Bought — real ranking per tab. */
  const mostBoughtBooks = [...BOOKS].sort((a,b)=>b.activeSubs-a.activeSubs).slice(0,6);
  const mostBoughtBooksMax = Math.max(...mostBoughtBooks.map(b=>b.activeSubs), 1);
  const mostBoughtCourses = topCourses;
  const mostBoughtCollections = topCollections;

  /* Students grouped by real qualification field. */
  const eduMap = {};
  STUDENTS.forEach(s=>{ const q = s.qualification || "Unspecified"; eduMap[q] = (eduMap[q]||0)+1; });
  const eduList = Object.entries(eduMap).sort((a,b)=>b[1]-a[1]);
  const eduMax = Math.max(...eduList.map(e=>e[1]), 1);

  const maxCatBooks = Math.max(...CATEGORIES.map(c=>c.books), 1);

  /* Review sentiment — sourced from real testimonial ratings (the only rating data in the store). */
  const positiveReviews = CMS_CONTENT.testimonials.filter(t=>t.rating>=4).length;
  const negativeReviews = CMS_CONTENT.testimonials.filter(t=>t.rating<4).length;
  const reviewPie = [ { label:"Positive (4★+)", value:positiveReviews, color:"#1f9d63" }, { label:"Negative (<4★)", value:negativeReviews, color:"#c8402d" } ];

  document.getElementById('content').innerHTML = `
    ${crumbs([{label:"Home"},{label:"Dashboard"}])}
    <div class="page-head">
      <div><h1>Welcome, ${esc(SESSION.name.split(" ")[0])}</h1><p>Logged in as ${esc(SESSION.role)} · Here is your academy overview.</p></div>
      <button class="btn btn-primary" onclick="openQuickAddMenu()">${ICONS.plus} Quick action</button>
    </div>

    <div class="kpi-grid-compact">${kpis.map(dashboardKpiCard).join("")}</div>

    <div class="card" style="margin-bottom:18px;">
      <div class="card-head">
        <div><h3>Revenue Overview</h3><div class="muted-note">Monthly performance across all products</div></div>
        <select class="pill-select" onchange="changeDashboardRevenueYear(this.value)">
          <option value="2027" ${dashboardRevenueYear===2027?"selected":""}>2027</option>
          <option value="2026" ${dashboardRevenueYear===2026?"selected":""}>2026</option>
        </select>
      </div>
      <div class="card-body">
        <div class="chart-bars-dense"><div class="chart-bars" id="revenueChartBars">${buildRevenueBars(dashboardRevenueYear)}</div></div>
      </div>
    </div>

    <div class="grid-2" style="margin-bottom:18px;">
      <div class="card">
        <div class="card-head"><h3>Student Enrollment</h3><div class="muted-note">Cumulative growth trend</div></div>
        <div class="card-body">
          <div class="line-chart-wrap">
            ${buildLineChartSvg(DASHBOARD_ENROLLMENT_TREND, "#3a2a56")}
            <div class="line-chart-labels">${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m=>`<span>${m}</span>`).join("")}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-head"><h3>Course Distribution</h3><div class="muted-note">By programme type</div></div>
        <div class="card-body">
          <div class="pie-wrap">${buildPieSvg(courseDist, 130)}<div class="pie-legend">${pieLegendHtml(courseDist)}</div></div>
        </div>
      </div>
    </div>

    <div class="grid-2" style="margin-bottom:18px;">
      <div class="card">
        <div class="card-head"><h3>Top Performing Courses</h3><div class="muted-note">By total students enrolled</div></div>
        <div class="card-body">
          ${topCourses.map((c,i)=>rankedBarRow(i+1, c.title, c.type, c.enrolled, topCoursesMax, "linear-gradient(90deg,var(--coral-500),var(--gold-500))", "course-view", c.id)).join("") || `<p style="color:var(--muted);font-size:13px;margin:0;">No course data yet.</p>`}
        </div>
      </div>
      <div class="card">
        <div class="card-head"><h3>Top Performing Collections</h3><div class="muted-note">By aggregate active subscribers</div></div>
        <div class="card-body">
          ${topCollections.map((c,i)=>rankedBarRow(i+1, c.title, `${c.bookIds.length} books`, c.subs, topCollectionsMax, "linear-gradient(90deg,var(--purple-700),var(--purple-900))", "collection-view", c.id)).join("") || `<p style="color:var(--muted);font-size:13px;margin:0;">No collection data yet.</p>`}
        </div>
      </div>
    </div>

    <div class="grid-2" style="margin-bottom:18px;">
      <div class="card">
        <div class="card-head"><h3>Most Bought</h3></div>
        <div class="card-body" style="padding-top:6px;">
          <div class="tabs" style="margin-bottom:10px;">
            <button class="tab active" data-tab="mb-books" onclick="switchTab(this,'mb-books')">Books</button>
            <button class="tab" data-tab="mb-courses" onclick="switchTab(this,'mb-courses')">Courses</button>
            <button class="tab" data-tab="mb-collections" onclick="switchTab(this,'mb-collections')">Collections</button>
          </div>
          <div class="tabpane active" id="tab-mb-books">
            ${mostBoughtBooks.map((b,i)=>rankedBarRow(i+1, b.title, b.editor, b.activeSubs, mostBoughtBooksMax, "linear-gradient(90deg,var(--coral-500),var(--coral-600))", "book-view", b.id)).join("")}
          </div>
          <div class="tabpane" id="tab-mb-courses">
            ${mostBoughtCourses.map((c,i)=>rankedBarRow(i+1, c.title, c.type, c.enrolled, topCoursesMax, "linear-gradient(90deg,var(--purple-700),var(--purple-900))", "course-view", c.id)).join("")}
          </div>
          <div class="tabpane" id="tab-mb-collections">
            ${mostBoughtCollections.map((c,i)=>rankedBarRow(i+1, c.title, `${c.bookIds.length} books`, c.subs, topCollectionsMax, "linear-gradient(90deg,var(--green-600),#34c281)", "collection-view", c.id)).join("")}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-head"><h3>Students by Education</h3><div class="muted-note">Grouped by qualification</div></div>
        <div class="card-body">
          ${eduList.map(([q,count],i)=>rankedBarRow(i+1, q, null, count, eduMax, "linear-gradient(90deg,var(--blue-600),#6f82e6)")).join("") || `<p style="color:var(--muted);font-size:13px;margin:0;">No student data yet.</p>`}
        </div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-head"><h3>Categories</h3><div class="muted-note">Tile size reflects number of books</div></div>
        <div class="card-body">
          <div class="category-cloud">
            ${CATEGORIES.map(cat=>{
              const scale = 0.85 + (cat.books/maxCatBooks)*0.65;
              return `<div class="category-tile" style="font-size:${(13*scale).toFixed(0)}px;" onclick="navigate('category')">${esc(cat.name)}<span>${cat.books} books</span></div>`;
            }).join("")}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-head"><h3>Reviews</h3><div class="muted-note">Positive vs negative, from testimonial ratings</div></div>
        <div class="card-body">
          <div class="pie-wrap">${buildPieSvg(reviewPie, 130)}<div class="pie-legend">${pieLegendHtml(reviewPie)}</div></div>
        </div>
      </div>
    </div>
  `;
}