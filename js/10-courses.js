/* ============================================================ COURSES ============================================================ */
const COURSE_TYPE_COLOR = { "Coaching":"badge-purple","Certificate":"badge-green","Diploma":"badge-amber" };
function courseRowHtml(c, srNo){
  return `<tr onclick="navigate('course-view', ${c.id})">
    <td>${COURSE_TYPE_COLOR[c.type] ? `<span class="badge ${COURSE_TYPE_COLOR[c.type]}">${esc(c.type)}</span>` : esc(c.type)}</td>
    <td><div class="row-title">${esc(c.title)}</div><div class="row-sub">Next intake: ${esc(c.nextIntake)}</div></td>
    <td>${esc(c.durationLabel)}</td>
    <td>${esc(c.mode)}</td>
    <td>${esc(c.coordinator)}</td>
    <td>${statusBadge(c.status)}</td>
    <td class="row-actions">
      <button class="btn btn-ghost btn-sm btn-icon" title="Edit" onclick="event.stopPropagation(); openCourseModal(${c.id})">${ICONS.edit}</button>
      <button class="btn btn-danger btn-sm btn-icon" title="Delete" onclick="event.stopPropagation(); deleteCourse(${c.id})">${ICONS.trash}</button>
    </td>
  </tr>`;
}
function renderCoursesList(){
  document.getElementById('content').innerHTML = `
    ${crumbs([{label:"Courses"},{label:"Course List"}])}
    <div class="page-head">
      <div><h1>Course List</h1><p>All coaching programmes, certificate and diploma courses run by the academy.</p></div>
      <button class="btn btn-primary" onclick="openCourseModal()">${ICONS.plus} Add Course</button>
    </div>
    <div class="toolbar">
      <div class="search-box">${ICONS.search}<input type="text" id="pageSearch" placeholder="Search courses…" oninput="LIST.courses.setSearch(this.value)"></div>
      <button class="filter-chip active" data-status="All" onclick="LIST.courses.setStatus('All', this)">All (${COURSES.length})</button>
      <button class="filter-chip" data-status="Active" onclick="LIST.courses.setStatus('Active', this)">Active</button>
      <button class="filter-chip" data-status="Draft" onclick="LIST.courses.setStatus('Draft', this)">Draft</button>
    </div>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th>Type</th><th>Title</th><th>Duration</th><th>Mode</th><th>Coordinator</th><th>Status</th><th></th></tr></thead>
        <tbody id="coursesTbody"></tbody>
      </table>
    </div>
    <div id="coursesPagination"></div>
  `;
  createListController({
    key:"courses", perPage:10, getData:()=>COURSES,
    matchesSearch:(c,q)=>(c.title+' '+c.coordinator+' '+c.type).toLowerCase().includes(q),
    matchesStatus:(c,status)=>c.status===status,
    renderRow: courseRowHtml,
    tbodySelector:"#coursesTbody", paginationSelector:"#coursesPagination",
    emptyHtml:`<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:30px;">No courses match your search.</td></tr>`,
  });
}

function openCourseModal(id){
  const c = id ? COURSES.find(x=>x.id===id) : null;
  openModal(`
    <div class="modal-head"><h3>${c ? "Edit Course" : "Add Course"}</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="form-grid">
        <div class="field span-2"><label>Title</label><input id="crTitle" value="${c ? esc(c.title) : ""}" placeholder="e.g. GATE CS/IT Live Coaching 2027"></div>
        <div class="field"><label>Type</label>
          <select id="crType">
            <option ${c && c.type==="Coaching" ? "selected":""}>Coaching</option>
            <option ${c && c.type==="Certificate" ? "selected":""}>Certificate</option>
            <option ${c && c.type==="Diploma" ? "selected":""}>Diploma</option>
          </select>
        </div>
        <div class="field"><label>Mode</label>
          <select id="crMode">
            <option ${c && c.mode==="Online" ? "selected":""}>Online</option>
            <option ${c && c.mode==="Offline" ? "selected":""}>Offline</option>
            <option ${c && c.mode==="Hybrid" ? "selected":""}>Hybrid</option>
          </select>
        </div>
        <div class="field"><label>Status</label>
          <select id="crStatus">
            <option ${c && c.status==="Active" ? "selected":""}>Active</option>
            <option ${c && c.status==="Draft" ? "selected":""}>Draft</option>
            <option ${c && c.status==="Closed" ? "selected":""}>Closed</option>
          </select>
        </div>
        <div class="field"><label>Coordinator</label><input id="crCoordinator" value="${c ? esc(c.coordinator) : ""}"></div>
        <div class="field"><label>Next Intake</label><input id="crIntake" value="${c ? esc(c.nextIntake) : ""}" placeholder="e.g. Jan 2027"></div>
        <div class="field"><label>Duration Label</label><input id="crDuration" value="${c ? esc(c.durationLabel) : ""}" placeholder="e.g. 11 months"></div>
        <div class="field"><label>Total Lectures</label><input type="number" id="crLectures" value="${c ? c.totalLectures : ""}"></div>
        <div class="field"><label>Lectures / Week</label><input type="number" id="crCadence" value="${c ? c.lecturesPerWeek : ""}"></div>
        <div class="field span-2"><label>Eligibility</label><textarea id="crEligibility">${c ? esc(c.eligibility) : ""}</textarea></div>
        <div class="field span-2"><label>Objective</label><textarea id="crObjective">${c ? esc(c.objective) : ""}</textarea></div>
        <div class="field span-2"><label>Outcome</label><textarea id="crOutcome">${c ? esc(c.outcome) : ""}</textarea></div>
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveCourse(${c ? c.id : "null"})">${ICONS.check} ${c ? "Save Changes" : "Create Course"}</button>
    </div>
  `, { large:true });
}

function saveCourse(id){
  const title = document.getElementById('crTitle').value.trim();
  if(!title){ toast("Course title is required", true); return; }
  const payload = {
    title,
    type: document.getElementById('crType').value,
    mode: document.getElementById('crMode').value,
    status: document.getElementById('crStatus').value,
    coordinator: document.getElementById('crCoordinator').value.trim() || "—",
    nextIntake: document.getElementById('crIntake').value.trim(),
    durationLabel: document.getElementById('crDuration').value.trim(),
    totalLectures: parseInt(document.getElementById('crLectures').value) || 0,
    lecturesPerWeek: parseInt(document.getElementById('crCadence').value) || 0,
    eligibility: document.getElementById('crEligibility').value.trim(),
    objective: document.getElementById('crObjective').value.trim(),
    outcome: document.getElementById('crOutcome').value.trim(),
  };
  if(id){
    const c = COURSES.find(x=>x.id===id);
    Object.assign(c, payload);
    toast("Course updated");
  } else {
    COURSES.push(Object.assign({ id:nextId('course'), topics:[], faculty:[], payplans:[], batchIds:[] }, payload));
    toast("Course created");
  }
  closeModal();
  navigate(id ? 'course-view' : 'courses', id);
}

function deleteCourse(id){
  const c = COURSES.find(x=>x.id===id);
  if(!c) return;
  confirmAction("Delete Course", `Delete "${c.title}"? Its batches will also be removed. This cannot be undone.`, ()=>{
    (c.batchIds||[]).forEach(bid=>delete BATCHES[bid]);
    COURSES = COURSES.filter(x=>x.id!==id);
    toast("Course deleted");
    navigate('courses');
  });
}

function renderCourseView(id){
  const c = COURSES.find(x=>x.id===id);
  if(!c){ renderCoursesList(); return; }
  const batches = (c.batchIds||[]).map(bid=>BATCHES[bid]).filter(Boolean);

  document.getElementById('content').innerHTML = `
    ${crumbs([{label:"Courses"},{label:"Course List", view:"courses"},{label:c.title}])}
    <div class="page-head">
      <div>
        <button class="btn btn-ghost btn-sm" onclick="navigate('courses')">${ICONS.back} Back to Course List</button>
        <h1 style="margin-top:14px;">${esc(c.title)}</h1>
        <p><span class="badge badge-purple" style="margin-right:8px;">${esc(c.type)}</span>${esc(c.mode)} · Coordinated by ${esc(c.coordinator)}</p>
      </div>
      <div style="display:flex; gap:10px;">
        <button class="btn btn-ghost" onclick="openCourseModal(${c.id})">${ICONS.edit} Edit</button>
        <button class="btn btn-danger" onclick="deleteCourse(${c.id})">${ICONS.trash} Delete</button>
      </div>
    </div>

    <div class="stat-mini-grid" style="grid-template-columns:repeat(4,1fr); margin-bottom:20px;">
      <div class="stat-mini"><div class="n">${c.totalLectures}</div><div class="l">Total Lectures</div></div>
      <div class="stat-mini"><div class="n">${c.lecturesPerWeek}/wk</div><div class="l">Lecture Cadence</div></div>
      <div class="stat-mini"><div class="n">${esc(c.durationLabel)}</div><div class="l">Duration</div></div>
      <div class="stat-mini"><div class="n">${esc(c.nextIntake)}</div><div class="l">Next Intake</div></div>
    </div>

    <div class="tabs">
      <button class="tab active" data-tab="overview" onclick="switchTab(this,'overview')">Overview</button>
      <button class="tab" data-tab="curriculum" onclick="switchTab(this,'curriculum')">Curriculum</button>
      <button class="tab" data-tab="faculty" onclick="switchTab(this,'faculty')">Faculty</button>
      <button class="tab" data-tab="payplans" onclick="switchTab(this,'payplans')">Pay Plans</button>
      <button class="tab" data-tab="schedule" onclick="switchTab(this,'schedule')">Schedule</button>
      <button class="tab" data-tab="batches" onclick="switchTab(this,'batches')">Batches (${batches.length})</button>
    </div>

    <div class="tabpane active" id="tab-overview">
      <div class="grid-2">
        <div class="card"><div class="card-head"><h3>Objective</h3></div><div class="card-body"><p style="margin:0; color:var(--ink-soft); line-height:1.65;">${esc(c.objective)}</p></div></div>
        <div class="card"><div class="card-head"><h3>Eligibility</h3></div><div class="card-body"><p style="margin:0; color:var(--ink-soft); line-height:1.65;">${esc(c.eligibility)}</p></div></div>
      </div>
      <div class="card" style="margin-top:18px;"><div class="card-head"><h3>Outcome</h3></div><div class="card-body"><p style="margin:0; color:var(--ink-soft); line-height:1.65;">${esc(c.outcome)}</p></div></div>
    </div>

    <div class="tabpane" id="tab-curriculum">
      <div class="card">
        <div class="card-head">
          <div><h3>Course Topics</h3><div class="muted-note">${c.topics.length} modules · ${c.totalLectures} lectures total</div></div>
          <button class="btn btn-ghost btn-sm" onclick="openTopicModal(${c.id})">${ICONS.plus} Add Topic</button>
        </div>
        <div class="card-body">
          ${c.topics.map((t,i)=>`
            <div class="timeline-step">
              <div class="timeline-num">${i+1}</div>
              <div class="timeline-body"><b>${esc(t.title)}</b><span>${t.lectures} lectures · Reference: ${esc(t.book)}</span></div>
              <div class="fr-actions">
                <button class="btn btn-ghost btn-sm btn-icon" title="Edit" onclick="openTopicModal(${c.id}, ${i})">${ICONS.edit}</button>
                <button class="btn btn-danger btn-sm btn-icon" title="Remove" onclick="removeTopic(${c.id}, ${i})">${ICONS.trash}</button>
              </div>
            </div>
          `).join("") || `<p style="color:var(--muted);font-size:13px;margin:0;">No topics added yet.</p>`}
        </div>
      </div>
    </div>

    <div class="tabpane" id="tab-faculty">
      <div class="card">
        <div class="card-head"><h3>Faculty</h3><button class="btn btn-ghost btn-sm" onclick="openFacultyModal(${c.id})">${ICONS.plus} Add Faculty</button></div>
        <div class="card-body">
          ${(c.faculty||[]).map(fid=>{ const f=AUTHORS[fid]; if(!f) return ""; return `
            <div class="faculty-row"><div class="fav">${initials(f.name)}</div><div><b>${esc(f.name)}</b><span>${esc(f.designation)}</span></div>
              <div class="fr-actions"><button class="btn btn-danger btn-sm btn-icon" title="Remove" onclick="removeFaculty(${c.id}, ${fid})">${ICONS.trash}</button></div>
            </div>
          `; }).join("") || `<p style="color:var(--muted);font-size:13px;margin:0;">No faculty assigned yet.</p>`}
        </div>
      </div>
    </div>

    <div class="tabpane" id="tab-payplans">
      <div class="page-head" style="margin-bottom:14px;">
        <div></div>
        <button class="btn btn-ghost btn-sm" onclick="openPayplanModal(${c.id})">${ICONS.plus} Add Pay Plan</button>
      </div>
      <div class="grid-2">
        ${c.payplans.map((p,i)=>`
          <div class="payplan-card">
            <div class="fr-actions" style="position:absolute; top:14px; right:14px;">
              <button class="btn btn-danger btn-sm btn-icon" title="Remove" onclick="removePayplan(${c.id}, ${i})">${ICONS.trash}</button>
            </div>
            <h4>${esc(p.name)}</h4>
            ${p.installments.map(inst=>`<div class="installment-row"><span>Installment ${inst.n}</span><span style="font-weight:700; color:var(--ink);">${inr(inst.amount)} · ${esc(inst.due)}</span></div>`).join("")}
          </div>
        `).join("") || `<p style="color:var(--muted);font-size:13px;margin:0;">No pay plans added yet.</p>`}
      </div>
    </div>

    <div class="tabpane" id="tab-schedule">
      <div id="scheduleWrap-${c.id}"></div>
    </div>

    <div class="tabpane" id="tab-batches">
      <div class="page-head" style="margin-bottom:14px;">
        <div></div>
        <button class="btn btn-primary btn-sm" onclick="openBatchModal(${c.id})">${ICONS.plus} Add Batch</button>
      </div>
      ${batches.length ? `
      <div class="table-wrap">
        <table class="data">
          <thead><tr><th>Intake Name</th><th>Start</th><th>End</th><th>Seats</th><th>Price</th><th>Status</th><th></th></tr></thead>
          <tbody>
            ${batches.map(b=>`
              <tr onclick="navigate('batch-view', ${b.id})">
                <td class="row-title">${esc(b.intake)}</td>
                <td>${esc(b.start)}</td>
                <td>${esc(b.end)}</td>
                <td>${b.seatsFilled}/${b.seatsTotal}</td>
                <td><div class="row-title" style="font-weight:700;">${inr(b.earlyBird)}</div><div class="row-sub price-strike">${inr(b.price)}</div></td>
                <td>${statusBadge(b.status)}</td>
                <td class="row-actions">
                  <button class="btn btn-ghost btn-sm btn-icon" title="Edit" onclick="event.stopPropagation(); openBatchModal(${c.id}, ${b.id})">${ICONS.edit}</button>
                  <button class="btn btn-danger btn-sm btn-icon" title="Delete" onclick="event.stopPropagation(); deleteBatch(${c.id}, ${b.id})">${ICONS.trash}</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      ` : `<div class="empty-state"><div class="ic-wrap">${ICONS.cal}</div><h2>No batches scheduled yet</h2><p>Add a batch to open admissions, set pricing and start tracking seats.</p></div>`}
    </div>
  `;
  renderCourseSchedule(c.id);
}

function switchTab(btn, tabId){
  btn.parentElement.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  btn.closest('#content').querySelectorAll('.tabpane').forEach(p=>p.classList.remove('active'));
  document.getElementById('tab-'+tabId).classList.add('active');
}

/* ---------- Curriculum topics ---------- */
function openTopicModal(courseId, index){
  const c = COURSES.find(x=>x.id===courseId);
  const t = (typeof index === "number") ? c.topics[index] : null;
  openModal(`
    <div class="modal-head"><h3>${t ? "Edit Topic" : "Add Topic"}</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="field"><label>Topic Title</label><input id="tpTitle" value="${t ? esc(t.title) : ""}"></div>
      <div class="field"><label>Reference Book</label><input id="tpBook" value="${t ? esc(t.book) : ""}" placeholder="e.g. Elements of Calculus"></div>
      <div class="field"><label>Lectures</label><input type="number" id="tpLectures" value="${t ? t.lectures : ""}"></div>
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveTopic(${courseId}, ${typeof index === "number" ? index : "null"})">${ICONS.check} Save</button>
    </div>
  `);
}
function saveTopic(courseId, index){
  const c = COURSES.find(x=>x.id===courseId);
  const title = document.getElementById('tpTitle').value.trim();
  if(!title){ toast("Topic title is required", true); return; }
  const topic = { title, book: document.getElementById('tpBook').value.trim() || "—", lectures: parseInt(document.getElementById('tpLectures').value) || 0 };
  if(index === null){ c.topics.push(topic); } else { c.topics[index] = topic; }
  closeModal(); toast("Curriculum updated"); navigate('course-view', courseId);
}
function removeTopic(courseId, index){
  const c = COURSES.find(x=>x.id===courseId);
  c.topics.splice(index,1);
  toast("Topic removed");
  navigate('course-view', courseId);
}

/* ---------- Faculty ---------- */
function openFacultyModal(courseId){
  const c = COURSES.find(x=>x.id===courseId);
  const options = Object.entries(AUTHORS).filter(([aid])=>!(c.faculty||[]).includes(parseInt(aid)))
    .map(([aid,a])=>`<option value="${aid}">${esc(a.name)}</option>`).join("");
  if(!options){ toast("All available faculty are already assigned", true); return; }
  openModal(`
    <div class="modal-head"><h3>Add Faculty</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body"><div class="field"><label>Faculty Member</label><select id="facSelect">${options}</select></div></div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveFaculty(${courseId})">${ICONS.check} Add</button>
    </div>
  `);
}
function saveFaculty(courseId){
  const c = COURSES.find(x=>x.id===courseId);
  const fid = parseInt(document.getElementById('facSelect').value);
  c.faculty = c.faculty || [];
  c.faculty.push(fid);
  closeModal(); toast("Faculty added"); navigate('course-view', courseId);
}
function removeFaculty(courseId, facultyId){
  const c = COURSES.find(x=>x.id===courseId);
  c.faculty = (c.faculty||[]).filter(f=>f!==facultyId);
  toast("Faculty removed");
  navigate('course-view', courseId);
}

/* ---------- Pay plans ---------- */
function openPayplanModal(courseId){
  openModal(`
    <div class="modal-head"><h3>Add Pay Plan</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="field"><label>Plan Name</label><input id="ppName" placeholder="e.g. Two Installments"></div>
      <div class="field"><label>Single Installment Amount (₹)</label><input type="number" id="ppAmount" placeholder="e.g. 42000"></div>
      <div class="field"><label>Due</label><input id="ppDue" placeholder="e.g. At enrolment" value="At enrolment"></div>
      <p class="hint">Add more installments after creating the plan by editing it directly in code — this quick form creates a single-installment plan to get you started.</p>
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="savePayplan(${courseId})">${ICONS.check} Add Plan</button>
    </div>
  `);
}
function savePayplan(courseId){
  const c = COURSES.find(x=>x.id===courseId);
  const name = document.getElementById('ppName').value.trim();
  if(!name){ toast("Plan name is required", true); return; }
  const amount = parseFloat(document.getElementById('ppAmount').value) || 0;
  const due = document.getElementById('ppDue').value.trim() || "At enrolment";
  c.payplans.push({ name, installments:[{ n:1, amount, due }] });
  closeModal(); toast("Pay plan added"); navigate('course-view', courseId);
}
function removePayplan(courseId, index){
  const c = COURSES.find(x=>x.id===courseId);
  c.payplans.splice(index,1);
  toast("Pay plan removed");
  navigate('course-view', courseId);
}

/* ============================================================ BATCHES ============================================================ */
function openBatchModal(courseId, batchId){
  const b = batchId ? BATCHES[batchId] : null;
  openModal(`
    <div class="modal-head"><h3>${b ? "Edit Batch" : "Add Batch"}</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="form-grid">
        <div class="field span-2"><label>Intake Name</label><input id="btIntake" value="${b ? esc(b.intake) : ""}" placeholder="e.g. Jan 2027 · Morning Batch"></div>
        <div class="field"><label>Start Date</label><input id="btStart" value="${b ? esc(b.start) : ""}" placeholder="e.g. 05 Jan 2027"></div>
        <div class="field"><label>End Date</label><input id="btEnd" value="${b ? esc(b.end) : ""}" placeholder="e.g. 30 Nov 2027"></div>
        <div class="field"><label>Total Seats</label><input type="number" id="btSeatsTotal" value="${b ? b.seatsTotal : ""}"></div>
        <div class="field"><label>Seats Filled</label><input type="number" id="btSeatsFilled" value="${b ? b.seatsFilled : 0}"></div>
        <div class="field"><label>Price (₹)</label><input type="number" id="btPrice" value="${b ? b.price : ""}"></div>
        <div class="field"><label>Early Bird Price (₹)</label><input type="number" id="btEarlyBird" value="${b ? b.earlyBird : ""}"></div>
        <div class="field"><label>Status</label>
          <select id="btStatus">
            <option ${b && b.status==="Admissions Open" ? "selected":""}>Admissions Open</option>
            <option ${b && b.status==="Filling Fast" ? "selected":""}>Filling Fast</option>
            <option ${b && b.status==="Closed" ? "selected":""}>Closed</option>
          </select>
        </div>
        <div class="field"><label>Lectures Held</label><input type="number" id="btLecturesHeld" value="${b ? b.lecturesHeld : 0}"></div>
        <div class="field"><label>Avg. Attendance (%)</label><input type="number" id="btAttendance" value="${b ? b.attendanceAvg : 0}"></div>
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveBatch(${courseId}, ${batchId || "null"})">${ICONS.check} ${b ? "Save Changes" : "Create Batch"}</button>
    </div>
  `, { large:true });
}
function saveBatch(courseId, batchId){
  const intake = document.getElementById('btIntake').value.trim();
  if(!intake){ toast("Intake name is required", true); return; }
  const payload = {
    courseId,
    intake,
    start: document.getElementById('btStart').value.trim(),
    end: document.getElementById('btEnd').value.trim(),
    seatsTotal: parseInt(document.getElementById('btSeatsTotal').value) || 0,
    seatsFilled: parseInt(document.getElementById('btSeatsFilled').value) || 0,
    price: parseFloat(document.getElementById('btPrice').value) || 0,
    earlyBird: parseFloat(document.getElementById('btEarlyBird').value) || 0,
    status: document.getElementById('btStatus').value,
    lecturesHeld: parseInt(document.getElementById('btLecturesHeld').value) || 0,
    attendanceAvg: parseInt(document.getElementById('btAttendance').value) || 0,
  };
  payload.enrolled = payload.seatsFilled;
  if(batchId){
    Object.assign(BATCHES[batchId], payload);
    toast("Batch updated");
  } else {
    const id = nextId('batch');
    BATCHES[id] = Object.assign({ id }, payload);
    const c = COURSES.find(x=>x.id===courseId);
    c.batchIds = c.batchIds || [];
    c.batchIds.push(id);
    toast("Batch created");
  }
  closeModal();
  navigate('course-view', courseId);
}
function deleteBatch(courseId, batchId){
  const b = BATCHES[batchId];
  if(!b) return;
  confirmAction("Delete Batch", `Delete "${b.intake}"? This cannot be undone.`, ()=>{
    delete BATCHES[batchId];
    const c = COURSES.find(x=>x.id===courseId);
    if(c) c.batchIds = (c.batchIds||[]).filter(id=>id!==batchId);
    toast("Batch deleted");
    navigate('course-view', courseId);
  });
}

function renderBatchView(id){
  const b = BATCHES[id];
  if(!b){ renderCoursesList(); return; }
  const course = COURSES.find(c=>c.id===b.courseId);
  const roster = STUDENTS.filter(s=>s.batchId===b.id);

  document.getElementById('content').innerHTML = `
    ${crumbs([{label:"Courses"},{label:"Course List", view:"courses"},{label:course.title, view:"course-view"},{label:b.intake}])}
    <div class="page-head">
      <div>
        <button class="btn btn-ghost btn-sm" onclick="navigate('course-view', ${course.id})">${ICONS.back} Back to ${esc(course.title)}</button>
        <h1 style="margin-top:14px;">${esc(b.intake)}</h1>
        <p>${esc(b.start)} → ${esc(b.end)}</p>
      </div>
      <div style="display:flex; gap:10px;">
        <button class="btn btn-ghost" onclick="openBatchModal(${course.id}, ${b.id})">${ICONS.edit} Edit</button>
        <button class="btn btn-danger" onclick="deleteBatch(${course.id}, ${b.id})">${ICONS.trash} Delete</button>
      </div>
    </div>

    <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);">
      <div class="kpi-card"><div class="kpi-label">Enrolled Students</div><div class="kpi-value">${b.enrolled}</div><div class="kpi-sub">of ${b.seatsTotal} total seats</div></div>
      <div class="kpi-card"><div class="kpi-label">Seats Remaining</div><div class="kpi-value">${b.seatsTotal - b.seatsFilled}</div><div class="kpi-sub">${b.seatsTotal ? Math.round((b.seatsFilled/b.seatsTotal)*100) : 0}% filled</div></div>
      <div class="kpi-card"><div class="kpi-label">Lectures Held</div><div class="kpi-value">${b.lecturesHeld}</div><div class="kpi-sub">of ${course.totalLectures} planned</div></div>
      <div class="kpi-card"><div class="kpi-label">Avg. Attendance</div><div class="kpi-value">${b.attendanceAvg}%</div><div class="kpi-sub">Across held lectures</div></div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-head"><h3>Enrollment Progress</h3><div class="muted-note">${b.seatsFilled} of ${b.seatsTotal} seats filled</div></div>
        <div class="card-body">
          <div class="progress-track"><div class="progress-fill" style="width:${b.seatsTotal ? Math.round((b.seatsFilled/b.seatsTotal)*100) : 0}%"></div></div>
          <dl class="def-list" style="margin-top:20px;">
            <div><dt>Standard Price</dt><dd>${inr(b.price)}</dd></div>
            <div><dt>Early Bird Price</dt><dd>${inr(b.earlyBird)}</dd></div>
          </dl>
        </div>
      </div>
      <div class="card">
        <div class="card-head"><h3>Attendance Summary</h3></div>
        <div class="card-body">
          <div class="stat-mini-grid" style="grid-template-columns:1fr;">
            <div class="stat-mini"><div class="n">${b.attendanceAvg}%</div><div class="l">Average attendance across ${b.lecturesHeld} lectures held</div></div>
          </div>
          <p style="font-size:12px; color:var(--muted); margin-top:14px;">Per-lecture attendance tracking will appear here once lecture-level attendance is connected. The full student roster for this batch is below.</p>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:18px;">
      <div class="card-head">
        <div><h3>Batch Roster</h3><div class="muted-note">${roster.length} student${roster.length===1?'':'s'} enrolled in this batch</div></div>
        <button class="btn btn-primary btn-sm" onclick="openStudentModal(null, ${course.id}, ${b.id})">${ICONS.plus} Add Student to Batch</button>
      </div>
      <div class="card-body" style="padding-top:6px;">
        ${roster.length ? `
        <div class="table-wrap" style="border:1px solid var(--border-soft);">
          <table class="data">
            <thead><tr><th>Student</th><th>Phone</th><th>Status</th><th>Joined</th><th></th></tr></thead>
            <tbody>
              ${roster.map(s=>`
                <tr onclick="openStudentViewModal(${s.id})">
                  <td><div style="display:flex;align-items:center;gap:10px;"><div class="avatar-sm">${initials(s.name)}</div><div><div class="row-title">${esc(s.name)}</div><div class="row-sub">${esc(s.email)}</div></div></div></td>
                  <td>${esc(s.phone)}</td>
                  <td>${statusBadge(s.status)}</td>
                  <td>${esc(s.joined)}</td>
                  <td class="row-actions">
                    <button class="btn btn-ghost btn-sm btn-icon" title="Edit" onclick="event.stopPropagation(); openStudentModal(${s.id})">${ICONS.edit}</button>
                    <button class="btn btn-danger btn-sm btn-icon" title="Delete" onclick="event.stopPropagation(); deleteStudent(${s.id})">${ICONS.trash}</button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        ` : `<p style="color:var(--muted);font-size:13px;margin:0;">No students enrolled in this batch yet.</p>`}
      </div>
    </div>
  `;
}
