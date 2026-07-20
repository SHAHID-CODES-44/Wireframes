/* ============================================================ STUDENTS ============================================================ */
function studentRowHtml(s, srNo){
  const course = COURSES.find(c=>c.id===s.courseId);
  const batch = BATCHES[s.batchId];
  return `<tr onclick="openStudentViewModal(${s.id})">
    <td><div style="display:flex;align-items:center;gap:10px;"><div class="avatar-sm">${initials(s.name)}</div><div><div class="row-title">${esc(s.name)}</div><div class="row-sub">${esc(s.email)}</div></div></div></td>
    <td>${esc(s.phone)}</td>
    <td>${course ? esc(course.title) : "—"}${batch ? `<div class="row-sub">${esc(batch.intake)}</div>` : ""}</td>
    <td>${statusBadge(s.status)}</td>
    <td>${esc(s.joined)}</td>
    <td class="row-actions">
      <button class="btn btn-ghost btn-sm btn-icon" title="Edit" onclick="event.stopPropagation(); openStudentModal(${s.id})">${ICONS.edit}</button>
      <button class="btn btn-danger btn-sm btn-icon" title="Delete" onclick="event.stopPropagation(); deleteStudent(${s.id})">${ICONS.trash}</button>
    </td>
  </tr>`;
}
function renderStudentsList(){
  document.getElementById('content').innerHTML = `
    ${crumbs([{label:"Students"},{label:"All Students"}])}
    <div class="page-head">
      <div><h1>All Students</h1><p>Directory of every enrolled and subscribed student, with course, batch and status.</p></div>
      <button class="btn btn-primary" onclick="openStudentModal()">${ICONS.plus} Add Student</button>
    </div>
    <div class="toolbar">
      <div class="search-box">${ICONS.search}<input type="text" id="pageSearch" placeholder="Search students…" oninput="LIST.students.setSearch(this.value)"></div>
      <button class="filter-chip active" data-status="All" onclick="LIST.students.setStatus('All', this)">All (${STUDENTS.length})</button>
      <button class="filter-chip" data-status="Active" onclick="LIST.students.setStatus('Active', this)">Active</button>
      <button class="filter-chip" data-status="Pending" onclick="LIST.students.setStatus('Pending', this)">Pending</button>
      <button class="filter-chip" data-status="Graduated" onclick="LIST.students.setStatus('Graduated', this)">Graduated</button>
    </div>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th>Student</th><th>Phone</th><th>Course / Batch</th><th>Status</th><th>Joined</th><th></th></tr></thead>
        <tbody id="studentsTbody"></tbody>
      </table>
    </div>
    <div id="studentsPagination"></div>
  `;
  createListController({
    key:"students", perPage:10, getData:()=>STUDENTS,
    matchesSearch:(s,q)=>(s.name+' '+s.email).toLowerCase().includes(q),
    matchesStatus:(s,status)=>s.status===status,
    renderRow: studentRowHtml,
    tbodySelector:"#studentsTbody", paginationSelector:"#studentsPagination",
    emptyHtml:`<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:30px;">No students match your search.</td></tr>`,
  });
}

/* Read-only full profile — opened by clicking a student row. */
function openStudentViewModal(id){
  const s = STUDENTS.find(x=>x.id===id);
  if(!s) return;
  const course = COURSES.find(c=>c.id===s.courseId);
  const batch = BATCHES[s.batchId];
  openModal(`
    <div class="modal-head">
      <div style="display:flex; align-items:center; gap:12px;">
        <div class="avatar-sm" style="width:44px;height:44px;font-size:15px;">${initials(s.name)}</div>
        <div><h3 style="margin-bottom:2px;">${esc(s.name)}</h3>${statusBadge(s.status)}</div>
      </div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body">
      <dl class="def-list">
        <div><dt>Email</dt><dd>${esc(s.email) || "—"}</dd></div>
        <div><dt>Phone</dt><dd>${esc(s.phone) || "—"}</dd></div>
        <div><dt>Date of Birth</dt><dd>${esc(s.dob) || "—"}</dd></div>
        <div><dt>Gender</dt><dd>${esc(s.gender) || "—"}</dd></div>
        <div><dt>Course</dt><dd>${course ? esc(course.title) : "—"}</dd></div>
        <div><dt>Batch</dt><dd>${batch ? esc(batch.intake) : "—"}</dd></div>
        <div><dt>Qualification</dt><dd>${esc(s.qualification) || "—"}</dd></div>
        <div><dt>Joined</dt><dd>${esc(s.joined) || "—"}</dd></div>
        <div><dt>Address</dt><dd>${esc(s.address) || "—"}</dd></div>
        <div><dt>City / State / Pincode</dt><dd>${[s.city, s.state, s.pincode].filter(Boolean).map(esc).join(", ") || "—"}</dd></div>
        <div><dt>Guardian Name</dt><dd>${esc(s.guardianName) || "—"}</dd></div>
        <div><dt>Guardian Phone</dt><dd>${esc(s.guardianPhone) || "—"}</dd></div>
        <div><dt>ID Proof</dt><dd>${s.idType ? `${esc(s.idType)} · ${esc(s.idNumber)}` : "—"}</dd></div>
      </dl>
      ${s.notes ? `<div style="margin-top:14px;"><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--muted);margin-bottom:6px;">Notes</div><p style="margin:0;color:var(--ink-soft);font-size:13.5px;line-height:1.6;">${esc(s.notes)}</p></div>` : ""}
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Close</button>
      <button class="btn btn-danger" onclick="closeModal(); deleteStudent(${s.id})">${ICONS.trash} Delete</button>
      <button class="btn btn-primary" onclick="closeModal(); openStudentModal(${s.id})">${ICONS.edit} Edit</button>
    </div>
  `, { large:true });
}

function openStudentModal(id, prefillCourseId, prefillBatchId){
  const s = id ? STUDENTS.find(x=>x.id===id) : null;
  const courseOptions = `<option value="">—</option>` + COURSES.map(c=>`<option value="${c.id}" ${(s ? s.courseId : prefillCourseId)===c.id ? "selected":""}>${esc(c.title)}</option>`).join("");
  openModal(`
    <div class="modal-head"><h3>${s ? "Edit Student" : "Add Student"}</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="form-grid">
        <div class="field span-2"><label>Full Name</label><input id="stName" value="${s ? esc(s.name) : ""}"></div>
        <div class="field"><label>Email</label><input type="email" id="stEmail" value="${s ? esc(s.email) : ""}"></div>
        <div class="field"><label>Phone</label><input id="stPhone" value="${s ? esc(s.phone) : ""}"></div>
        <div class="field"><label>Date of Birth</label><input id="stDob" value="${s ? esc(s.dob) : ""}" placeholder="e.g. 14 Mar 2004"></div>
        <div class="field"><label>Gender</label>
          <select id="stGender">
            <option ${s && s.gender==="Female" ? "selected":""}>Female</option>
            <option ${s && s.gender==="Male" ? "selected":""}>Male</option>
            <option ${s && s.gender==="Other" ? "selected":""}>Other</option>
          </select>
        </div>
        <div class="field"><label>Course</label><select id="stCourse" onchange="populateStudentBatches(this.value)">${courseOptions}</select></div>
        <div class="field"><label>Batch</label><select id="stBatch"></select></div>
        <div class="field"><label>Status</label>
          <select id="stStatus">
            <option ${s && s.status==="Active" ? "selected":""}>Active</option>
            <option ${s && s.status==="Pending" ? "selected":""}>Pending</option>
            <option ${s && s.status==="Graduated" ? "selected":""}>Graduated</option>
            <option ${s && s.status==="Inactive" ? "selected":""}>Inactive</option>
          </select>
        </div>
        <div class="field"><label>Joined Date</label><input id="stJoined" value="${s ? esc(s.joined) : ""}" placeholder="e.g. 05 Jan 2027"></div>
        <div class="field"><label>Qualification</label><input id="stQualification" value="${s ? esc(s.qualification) : ""}" placeholder="e.g. B.Tech Computer Science"></div>
        <div class="field span-2"><label>Address</label><input id="stAddress" value="${s ? esc(s.address) : ""}"></div>
        <div class="field"><label>City</label><input id="stCity" value="${s ? esc(s.city) : ""}"></div>
        <div class="field"><label>State</label><input id="stState" value="${s ? esc(s.state) : ""}"></div>
        <div class="field"><label>Pincode</label><input id="stPincode" value="${s ? esc(s.pincode) : ""}"></div>
        <div class="field"><label>Guardian Name</label><input id="stGuardianName" value="${s ? esc(s.guardianName) : ""}"></div>
        <div class="field"><label>Guardian Phone</label><input id="stGuardianPhone" value="${s ? esc(s.guardianPhone) : ""}"></div>
        <div class="field"><label>ID Proof Type</label>
          <select id="stIdType">
            <option ${s && s.idType==="Aadhaar" ? "selected":""}>Aadhaar</option>
            <option ${s && s.idType==="PAN" ? "selected":""}>PAN</option>
            <option ${s && s.idType==="Passport" ? "selected":""}>Passport</option>
            <option ${s && s.idType==="Voter ID" ? "selected":""}>Voter ID</option>
          </select>
        </div>
        <div class="field"><label>ID Number</label><input id="stIdNumber" value="${s ? esc(s.idNumber) : ""}"></div>
        <div class="field span-2"><label>Notes (optional)</label><textarea id="stNotes">${s ? esc(s.notes) : ""}</textarea></div>
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveStudent(${s ? s.id : "null"})">${ICONS.check} ${s ? "Save Changes" : "Add Student"}</button>
    </div>
  `, { large:true });
  populateStudentBatches(s ? s.courseId : (prefillCourseId || ""), s ? s.batchId : (prefillBatchId || null));
}
function populateStudentBatches(courseId, selectedBatchId){
  const sel = document.getElementById('stBatch');
  const course = COURSES.find(c=>c.id===parseInt(courseId));
  const batches = course ? (course.batchIds||[]).map(id=>BATCHES[id]).filter(Boolean) : [];
  sel.innerHTML = `<option value="">—</option>` + batches.map(b=>`<option value="${b.id}" ${selectedBatchId===b.id ? "selected":""}>${esc(b.intake)}</option>`).join("");
}
function saveStudent(id){
  const name = document.getElementById('stName').value.trim();
  if(!name){ toast("Student name is required", true); return; }
  const payload = {
    name,
    email: document.getElementById('stEmail').value.trim(),
    phone: document.getElementById('stPhone').value.trim(),
    dob: document.getElementById('stDob').value.trim(),
    gender: document.getElementById('stGender').value,
    courseId: document.getElementById('stCourse').value ? parseInt(document.getElementById('stCourse').value) : null,
    batchId: document.getElementById('stBatch').value ? parseInt(document.getElementById('stBatch').value) : null,
    status: document.getElementById('stStatus').value,
    joined: document.getElementById('stJoined').value.trim() || new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}),
    qualification: document.getElementById('stQualification').value.trim(),
    address: document.getElementById('stAddress').value.trim(),
    city: document.getElementById('stCity').value.trim(),
    state: document.getElementById('stState').value.trim(),
    pincode: document.getElementById('stPincode').value.trim(),
    guardianName: document.getElementById('stGuardianName').value.trim(),
    guardianPhone: document.getElementById('stGuardianPhone').value.trim(),
    idType: document.getElementById('stIdType').value,
    idNumber: document.getElementById('stIdNumber').value.trim(),
    notes: document.getElementById('stNotes').value.trim(),
  };
  if(id){
    Object.assign(STUDENTS.find(x=>x.id===id), payload);
    toast("Student updated");
  } else {
    STUDENTS.push(Object.assign({ id:nextId('student') }, payload));
    toast("Student added");
  }
  closeModal();
  refreshCurrentView();
}
function deleteStudent(id){
  const s = STUDENTS.find(x=>x.id===id);
  if(!s) return;
  confirmAction("Delete Student", `Remove "${s.name}" from the student directory? This cannot be undone.`, ()=>{
    STUDENTS = STUDENTS.filter(x=>x.id!==id);
    toast("Student removed");
    refreshCurrentView();
  });
}
