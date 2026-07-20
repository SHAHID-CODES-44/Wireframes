/* ============================================================ HELPERS ============================================================ */
function inr(n){ return "₹" + Number(n).toLocaleString("en-IN"); }
function initials(name){ return name.split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase(); }
function esc(str){
  const d = document.createElement("div");
  d.textContent = String(str==null ? "" : str);
  return d.innerHTML;
}
function statusBadge(status){
  const map = { "Published":"badge-green","Active":"badge-green","Available":"badge-green","Admissions Open":"badge-green","Approved":"badge-green",
    "Draft":"badge-gray","Coming Soon":"badge-amber","Filling Fast":"badge-amber","Pending":"badge-amber",
    "Archived":"badge-red","Closed":"badge-red","Rejected":"badge-red","Inactive":"badge-red",
    "Graduated":"badge-blue" };
  const cls = map[status] || "badge-gray";
  return `<span class="badge ${cls}">${esc(status)}</span>`;
}
function toast(msg, danger){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.toggle('toast-danger', !!danger);
  t.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>t.classList.remove('show'), 2400);
}
function crumbs(items){
  // items: [{label, view}]  last one is current (no link)
  let html = '<div class="breadcrumb">';
  items.forEach((it,i)=>{
    if(i>0) html += '<span class="sep">/</span>';
    if(i === items.length-1){ html += `<span class="current">${esc(it.label)}</span>`; }
    else{ html += `<a onclick="navigate('${it.view}')">${esc(it.label)}</a>`; }
  });
  html += '</div>';
  return html;
}

/* ============================================================ GENERIC MODAL ============================================================ */
function openModal(innerHtml, opts){
  const backdrop = document.getElementById('modalBackdrop');
  const large = opts && opts.large ? ' modal-lg' : '';
  backdrop.innerHTML = `<div class="modal${large}">${innerHtml}</div>`;
  backdrop.classList.add('show');
}
function closeModal(){ document.getElementById('modalBackdrop').classList.remove('show'); document.getElementById('modalBackdrop').innerHTML=""; }
document.addEventListener('click', (e)=>{ if(e.target.id === 'modalBackdrop'){ closeModal(); } });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape'){ closeModal(); } });

/* Generic "are you sure" confirmation modal used by every delete action. */
function confirmAction(title, message, onConfirm){
  openModal(`
    <div class="modal-head"><h3>${esc(title)}</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body"><p style="margin:0;color:var(--ink-soft);font-size:14px;line-height:1.6;">${esc(message)}</p></div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-danger" id="confirmActionBtn">${ICONS.trash} Delete</button>
    </div>
  `);
  document.getElementById('confirmActionBtn').onclick = ()=>{ closeModal(); onConfirm(); };
}

/* ============================================================ LIST CONTROLLER (search + status filter + real pagination) ============================================================
   Used by every list/table page (Books, Collections, Courses, Category, Students,
   Staff, Reviewers, Notifications). Unlike the old CSS-hide approach, this only ever
   puts `perPage` rows in the DOM — important once a table has hundreds/thousands of
   records, not just the handful in this demo dataset.

   All active controllers are kept on `window.LIST` so inline onclick/oninput
   handlers in the rendered HTML can reach them, e.g. LIST.books.setSearch(this.value).
*/
const LIST = {};

function createListController(opts){
  const perPage = opts.perPage || 10;
  const state = { search:"", status:"All", page:1 };

  function filteredData(){
    const q = state.search.trim().toLowerCase();
    return opts.getData().filter(item=>{
      const matchesSearch = !q || opts.matchesSearch(item, q);
      const matchesStatus = state.status === "All" || opts.matchesStatus(item, state.status);
      return matchesSearch && matchesStatus;
    });
  }

  function apply(){
    const all = filteredData();
    const totalPages = Math.max(1, Math.ceil(all.length / perPage));
    if(state.page > totalPages) state.page = totalPages;
    if(state.page < 1) state.page = 1;
    const start = (state.page - 1) * perPage;
    const pageItems = all.slice(start, start + perPage);

    const tbody = document.querySelector(opts.tbodySelector);
    if(tbody){
      tbody.innerHTML = pageItems.length ? pageItems.map((item,i)=>opts.renderRow(item, start+i+1)).join("") : opts.emptyHtml;
    }
    const paginationEl = document.querySelector(opts.paginationSelector);
    if(paginationEl){
      paginationEl.innerHTML = renderPaginationBar(opts.key, state.page, totalPages, all.length, perPage, start);
    }
    if(opts.afterRender) opts.afterRender();
  }

  const controller = {
    setSearch(q){ state.search = q; state.page = 1; apply(); },
    setStatus(status, btnEl){
      state.status = status; state.page = 1;
      if(btnEl){
        btnEl.parentElement.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active'));
        btnEl.classList.add('active');
      }
      apply();
    },
    goToPage(p){ state.page = p; apply(); },
    refresh(){ apply(); },
    getState(){ return state; },
  };
  LIST[opts.key] = controller;
  apply();
  return controller;
}

/* Windowed page numbers: 1 … 4 5 [6] 7 8 … 42 — instead of hundreds of buttons. */
function buildPageNumbers(current, total){
  const pages = [];
  for(let p=1;p<=total;p++){
    if(p===1 || p===total || (p>=current-1 && p<=current+1)) pages.push(p);
    else if(pages[pages.length-1] !== "…") pages.push("…");
  }
  return pages;
}
function renderPaginationBar(key, current, total, totalItems, perPage, start){
  if(totalItems === 0) return "";
  const rangeStart = totalItems ? start+1 : 0;
  const rangeEnd = Math.min(start+perPage, totalItems);
  return `
    <div class="pagination-bar">
      <span class="pagination-count">${rangeStart}–${rangeEnd} of ${totalItems}</span>
      <div class="pagination-buttons">
        <button class="btn btn-ghost btn-sm" ${current<=1 ? "disabled":""} onclick="LIST.${key}.goToPage(${current-1})">${ICONS.back} Prev</button>
        ${buildPageNumbers(current,total).map(p=> p==="…"
          ? `<span class="pagination-ellipsis">…</span>`
          : `<button class="pagination-page ${p===current ? 'active':''}" onclick="LIST.${key}.goToPage(${p})">${p}</button>`
        ).join("")}
        <button class="btn btn-ghost btn-sm" ${current>=total ? "disabled":""} onclick="LIST.${key}.goToPage(${current+1})">Next ${ICONS.arrow}</button>
      </div>
    </div>
  `;
}
