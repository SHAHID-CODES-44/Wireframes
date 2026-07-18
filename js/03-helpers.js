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

/* Simple client-side text search + status filter wiring shared by every list toolbar.
   Call after rendering a `.table-wrap table.data` with rows carrying data-search / data-status attrs. */
function wireListToolbar({ searchInputId, chipContainerSelector, rowSelector, tbodySelector, emptyRowHtml }){
  const input = document.getElementById(searchInputId);
  const chips = chipContainerSelector ? Array.from(document.querySelectorAll(chipContainerSelector)) : [];
  let activeStatus = "All";

  function apply(){
    const q = (input ? input.value : "").trim().toLowerCase();
    const rows = Array.from(document.querySelectorAll(rowSelector));
    let visible = 0;
    rows.forEach(r=>{
      const text = (r.dataset.search || "").toLowerCase();
      const status = r.dataset.status || "";
      const matchesText = !q || text.includes(q);
      const matchesStatus = activeStatus === "All" || status === activeStatus;
      const show = matchesText && matchesStatus;
      r.style.display = show ? "" : "none";
      if(show) visible++;
    });
    const tbody = document.querySelector(tbodySelector);
    let emptyRow = tbody ? tbody.querySelector('.js-empty-row') : null;
    if(tbody && emptyRowHtml){
      if(visible === 0 && !emptyRow){
        tbody.insertAdjacentHTML('beforeend', emptyRowHtml.replace('class="', 'class="js-empty-row '));
      } else if(visible > 0 && emptyRow){
        emptyRow.remove();
      }
    }
  }
  if(input) input.addEventListener('input', apply);
  chips.forEach(chip=>{
    chip.addEventListener('click', ()=>{
      chips.forEach(c=>c.classList.remove('active'));
      chip.classList.add('active');
      activeStatus = chip.dataset.status || "All";
      apply();
    });
  });
}
