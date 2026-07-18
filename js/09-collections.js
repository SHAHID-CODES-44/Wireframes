/* ============================================================ COLLECTIONS ============================================================ */
function renderCollectionsList(){
  const rows = COLLECTIONS.map(c=>{
    const cat = CATEGORIES.find(x=>x.id===c.catId);
    return `<tr data-search="${esc((c.title+' '+c.editor).toLowerCase())}" data-status="${esc(c.availability)}" onclick="navigate('collection-view', ${c.id})">
      <td><div class="cell-thumb"><img class="thumb-sq" src="${esc(c.cover)}" alt=""><div><div class="row-title">${esc(c.title)}</div><div class="row-sub">${c.moduleCount} modules · ${cat ? esc(cat.name) : "—"}</div></div></div></td>
      <td><div class="row-title" style="font-weight:700;">${inr(c.price)}</div><div class="row-sub">$${c.priceUsd} USD</div></td>
      <td>${c.bookIds.length} books</td>
      <td>${statusBadge(c.availability)}</td>
      <td>${esc(c.editor)}</td>
      <td class="row-actions">
        <button class="btn btn-ghost btn-sm btn-icon" title="Edit" onclick="event.stopPropagation(); openCollectionModal(${c.id})">${ICONS.edit}</button>
        <button class="btn btn-danger btn-sm btn-icon" title="Delete" onclick="event.stopPropagation(); deleteCollection(${c.id})">${ICONS.trash}</button>
      </td>
    </tr>`;
  }).join("");

  document.getElementById('content').innerHTML = `
    ${crumbs([{label:"Digital Library"},{label:"Collections"}])}
    <div class="page-head">
      <div><h1>Collections</h1><p>Bundled subscription packs grouping related books by topic and audience.</p></div>
      <button class="btn btn-primary" onclick="openCollectionModal()">${ICONS.plus} Add Collection</button>
    </div>
    <div class="toolbar">
      <div class="search-box">${ICONS.search}<input type="text" id="pageSearch" placeholder="Search collections…"></div>
      <button class="filter-chip active" data-status="All">All (${COLLECTIONS.length})</button>
      <button class="filter-chip" data-status="Available">Available</button>
      <button class="filter-chip" data-status="Coming Soon">Coming Soon</button>
    </div>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th>Name</th><th>Price</th><th>Books</th><th>Availability</th><th>Editor</th><th></th></tr></thead>
        <tbody>${rows || `<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:30px;">No collections yet.</td></tr>`}</tbody>
      </table>
    </div>
  `;
  wireListToolbar({ searchInputId:"pageSearch", chipContainerSelector:".filter-chip", rowSelector:"table.data tbody tr[data-search]", tbodySelector:"table.data tbody",
    emptyRowHtml:`<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:30px;">No collections match your search.</td></tr>` });
}

function renderCollectionView(id){
  const c = COLLECTIONS.find(x=>x.id===id);
  if(!c){ renderCollectionsList(); return; }
  const cat = CATEGORIES.find(x=>x.id===c.catId);
  const books = c.bookIds.map(bid=>BOOKS.find(b=>b.id===bid)).filter(Boolean);

  document.getElementById('content').innerHTML = `
    ${crumbs([{label:"Digital Library"},{label:"Collections", view:"collections"},{label:c.title}])}
    <div class="page-head">
      <div>
        <button class="btn btn-ghost btn-sm" onclick="navigate('collections')">${ICONS.back} Back to Collections</button>
        <h1 style="margin-top:14px;">${esc(c.title)}</h1>
        <p>${cat ? esc(cat.name) : "Uncategorised"} · Currently edited by ${esc(c.currentEditor)}</p>
      </div>
      <div style="display:flex; gap:10px;">
        <button class="btn btn-ghost" onclick="openCollectionModal(${c.id})">${ICONS.edit} Edit</button>
        <button class="btn btn-danger" onclick="deleteCollection(${c.id}, true)">${ICONS.trash} Delete</button>
      </div>
    </div>

    <div class="detail-grid">
      <div>
        <img class="detail-cover" src="${esc(c.cover)}" alt="${esc(c.title)} cover">
        <div class="stat-mini-grid">
          <div class="stat-mini"><div class="n">${c.moduleCount}</div><div class="l">Modules</div></div>
          <div class="stat-mini"><div class="n">${books.length}</div><div class="l">Books Included</div></div>
        </div>
        <div class="card" style="margin-top:16px;">
          <div class="card-body">
            <div class="price-now">${inr(c.price)}</div>
            <div class="row-sub" style="margin:4px 0 12px;">$${c.priceUsd} USD (international)</div>
            <button class="btn btn-primary" style="width:100%; justify-content:center;" onclick="openCollectionModal(${c.id})">${ICONS.edit} Edit Pricing</button>
          </div>
        </div>
      </div>

      <div>
        <div class="card">
          <div class="card-body">
            <p style="margin:0 0 18px; color:var(--ink-soft); font-size:14px; line-height:1.65;">${esc(c.about)}</p>
            <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:var(--muted); margin-bottom:8px;">Topics Covered</div>
            <div style="margin-bottom:18px;">${c.topics.map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div>
            <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:var(--muted); margin-bottom:8px;">Audience</div>
            <div>${c.audience.map(a=>`<span class="tag tag-outline">${esc(a)}</span>`).join("")}</div>
          </div>
        </div>

        <div class="card" style="margin-top:18px;">
          <div class="card-head"><h3>Included Books</h3><div class="muted-note">${books.length} titles bundled in this collection</div></div>
          <div class="card-body" style="padding-top:6px;">
            ${books.map(b=>`
              <div class="faculty-row" style="cursor:pointer;" onclick="navigate('book-view', ${b.id})">
                <img class="thumb" src="${esc(b.cover)}" style="width:32px;height:42px;" alt="">
                <div style="flex:1;"><b>${esc(b.title)}</b><span>${esc(b.editor)} · Ed. ${b.edition}</span></div>
                <div class="row-title">${inr(b.price)}</div>
              </div>
            `).join("") || `<p style="color:var(--muted); font-size:13px;">No books assigned yet.</p>`}
          </div>
        </div>
      </div>
    </div>
  `;
}

function openCollectionModal(id){
  const c = id ? COLLECTIONS.find(x=>x.id===id) : null;
  const catOptions = CATEGORIES.map(cat=>`<option value="${cat.id}" ${c && c.catId===cat.id ? "selected":""}>${esc(cat.name)}</option>`).join("");
  const bookChecks = BOOKS.map(b=>`
    <label class="checkbox-row"><input type="checkbox" value="${b.id}" ${c && c.bookIds.includes(b.id) ? "checked":""}> ${esc(b.title)}</label>
  `).join("");

  openModal(`
    <div class="modal-head"><h3>${c ? "Edit Collection" : "Add Collection"}</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="form-grid">
        <div class="field span-2"><label>Title</label><input id="colTitle" value="${c ? esc(c.title) : ""}" placeholder="e.g. GATE CS Complete Pack"></div>
        <div class="field"><label>Editor</label><input id="colEditor" value="${c ? esc(c.editor) : ""}"></div>
        <div class="field"><label>Current Editor</label><input id="colCurEditor" value="${c ? esc(c.currentEditor) : ""}"></div>
        <div class="field"><label>Category</label><select id="colCat">${catOptions}</select></div>
        <div class="field"><label>Availability</label>
          <select id="colAvailability">
            <option ${c && c.availability==="Available" ? "selected":""}>Available</option>
            <option ${c && c.availability==="Coming Soon" ? "selected":""}>Coming Soon</option>
            <option ${c && c.availability==="Archived" ? "selected":""}>Archived</option>
          </select>
        </div>
        <div class="field"><label>Module Count</label><input type="number" id="colModules" value="${c ? c.moduleCount : ""}"></div>
        <div class="field"><label>Price (₹)</label><input type="number" id="colPrice" value="${c ? c.price : ""}"></div>
        <div class="field"><label>Price (USD)</label><input type="number" id="colPriceUsd" value="${c ? c.priceUsd : ""}"></div>
        <div class="field span-2"><label>Cover Image URL</label><input id="colCover" value="${c ? esc(c.cover) : ""}" placeholder="https://…"></div>
        <div class="field span-2"><label>About</label><textarea id="colAbout">${c ? esc(c.about) : ""}</textarea></div>
        <div class="field span-2"><label>Topics (comma separated)</label><input id="colTopics" value="${c ? esc(c.topics.join(", ")) : ""}"></div>
        <div class="field span-2"><label>Audience (comma separated)</label><input id="colAudience" value="${c ? esc(c.audience.join(", ")) : ""}"></div>
        <div class="field span-2"><label>Books Included</label><div class="checkbox-list" id="colBooks">${bookChecks || '<p style="color:var(--muted);font-size:12px;margin:0;">No books available yet.</p>'}</div></div>
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveCollection(${c ? c.id : "null"})">${ICONS.check} ${c ? "Save Changes" : "Create Collection"}</button>
    </div>
  `, { large:true });
}

function saveCollection(id){
  const title = document.getElementById('colTitle').value.trim();
  if(!title){ toast("Collection title is required", true); return; }
  const bookIds = Array.from(document.querySelectorAll('#colBooks input:checked')).map(el=>parseInt(el.value));
  const payload = {
    title,
    editor: document.getElementById('colEditor').value.trim() || "—",
    currentEditor: document.getElementById('colCurEditor').value.trim() || "—",
    catId: parseInt(document.getElementById('colCat').value),
    availability: document.getElementById('colAvailability').value,
    moduleCount: parseInt(document.getElementById('colModules').value) || 0,
    price: parseFloat(document.getElementById('colPrice').value) || 0,
    priceUsd: parseFloat(document.getElementById('colPriceUsd').value) || 0,
    cover: document.getElementById('colCover').value.trim() || "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80&auto=format",
    about: document.getElementById('colAbout').value.trim(),
    topics: document.getElementById('colTopics').value.split(",").map(s=>s.trim()).filter(Boolean),
    audience: document.getElementById('colAudience').value.split(",").map(s=>s.trim()).filter(Boolean),
    bookIds,
  };
  if(id){
    const c = COLLECTIONS.find(x=>x.id===id);
    Object.assign(c, payload);
    toast("Collection updated");
  } else {
    COLLECTIONS.push(Object.assign({ id:nextId('collection') }, payload));
    toast("Collection created");
  }
  closeModal();
  navigate(id ? 'collection-view' : 'collections', id);
}

function deleteCollection(id){
  const c = COLLECTIONS.find(x=>x.id===id);
  if(!c) return;
  confirmAction("Delete Collection", `Delete "${c.title}"? This cannot be undone.`, ()=>{
    COLLECTIONS = COLLECTIONS.filter(x=>x.id!==id);
    toast("Collection deleted");
    navigate('collections');
  });
}
