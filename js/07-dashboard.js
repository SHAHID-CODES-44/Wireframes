/* ============================================================ DASHBOARD ============================================================ */
function renderDashboard(){
  const pendingReviews = REVIEWS.filter(r=>r.status==="Pending").length;
  document.getElementById('content').innerHTML = `
    ${crumbs([{label:"Home"},{label:"Dashboard"}])}
    <div class="page-head">
      <div>
        <h1>Welcome, ${esc(SESSION.name.split(" ")[0])}</h1>
        <p>Logged in as ${esc(SESSION.role)} · Here is your academy overview for this week.</p>
      </div>
      <button class="btn btn-primary" onclick="openQuickAddMenu()">${ICONS.plus} Quick action</button>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-top"><div class="kpi-icon" style="background:var(--purple-tint);color:var(--purple-800)">${ICONS.rupee}</div><span class="kpi-trend trend-up">+12.4%</span></div>
        <div class="kpi-label">Total Revenue</div>
        <div class="kpi-value">₹8.45L</div>
        <div class="kpi-sub">vs ₹7.52L last month</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-top"><div class="kpi-icon" style="background:var(--coral-tint);color:var(--coral-500)">${ICONS.pulse}</div><span class="kpi-trend trend-up">+48 this week</span></div>
        <div class="kpi-label">Active Subscribers</div>
        <div class="kpi-value">1,284</div>
        <div class="kpi-sub">Across books, collections & batches</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-top"><div class="kpi-icon" style="background:var(--green-tint);color:var(--green-600)">${ICONS.grad}</div><span class="kpi-trend trend-up">${COURSES.filter(c=>c.status==='Active').length} courses active</span></div>
        <div class="kpi-label">Course Enrolments</div>
        <div class="kpi-value">${STUDENTS.length}</div>
        <div class="kpi-sub">Across ${Object.keys(BATCHES).length} active batches</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-top"><div class="kpi-icon" style="background:var(--amber-tint);color:var(--amber-600)">${ICONS.refresh}</div><span class="kpi-trend trend-warn">${pendingReviews} pending</span></div>
        <div class="kpi-label">Review Queue</div>
        <div class="kpi-value">${pendingReviews}</div>
        <div class="kpi-sub">Documents awaiting reviewer action</div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-head">
          <div><h3>Revenue Overview</h3><div class="muted-note">Monthly performance across all products</div></div>
          <select class="pill-select"><option>This year</option><option>Last year</option></select>
        </div>
        <div class="card-body">
          <div class="chart-bars">
            ${["Jan","Feb","Mar","Apr","May","Jun","Jul"].map((m,i)=>{
              const heights=[38,58,44,86,52,74,63];
              const peak = i===3;
              return `<div class="bar-col"><div class="bar ${peak?'peak':''}" style="height:${heights[i]}%"></div><span>${m}</span></div>`;
            }).join("")}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-head"><h3>Academy Snapshot</h3></div>
        <div class="card-body">
          <ul class="activity-list">
            <li><span class="dot-status dot-blue"></span><div><b>${STUDENTS.filter(s=>s.status==='Active').length} active students</b> currently enrolled across all batches.<span class="when">Live</span></div></li>
            <li><span class="dot-status dot-red"></span><div><b>${COURSES.filter(c=>c.status==='Draft').length} courses</b> still in draft, awaiting coordinator review before publishing.<span class="when">Updated this morning</span></div></li>
            <li><span class="dot-status dot-green"></span><div><b>${BOOKS.filter(b=>b.status==='Published').length} books</b> published in the digital library.<span class="when">Updated 2 hours ago</span></div></li>
            <li><span class="dot-status dot-gold"></span><div><b>${pendingReviews} items</b> pending reviewer approval.<span class="when">Updated yesterday</span></div></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:18px;">
      <div class="card-head"><h3>Recent Activity</h3><div class="muted-note">Latest actions across the platform</div></div>
      <div class="card-body">
        <ul class="activity-list">
          <li><span class="dot-status dot-green"></span><div><b>Priya Nair</b> enrolled into <b>GATE CS/IT Live Coaching 2027 — Morning Batch</b>.<span class="when">14 minutes ago</span></div></li>
          <li><span class="dot-status dot-blue"></span><div><b>Prof. Anjali Deshpande</b> updated the description for <b>Discrete Mathematics for GATE</b>.<span class="when">1 hour ago</span></div></li>
          <li><span class="dot-status dot-red"></span><div><b>Sohel</b> marked a student document as <b>Rejected</b> — resubmission requested.<span class="when">3 hours ago</span></div></li>
          <li><span class="dot-status dot-gold"></span><div>New testimonial submitted by <b>Rahul Fernandes</b> for review.<span class="when">Yesterday, 6:40 PM</span></div></li>
        </ul>
      </div>
    </div>
  `;
}
