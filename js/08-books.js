/* ============================================================ BOOKS ============================================================ */
function bookRowHtml(b, srNo){
  const cat = CATEGORIES.find(c=>c.id===b.catId);
  return `<tr onclick="navigate('book-view', ${b.id})">
    <td><div class="cell-thumb"><img class="thumb" src="${esc(b.cover)}" alt=""><div><div class="row-title">${esc(b.title)}</div><div class="row-sub">Ed. ${b.edition} · ${b.pages} pages</div></div></div></td>
    <td><div class="row-title" style="font-weight:700;">${inr(b.price)}</div><div class="row-sub price-strike">${inr(b.mrp)}</div></td>
    <td>${cat ? esc(cat.name) : "—"}</td>
    <td>${statusBadge(b.status)}</td>
    <td>${b.year}</td>
    <td class="row-actions">
      <button class="btn btn-ghost btn-sm btn-icon" title="Edit" onclick="event.stopPropagation(); openBookModal(${b.id})">${ICONS.edit}</button>
      <button class="btn btn-danger btn-sm btn-icon" title="Delete" onclick="event.stopPropagation(); deleteBook(${b.id})">${ICONS.trash}</button>
    </td>
  </tr>`;
}
function renderBooksList(){
  document.getElementById('content').innerHTML = `
    ${crumbs([{label:"Digital Library"},{label:"Books"}])}
    <div class="page-head">
      <div><h1>Books</h1><p>Every published and drafted title in the digital library, with pricing and category assignment.</p></div>
      <button class="btn btn-primary" onclick="openBookModal()">${ICONS.plus} Add Book</button>
    </div>
    <div class="toolbar">
      <div class="search-box">${ICONS.search}<input type="text" id="pageSearch" placeholder="Search books…" oninput="LIST.books.setSearch(this.value)"></div>
      <button class="filter-chip active" data-status="All" onclick="LIST.books.setStatus('All', this)">All (${BOOKS.length})</button>
      <button class="filter-chip" data-status="Published" onclick="LIST.books.setStatus('Published', this)">Published</button>
      <button class="filter-chip" data-status="Draft" onclick="LIST.books.setStatus('Draft', this)">Draft</button>
      <div class="spacer"></div>
      <button class="btn btn-ghost btn-sm" onclick="navigate('books')">${ICONS.refresh} Refresh</button>
    </div>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th>Name</th><th>Price</th><th>Category</th><th>Status</th><th>Publish Year</th><th></th></tr></thead>
        <tbody id="booksTbody"></tbody>
      </table>
    </div>
    <div id="booksPagination"></div>
  `;
  createListController({
    key:"books", perPage:10, getData:()=>BOOKS,
    matchesSearch:(b,q)=>(b.title+' '+b.editor).toLowerCase().includes(q),
    matchesStatus:(b,status)=>b.status===status,
    renderRow: bookRowHtml,
    tbodySelector:"#booksTbody", paginationSelector:"#booksPagination",
    emptyHtml:`<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:30px;">No books match your search.</td></tr>`,
  });
}

function renderBookView(id){
  const b = BOOKS.find(x=>x.id===id);
  if(!b){ renderBooksList(); return; }
  const cat = CATEGORIES.find(c=>c.id===b.catId);
  const author = AUTHORS[b.authorId];
  const collection = COLLECTIONS.find(c=>c.id===b.collectionId);
  const pct = b.totalSubs ? Math.round((b.activeSubs/b.totalSubs)*100) : 0;

  document.getElementById('content').innerHTML = `
    ${crumbs([{label:"Digital Library"},{label:"Books", view:"books"},{label:b.title}])}
    <div class="page-head">
      <div>
        <button class="btn btn-ghost btn-sm" onclick="navigate('books')">${ICONS.back} Back to Books</button>
        <h1 style="margin-top:14px;">${esc(b.title)}</h1>
        <p>${cat ? esc(cat.name) : "Uncategorised"} · ISBN ${esc(b.isbn)}</p>
      </div>
      <div style="display:flex; gap:10px;">
        <button class="btn btn-ghost" onclick="openBookModal(${b.id})">${ICONS.edit} Edit</button>
        <button class="btn btn-danger" onclick="deleteBook(${b.id}, true)">${ICONS.trash} Delete</button>
      </div>
    </div>

    <div class="detail-grid">
      <div>
        <img class="detail-cover" src="${esc(b.cover)}" alt="${esc(b.title)} cover">
        <div class="stat-mini-grid">
          <div class="stat-mini"><div class="n">${b.activeSubs}</div><div class="l">Active Subscriptions</div></div>
          <div class="stat-mini"><div class="n">${b.totalSubs}</div><div class="l">Total Subscriptions</div></div>
        </div>
        <div style="margin-top:14px;">
          <div style="display:flex; justify-content:space-between; font-size:11.5px; color:var(--muted); font-weight:700; margin-bottom:6px;">
            <span>Active ratio</span><span>${pct}%</span>
          </div>
          <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
        </div>
        ${collection ? `<div style="margin-top:16px;"><div class="row-sub" style="margin-bottom:6px; font-weight:700; text-transform:uppercase; font-size:11px; letter-spacing:0.4px;">Part of collection</div><span class="tag" style="cursor:pointer;" onclick="navigate('collection-view', ${collection.id})">${esc(collection.title)}</span></div>` : ""}
      </div>

      <div>
        <div class="card">
          <div class="card-body">
            <p style="margin:0 0 18px; color:var(--ink-soft); font-size:14px; line-height:1.65;">${esc(b.description)}</p>
            <dl class="def-list">
              <div><dt>Editor</dt><dd>${esc(b.editor)}</dd></div>
              <div><dt>Author</dt><dd>${esc(author ? author.name : "—")}</dd></div>
              <div><dt>Author Designation</dt><dd>${esc(author ? author.designation : "—")}</dd></div>
              <div><dt>Qualification</dt><dd>${esc(author ? author.qualification : "—")}</dd></div>
              <div><dt>Edition</dt><dd>Edition ${b.edition}, ${b.year}</dd></div>
              <div><dt>Pages</dt><dd>${b.pages} pages</dd></div>
              <div><dt>ISBN</dt><dd>${esc(b.isbn)}</dd></div>
              <div><dt>Category</dt><dd>${cat ? esc(cat.name) : "—"}</dd></div>
            </dl>
          </div>
        </div>

        <div class="card" style="margin-top:18px;">
          <div class="card-head"><h3>Pricing</h3></div>
          <div class="card-body" style="display:flex; align-items:baseline; gap:14px; flex-wrap:wrap;">
            <span class="price-now">${inr(b.price)}</span>
            <span class="price-strike">${inr(b.mrp)}</span>
            <span class="badge badge-purple">$${b.priceUsd} USD (international)</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function openBookModal(id){
  const b = id ? BOOKS.find(x=>x.id===id) : null;
  const catOptions = CATEGORIES.map(c=>`<option value="${c.id}" ${b && b.catId===c.id ? "selected":""}>${esc(c.name)}</option>`).join("");
  const authorOptions = Object.entries(AUTHORS).map(([aid,a])=>`<option value="${aid}" ${b && String(b.authorId)===aid ? "selected":""}>${esc(a.name)}</option>`).join("");

  openModal(`
    <div class="modal-head"><h3>${b ? "Edit Book" : "Add Book"}</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="form-grid">
        <div class="field span-2"><label>Title</label><input id="bkTitle" value="${b ? esc(b.title) : ""}" placeholder="e.g. Elements of Calculus"></div>
        <div class="field"><label>Editor</label><input id="bkEditor" value="${b ? esc(b.editor) : ""}" placeholder="Editor name"></div>
        <div class="field"><label>Author</label><select id="bkAuthor">${authorOptions}</select></div>
        <div class="field"><label>Category</label><select id="bkCat">${catOptions}</select></div>
        <div class="field"><label>Status</label>
          <select id="bkStatus">
            <option ${b && b.status==="Published" ? "selected":""}>Published</option>
            <option ${b && b.status==="Draft" ? "selected":""}>Draft</option>
            <option ${b && b.status==="Archived" ? "selected":""}>Archived</option>
          </select>
        </div>
        <div class="field"><label>Price (₹)</label><input type="number" id="bkPrice" value="${b ? b.price : ""}"></div>
        <div class="field"><label>MRP (₹)</label><input type="number" id="bkMrp" value="${b ? b.mrp : ""}"></div>
        <div class="field"><label>Price (USD)</label><input type="number" id="bkPriceUsd" value="${b ? b.priceUsd : ""}"></div>
        <div class="field"><label>Publish Year</label><input type="number" id="bkYear" value="${b ? b.year : new Date().getFullYear()}"></div>
        <div class="field"><label>Edition</label><input type="number" id="bkEdition" value="${b ? b.edition : 1}"></div>
        <div class="field"><label>Pages</label><input type="number" id="bkPages" value="${b ? b.pages : ""}"></div>
        <div class="field"><label>ISBN</label><input id="bkIsbn" value="${b ? esc(b.isbn) : ""}"></div>
        <div class="field span-2"><label>Cover Image URL</label><input id="bkCover" value="${b ? esc(b.cover) : ""}" placeholder="https://…"></div>
        <div class="field span-2"><label>Description</label><textarea id="bkDesc">${b ? esc(b.description) : ""}</textarea></div>
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveBook(${b ? b.id : "null"})">${ICONS.check} ${b ? "Save Changes" : "Create Book"}</button>
    </div>
  `, { large:true });
}

function saveBook(id){
  const title = document.getElementById('bkTitle').value.trim();
  if(!title){ toast("Book title is required", true); return; }
  const payload = {
    title,
    editor: document.getElementById('bkEditor').value.trim() || "—",
    authorId: parseInt(document.getElementById('bkAuthor').value),
    catId: parseInt(document.getElementById('bkCat').value),
    status: document.getElementById('bkStatus').value,
    price: parseFloat(document.getElementById('bkPrice').value) || 0,
    mrp: parseFloat(document.getElementById('bkMrp').value) || 0,
    priceUsd: parseFloat(document.getElementById('bkPriceUsd').value) || 0,
    year: parseInt(document.getElementById('bkYear').value) || new Date().getFullYear(),
    edition: parseInt(document.getElementById('bkEdition').value) || 1,
    pages: parseInt(document.getElementById('bkPages').value) || 0,
    isbn: document.getElementById('bkIsbn').value.trim(),
    cover: document.getElementById('bkCover').value.trim() || "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80&auto=format",
    description: document.getElementById('bkDesc').value.trim(),
  };
  if(id){
    const b = BOOKS.find(x=>x.id===id);
    Object.assign(b, payload);
    toast("Book updated");
  } else {
    BOOKS.push(Object.assign({ id:nextId('book'), activeSubs:0, totalSubs:0, collectionId:null }, payload));
    toast("Book created");
  }
  closeModal();
  navigate(id ? 'book-view' : 'books', id);
}

function deleteBook(id, redirect){
  const b = BOOKS.find(x=>x.id===id);
  if(!b) return;
  confirmAction("Delete Book", `Delete "${b.title}"? This cannot be undone.`, ()=>{
    BOOKS = BOOKS.filter(x=>x.id!==id);
    toast("Book deleted");
    navigate('books');
  });
}
