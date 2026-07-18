/* ============================================================ COURSE SCHEDULE (calendar of lectures, per course) ============================================================ */
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let SCHEDULE_VIEW = {}; // courseId -> { year, month } (month is 0-indexed)

function pad2(n){ return String(n).padStart(2,'0'); }
/* Build a local YYYY-MM-DD string WITHOUT going through toISOString (which shifts
   the date for any timezone ahead of UTC, e.g. India IST — a real bug otherwise). */
function toDateStr(d){ return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`; }
function formatDateNice(dateStr){
  const d = new Date(dateStr+'T00:00:00');
  return d.toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'});
}
function truncateText(s,n){ return s.length>n ? s.slice(0,n-1)+"…" : s; }
function platformClass(p){ return p==="Zoom" ? "zoom" : p==="Google Meet" ? "meet" : p==="Offline" ? "offline" : "other"; }
function platformColor(p){ return p==="Zoom" ? "#2d8cff" : p==="Google Meet" ? "#1a9b5c" : p==="Offline" ? "#6b6b6b" : "linear-gradient(135deg,var(--purple-700),var(--purple-900))"; }

function renderCourseSchedule(courseId){
  const wrap = document.getElementById('scheduleWrap-'+courseId);
  if(!wrap) return;
  if(!SCHEDULE_VIEW[courseId]){
    const today = new Date();
    SCHEDULE_VIEW[courseId] = { year: today.getFullYear(), month: today.getMonth() };
  }
  const { year, month } = SCHEDULE_VIEW[courseId];
  wrap.innerHTML = buildScheduleHtml(courseId, year, month);
}

function buildScheduleHtml(courseId, year, month){
  const lecturesThisCourse = LECTURES.filter(l=>l.courseId===courseId);
  const first = new Date(year, month, 1);
  const startOffset = first.getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const todayStr = toDateStr(new Date());

  let cells = "";
  for(let i=0;i<startOffset;i++){ cells += `<div class="cal-cell cal-empty"></div>`; }
  for(let d=1; d<=daysInMonth; d++){
    const dateStr = toDateStr(new Date(year, month, d));
    const dayLectures = lecturesThisCourse.filter(l=>l.date===dateStr).sort((a,b)=>a.start.localeCompare(b.start));
    const isToday = dateStr === todayStr;
    cells += `
      <div class="cal-cell ${dayLectures.length ? 'has-lectures':''} ${isToday?'is-today':''}" onclick="openDayLectures(${courseId}, '${dateStr}')">
        <span class="cal-daynum">${d}</span>
        ${dayLectures.slice(0,2).map(l=>`<div class="cal-chip cal-chip-${platformClass(l.platform)}" title="${esc(l.topic)}">${l.start} · ${esc(truncateText(l.topic,14))}</div>`).join("")}
        ${dayLectures.length>2 ? `<div class="cal-more">+${dayLectures.length-2} more</div>` : ""}
        ${dayLectures.length ? `<div class="cal-dot-mobile">${dayLectures.length} lecture${dayLectures.length>1?'s':''}</div>` : ""}
      </div>`;
  }

  return `
    <div class="cal-toolbar">
      <div class="cal-nav">
        <button class="btn btn-ghost btn-sm btn-icon" onclick="changeScheduleMonth(${courseId}, -1)">${ICONS.back}</button>
        <h3 class="cal-title">${MONTH_NAMES[month]} ${year}</h3>
        <button class="btn btn-ghost btn-sm btn-icon" onclick="changeScheduleMonth(${courseId}, 1)">${ICONS.arrow}</button>
      </div>
      <button class="btn btn-primary btn-sm" onclick="openLectureModal(${courseId})">${ICONS.plus} Schedule Lecture</button>
    </div>
    <div class="cal-grid cal-grid-head">
      ${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>`<div class="cal-headcell">${d}</div>`).join("")}
    </div>
    <div class="cal-grid">${cells}</div>

    <div class="card" style="margin-top:18px;">
      <div class="card-head"><h3>Upcoming & Past Lectures</h3><div class="muted-note">${lecturesThisCourse.length} total scheduled for this course</div></div>
      <div class="card-body">
        ${lecturesThisCourse.length ? lecturesThisCourse.slice().sort((a,b)=>(a.date+a.start).localeCompare(b.date+b.start)).map(l=>lectureRowHtml(courseId,l)).join("")
          : `<p style="color:var(--muted);font-size:13px;margin:0;">No lectures scheduled yet — click "Schedule Lecture" to add one.</p>`}
      </div>
    </div>
  `;
}

function lectureRowHtml(courseId, l){
  const faculty = AUTHORS[l.facultyId];
  const batch = l.batchId ? BATCHES[l.batchId] : null;
  return `
    <div class="faculty-row">
      <div class="fav" style="background:${platformColor(l.platform)}">${ICONS.video}</div>
      <div style="flex:1; min-width:0;">
        <b>${esc(l.topic)}</b>
        <span>${formatDateNice(l.date)} · ${l.start}–${l.end} · ${esc(l.platform)}${batch ? ' · '+esc(batch.intake) : ' · All batches'}${faculty ? ' · '+esc(faculty.name) : ''}</span>
      </div>
      ${statusBadge(l.status)}
      <div class="fr-actions">
        ${l.link ? `<a class="btn btn-ghost btn-sm btn-icon" title="Join link" href="${esc(l.link)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${ICONS.link}</a>` : ""}
        <button class="btn btn-ghost btn-sm btn-icon" title="Edit" onclick="openLectureModal(${courseId}, ${l.id})">${ICONS.edit}</button>
        <button class="btn btn-danger btn-sm btn-icon" title="Delete" onclick="deleteLecture(${courseId}, ${l.id})">${ICONS.trash}</button>
      </div>
    </div>
  `;
}

function changeScheduleMonth(courseId, delta){
  const v = SCHEDULE_VIEW[courseId];
  let m = v.month + delta, y = v.year;
  if(m < 0){ m = 11; y--; }
  if(m > 11){ m = 0; y++; }
  SCHEDULE_VIEW[courseId] = { year:y, month:m };
  renderCourseSchedule(courseId);
}

function openDayLectures(courseId, dateStr){
  const dayLectures = LECTURES.filter(l=>l.courseId===courseId && l.date===dateStr).sort((a,b)=>a.start.localeCompare(b.start));
  openModal(`
    <div class="modal-head"><h3>${formatDateNice(dateStr)}</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      ${dayLectures.length ? dayLectures.map(l=>lectureRowHtml(courseId,l)).join("") : `<p style="color:var(--muted);font-size:13px;margin:0;">No lectures scheduled on this day yet.</p>`}
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Close</button>
      <button class="btn btn-primary" onclick="closeModal(); openLectureModal(${courseId}, null, '${dateStr}')">${ICONS.plus} Schedule Lecture on This Day</button>
    </div>
  `, { large:true });
}

/* ---------- Add / Edit Lecture ---------- */
function openLectureModal(courseId, id, prefillDate){
  const l = id ? LECTURES.find(x=>x.id===id && x.courseId===courseId) : null;
  const course = COURSES.find(c=>c.id===courseId);
  const batchOptions = `<option value="">All batches</option>` + (course.batchIds||[]).map(bid=>{
    const b = BATCHES[bid]; return b ? `<option value="${bid}" ${l && l.batchId===bid ? "selected":""}>${esc(b.intake)}</option>` : "";
  }).join("");
  const facultyOptions = Object.entries(AUTHORS).map(([aid,a])=>`<option value="${aid}" ${l && String(l.facultyId)===aid ? "selected":""}>${esc(a.name)}</option>`).join("");
  const dateVal = l ? l.date : (prefillDate || toDateStr(new Date()));
  const idArg = id ? id : "null";

  openModal(`
    <div class="modal-head"><h3>${l ? "Edit Lecture" : "Schedule Lecture"}</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="form-grid">
        <div class="field span-2"><label>Topic</label><input id="lcTopic" value="${l ? esc(l.topic) : ""}" placeholder="e.g. Engineering Mathematics — Limits & Continuity"></div>
        <div class="field"><label>Batch</label><select id="lcBatch">${batchOptions}</select></div>
        <div class="field"><label>Faculty</label><select id="lcFaculty" onchange="checkLectureOverlap(${courseId}, ${idArg})">${facultyOptions}</select></div>
        <div class="field"><label>Date</label><input type="date" id="lcDate" value="${dateVal}" oninput="checkLectureOverlap(${courseId}, ${idArg})"></div>
        <div class="field"><label>Platform</label>
          <select id="lcPlatform">
            <option ${l && l.platform==="Google Meet" ? "selected":""}>Google Meet</option>
            <option ${l && l.platform==="Zoom" ? "selected":""}>Zoom</option>
            <option ${l && l.platform==="Offline" ? "selected":""}>Offline</option>
            <option ${l && l.platform==="YouTube Live" ? "selected":""}>YouTube Live</option>
          </select>
        </div>
        <div class="field"><label>Start Time</label><input type="time" id="lcStart" value="${l ? l.start : "09:00"}" oninput="checkLectureOverlap(${courseId}, ${idArg})"></div>
        <div class="field"><label>End Time</label><input type="time" id="lcEnd" value="${l ? l.end : "10:30"}" oninput="checkLectureOverlap(${courseId}, ${idArg})"></div>
        <div class="field span-2"><label>Meeting Link</label><input id="lcLink" value="${l ? esc(l.link) : ""}" placeholder="https://meet.google.com/… or https://zoom.us/j/…"></div>
        <div class="field"><label>Status</label>
          <select id="lcStatus">
            <option ${l && l.status==="Scheduled" ? "selected":""}>Scheduled</option>
            <option ${l && l.status==="Completed" ? "selected":""}>Completed</option>
            <option ${l && l.status==="Cancelled" ? "selected":""}>Cancelled</option>
          </select>
        </div>
        <div class="field span-2"><label>Notes (optional)</label><textarea id="lcNotes">${l ? esc(l.notes) : ""}</textarea></div>
      </div>
      <div id="lcOverlapWarning"></div>
    </div>
    <div class="modal-foot">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="lcSaveBtn" onclick="saveLecture(${courseId}, ${idArg})">${ICONS.check} ${l ? "Save Changes" : "Schedule Lecture"}</button>
    </div>
  `, { large:true });
  checkLectureOverlap(courseId, id || null);
}

/* Live overlap check: same-course clash blocks saving; same-faculty-different-course
   clash is a soft caution (some academies double-book faculty on purpose for backup slots). */
function checkLectureOverlap(courseId, excludeId){
  const date = document.getElementById('lcDate').value;
  const start = document.getElementById('lcStart').value;
  const end = document.getElementById('lcEnd').value;
  const facultyId = parseInt(document.getElementById('lcFaculty').value);
  const warnEl = document.getElementById('lcOverlapWarning');
  const saveBtn = document.getElementById('lcSaveBtn');

  if(start && end && start >= end){
    warnEl.innerHTML = `<div class="overlap-warning overlap-danger">${ICONS.xCircle} End time must be after start time.</div>`;
    saveBtn.disabled = true;
    return;
  }
  if(!date || !start || !end){ warnEl.innerHTML = ""; saveBtn.disabled = false; return; }

  const conflicts = LECTURES.filter(l=> l.id!==excludeId && l.date===date && start < l.end && end > l.start);
  const sameCourse = conflicts.filter(l=>l.courseId===courseId);
  const sameFaculty = conflicts.filter(l=>l.facultyId===facultyId && l.courseId!==courseId);

  if(sameCourse.length){
    const c = sameCourse[0];
    warnEl.innerHTML = `<div class="overlap-warning overlap-danger">${ICONS.xCircle} Clashes with "${esc(c.topic)}" (${c.start}–${c.end}) already scheduled for this course on this day.</div>`;
    saveBtn.disabled = true;
  } else if(sameFaculty.length){
    const f = AUTHORS[facultyId];
    const otherCourse = COURSES.find(x=>x.id===sameFaculty[0].courseId);
    warnEl.innerHTML = `<div class="overlap-warning overlap-caution">${ICONS.pulse} ${f ? esc(f.name) : "This faculty member"} is already teaching "${esc(otherCourse ? otherCourse.title : "another course")}" at an overlapping time. You can still save, but double-check availability.</div>`;
    saveBtn.disabled = false;
  } else {
    warnEl.innerHTML = "";
    saveBtn.disabled = false;
  }
}

function saveLecture(courseId, id){
  const topic = document.getElementById('lcTopic').value.trim();
  if(!topic){ toast("Lecture topic is required", true); return; }
  const start = document.getElementById('lcStart').value;
  const end = document.getElementById('lcEnd').value;
  const date = document.getElementById('lcDate').value;
  if(!date){ toast("Date is required", true); return; }
  if(!start || !end || start >= end){ toast("End time must be after start time", true); return; }

  /* Hard block on same-course overlap, checked again at save time (defence in depth
     beyond the live UI check above). */
  const clash = LECTURES.find(l=> l.id!==id && l.courseId===courseId && l.date===date && start < l.end && end > l.start);
  if(clash){ toast("This time overlaps another lecture already scheduled for this course", true); return; }

  const payload = {
    courseId,
    topic,
    batchId: document.getElementById('lcBatch').value ? parseInt(document.getElementById('lcBatch').value) : null,
    facultyId: parseInt(document.getElementById('lcFaculty').value),
    date, start, end,
    platform: document.getElementById('lcPlatform').value,
    link: document.getElementById('lcLink').value.trim(),
    status: document.getElementById('lcStatus').value,
    notes: document.getElementById('lcNotes').value.trim(),
  };

  if(id){
    Object.assign(LECTURES.find(x=>x.id===id), payload);
    toast("Lecture updated");
  } else {
    LECTURES.push(Object.assign({ id:nextId('lecture') }, payload));
    toast("Lecture scheduled");
  }
  closeModal();
  SCHEDULE_VIEW[courseId] = { year: parseInt(date.slice(0,4)), month: parseInt(date.slice(5,7)) - 1 };
  renderCourseSchedule(courseId);
}

function deleteLecture(courseId, id){
  const l = LECTURES.find(x=>x.id===id);
  if(!l) return;
  confirmAction("Delete Lecture", `Remove "${l.topic}" from the schedule? This cannot be undone.`, ()=>{
    LECTURES = LECTURES.filter(x=>x.id!==id);
    toast("Lecture removed");
    renderCourseSchedule(courseId);
  });
}
