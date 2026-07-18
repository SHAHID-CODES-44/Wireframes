/* ============================================================
   MOCK DATA STORE
   Everything here is an in-memory mutable store so Add/Edit/Delete
   across the app actually work. In a real build these would be
   API-backed; here they are module-level `let`/`const` collections.
   ============================================================ */

const AUTHORS = {
  1:{name:"Dr. R. K. Menon", designation:"HOD, Computer Science", qualification:"Ph.D. Algorithms, IIT Bombay"},
  2:{name:"Prof. Anjali Deshpande", designation:"Faculty, Discrete Mathematics", qualification:"M.Tech, IIT Kharagpur"},
  3:{name:"Dr. Suhas Kelkar", designation:"Visiting Faculty", qualification:"Ph.D. Theoretical CS, IISc Bangalore"},
  4:{name:"Prof. Meera Iyer", designation:"Senior Faculty, Systems", qualification:"M.S. Computer Engineering, BITS Pilani"},
};

let CATEGORIES = [
  {id:1, name:"Mathematics", status:"Active", rank:1, books:3},
  {id:2, name:"Theory of Computation", status:"Active", rank:2, books:2},
  {id:3, name:"Computer Networks", status:"Active", rank:3, books:1},
  {id:4, name:"Operating Systems", status:"Active", rank:4, books:1},
  {id:5, name:"Data Structures & Algorithms", status:"Active", rank:5, books:1},
  {id:6, name:"Digital Electronics", status:"Draft", rank:6, books:0},
];

let BOOKS = [
  {
    id:1, title:"Elements of Calculus", editor:"Dr. R. K. Menon", authorId:1, catId:1,
    price:449, mrp:699, priceUsd:14, year:2025, edition:4, isbn:"978-93-5457-201-4", pages:342,
    status:"Published", cover:"https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80&auto=format",
    description:"A rigorous, exam-focused treatment of single and multivariable calculus built specifically for the GATE CS/IT syllabus, with worked previous-year problems after every chapter.",
    activeSubs:412, totalSubs:1180, collectionId:1
  },
  {
    id:2, title:"Elements of Graph Theory", editor:"Prof. Anjali Deshpande", authorId:2, catId:1,
    price:399, mrp:599, priceUsd:12, year:2024, edition:3, isbn:"978-93-5457-202-1", pages:288,
    status:"Published", cover:"https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&q=80&auto=format",
    description:"Covers trees, connectivity, planarity, colouring and matching with an emphasis on the proof techniques most frequently tested in competitive computer science examinations.",
    activeSubs:365, totalSubs:940, collectionId:1
  },
  {
    id:3, title:"Theory of Computation Simplified", editor:"Dr. Suhas Kelkar", authorId:3, catId:2,
    price:479, mrp:749, priceUsd:15, year:2025, edition:2, isbn:"978-93-5457-203-8", pages:356,
    status:"Published", cover:"https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80&auto=format",
    description:"Automata, formal languages, computability and complexity explained through diagrams and solved derivations rather than dense notation, built for quick revision.",
    activeSubs:298, totalSubs:820, collectionId:2
  },
  {
    id:4, title:"Discrete Mathematics for GATE", editor:"Prof. Anjali Deshpande", authorId:2, catId:2,
    price:429, mrp:649, priceUsd:13, year:2023, edition:5, isbn:"978-93-5457-204-5", pages:410,
    status:"Published", cover:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80&auto=format",
    description:"Set theory, relations, propositional logic, combinatorics and group theory — the fifth edition adds 120 new previous-year questions with annotated solutions.",
    activeSubs:501, totalSubs:1340, collectionId:2
  },
  {
    id:5, title:"Operating Systems: Concepts & Practice", editor:"Prof. Meera Iyer", authorId:4, catId:4,
    price:459, mrp:699, priceUsd:14, year:2024, edition:2, isbn:"978-93-5457-205-2", pages:378,
    status:"Draft", cover:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80&auto=format",
    description:"Process scheduling, memory management, deadlocks and file systems presented alongside real kernel case studies from Linux and Android.",
    activeSubs:0, totalSubs:0, collectionId:3
  },
];

let COLLECTIONS = [
  {
    id:1, title:"GATE CS Complete Pack", editor:"Dr. R. K. Menon", currentEditor:"Dr. R. K. Menon",
    catId:1, moduleCount:12, availability:"Available", price:1499, priceUsd:38,
    about:"A single bundled subscription covering the full mathematics and theory backbone required for GATE CS/IT, refreshed every admission cycle with new previous-year sets.",
    topics:["Calculus & Linear Algebra","Graph Theory","Probability & Statistics","Discrete Structures"],
    audience:["B.Tech Computer Science","GATE CS/IT Aspirants","M.Sc. Computer Applications"],
    bookIds:[1,2], cover:"https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80&auto=format"
  },
  {
    id:2, title:"Theory & Discrete Foundations", editor:"Prof. Anjali Deshpande", currentEditor:"Dr. Suhas Kelkar",
    catId:2, moduleCount:8, availability:"Available", price:1199, priceUsd:30,
    about:"Builds the formal-methods foundation of a CS degree — automata, logic and discrete mathematics — with cross-referenced problem banks between both books.",
    topics:["Automata & Formal Languages","Computability","Propositional & Predicate Logic","Combinatorics"],
    audience:["GATE CS/IT Aspirants","B.Sc. Computer Science","Faculty Reference"],
    bookIds:[3,4], cover:"https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=500&q=80&auto=format"
  },
  {
    id:3, title:"Systems & Core Engineering", editor:"Prof. Meera Iyer", currentEditor:"Prof. Meera Iyer",
    catId:4, moduleCount:6, availability:"Coming Soon", price:999, priceUsd:25,
    about:"A systems-focused pack pairing operating systems fundamentals with upcoming modules on computer networks and computer organisation.",
    topics:["Process & Memory Management","File Systems","Deadlocks & Concurrency"],
    audience:["B.Tech Computer Science","Diploma in Computer Engineering"],
    bookIds:[5], cover:"https://images.unsplash.com/photo-1516382799247-87df95d790b7?w=500&q=80&auto=format"
  },
];

let COURSES = [
  {
    id:1, type:"Coaching", title:"GATE CS/IT Live Coaching 2027", mode:"Online", status:"Active",
    coordinator:"Dr. R. K. Menon", nextIntake:"Jan 2027", durationLabel:"11 months", totalLectures:220, lecturesPerWeek:6,
    eligibility:"Open to B.Tech/B.E. final year students and graduates in Computer Science, IT or a closely related discipline.",
    objective:"Deliver complete GATE CS/IT syllabus coverage through structured live lectures, weekly tests and mentorship.",
    outcome:"Students leave with full syllabus coverage, 40+ mock tests attempted, and a personalised weak-area revision plan.",
    topics:[
      {title:"Engineering Mathematics", book:"Elements of Calculus", lectures:28},
      {title:"Discrete Mathematics", book:"Discrete Mathematics for GATE", lectures:24},
      {title:"Theory of Computation", book:"Theory of Computation Simplified", lectures:22},
      {title:"Operating Systems", book:"Operating Systems: Concepts & Practice", lectures:26},
    ],
    faculty:[1,2,3,4],
    payplans:[
      {name:"Single Payment", installments:[{n:1, amount:42000, due:"At enrolment"}]},
      {name:"Two Installments", installments:[{n:1, amount:24000, due:"At enrolment"},{n:2, amount:20000, due:"Before Lecture 31"}]},
    ],
    batchIds:[1,2]
  },
  {
    id:2, type:"Certificate", title:"Certificate in Data Structures & Algorithms", mode:"Hybrid", status:"Active",
    coordinator:"Prof. Anjali Deshpande", nextIntake:"Sep 2026", durationLabel:"14 weeks", totalLectures:42, lecturesPerWeek:3,
    eligibility:"Any student who has completed at least one semester of a programming fundamentals course.",
    objective:"Build strong problem-solving fundamentals across arrays, trees, graphs and dynamic programming for placements and GATE.",
    outcome:"Graduates can independently solve medium-difficulty DSA problems and are placement-interview ready.",
    topics:[
      {title:"Arrays, Strings & Recursion", book:"Elements of Graph Theory", lectures:12},
      {title:"Trees & Graphs", book:"Elements of Graph Theory", lectures:14},
      {title:"Dynamic Programming", book:"Discrete Mathematics for GATE", lectures:16},
    ],
    faculty:[2,3],
    payplans:[
      {name:"Single Payment", installments:[{n:1, amount:15000, due:"At enrolment"}]},
      {name:"Three Installments", installments:[{n:1, amount:6000, due:"At enrolment"},{n:2, amount:5000, due:"Week 5"},{n:3, amount:4000, due:"Week 10"}]},
    ],
    batchIds:[3]
  },
  {
    id:3, type:"Diploma", title:"Diploma in Computer Science Fundamentals", mode:"Offline", status:"Draft",
    coordinator:"Prof. Meera Iyer", nextIntake:"Jun 2027", durationLabel:"6 months", totalLectures:96, lecturesPerWeek:4,
    eligibility:"Class XII pass with Mathematics, or equivalent, seeking a foundational computer science diploma.",
    objective:"Provide a structured entry path into computer science for students outside a formal engineering programme.",
    outcome:"Students complete the diploma with working knowledge of programming, systems and core mathematics.",
    topics:[
      {title:"Programming Fundamentals", book:"—", lectures:30},
      {title:"Operating Systems Basics", book:"Operating Systems: Concepts & Practice", lectures:26},
      {title:"Mathematics for Computing", book:"Elements of Calculus", lectures:40},
    ],
    faculty:[4,1],
    payplans:[{name:"Single Payment", installments:[{n:1, amount:28000, due:"At enrolment"}]}],
    batchIds:[]
  },
];

let BATCHES = {
  1:{id:1, courseId:1, intake:"Jan 2027 · Morning Batch", start:"05 Jan 2027", end:"30 Nov 2027", seatsTotal:150, seatsFilled:112, price:42000, earlyBird:37000, status:"Admissions Open", enrolled:112, lecturesHeld:18, attendanceAvg:88},
  2:{id:2, courseId:1, intake:"Jan 2027 · Evening Batch", start:"06 Jan 2027", end:"01 Dec 2027", seatsTotal:150, seatsFilled:96, price:42000, earlyBird:37000, status:"Admissions Open", enrolled:96, lecturesHeld:17, attendanceAvg:84},
  3:{id:3, courseId:2, intake:"Sep 2026 · Weekend Batch", start:"12 Sep 2026", end:"20 Dec 2026", seatsTotal:60, seatsFilled:54, price:15000, earlyBird:12500, status:"Filling Fast", enrolled:54, lecturesHeld:8, attendanceAvg:91},
};

let STUDENTS = [
  {id:1, name:"Priya Nair", email:"priya.nair@example.com", phone:"+91 98200 11223", courseId:1, batchId:1, status:"Active", joined:"05 Jan 2027",
   dob:"14 Mar 2004", gender:"Female", address:"12 Fontainhas Lane", city:"Panaji", state:"Goa", pincode:"403001",
   guardianName:"Ramesh Nair", guardianPhone:"+91 98200 99887", qualification:"B.Tech Computer Science (Pursuing)",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-4821", notes:"Scholarship candidate — merit list."},
  {id:2, name:"Rahul Fernandes", email:"rahul.f@example.com", phone:"+91 98330 44556", courseId:1, batchId:2, status:"Active", joined:"06 Jan 2027",
   dob:"02 Jul 2003", gender:"Male", address:"45 Miramar Road", city:"Panaji", state:"Goa", pincode:"403002",
   guardianName:"Cyril Fernandes", guardianPhone:"+91 98330 11009", qualification:"B.E. Information Technology (Pursuing)",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-7734", notes:""},
  {id:3, name:"Sohel Ansari", email:"sohel.ansari@example.com", phone:"+91 90040 77889", courseId:2, batchId:3, status:"Active", joined:"12 Sep 2026",
   dob:"20 Nov 2004", gender:"Male", address:"9 Margao Market Road", city:"Margao", state:"Goa", pincode:"403601",
   guardianName:"Farooq Ansari", guardianPhone:"+91 90040 22331", qualification:"B.Sc. Computer Science",
   idType:"PAN", idNumber:"BXPAS1234K", notes:""},
  {id:4, name:"Divya Kulkarni", email:"divya.k@example.com", phone:"+91 99870 22110", courseId:2, batchId:3, status:"Pending", joined:"14 Sep 2026",
   dob:"08 Feb 2005", gender:"Female", address:"22 Ponda Main Road", city:"Ponda", state:"Goa", pincode:"403401",
   guardianName:"Suresh Kulkarni", guardianPhone:"+91 99870 44556", qualification:"B.C.A.",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-3390", notes:"ID proof under reviewer verification."},
  {id:5, name:"Aman Gupta", email:"aman.gupta@example.com", phone:"+91 98450 66778", courseId:1, batchId:1, status:"Graduated", joined:"03 Jan 2025",
   dob:"17 May 2002", gender:"Male", address:"5 Vasco Station Road", city:"Vasco da Gama", state:"Goa", pincode:"403802",
   guardianName:"Rajesh Gupta", guardianPhone:"+91 98450 11223", qualification:"B.Tech Computer Science",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-5567", notes:"Topper — 2026 batch."},
];

/* Lecture Schedule — used by the "Schedule" tab inside each Course.
   date is stored as "YYYY-MM-DD" and times as 24h "HH:MM" so they sort/compare cleanly. */
let LECTURES = [
  {id:1, courseId:1, batchId:1, topic:"Engineering Mathematics — Limits & Continuity", date:"2027-01-05", start:"09:00", end:"10:30", platform:"Google Meet", link:"https://meet.google.com/abc-defg-hij", facultyId:1, notes:"", status:"Scheduled"},
  {id:2, courseId:1, batchId:2, topic:"Engineering Mathematics — Limits & Continuity", date:"2027-01-06", start:"18:00", end:"19:30", platform:"Google Meet", link:"https://meet.google.com/abc-defg-hij", facultyId:1, notes:"", status:"Scheduled"},
  {id:3, courseId:1, batchId:1, topic:"Discrete Mathematics — Set Theory", date:"2027-01-08", start:"09:00", end:"10:30", platform:"Zoom", link:"https://zoom.us/j/1234567890", facultyId:2, notes:"", status:"Scheduled"},
  {id:4, courseId:2, batchId:3, topic:"Arrays & Recursion — Basics", date:"2026-09-12", start:"11:00", end:"12:30", platform:"Zoom", link:"https://zoom.us/j/9876543210", facultyId:2, notes:"Bring previous-year problem set", status:"Completed"},
];

/* Notifications — frontend wireframe only, mirrors the `notifications` DBML schema shared
   by the team (iNotificationId, iUid, vType, vMessage, dtCreatedAt, iCreatedBy, cStatus).
   Field names below are the JS-friendly equivalents; nothing here talks to a real database.
   cStatus follows the schema's single-char convention: 'U' = Unread, 'R' = Read. */
let NOTIFICATIONS = [
  {id:1, recipientType:"staff", recipientId:2, type:"Batch Update", message:"You've been assigned as faculty for GATE CS/IT Live Coaching 2027 — Morning Batch.", createdAt:"Today, 9:12 AM", createdBy:1, status:"U"},
  {id:2, recipientType:"staff", recipientId:1, type:"Review Queue", message:"2 new documents are pending your approval in the Review Queue.", createdAt:"Today, 8:40 AM", createdBy:0, status:"U"},
  {id:3, recipientType:"student", recipientId:1, type:"Batch Update", message:"Your batch schedule for GATE CS/IT Live Coaching 2027 has been updated.", createdAt:"Yesterday, 6:15 PM", createdBy:1, status:"R"},
  {id:4, recipientType:"staff", recipientId:1, type:"System", message:"Weekly backup completed successfully.", createdAt:"2 days ago", createdBy:0, status:"R"},
  {id:5, recipientType:"student", recipientId:3, type:"Payment", message:"Your next installment for Certificate in Data Structures & Algorithms is due on Week 10.", createdAt:"3 days ago", createdBy:4, status:"R"},
];

let STAFF = [
  {id:1, name:"Animesh Adhikari", email:"animesh@adhikariacademy.in", role:"Super Admin", status:"Active"},
  {id:2, name:"Dr. R. K. Menon", email:"rk.menon@adhikariacademy.in", role:"Faculty", status:"Active"},
  {id:3, name:"Prof. Anjali Deshpande", email:"anjali.d@adhikariacademy.in", role:"Faculty", status:"Active"},
  {id:4, name:"Neha Kapoor", email:"neha.kapoor@adhikariacademy.in", role:"Management", status:"Active"},
  {id:5, name:"Sohel", email:"sohel.reviewer@adhikariacademy.in", role:"Reviewer", status:"Inactive"},
];

let REVIEWS = [
  {id:1, student:"Divya Kulkarni", docType:"ID Proof (Aadhaar)", context:"Certificate in Data Structures & Algorithms", submitted:"14 Sep 2026", status:"Pending"},
  {id:2, student:"Aman Gupta", docType:"Testimonial Submission", context:"GATE CS/IT Live Coaching 2027", submitted:"Yesterday, 6:40 PM", status:"Pending"},
  {id:3, student:"Priya Nair", docType:"Eligibility Certificate", context:"GATE CS/IT Live Coaching 2027", submitted:"3 days ago", status:"Approved"},
  {id:4, student:"Rahul Fernandes", docType:"ID Proof (PAN)", context:"GATE CS/IT Live Coaching 2027", submitted:"5 days ago", status:"Rejected"},
];

let CMS_CONTENT = {
  heroEyebrow:"Adhikari Academy of Learning",
  heroTitle:"Learn from India's sharpest GATE CS/IT faculty",
  heroSubtitle:"Books, bundled collections and live coaching built by the educators who actually write the questions.",
  heroImage:"https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80&auto=format",
  stats:[
    {id:1, label:"Active Students", value:"1,284"},
    {id:2, label:"Published Titles", value:"5"},
    {id:3, label:"Faculty Authors", value:"4"},
    {id:4, label:"Years Running", value:"9"},
  ],
  testimonials:[
    {id:1, name:"Priya Nair", role:"GATE CS 2027 Aspirant", quote:"The Discrete Mathematics book alone reshaped how I approach proofs — worth every rupee.", rating:5, photo:""},
    {id:2, name:"Rahul Fernandes", role:"GATE CS 2027 Aspirant", quote:"Live coaching sessions are paced perfectly for working through previous-year papers.", rating:5, photo:""},
  ]
};

let SESSION = { name:"Animesh Adhikari", role:"Super Admin" };
let currentSidebarView = "dashboard";

/* running id counters for new records */
let NEXT_ID = {
  category: CATEGORIES.length + 100,
  book: BOOKS.length + 100,
  collection: COLLECTIONS.length + 100,
  course: COURSES.length + 100,
  batch: Object.keys(BATCHES).length + 100,
  student: STUDENTS.length + 100,
  staff: STAFF.length + 100,
  review: REVIEWS.length + 100,
  stat: CMS_CONTENT.stats.length + 100,
  testimonial: CMS_CONTENT.testimonials.length + 100,
  lecture: LECTURES.length + 100,
  notification: NOTIFICATIONS.length + 100,
};
function nextId(kind){ return ++NEXT_ID[kind]; }
