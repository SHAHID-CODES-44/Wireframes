/* ============================================================ STAFF / USERS ============================================================ */
function renderStaffList(){
  const rows = STAFF.map(u=>`
    <tr data-search="${esc((u.name+' '+u.email+' '+u.role).toLowerCase())}" data-status="${esc(u.status)}">
      <td><div style="display:flex;align-items:center;gap:10px;"><div class="avatar-sm">${initials(u.name)}</div><div><div class="row-title">${esc(u.name)}</div><div class="row-sub">${esc(u.email)}</div></div></div></td>
      <td><span class="badge badge-purple">${esc(u.role)}</span></td>
      <td>${statusBadge(u.status)}</td>
      <td class="row-actions">
        <button class="btn btn-ghost btn-sm btn-icon" title="Edit" onclick="event.stopPropagation(); openStaffModal(${u.id})">${ICONS.edit}</button>
        <button class="btn btn-danger btn-sm btn-icon" title="Delete" onclick="event.stopPropagation(); deleteStaff(${u.id})">${ICONS.trash}</button>
      </td>
    </tr>
  `).join("");

  document.getElementById('content').innerHTML = `
    ${crumbs([{label:"Users"},{label:"Staff Management"}])}
    <div class="page-head">
      <div><h1>Staff Management</h1><p>Academy staff, coordinators and reviewer accounts with role-based access.</p></div>
      <button class="btn btn-primary" onclick="openStaffModal()">${ICONS.plus} Add Staff</button>
    </div>
    <div class="toolbar">
      <div class="search-box">${ICONS.search}<input type="text" id="pageSearch" placeholder="Search staff…"></div>
      <button class="filter-chip active" data-status="All">All (${STAFF.length})</button>
      <button class="filter-chip" data-status="Active">Active</button>
      <button class="filter-chip" data-status="Inactive">Inactive</button>
    </div>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th>Staff Member</th><th>Role</th><th>Status</th><th></th></tr></thead>
        <tbody>${rows || `<tr><td colspan="4" style="text-align:center;color:var(--muted);padding:30px;">No staff yet.</td></tr>`}</tbody>
      </table>
    </div>
  `;
  wireListToolbar({ searchInputId:"pageSearch", chipContainerSelector:".filter-chip", rowSelector:"table.data tbody tr[data-search]", tbodySelector:"table.data tbody",
    emptyRowHtml:`<tr><td colspan="4" style="text-align:center;color:var(--muted);padding:30px;">No staff match your search.</td></tr>` });
}

function openStaffModal(id){
  const u = id ? STAFF.find(x=>x.id===id) : null;
  openModal(`
    <div class="modal-head"><h3>${u ? "Edit Staff Member" : "Add Staff Member"}</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="field"><label>Full Name</label><input id="sfName" value="${u ? esc(u.name) : ""}"></div>
      <div class="field"><label>Email</label><input type="email" id="sfEmail" value="${u ? esc(u.email) : ""}"></div>
      <div class="field"><label>Role</label>
        <select id="sfRole">
          <option ${u && u.role==="Management" ? "selected":""}>Management</option>
          <option ${u && u.role==="Reviewer" ? "selected":""}>Reviewer</option>
          <option ${u && u.role==="Faculty" ? "selected":""}>Faculty</option>
        </select>
      </div>
      <div class="field"><label>Status</label>
        <select id="sfStatus">
          <option ${u && u.status==="Active" ? "selected":""}>Active</option>
          <option ${u && u.status==="Inactive" ? "selected":""}>Inactive</option>
        </select>
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveStaff(${u ? u.id : "null"})">${ICONS.check} ${u ? "Save Changes" : "Add Staff"}</button>
    </div>
  `);
}
function saveStaff(id){
  const name = document.getElementById('sfName').value.trim();
  if(!name){ toast("Name is required", true); return; }
  const payload = {
    name,
    email: document.getElementById('sfEmail').value.trim(),
    role: document.getElementById('sfRole').value,
    status: document.getElementById('sfStatus').value,
  };
  if(id){
    Object.assign(STAFF.find(x=>x.id===id), payload);
    toast("Staff member updated");
  } else {
    STAFF.push(Object.assign({ id:nextId('staff') }, payload));
    toast("Staff member added");
  }
  closeModal();
  renderStaffList();
}
function deleteStaff(id){
  const u = STAFF.find(x=>x.id===id);
  if(!u) return;
  confirmAction("Remove Staff Member", `Remove "${u.name}" and revoke their access? This cannot be undone.`, ()=>{
    STAFF = STAFF.filter(x=>x.id!==id);
    toast("Staff member removed");
    renderStaffList();
  });
}
