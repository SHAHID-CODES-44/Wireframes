/* ============================================================ CMS: HOMEPAGE & CONTENT ============================================================ */
function renderCmsEditor(){
  const c = CMS_CONTENT;
  document.getElementById('content').innerHTML = `
    ${crumbs([{label:"CMS"},{label:"Homepage & Content"}])}
    <div class="page-head">
      <div><h1>Homepage & Content</h1><p>Control the public homepage hero, stat counters and testimonials without touching code.</p></div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-head"><h3>Hero Banner</h3><div class="muted-note">Shown at the top of the public homepage</div></div>
        <div class="card-body">
          <div class="field"><label>Eyebrow</label><input id="cmsEyebrow" value="${esc(c.heroEyebrow)}"></div>
          <div class="field"><label>Headline</label><input id="cmsTitle" value="${esc(c.heroTitle)}"></div>
          <div class="field"><label>Subtitle</label><textarea id="cmsSubtitle">${esc(c.heroSubtitle)}</textarea></div>
          <div class="field"><label>Hero Image URL</label><input id="cmsImage" value="${esc(c.heroImage)}"></div>
          <button class="btn btn-primary" onclick="saveCmsHero()">${ICONS.check} Save Hero</button>
        </div>
      </div>
      <div class="card">
        <div class="card-head"><h3>Live Preview</h3></div>
        <div class="card-body">
          <div style="border-radius:12px;overflow:hidden;border:1px solid var(--border);">
            <div style="height:120px;background:linear-gradient(160deg,var(--purple-900),var(--purple-800)),url('${esc(c.heroImage)}') center/cover;background-blend-mode:multiply;display:flex;align-items:flex-end;padding:14px;">
              <span style="color:#fff;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;opacity:0.8;" id="cmsPreviewEyebrow">${esc(c.heroEyebrow)}</span>
            </div>
            <div style="padding:16px;">
              <div style="font-family:var(--font-display);font-size:18px;font-weight:700;color:var(--ink);" id="cmsPreviewTitle">${esc(c.heroTitle)}</div>
              <div style="font-size:12.5px;color:var(--muted);margin-top:6px;" id="cmsPreviewSubtitle">${esc(c.heroSubtitle)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:18px;">
      <div class="card-head"><h3>Stat Counters</h3><button class="btn btn-ghost btn-sm" onclick="addCmsStat()">${ICONS.plus} Add Stat</button></div>
      <div class="card-body" id="cmsStatsWrap">
        ${c.stats.map(s=>`
          <div class="stat-editor-row" data-stat-id="${s.id}">
            <input value="${esc(s.label)}" class="stat-label" placeholder="Label" style="padding:8px 10px;border-radius:8px;border:1.5px solid var(--border);font-size:13px;">
            <input value="${esc(s.value)}" class="stat-value" placeholder="Value" style="padding:8px 10px;border-radius:8px;border:1.5px solid var(--border);font-size:13px;max-width:110px;">
            <button class="btn btn-danger btn-sm btn-icon" title="Remove" onclick="removeCmsStat(${s.id})">${ICONS.trash}</button>
          </div>
        `).join("")}
      </div>
      <div class="modal-foot" style="justify-content:flex-start;padding-top:0;">
        <button class="btn btn-primary btn-sm" onclick="saveCmsStats()">${ICONS.check} Save Stats</button>
      </div>
    </div>

    <div class="card" style="margin-top:18px;">
      <div class="card-head"><h3>Testimonials</h3><button class="btn btn-primary btn-sm" onclick="openTestimonialModal()">${ICONS.plus} Add Testimonial</button></div>
      <div class="card-body">
        <div class="grid-2" style="grid-template-columns:1fr 1fr;">
          ${c.testimonials.map(t=>`
            <div class="testimonial-card">
              <div class="testimonial-actions">
                <button class="btn btn-ghost btn-sm btn-icon" title="Edit" onclick="openTestimonialModal(${t.id})">${ICONS.edit}</button>
                <button class="btn btn-danger btn-sm btn-icon" title="Delete" onclick="deleteTestimonial(${t.id})">${ICONS.trash}</button>
              </div>
              <div class="stars">${Array.from({length:t.rating}).map(()=>ICONS.star).join("")}</div>
              <p class="quote">"${esc(t.quote)}"</p>
              <div class="who">
                <div class="avatar-sm">${initials(t.name)}</div>
                <div><b style="font-size:13px;display:block;font-weight:600;">${esc(t.name)}</b><span style="font-size:11.5px;color:var(--muted);">${esc(t.role)}</span></div>
              </div>
            </div>
          `).join("") || `<p style="color:var(--muted);font-size:13px;">No testimonials yet.</p>`}
        </div>
      </div>
    </div>
  `;

  ["cmsEyebrow","cmsTitle","cmsSubtitle","cmsImage"].forEach(id=>{
    document.getElementById(id).addEventListener('input', updateCmsPreview);
  });
}
function updateCmsPreview(){
  document.getElementById('cmsPreviewEyebrow').textContent = document.getElementById('cmsEyebrow').value;
  document.getElementById('cmsPreviewTitle').textContent = document.getElementById('cmsTitle').value;
  document.getElementById('cmsPreviewSubtitle').textContent = document.getElementById('cmsSubtitle').value;
}
function saveCmsHero(){
  CMS_CONTENT.heroEyebrow = document.getElementById('cmsEyebrow').value.trim();
  CMS_CONTENT.heroTitle = document.getElementById('cmsTitle').value.trim();
  CMS_CONTENT.heroSubtitle = document.getElementById('cmsSubtitle').value.trim();
  CMS_CONTENT.heroImage = document.getElementById('cmsImage').value.trim();
  toast("Hero banner saved");
}

function addCmsStat(){
  CMS_CONTENT.stats.push({ id:nextId('stat'), label:"New Stat", value:"0" });
  renderCmsEditor();
}
function removeCmsStat(id){
  CMS_CONTENT.stats = CMS_CONTENT.stats.filter(s=>s.id!==id);
  renderCmsEditor();
  toast("Stat removed");
}
function saveCmsStats(){
  document.querySelectorAll('#cmsStatsWrap .stat-editor-row').forEach(row=>{
    const id = parseInt(row.dataset.statId);
    const stat = CMS_CONTENT.stats.find(s=>s.id===id);
    if(stat){
      stat.label = row.querySelector('.stat-label').value.trim();
      stat.value = row.querySelector('.stat-value').value.trim();
    }
  });
  toast("Stat counters saved");
}

function openTestimonialModal(id){
  const t = id ? CMS_CONTENT.testimonials.find(x=>x.id===id) : null;
  openModal(`
    <div class="modal-head"><h3>${t ? "Edit Testimonial" : "Add Testimonial"}</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="field"><label>Name</label><input id="tmName" value="${t ? esc(t.name) : ""}"></div>
      <div class="field"><label>Role / Description</label><input id="tmRole" value="${t ? esc(t.role) : ""}" placeholder="e.g. GATE CS 2027 Aspirant"></div>
      <div class="field"><label>Quote</label><textarea id="tmQuote">${t ? esc(t.quote) : ""}</textarea></div>
      <div class="field"><label>Rating</label>
        <div class="star-picker" id="tmStars">
          ${[1,2,3,4,5].map(n=>`<button type="button" data-n="${n}" class="${t && n<=t.rating ? 'filled':''}" onclick="setTestimonialStars(${n})">${ICONS.star}</button>`).join("")}
        </div>
        <input type="hidden" id="tmRating" value="${t ? t.rating : 5}">
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveTestimonial(${t ? t.id : "null"})">${ICONS.check} ${t ? "Save Changes" : "Add Testimonial"}</button>
    </div>
  `);
}
function setTestimonialStars(n){
  document.getElementById('tmRating').value = n;
  document.querySelectorAll('#tmStars button').forEach(b=>b.classList.toggle('filled', parseInt(b.dataset.n) <= n));
}
function saveTestimonial(id){
  const name = document.getElementById('tmName').value.trim();
  if(!name){ toast("Name is required", true); return; }
  const payload = {
    name,
    role: document.getElementById('tmRole').value.trim(),
    quote: document.getElementById('tmQuote').value.trim(),
    rating: parseInt(document.getElementById('tmRating').value) || 5,
  };
  if(id){
    Object.assign(CMS_CONTENT.testimonials.find(x=>x.id===id), payload);
    toast("Testimonial updated");
  } else {
    CMS_CONTENT.testimonials.push(Object.assign({ id:nextId('testimonial'), photo:"" }, payload));
    toast("Testimonial added");
  }
  closeModal();
  renderCmsEditor();
}
function deleteTestimonial(id){
  confirmAction("Delete Testimonial", "Remove this testimonial from the homepage?", ()=>{
    CMS_CONTENT.testimonials = CMS_CONTENT.testimonials.filter(x=>x.id!==id);
    toast("Testimonial removed");
    renderCmsEditor();
  });
}
