/* ============================================================ SHELL BUILDERS (sidebar / topbar) ============================================================ */
function navItem(view, icon, label, soon){
  return `<button class="nav-item" data-view="${view}" onclick="navigate('${view}')">
    <span class="ic">${icon}</span> ${label} ${soon ? '<span class="nav-badge">SOON</span>' : ''}
  </button>`;
}
function buildSidebar(){
  document.getElementById('sidebar').innerHTML = `
    <div class="sidebar-logo">
      <div class="box"><span>AAL</span></div>
      <div class="lines">Adhikari Academy<br>of Learning</div>
    </div>

    <div class="nav-group">
      <div class="nav-label">Home</div>
      ${navItem('dashboard', ICONS.home, 'Dashboard')}
      ${navItem('cms', ICONS.cms, 'Homepage & Content')}
    </div>

    <div class="nav-group">
      <div class="nav-label">Digital Library</div>
      ${navItem('books', ICONS.book, 'Books')}
      ${navItem('collections', ICONS.layers, 'Collections')}
    </div>

    <div class="nav-group">
      <div class="nav-label">Masters</div>
      ${navItem('category', ICONS.tag, 'Category')}
      ${navItem('collections', ICONS.layers, 'Collections')}
      ${navItem('courses', ICONS.grad, 'Course')}
    </div>

    <div class="nav-group">
      <div class="nav-label">Users</div>
      ${navItem('users', ICONS.users, 'Staff Management')}
    </div>

    <div class="nav-group">
      <div class="nav-label">Students</div>
      ${navItem('students', ICONS.student, 'All Students')}
    </div>

    <div class="nav-group">
      <div class="nav-label">Reviewers</div>
      ${navItem('reviewers', ICONS.check, 'Review Queue')}
    </div>

    <div class="sidebar-foot">
      <div class="sidebar-foot-card">
        <b>v2.0 · Admin Console</b>
        Fully wired prototype — every module supports add, edit and delete.
      </div>
    </div>
  `;
}
function buildTopbar(){
  document.getElementById('topbar').innerHTML = `
    <button class="menu-toggle" onclick="openSidebar()">${ICONS.menu}</button>
    <div class="search-box">${ICONS.search}<input type="text" id="globalSearch" placeholder="Search academy records…" oninput="handleGlobalSearch(this.value)"></div>
    <div class="topbar-right">
      <div class="notif-wrap">
        <button class="icon-btn" title="Notifications" id="notifBellBtn" onclick="toggleNotifPanel(event)">${ICONS.bell}<span class="dot" id="notifDot" style="display:none;"></span></button>
        <div class="notif-panel" id="notifPanel"></div>
      </div>
      <button class="icon-btn" title="Quick add" onclick="openQuickAddMenu()">${ICONS.plus}</button>
      <div class="user-chip">
        <div class="avatar" id="topbarAvatar">A</div>
        <div class="who"><b id="topbarName">Animesh Adhikari</b><span id="topbarRole">Super Admin</span></div>
        <span class="logout-link" onclick="handleLogout()">Logout</span>
      </div>
    </div>
  `;
  updateNotifBadge();
}

/* Quick-add: jumps straight to the "add" modal for the most common record types. */
function openQuickAddMenu(){
  openModal(`
    <div class="modal-head"><h3>Quick Add</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body" style="display:flex;flex-direction:column;gap:8px;">
      <button class="btn btn-ghost" style="justify-content:flex-start;" onclick="closeModal(); navigate('books'); setTimeout(()=>openBookModal(), 60);">${ICONS.book} Add Book</button>
      <button class="btn btn-ghost" style="justify-content:flex-start;" onclick="closeModal(); navigate('collections'); setTimeout(()=>openCollectionModal(), 60);">${ICONS.layers} Add Collection</button>
      <button class="btn btn-ghost" style="justify-content:flex-start;" onclick="closeModal(); navigate('courses'); setTimeout(()=>openCourseModal(), 60);">${ICONS.grad} Add Course</button>
      <button class="btn btn-ghost" style="justify-content:flex-start;" onclick="closeModal(); navigate('students'); setTimeout(()=>openStudentModal(), 60);">${ICONS.student} Add Student</button>
      <button class="btn btn-ghost" style="justify-content:flex-start;" onclick="closeModal(); openComposeNotificationModal();">${ICONS.bell} Send Notification</button>
    </div>
  `);
}

/* Very small global search: on Dashboard it's just a text hint; elsewhere we defer to the page's own filter. */
function handleGlobalSearch(q){
  const pageInput = document.getElementById('pageSearch');
  if(pageInput && pageInput !== document.activeElement){
    pageInput.value = q;
    pageInput.dispatchEvent(new Event('input'));
  }
}

/* ============================================================ SIDEBAR (mobile) ============================================================ */
function openSidebar(){ document.getElementById('sidebar').classList.add('open'); document.getElementById('scrim').classList.add('show'); }
function closeSidebar(){ document.getElementById('sidebar').classList.remove('open'); document.getElementById('scrim').classList.remove('show'); }
