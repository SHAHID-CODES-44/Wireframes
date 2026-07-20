/* ============================================================ ROUTER ============================================================ */
let CURRENT_ROUTE = { view:"dashboard", param:undefined };
function navigate(view, param){
  closeSidebar();
  window.scrollTo({top:0, behavior:"instant"});
  currentSidebarView = view;
  CURRENT_ROUTE = { view, param };
  document.querySelectorAll('.nav-item').forEach(el=>{
    el.classList.toggle('active', el.dataset.view === view);
  });
  const renderers = {
    dashboard: renderDashboard,
    books: renderBooksList,
    "book-view": ()=>renderBookView(param),
    collections: renderCollectionsList,
    "collection-view": ()=>renderCollectionView(param),
    courses: renderCoursesList,
    "course-view": ()=>renderCourseView(param),
    "batch-view": ()=>renderBatchView(param),
    category: renderCategoryList,
    users: renderStaffList,
    students: renderStudentsList,
    reviewers: renderReviewQueue,
    cms: renderCmsEditor,
    notifications: renderNotificationsList,
  };
  (renderers[view] || renderDashboard)();
}
/* Re-renders whatever view is currently on screen — used by actions (like deleting a
   student) that can now be triggered from more than one place (Students list OR a
   Batch roster), so we can't hardcode where to land afterwards. */
function refreshCurrentView(){ navigate(CURRENT_ROUTE.view, CURRENT_ROUTE.param); }
