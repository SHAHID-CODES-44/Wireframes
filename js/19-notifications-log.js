/* ============================================================ NOTIFICATIONS LOG (Home → Notification Settings) — full log/list view of every notification, mirroring the same list pattern (search, status filter, pagination) used by every other module. Adds bulk select + delete on top, specific to this page. ============================================================ */
let NOTIF_BULK_SELECTED = new Set();

function notifStatusLabel(status){ return status === "U" ? "Unread" : "Read"; }
function notifStatusBadge(status){ return status === "U" ? `<span class="badge badge-amber">Unread</span>` : `<span class="badge badge-gray">Read</span>`; }
function truncateMessage(msg, n){ return msg.length > n ? msg.slice(0, n-1) + "…" : msg; }

function notifLogRowHtml(n, srNo){
  return `<tr>
    <td onclick="event.stopPropagation();"><input type="checkbox" class="row-check" value="${n.id}" ${NOTIF_BULK_SELECTED.has(n.id) ? "checked":""} onchange="toggleNotifBulkSelect(${n.id}, this.checked)"></td>
    <td>${srNo}</td>
    <td>${esc(senderLabel(n))}</td>
    <td>${esc(recipientLabel(n))}</td>
    <td><span class="badge ${notifTypeClass(n.type)}">${esc(n.type)}</span></td>
    <td title="${esc(n.message)}">${esc(truncateMessage(n.message, 46))}</td>
    <td>${esc(n.createdAt)}</td>
    <td>${notifStatusBadge(n.status)}</td>
    <td class="row-actions">
      <button class="btn btn-ghost btn-sm btn-icon" title="Edit" onclick="event.stopPropagation(); openEditNotificationModal(${n.id})">${ICONS.edit}</button>
      <button class="btn btn-danger btn-sm btn-icon" title="Delete" onclick="event.stopPropagation(); deleteNotificationFromLog(${n.id})">${ICONS.trash}</button>
    </td>
  </tr>`;
}

function renderNotificationsList(){
  NOTIF_BULK_SELECTED = new Set();
  document.getElementById('content').innerHTML = `
    ${crumbs([{label:"Home"},{label:"Notification Settings"}])}
    <div class="page-head">
      <div><h1>Notification Settings</h1><p>Full log of every notification sent across the academy — filter, search, and manage in bulk.</p></div>
      <button class="btn btn-primary" onclick="openComposeNotificationModal()">${ICONS.plus} Send Notification</button>
    </div>
    <div class="toolbar">
      <div class="search-box">${ICONS.search}<input type="text" id="pageSearch" placeholder="Search by message, sender or recipient…" oninput="LIST.notifLog.setSearch(this.value)"></div>
      <button class="filter-chip active" data-status="All" onclick="LIST.notifLog.setStatus('All', this)">All (${NOTIFICATIONS.length})</button>
      <button class="filter-chip" data-status="U" onclick="LIST.notifLog.setStatus('U', this)">Unread</button>
      <button class="filter-chip" data-status="R" onclick="LIST.notifLog.setStatus('R', this)">Read</button>
      <div class="spacer"></div>
      <button class="btn btn-danger btn-sm" id="notifBulkDeleteBtn" disabled onclick="bulkDeleteNotifications()">${ICONS.trash} Delete Selected (0)</button>
    </div>
    <div class="table-wrap">
      <table class="data">
        <thead><tr>
          <th><input type="checkbox" class="row-check" id="notifSelectAllHeader" onchange="toggleNotifBulkSelectAll(this.checked)"></th>
          <th>Sr No</th><th>Send By</th><th>Send To</th><th>Type</th><th>Message</th><th>Date &amp; Time</th><th>Status</th><th></th>
        </tr></thead>
        <tbody id="notifLogTbody"></tbody>
      </table>
    </div>
    <div id="notifLogPagination"></div>
  `;
  createListController({
    key:"notifLog", perPage:10, getData:()=>NOTIFICATIONS,
    matchesSearch:(n,q)=>(n.message+' '+senderLabel(n)+' '+recipientLabel(n)).toLowerCase().includes(q),
    matchesStatus:(n,status)=>n.status===status,
    renderRow: notifLogRowHtml,
    tbodySelector:"#notifLogTbody", paginationSelector:"#notifLogPagination",
    emptyHtml:`<tr><td colspan="9" style="text-align:center;color:var(--muted);padding:30px;">No notifications match your search.</td></tr>`,
    afterRender: syncNotifSelectAllHeader,
  });
}

/* ---------- Bulk select + delete (Notifications only) ---------- */
function toggleNotifBulkSelect(id, checked){
  if(checked) NOTIF_BULK_SELECTED.add(id); else NOTIF_BULK_SELECTED.delete(id);
  syncNotifSelectAllHeader();
  updateNotifBulkDeleteButton();
}
function toggleNotifBulkSelectAll(checked){
  document.querySelectorAll('#notifLogTbody .row-check').forEach(cb=>{
    cb.checked = checked;
    const id = parseInt(cb.value);
    if(checked) NOTIF_BULK_SELECTED.add(id); else NOTIF_BULK_SELECTED.delete(id);
  });
  updateNotifBulkDeleteButton();
}
function syncNotifSelectAllHeader(){
  const header = document.getElementById('notifSelectAllHeader');
  if(!header) return;
  const rowChecks = Array.from(document.querySelectorAll('#notifLogTbody .row-check'));
  header.checked = rowChecks.length > 0 && rowChecks.every(cb=>cb.checked);
  updateNotifBulkDeleteButton();
}
function updateNotifBulkDeleteButton(){
  const btn = document.getElementById('notifBulkDeleteBtn');
  if(!btn) return;
  const n = NOTIF_BULK_SELECTED.size;
  btn.textContent = "";
  btn.innerHTML = `${ICONS.trash} Delete Selected (${n})`;
  btn.disabled = n === 0;
}
function bulkDeleteNotifications(){
  const n = NOTIF_BULK_SELECTED.size;
  if(!n) return;
  confirmAction("Delete Notifications", `Delete ${n} selected notification${n>1?"s":""}? This cannot be undone.`, ()=>{
    NOTIFICATIONS = NOTIFICATIONS.filter(x=>!NOTIF_BULK_SELECTED.has(x.id));
    NOTIF_BULK_SELECTED = new Set();
    toast(`${n} notification${n>1?"s":""} deleted`);
    updateNotifBadge();
    renderNotificationsList();
  });
}
function deleteNotificationFromLog(id){
  const n = NOTIFICATIONS.find(x=>x.id===id);
  if(!n) return;
  confirmAction("Delete Notification", "Delete this notification? This cannot be undone.", ()=>{
    NOTIFICATIONS = NOTIFICATIONS.filter(x=>x.id!==id);
    NOTIF_BULK_SELECTED.delete(id);
    toast("Notification deleted");
    updateNotifBadge();
    renderNotificationsList();
  });
}

/* ---------- Edit an existing notification (type / message / status) ---------- */
function openEditNotificationModal(id){
  const n = NOTIFICATIONS.find(x=>x.id===id);
  if(!n) return;
  openModal(`
    <div class="modal-head"><h3>Edit Notification</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="field"><label>Recipient</label><input value="${esc(recipientLabel(n))} · ${n.recipientType==='staff'?'Staff':'Student'}" disabled></div>
      <div class="field"><label>Type</label>
        <select id="ntEditType">${NOTIF_TYPES.map(t=>`<option ${n.type===t?"selected":""}>${t}</option>`).join("")}</select>
      </div>
      <div class="field"><label>Message</label><textarea id="ntEditMessage">${esc(n.message)}</textarea></div>
      <div class="field"><label>Status</label>
        <select id="ntEditStatus">
          <option value="U" ${n.status==="U"?"selected":""}>Unread</option>
          <option value="R" ${n.status==="R"?"selected":""}>Read</option>
        </select>
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveEditedNotification(${id})">${ICONS.check} Save Changes</button>
    </div>
  `);
}
function saveEditedNotification(id){
  const n = NOTIFICATIONS.find(x=>x.id===id);
  if(!n) return;
  const message = document.getElementById('ntEditMessage').value.trim();
  if(!message){ toast("Message is required", true); return; }
  n.type = document.getElementById('ntEditType').value;
  n.message = message;
  n.status = document.getElementById('ntEditStatus').value;
  closeModal();
  toast("Notification updated");
  updateNotifBadge();
  renderNotificationsList();
}
