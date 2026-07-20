/* ============================================================ MASTERS: CATEGORY ============================================================ */
function categoryRowHtml(cat, srNo){
  return `<tr>
    <td class="row-title">${esc(cat.name)}</td>
    <td>${cat.books} books</td>
    <td>${statusBadge(cat.status)}</td>
    <td>${cat.rank}</td>
    <td class="row-actions">
      <button class="btn btn-ghost btn-sm btn-icon" title="Edit" onclick="event.stopPropagation(); openCategoryModal(${cat.id})">${ICONS.edit}</button>
      <button class="btn btn-danger btn-sm btn-icon" title="Delete" onclick="event.stopPropagation(); deleteCategory(${cat.id})">${ICONS.trash}</button>
    </td>
  </tr>`;
}
function renderCategoryList(){
  document.getElementById('content').innerHTML = `
    ${crumbs([{label:"Masters"},{label:"Category"}])}
    <div class="page-head">
      <div><h1>Category</h1><p>Master list of subject categories used across books, collections and courses.</p></div>
      <button class="btn btn-primary" onclick="openCategoryModal()">${ICONS.plus} Add Category</button>
    </div>
    <div class="toolbar">
      <div class="search-box">${ICONS.search}<input type="text" id="pageSearch" placeholder="Search categories…" oninput="LIST.category.setSearch(this.value)"></div>
      <button class="filter-chip active" data-status="All" onclick="LIST.category.setStatus('All', this)">All (${CATEGORIES.length})</button>
      <button class="filter-chip" data-status="Active" onclick="LIST.category.setStatus('Active', this)">Active</button>
      <button class="filter-chip" data-status="Draft" onclick="LIST.category.setStatus('Draft', this)">Draft</button>
    </div>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th>Name</th><th>Books Assigned</th><th>Status</th><th>Rank</th><th></th></tr></thead>
        <tbody id="categoryTbody"></tbody>
      </table>
    </div>
    <div id="categoryPagination"></div>
  `;
  createListController({
    key:"category", perPage:10, getData:()=>CATEGORIES,
    matchesSearch:(cat,q)=>cat.name.toLowerCase().includes(q),
    matchesStatus:(cat,status)=>cat.status===status,
    renderRow: categoryRowHtml,
    tbodySelector:"#categoryTbody", paginationSelector:"#categoryPagination",
    emptyHtml:`<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:30px;">No categories match your search.</td></tr>`,
  });
}

function openCategoryModal(id){
  const cat = id ? CATEGORIES.find(c=>c.id===id) : null;
  openModal(`
    <div class="modal-head">
      <h3>${cat ? "Edit Category" : "Add Category"}</h3>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body">
      <div class="field">
        <label>Category Name</label>
        <input type="text" id="modalCatName" value="${cat ? esc(cat.name) : ""}" placeholder="e.g. Computer Networks">
      </div>
      <div class="field">
        <label>Status</label>
        <select id="modalCatStatus">
          <option ${cat && cat.status==="Active" ? "selected" : ""}>Active</option>
          <option ${cat && cat.status==="Draft" ? "selected" : ""}>Draft</option>
          <option ${cat && cat.status==="Archived" ? "selected" : ""}>Archived</option>
        </select>
      </div>
      <div class="field">
        <label>Rank</label>
        <input type="number" id="modalCatRank" value="${cat ? cat.rank : (CATEGORIES.length+1)}" min="1">
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveCategory(${cat ? cat.id : "null"})">${ICONS.check} ${cat ? "Save Changes" : "Save Category"}</button>
    </div>
  `);
}
function saveCategory(editingCategoryId){
  const name = document.getElementById('modalCatName').value.trim();
  const status = document.getElementById('modalCatStatus').value;
  const rank = parseInt(document.getElementById('modalCatRank').value) || 1;
  if(!name){ toast("Category name is required", true); return; }
  if(editingCategoryId){
    const cat = CATEGORIES.find(c=>c.id===editingCategoryId);
    cat.name = name; cat.status = status; cat.rank = rank;
    toast("Category updated");
  } else {
    CATEGORIES.push({id:nextId('category'), name, status, rank, books:0});
    toast("Category created");
  }
  closeModal();
  renderCategoryList();
}
function deleteCategory(id){
  const cat = CATEGORIES.find(c=>c.id===id);
  if(!cat) return;
  if(cat.books > 0){ toast(`Cannot delete — ${cat.books} book(s) still use this category`, true); return; }
  confirmAction("Delete Category", `Delete "${cat.name}"? This cannot be undone.`, ()=>{
    CATEGORIES = CATEGORIES.filter(c=>c.id!==id);
    toast("Category deleted");
    renderCategoryList();
  });
}
