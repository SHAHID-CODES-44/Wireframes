/* ============================================================ REVIEW QUEUE ============================================================ */
function renderReviewQueue(){
  const pending = REVIEWS.filter(r=>r.status==="Pending").length;
  const rows = REVIEWS.map(r=>`
    <tr data-search="${esc((r.student+' '+r.docType).toLowerCase())}" data-status="${esc(r.status)}">
      <td><div class="row-title">${esc(r.student)}</div><div class="row-sub">${esc(r.context)}</div></td>
      <td>${esc(r.docType)}</td>
      <td>${esc(r.submitted)}</td>
      <td>${statusBadge(r.status)}</td>
      <td class="row-actions">
        ${r.status === "Pending" ? `
          <button class="btn btn-primary btn-sm" title="Approve" onclick="event.stopPropagation(); setReviewStatus(${r.id}, 'Approved')">${ICONS.checkCircle} Approve</button>
          <button class="btn btn-danger btn-sm" title="Reject" onclick="event.stopPropagation(); setReviewStatus(${r.id}, 'Rejected')">${ICONS.xCircle} Reject</button>
        ` : `<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation(); setReviewStatus(${r.id}, 'Pending')">Reopen</button>`}
        <button class="btn btn-ghost btn-sm btn-icon" title="Remove" onclick="event.stopPropagation(); deleteReview(${r.id})">${ICONS.trash}</button>
      </td>
    </tr>
  `).join("");

  document.getElementById('content').innerHTML = `
    ${crumbs([{label:"Reviewers"},{label:"Review Queue"}])}
    <div class="page-head">
      <div><h1>Review Queue</h1><p>Verify student eligibility documents and testimonial submissions before they go live.</p></div>
      <button class="btn btn-primary" onclick="openReviewModal()">${ICONS.plus} Add Item</button>
    </div>
    <div class="toolbar">
      <div class="search-box">${ICONS.search}<input type="text" id="pageSearch" placeholder="Search review queue…"></div>
      <button class="filter-chip active" data-status="All">All (${REVIEWS.length})</button>
      <button class="filter-chip" data-status="Pending">Pending (${pending})</button>
      <button class="filter-chip" data-status="Approved">Approved</button>
      <button class="filter-chip" data-status="Rejected">Rejected</button>
    </div>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th>Student</th><th>Document / Item</th><th>Submitted</th><th>Status</th><th></th></tr></thead>
        <tbody>${rows || `<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:30px;">Nothing in the queue.</td></tr>`}</tbody>
      </table>
    </div>
  `;
  wireListToolbar({ searchInputId:"pageSearch", chipContainerSelector:".filter-chip", rowSelector:"table.data tbody tr[data-search]", tbodySelector:"table.data tbody",
    emptyRowHtml:`<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:30px;">Nothing matches your search.</td></tr>` });
}

function setReviewStatus(id, status){
  const r = REVIEWS.find(x=>x.id===id);
  if(!r) return;
  r.status = status;
  toast(`Marked as ${status}`);
  renderReviewQueue();
}
function openReviewModal(){
  const studentOptions = STUDENTS.map(s=>`<option value="${esc(s.name)}">${esc(s.name)}</option>`).join("");
  openModal(`
    <div class="modal-head"><h3>Add Review Item</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="field"><label>Student</label><select id="rvStudent">${studentOptions}</select></div>
      <div class="field"><label>Document / Item Type</label><input id="rvDocType" placeholder="e.g. ID Proof (Aadhaar)"></div>
      <div class="field"><label>Context</label><input id="rvContext" placeholder="e.g. GATE CS/IT Live Coaching 2027"></div>
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveReview()">${ICONS.check} Add to Queue</button>
    </div>
  `);
}
function saveReview(){
  const student = document.getElementById('rvStudent').value;
  const docType = document.getElementById('rvDocType').value.trim();
  if(!docType){ toast("Document type is required", true); return; }
  REVIEWS.push({ id:nextId('review'), student, docType, context: document.getElementById('rvContext').value.trim(), submitted:"Just now", status:"Pending" });
  closeModal();
  toast("Added to review queue");
  renderReviewQueue();
}
function deleteReview(id){
  confirmAction("Remove Item", "Remove this item from the review queue?", ()=>{
    REVIEWS = REVIEWS.filter(x=>x.id!==id);
    toast("Item removed");
    renderReviewQueue();
  });
}
