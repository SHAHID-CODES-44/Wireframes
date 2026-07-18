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

/* ---------- Compose / send a notification to a specific user ---------- */
function openComposeNotificationModal(){
  const staffOptions = STAFF.map(s=>`<option value="staff:${s.id}">${esc(s.name)} · Staff</option>`).join("");
  const studentOptions = STUDENTS.map(s=>`<option value="student:${s.id}">${esc(s.name)} · Student</option>`).join("");
  openModal(`
    <div class="modal-head"><h3>Send Notification</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="field">
        <label>Recipient</label>
        <select id="ntRecipient">
          <optgroup label="Staff">${staffOptions}</optgroup>
          <optgroup label="Students">${studentOptions}</optgroup>
        </select>
      </div>
      <div class="field">
        <label>Type</label>
        <select id="ntType">${NOTIF_TYPES.map(t=>`<option>${t}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>Message</label>
        <textarea id="ntMessage" placeholder="e.g. Your batch timing has been updated to 6:00 PM."></textarea>
      </div>
      <p class="hint">Wireframe only — this creates a mock record in the prototype's in-memory notification list; it isn't wired to a real database or delivery channel yet.</p>
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveNotification()">${ICONS.check} Send</button>
    </div>
  `);
}
function saveNotification(){
  const message = document.getElementById('ntMessage').value.trim();
  if(!message){ toast("Message is required", true); return; }
  const [recipientType, recipientIdStr] = document.getElementById('ntRecipient').value.split(":");
  const senderId = STAFF.find(s=>s.name===SESSION.name);
  NOTIFICATIONS.push({
    id: nextId('notification'),
    recipientType,
    recipientId: parseInt(recipientIdStr),
    type: document.getElementById('ntType').value,
    message,
    createdAt: "Just now",
    createdBy: senderId ? senderId.id : 0,
    status: "U",
  });
  closeModal();
  toast("Notification sent");
  updateNotifBadge();
}
