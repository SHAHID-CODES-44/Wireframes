/* ============================================================ NOTIFICATIONS (frontend wireframe only — mirrors the shared `notifications` DBML schema: iNotificationId, iUid, vType, vMessage, dtCreatedAt, iCreatedBy, cStatus. No real database is connected; NOTIFICATIONS is an in-memory mock array, same pattern as every other module in this app.) ============================================================ */

const NOTIF_TYPES = ["Announcement","Batch Update","Payment","Review Queue","System"];

/* The prototype's login is a free-text demo login (any name works), so there isn't a
   stable "current user id" to filter by. The bell therefore shows the full staff-facing
   inbox — i.e. "notifications addressed to admin/staff users" — rather than trying to
   match the typed-in login name to a specific seeded staff record. */
function staffNotifications(){
  return NOTIFICATIONS.filter(n=>n.recipientType==="staff").sort((a,b)=>b.id-a.id);
}
function unreadStaffCount(){ return staffNotifications().filter(n=>n.status==="U").length; }

function updateNotifBadge(){
  const dot = document.getElementById('notifDot');
  if(!dot) return;
  dot.style.display = unreadStaffCount() > 0 ? "block" : "none";
}

function toggleNotifPanel(e){
  if(e) e.stopPropagation();
  const panel = document.getElementById('notifPanel');
  if(!panel) return;
  const willShow = !panel.classList.contains('show');
  panel.classList.toggle('show', willShow);
  if(willShow) renderNotifPanelContent();
}
/* Close the panel on any click outside it (bell button itself toggles via its own handler). */
document.addEventListener('click', (e)=>{
  const panel = document.getElementById('notifPanel');
  const bell = document.getElementById('notifBellBtn');
  if(panel && panel.classList.contains('show') && !panel.contains(e.target) && e.target !== bell && !bell.contains(e.target)){
    panel.classList.remove('show');
  }
});

function recipientLabel(n){
  if(n.recipientType === "staff"){ const s = STAFF.find(x=>x.id===n.recipientId); return s ? s.name : "Staff member"; }
  const s = STUDENTS.find(x=>x.id===n.recipientId); return s ? s.name : "Student";
}
function senderLabel(n){
  if(!n.createdBy){ return "System"; }
  const s = STAFF.find(x=>x.id===n.createdBy); return s ? s.name : "System";
}
function notifTypeClass(type){
  const map = { "Announcement":"badge-purple","Batch Update":"badge-blue","Payment":"badge-amber","Review Queue":"badge-green","System":"badge-gray" };
  return map[type] || "badge-gray";
}

function renderNotifPanelContent(){
  const panel = document.getElementById('notifPanel');
  const list = staffNotifications();
  panel.innerHTML = `
    <div class="notif-panel-head">
      <div><b>Notifications</b><span class="notif-panel-sub">Inbox for staff &amp; admin users</span></div>
      <button class="btn btn-ghost btn-sm" style="padding:5px 10px;font-size:11px;" onclick="markAllNotifRead(); event.stopPropagation();">Mark all read</button>
    </div>
    <div class="notif-list">
      ${list.length ? list.map(n=>`
        <div class="notif-item ${n.status==='U' ? 'unread':''}" onclick="event.stopPropagation(); markNotifRead(${n.id});">
          ${n.status==='U' ? '<span class="notif-dot-unread"></span>' : '<span class="notif-dot-unread notif-dot-read"></span>'}
          <div class="notif-item-body">
            <div class="notif-item-top"><span class="badge ${notifTypeClass(n.type)}">${esc(n.type)}</span><span class="notif-item-time">${esc(n.createdAt)}</span></div>
            <p class="notif-item-msg">${esc(n.message)}</p>
            <div class="notif-item-meta">To ${esc(recipientLabel(n))} · From ${esc(senderLabel(n))}</div>
          </div>
          <button class="btn btn-ghost btn-sm btn-icon" title="Delete" onclick="event.stopPropagation(); deleteNotification(${n.id});">${ICONS.trash}</button>
        </div>
      `).join("") : `<div class="notif-empty">${ICONS.bell}<p>No notifications yet.</p></div>`}
    </div>
    <div class="notif-panel-foot">
      <button class="btn btn-primary btn-sm" style="width:100%;justify-content:center;" onclick="event.stopPropagation(); openComposeNotificationModal();">${ICONS.plus} Send Notification</button>
    </div>
  `;
}

function markNotifRead(id){
  const n = NOTIFICATIONS.find(x=>x.id===id);
  if(!n || n.status==="R") return;
  n.status = "R";
  renderNotifPanelContent();
  updateNotifBadge();
}
function markAllNotifRead(){
  staffNotifications().forEach(n=>n.status="R");
  renderNotifPanelContent();
  updateNotifBadge();
  toast("All notifications marked as read");
}
function deleteNotification(id){
  NOTIFICATIONS = NOTIFICATIONS.filter(x=>x.id!==id);
  renderNotifPanelContent();
  updateNotifBadge();
  toast("Notification removed");
}

/* ---------- Compose / send a notification (broadcast or hand-picked recipients) ---------- */
let NOTIF_SELECTED = new Set();  // keys like "staff:2" or "student:5", used in "Specific People" mode
let NOTIF_MODE = "specific";     // "specific" | "all-staff" | "all-students" | "all-users"

function allNotifPeople(){
  return [
    ...STAFF.map(s=>({ key:`staff:${s.id}`, name:s.name, tag:"Staff" })),
    ...STUDENTS.map(s=>({ key:`student:${s.id}`, name:s.name, tag:"Student" })),
  ];
}

function openComposeNotificationModal(){
  NOTIF_SELECTED = new Set();
  NOTIF_MODE = "specific";
  openModal(`
    <div class="modal-head"><h3>Send Notification</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="field">
        <label>Send To</label>
        <div class="toolbar" style="margin-bottom:0;" id="ntModeRow">
          <button class="filter-chip active" data-mode="specific" onclick="setNotifRecipientMode('specific')">Specific People</button>
          <button class="filter-chip" data-mode="all-staff" onclick="setNotifRecipientMode('all-staff')">All Staff</button>
          <button class="filter-chip" data-mode="all-students" onclick="setNotifRecipientMode('all-students')">All Students</button>
          <button class="filter-chip" data-mode="all-users" onclick="setNotifRecipientMode('all-users')">All Users</button>
        </div>
      </div>

      <div id="ntSpecificWrap">
        <div class="field">
          <label>Search People</label>
          <input type="text" id="ntSearch" placeholder="Search staff or students by name…" oninput="filterNotifRecipients(this.value)">
        </div>
        <div id="ntChips" class="notif-chips"></div>
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
          <span id="ntSelectedSummary" style="font-size:11.5px; color:var(--muted); font-weight:600;">No recipients selected yet</span>
          <button type="button" class="notif-select-all" onclick="selectAllFilteredNotifRecipients()">Select All</button>
        </div>
        <div class="checkbox-list" id="ntRecipientList">${buildRecipientListHtml("")}</div>
      </div>
      <div id="ntBroadcastNote" class="notif-broadcast-note" style="display:none;"></div>

      <div class="field" style="margin-top:16px;">
        <label>Type</label>
        <select id="ntType">${NOTIF_TYPES.map(t=>`<option>${t}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>Message</label>
        <textarea id="ntMessage" placeholder="e.g. Your batch timing has been updated to 6:00 PM."></textarea>
      </div>
      <p class="hint">Wireframe only — this creates mock records in the prototype's in-memory notification list (one per recipient); it isn't wired to a real database or delivery channel yet.</p>
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveNotification()">${ICONS.check} Send</button>
    </div>
  `, { large:true });
}

function buildRecipientListHtml(filterText){
  const q = (filterText||"").trim().toLowerCase();
  const people = allNotifPeople();
  const filtered = q ? people.filter(p=>p.name.toLowerCase().includes(q)) : people;
  if(!filtered.length) return `<p style="color:var(--muted);font-size:12px;margin:4px;">No matches.</p>`;
  return filtered.map(p=>`
    <label class="checkbox-row">
      <input type="checkbox" value="${p.key}" ${NOTIF_SELECTED.has(p.key) ? "checked":""} onchange="toggleNotifRecipient('${p.key}', this.checked)">
      <span>${esc(p.name)}</span>
      <span class="badge badge-gray" style="margin-left:auto;">${p.tag}</span>
    </label>
  `).join("");
}
function filterNotifRecipients(q){
  document.getElementById('ntRecipientList').innerHTML = buildRecipientListHtml(q);
}
function selectAllFilteredNotifRecipients(){
  const q = document.getElementById('ntSearch').value;
  const people = allNotifPeople();
  const filtered = q ? people.filter(p=>p.name.toLowerCase().includes(q.trim().toLowerCase())) : people;
  filtered.forEach(p=>NOTIF_SELECTED.add(p.key));
  document.getElementById('ntRecipientList').innerHTML = buildRecipientListHtml(q);
  refreshNotifSelectionUI();
}
function toggleNotifRecipient(key, checked){
  if(checked) NOTIF_SELECTED.add(key); else NOTIF_SELECTED.delete(key);
  refreshNotifSelectionUI();
}
function removeNotifRecipient(key){
  NOTIF_SELECTED.delete(key);
  refreshNotifSelectionUI();
  const cb = document.querySelector(`#ntRecipientList input[value="${key}"]`);
  if(cb) cb.checked = false;
}
function refreshNotifSelectionUI(){
  const chipsEl = document.getElementById('ntChips');
  const summaryEl = document.getElementById('ntSelectedSummary');
  if(!chipsEl || !summaryEl) return;
  const people = allNotifPeople();
  const selectedPeople = people.filter(p=>NOTIF_SELECTED.has(p.key));
  chipsEl.innerHTML = selectedPeople.map(p=>`
    <button type="button" class="tag tag-btn" onclick="removeNotifRecipient('${p.key}')">${esc(p.name)} <span class="x">✕</span></button>
  `).join("");
  const n = selectedPeople.length;
  summaryEl.textContent = n ? `${n} recipient${n>1?"s":""} selected` : "No recipients selected yet";
}

function setNotifRecipientMode(mode){
  NOTIF_MODE = mode;
  document.querySelectorAll('#ntModeRow .filter-chip').forEach(btn=>btn.classList.toggle('active', btn.dataset.mode===mode));
  const specificWrap = document.getElementById('ntSpecificWrap');
  const note = document.getElementById('ntBroadcastNote');
  if(mode === "specific"){
    specificWrap.style.display = "";
    note.style.display = "none";
  } else {
    specificWrap.style.display = "none";
    const labels = { "all-staff":`all ${STAFF.length} staff member${STAFF.length===1?"":"s"}`, "all-students":`all ${STUDENTS.length} student${STUDENTS.length===1?"":"s"}`, "all-users":`everyone — ${STAFF.length} staff + ${STUDENTS.length} students` };
    note.textContent = `This will send to ${labels[mode]}.`;
    note.style.display = "block";
  }
}

function resolveNotifRecipients(){
  if(NOTIF_MODE === "all-staff") return STAFF.map(s=>({ recipientType:"staff", recipientId:s.id }));
  if(NOTIF_MODE === "all-students") return STUDENTS.map(s=>({ recipientType:"student", recipientId:s.id }));
  if(NOTIF_MODE === "all-users") return [...STAFF.map(s=>({ recipientType:"staff", recipientId:s.id })), ...STUDENTS.map(s=>({ recipientType:"student", recipientId:s.id }))];
  return Array.from(NOTIF_SELECTED).map(key=>{ const [recipientType, id] = key.split(":"); return { recipientType, recipientId: parseInt(id) }; });
}

function saveNotification(){
  const message = document.getElementById('ntMessage').value.trim();
  if(!message){ toast("Message is required", true); return; }
  const recipients = resolveNotifRecipients();
  if(!recipients.length){ toast("Select at least one recipient", true); return; }

  const type = document.getElementById('ntType').value;
  const senderId = STAFF.find(s=>s.name===SESSION.name);
  /* One row per recipient — matches the schema's single iUid-per-row shape, so a
     broadcast to "All Students" simply fans out into N individual notification records. */
  recipients.forEach(r=>{
    NOTIFICATIONS.push({
      id: nextId('notification'),
      recipientType: r.recipientType,
      recipientId: r.recipientId,
      type,
      message,
      createdAt: "Just now",
      createdBy: senderId ? senderId.id : 0,
      status: "U",
    });
  });
  closeModal();
  toast(`Notification sent to ${recipients.length} recipient${recipients.length>1?"s":""}`);
  updateNotifBadge();
}