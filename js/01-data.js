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
  5:{name:"Dr. Vikram Singh", designation:"Associate Professor, AI & ML", qualification:"Ph.D. Machine Learning, IIT Delhi"},
  6:{name:"Prof. Sunita Reddy", designation:"Faculty, Database Systems", qualification:"M.Tech, IIT Madras"},
  7:{name:"Dr. Arjun Mehta", designation:"Visiting Scholar, Cybersecurity", qualification:"Ph.D. Cryptography, ISI Kolkata"},
  8:{name:"Prof. David D'Souza", designation:"Senior Faculty, Networking", qualification:"M.S. Computer Networks, NYU"},
  9:{name:"Dr. Lakshmi Nair", designation:"Assistant Professor, Software Engineering", qualification:"Ph.D. Agile Methods, IIT Kanpur"},
  10:{name:"Prof. Gautam Bose", designation:"Faculty, Operating Systems", qualification:"M.Tech, IISC Bangalore"},
};

let CATEGORIES = [
  {id:1, name:"Mathematics", status:"Active", rank:1, books:3},
  {id:2, name:"Theory of Computation", status:"Active", rank:2, books:2},
  {id:3, name:"Computer Networks", status:"Active", rank:3, books:1},
  {id:4, name:"Operating Systems", status:"Active", rank:4, books:1},
  {id:5, name:"Data Structures & Algorithms", status:"Active", rank:5, books:1},
  {id:6, name:"Digital Electronics", status:"Draft", rank:6, books:0},
  {id:7, name:"Database Management Systems", status:"Active", rank:7, books:2},
  {id:8, name:"Artificial Intelligence", status:"Active", rank:8, books:1},
  {id:9, name:"Cybersecurity", status:"Draft", rank:9, books:0},
  {id:10, name:"Software Engineering", status:"Active", rank:10, books:1},
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
  {
    id:6, title:"Database Systems: Design & Implementation", editor:"Prof. Sunita Reddy", authorId:6, catId:7,
    price:499, mrp:749, priceUsd:16, year:2025, edition:3, isbn:"978-93-5457-206-9", pages:420,
    status:"Published", cover:"https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&q=80&auto=format",
    description:"Comprehensive coverage of relational algebra, SQL, normalization, transaction management, and NoSQL databases with practical case studies.",
    activeSubs:287, totalSubs:756, collectionId:4
  },
  {
    id:7, title:"Advanced Database Concepts", editor:"Dr. Vikram Singh", authorId:5, catId:7,
    price:549, mrp:799, priceUsd:17, year:2024, edition:1, isbn:"978-93-5457-207-6", pages:398,
    status:"Published", cover:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80&auto=format",
    description:"Distributed databases, data warehousing, big data systems, and query optimization for advanced graduate-level courses.",
    activeSubs:156, totalSubs:434, collectionId:4
  },
  {
    id:8, title:"Computer Networks: Principles & Practice", editor:"Prof. David D'Souza", authorId:8, catId:3,
    price:479, mrp:699, priceUsd:15, year:2025, edition:4, isbn:"978-93-5457-208-3", pages:456,
    status:"Published", cover:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80&auto=format",
    description:"OSI and TCP/IP models, routing, congestion control, network security, and modern protocols with hands-on simulation exercises.",
    activeSubs:324, totalSubs:892, collectionId:5
  },
  {
    id:9, title:"Artificial Intelligence: A Modern Approach", editor:"Dr. Vikram Singh", authorId:5, catId:8,
    price:599, mrp:899, priceUsd:19, year:2025, edition:2, isbn:"978-93-5457-209-0", pages:512,
    status:"Published", cover:"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80&auto=format",
    description:"Agents, search algorithms, knowledge representation, machine learning foundations, and AI ethics with Python code examples.",
    activeSubs:445, totalSubs:1120, collectionId:6
  },
  {
    id:10, title:"Data Structures & Algorithms in Python", editor:"Prof. Anjali Deshpande", authorId:2, catId:5,
    price:529, mrp:799, priceUsd:16, year:2024, edition:3, isbn:"978-93-5457-210-6", pages:468,
    status:"Published", cover:"https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=80&auto=format",
    description:"Arrays, linked lists, trees, graphs, hash tables, sorting, searching, and algorithmic complexity with implementation in Python.",
    activeSubs:678, totalSubs:1567, collectionId:7
  },
  {
    id:11, title:"Cryptography & Network Security", editor:"Dr. Arjun Mehta", authorId:7, catId:9,
    price:549, mrp:849, priceUsd:18, year:2025, edition:2, isbn:"978-93-5457-211-3", pages:389,
    status:"Draft", cover:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80&auto=format",
    description:"Symmetric and asymmetric encryption, hash functions, digital signatures, PKI, and security protocols for modern networks.",
    activeSubs:0, totalSubs:0, collectionId:8
  },
  {
    id:12, title:"Software Engineering: Principles & Practice", editor:"Dr. Lakshmi Nair", authorId:9, catId:10,
    price:489, mrp:729, priceUsd:15, year:2024, edition:3, isbn:"978-93-5457-212-0", pages:432,
    status:"Published", cover:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80&auto=format",
    description:"SDLC, agile methodologies, requirements engineering, design patterns, testing, and project management with real-world case studies.",
    activeSubs:234, totalSubs:678, collectionId:9
  },
  {
    id:13, title:"Digital Logic Design", editor:"Prof. Meera Iyer", authorId:4, catId:6,
    price:399, mrp:599, priceUsd:12, year:2023, edition:2, isbn:"978-93-5457-213-7", pages:328,
    status:"Published", cover:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80&auto=format",
    description:"Boolean algebra, combinational and sequential circuits, finite state machines, and digital system design fundamentals.",
    activeSubs:189, totalSubs:523, collectionId:10
  },
  {
    id:14, title:"Computer Organization & Architecture", editor:"Prof. Gautam Bose", authorId:10, catId:4,
    price:469, mrp:699, priceUsd:14, year:2025, edition:3, isbn:"978-93-5457-214-4", pages:398,
    status:"Published", cover:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80&auto=format",
    description:"CPU design, pipelining, memory hierarchy, I/O systems, and parallel processing with RISC and CISC architectures.",
    activeSubs:312, totalSubs:867, collectionId:11
  },
  {
    id:15, title:"Compiler Design", editor:"Dr. Suhas Kelkar", authorId:3, catId:2,
    price:529, mrp:799, priceUsd:17, year:2024, edition:2, isbn:"978-93-5457-215-1", pages:456,
    status:"Published", cover:"https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=80&auto=format",
    description:"Lexical analysis, parsing, semantic analysis, intermediate code generation, code optimization, and target code generation.",
    activeSubs:267, totalSubs:723, collectionId:12
  },
  {
    id:16, title:"Machine Learning Fundamentals", editor:"Dr. Vikram Singh", authorId:5, catId:8,
    price:599, mrp:899, priceUsd:19, year:2025, edition:1, isbn:"978-93-5457-216-8", pages:534,
    status:"Published", cover:"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80&auto=format",
    description:"Supervised and unsupervised learning, regression, classification, clustering, neural networks, and model evaluation techniques.",
    activeSubs:423, totalSubs:1098, collectionId:6
  },
  {
    id:17, title:"Deep Learning & Neural Networks", editor:"Dr. Vikram Singh", authorId:5, catId:8,
    price:649, mrp:949, priceUsd:20, year:2025, edition:1, isbn:"978-93-5457-217-5", pages:478,
    status:"Draft", cover:"https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=80&auto=format",
    description:"CNN, RNN, LSTM, transformers, autoencoders, GANs, and deep learning frameworks with implementation projects.",
    activeSubs:0, totalSubs:0, collectionId:13
  },
  {
    id:18, title:"Cloud Computing & Virtualization", editor:"Prof. David D'Souza", authorId:8, catId:3,
    price:479, mrp:699, priceUsd:15, year:2024, edition:2, isbn:"978-93-5457-218-2", pages:412,
    status:"Published", cover:"https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=400&q=80&auto=format",
    description:"Cloud service models, virtualization technologies, containerization, orchestration, and cloud-native application development.",
    activeSubs:298, totalSubs:789, collectionId:5
  },
  {
    id:19, title:"Web Technologies", editor:"Dr. Lakshmi Nair", authorId:9, catId:10,
    price:459, mrp:679, priceUsd:14, year:2024, edition:4, isbn:"978-93-5457-219-9", pages:398,
    status:"Published", cover:"https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=400&q=80&auto=format",
    description:"HTML, CSS, JavaScript, frontend frameworks, backend development, REST APIs, and full-stack web application design.",
    activeSubs:345, totalSubs:901, collectionId:9
  },
  {
    id:20, title:"Mobile Application Development", editor:"Prof. Sunita Reddy", authorId:6, catId:10,
    price:499, mrp:749, priceUsd:16, year:2025, edition:2, isbn:"978-93-5457-220-5", pages:378,
    status:"Published", cover:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80&auto=format",
    description:"Android and iOS development, cross-platform frameworks, UI/UX design, app lifecycle, and mobile app deployment.",
    activeSubs:234, totalSubs:567, collectionId:9
  },
  {
    id:21, title:"Discrete Structures & Combinatorics", editor:"Prof. Anjali Deshpande", authorId:2, catId:1,
    price:429, mrp:649, priceUsd:13, year:2024, edition:2, isbn:"978-93-5457-221-2", pages:356,
    status:"Published", cover:"https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80&auto=format",
    description:"Combinatorial enumeration, generating functions, recurrence relations, and graph theory applications in computer science.",
    activeSubs:389, totalSubs:1023, collectionId:1
  },
  {
    id:22, title:"Probability & Statistics for CS", editor:"Dr. R. K. Menon", authorId:1, catId:1,
    price:469, mrp:699, priceUsd:15, year:2025, edition:3, isbn:"978-93-5457-222-9", pages:398,
    status:"Published", cover:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80&auto=format",
    description:"Probability distributions, statistical inference, random processes, and data analysis with applications to computer science.",
    activeSubs:456, totalSubs:1189, collectionId:1
  },
  {
    id:23, title:"Formal Languages & Automata Theory", editor:"Dr. Suhas Kelkar", authorId:3, catId:2,
    price:499, mrp:749, priceUsd:16, year:2025, edition:3, isbn:"978-93-5457-223-6", pages:432,
    status:"Published", cover:"https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80&auto=format",
    description:"Regular languages, context-free grammars, Turing machines, decidability, and computational complexity theory.",
    activeSubs:312, totalSubs:834, collectionId:2
  },
  {
    id:24, title:"Parallel & Distributed Computing", editor:"Prof. Gautam Bose", authorId:10, catId:4,
    price:549, mrp:799, priceUsd:17, year:2024, edition:2, isbn:"978-93-5457-224-3", pages:423,
    status:"Published", cover:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80&auto=format",
    description:"Parallel architectures, shared memory, message passing, distributed systems, consistency models, and fault tolerance.",
    activeSubs:223, totalSubs:612, collectionId:11
  },
  {
    id:25, title:"Embedded Systems Design", editor:"Prof. Meera Iyer", authorId:4, catId:6,
    price:499, mrp:749, priceUsd:16, year:2024, edition:2, isbn:"978-93-5457-225-0", pages:389,
    status:"Draft", cover:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80&auto=format",
    description:"Microcontrollers, real-time operating systems, embedded programming, and hardware-software co-design principles.",
    activeSubs:0, totalSubs:0, collectionId:10
  },
  {
    id:26, title:"Information Security & Cyber Laws", editor:"Dr. Arjun Mehta", authorId:7, catId:9,
    price:529, mrp:799, priceUsd:17, year:2025, edition:2, isbn:"978-93-5457-226-7", pages:378,
    status:"Published", cover:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80&auto=format",
    description:"Information security principles, cyber threats, security policies, legal frameworks, and cybercrime investigation.",
    activeSubs:267, totalSubs:789, collectionId:8
  },
  {
    id:27, title:"Database Administration & Performance", editor:"Prof. Sunita Reddy", authorId:6, catId:7,
    price:489, mrp:729, priceUsd:15, year:2025, edition:1, isbn:"978-93-5457-227-4", pages:412,
    status:"Published", cover:"https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&q=80&auto=format",
    description:"Database tuning, indexing, query optimization, backup and recovery, and cloud database administration.",
    activeSubs:189, totalSubs:523, collectionId:4
  },
  {
    id:28, title:"Agile Software Development", editor:"Dr. Lakshmi Nair", authorId:9, catId:10,
    price:459, mrp:679, priceUsd:14, year:2024, edition:3, isbn:"978-93-5457-228-1", pages:356,
    status:"Published", cover:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80&auto=format",
    description:"Scrum, Kanban, XP, lean development, agile estimation, and project management with Agile methodologies.",
    activeSubs:345, totalSubs:901, collectionId:9
  },
  {
    id:29, title:"Internet of Things", editor:"Prof. David D'Souza", authorId:8, catId:3,
    price:499, mrp:749, priceUsd:16, year:2025, edition:2, isbn:"978-93-5457-229-8", pages:398,
    status:"Published", cover:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80&auto=format",
    description:"IoT architecture, sensors, actuators, IoT protocols, edge computing, and IoT application development.",
    activeSubs:278, totalSubs:745, collectionId:5
  },
  {
    id:30, title:"Computational Geometry", editor:"Dr. R. K. Menon", authorId:1, catId:1,
    price:529, mrp:799, priceUsd:17, year:2025, edition:1, isbn:"978-93-5457-230-4", pages:445,
    status:"Draft", cover:"https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80&auto=format",
    description:"Geometric algorithms, computational geometry techniques, spatial data structures, and applications in computer graphics.",
    activeSubs:0, totalSubs:0, collectionId:14
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
  {
    id:4, title:"Database & Analytics Pack", editor:"Prof. Sunita Reddy", currentEditor:"Dr. Vikram Singh",
    catId:7, moduleCount:10, availability:"Available", price:1399, priceUsd:35,
    about:"Comprehensive coverage of database systems from fundamentals to advanced analytics and big data technologies.",
    topics:["Relational Databases","NoSQL","Data Warehousing","Big Data Analytics"],
    audience:["Data Engineers","Database Administrators","Graduate Students"],
    bookIds:[6,7], cover:"https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&q=80&auto=format"
  },
  {
    id:5, title:"Computer Networks Suite", editor:"Prof. David D'Souza", currentEditor:"Prof. David D'Souza",
    catId:3, moduleCount:8, availability:"Available", price:1299, priceUsd:32,
    about:"Complete coverage of computer networking including cloud computing, IoT, and modern network technologies.",
    topics:["Network Fundamentals","Routing & Switching","Cloud Computing","IoT"],
    audience:["Network Engineers","Cloud Architects","B.Tech Students"],
    bookIds:[8,18,29], cover:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80&auto=format"
  },
  {
    id:6, title:"AI & Machine Learning Series", editor:"Dr. Vikram Singh", currentEditor:"Dr. Vikram Singh",
    catId:8, moduleCount:12, availability:"Available", price:1999, priceUsd:50,
    about:"End-to-end AI/ML curriculum covering fundamentals, deep learning, and practical applications in modern AI.",
    topics:["ML Fundamentals","Deep Learning","Neural Networks","AI Applications"],
    audience:["ML Engineers","Data Scientists","Researchers"],
    bookIds:[9,16], cover:"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&q=80&auto=format"
  },
  {
    id:7, title:"DSA Interview Prep Pack", editor:"Prof. Anjali Deshpande", currentEditor:"Prof. Anjali Deshpande",
    catId:5, moduleCount:6, availability:"Available", price:999, priceUsd:25,
    about:"Focused preparation for technical interviews with comprehensive coverage of data structures and algorithms.",
    topics:["Arrays & Strings","Trees & Graphs","Dynamic Programming","Coding Challenges"],
    audience:["Placement Aspirants","Software Engineers","GATE Aspirants"],
    bookIds:[10], cover:"https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&q=80&auto=format"
  },
  {
    id:8, title:"Cybersecurity Essentials", editor:"Dr. Arjun Mehta", currentEditor:"Dr. Arjun Mehta",
    catId:9, moduleCount:6, availability:"Coming Soon", price:1099, priceUsd:28,
    about:"Essential cybersecurity concepts covering cryptography, network security, and cyber laws for modern IT professionals.",
    topics:["Cryptography","Network Security","Information Security","Cyber Laws"],
    audience:["Security Engineers","IT Managers","Students"],
    bookIds:[11,26], cover:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&q=80&auto=format"
  },
  {
    id:9, title:"Software Engineering Bundle", editor:"Dr. Lakshmi Nair", currentEditor:"Dr. Lakshmi Nair",
    catId:10, moduleCount:10, availability:"Available", price:1499, priceUsd:38,
    about:"Complete software engineering curriculum covering agile development, web technologies, mobile apps, and modern practices.",
    topics:["Agile Methods","Web Tech","Mobile Development","Software Design"],
    audience:["Software Engineers","Project Managers","Students"],
    bookIds:[12,19,20,28], cover:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80&auto=format"
  },
  {
    id:10, title:"Hardware & Systems Engineering", editor:"Prof. Meera Iyer", currentEditor:"Prof. Gautam Bose",
    catId:6, moduleCount:8, availability:"Available", price:1199, priceUsd:30,
    about:"Foundational hardware engineering covering digital logic, computer organization, and embedded systems.",
    topics:["Digital Logic","Computer Architecture","Embedded Systems","Parallel Computing"],
    audience:["Hardware Engineers","Embedded Developers","B.Tech Students"],
    bookIds:[13,25], cover:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&q=80&auto=format"
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
  {
    id:4, type:"Coaching", title:"Machine Learning Bootcamp 2027", mode:"Online", status:"Active",
    coordinator:"Dr. Vikram Singh", nextIntake:"Mar 2027", durationLabel:"6 months", totalLectures:120, lecturesPerWeek:5,
    eligibility:"Engineering graduates with basic Python and mathematics knowledge.",
    objective:"Build practical ML skills with hands-on projects and real-world datasets.",
    outcome:"Graduates master ML workflows and can deploy models in production environments.",
    topics:[
      {title:"ML Fundamentals", book:"Machine Learning Fundamentals", lectures:30},
      {title:"Deep Learning", book:"Deep Learning & Neural Networks", lectures:28},
      {title:"AI Applications", book:"Artificial Intelligence: A Modern Approach", lectures:26},
    ],
    faculty:[5,2],
    payplans:[
      {name:"Single Payment", installments:[{n:1, amount:35000, due:"At enrolment"}]},
      {name:"Two Installments", installments:[{n:1, amount:20000, due:"At enrolment"},{n:2, amount:15000, due:"Before Lecture 30"}]},
    ],
    batchIds:[4]
  },
  {
    id:5, type:"Certificate", title:"Certificate in Database Administration", mode:"Hybrid", status:"Active",
    coordinator:"Prof. Sunita Reddy", nextIntake:"Aug 2026", durationLabel:"12 weeks", totalLectures:36, lecturesPerWeek:3,
    eligibility:"Basic knowledge of SQL and relational databases.",
    objective:"Develop comprehensive database administration skills for enterprise environments.",
    outcome:"Certified professionals capable of managing production databases and optimizing performance.",
    topics:[
      {title:"Database Design", book:"Database Systems: Design & Implementation", lectures:12},
      {title:"Database Administration", book:"Database Administration & Performance", lectures:14},
      {title:"Performance Tuning", book:"Advanced Database Concepts", lectures:10},
    ],
    faculty:[6,5],
    payplans:[
      {name:"Single Payment", installments:[{n:1, amount:18000, due:"At enrolment"}]},
      {name:"Three Installments", installments:[{n:1, amount:8000, due:"At enrolment"},{n:2, amount:5000, due:"Week 4"},{n:3, amount:5000, due:"Week 8"}]},
    ],
    batchIds:[5]
  },
  {
    id:6, type:"Certificate", title:"Advanced Network Engineering Certificate", mode:"Online", status:"Active",
    coordinator:"Prof. David D'Souza", nextIntake:"Oct 2026", durationLabel:"4 months", totalLectures:48, lecturesPerWeek:3,
    eligibility:"Network fundamentals and TCP/IP knowledge required.",
    objective:"Prepare professionals for advanced networking and cloud infrastructure roles.",
    outcome:"Engineers gain expertise in routing, switching, cloud, and IoT networking.",
    topics:[
      {title:"Network Protocols", book:"Computer Networks: Principles & Practice", lectures:16},
      {title:"Cloud Networking", book:"Cloud Computing & Virtualization", lectures:14},
      {title:"IoT Networks", book:"Internet of Things", lectures:18},
    ],
    faculty:[8,10],
    payplans:[
      {name:"Single Payment", installments:[{n:1, amount:25000, due:"At enrolment"}]},
      {name:"Two Installments", installments:[{n:1, amount:14000, due:"At enrolment"},{n:2, amount:11000, due:"Before Lecture 15"}]},
    ],
    batchIds:[6]
  },
  {
    id:7, type:"Coaching", title:"Software Engineering Professional Program", mode:"Hybrid", status:"Draft",
    coordinator:"Dr. Lakshmi Nair", nextIntake:"Jan 2028", durationLabel:"8 months", totalLectures:140, lecturesPerWeek:4,
    eligibility:"Programming experience with at least one language.",
    objective:"Develop full-spectrum software engineering skills from design to deployment.",
    outcome:"Graduates become proficient in agile practices, web/mobile development, and project management.",
    topics:[
      {title:"Software Design", book:"Software Engineering: Principles & Practice", lectures:32},
      {title:"Web Development", book:"Web Technologies", lectures:28},
      {title:"Mobile Development", book:"Mobile Application Development", lectures:24},
    ],
    faculty:[9,6],
    payplans:[
      {name:"Single Payment", installments:[{n:1, amount:38000, due:"At enrolment"}]},
      {name:"Four Installments", installments:[{n:1, amount:12000, due:"At enrolment"},{n:2, amount:10000, due:"Month 2"},{n:3, amount:8000, due:"Month 4"},{n:4, amount:8000, due:"Month 6"}]},
    ],
    batchIds:[7]
  },
  {
    id:8, type:"Diploma", title:"Diploma in Cybersecurity", mode:"Online", status:"Active",
    coordinator:"Dr. Arjun Mehta", nextIntake:"Apr 2027", durationLabel:"5 months", totalLectures:60, lecturesPerWeek:3,
    eligibility:"IT or computer science background with networking knowledge.",
    objective:"Build robust cybersecurity knowledge and practical skills for threat detection and mitigation.",
    outcome:"Graduates can implement security protocols, conduct audits, and respond to cyber incidents.",
    topics:[
      {title:"Cryptography", book:"Cryptography & Network Security", lectures:20},
      {title:"Information Security", book:"Information Security & Cyber Laws", lectures:22},
      {title:"Security Operations", book:"Computer Networks: Principles & Practice", lectures:18},
    ],
    faculty:[7,8],
    payplans:[
      {name:"Single Payment", installments:[{n:1, amount:32000, due:"At enrolment"}]},
      {name:"Two Installments", installments:[{n:1, amount:18000, due:"At enrolment"},{n:2, amount:14000, due:"Week 6"}]},
    ],
    batchIds:[8]
  },
  {
    id:9, type:"Certificate", title:"Certificate in AI & Data Science", mode:"Hybrid", status:"Active",
    coordinator:"Dr. Vikram Singh", nextIntake:"Nov 2026", durationLabel:"5 months", totalLectures:60, lecturesPerWeek:3,
    eligibility:"Basic Python programming and statistics knowledge.",
    objective:"Master data science lifecycle from data preprocessing to model deployment.",
    outcome:"Graduates can work as data scientists or AI engineers in industry and research.",
    topics:[
      {title:"Data Science", book:"Machine Learning Fundamentals", lectures:20},
      {title:"Deep Learning", book:"Deep Learning & Neural Networks", lectures:18},
      {title:"AI Systems", book:"Artificial Intelligence: A Modern Approach", lectures:22},
    ],
    faculty:[5,2],
    payplans:[
      {name:"Single Payment", installments:[{n:1, amount:28000, due:"At enrolment"}]},
      {name:"Three Installments", installments:[{n:1, amount:12000, due:"At enrolment"},{n:2, amount:8000, due:"Week 5"},{n:3, amount:8000, due:"Week 10"}]},
    ],
    batchIds:[9]
  },
  {
    id:10, type:"Coaching", title:"GATE CS/IT Foundation Program", mode:"Online", status:"Draft",
    coordinator:"Prof. Gautam Bose", nextIntake:"Feb 2028", durationLabel:"14 months", totalLectures:250, lecturesPerWeek:5,
    eligibility:"B.Tech first or second year students in Computer Science/IT.",
    objective:"Build foundational knowledge for GATE through comprehensive coverage of core CS topics.",
    outcome:"Students build strong fundamentals and confidence to tackle GATE with advanced preparation.",
    topics:[
      {title:"Computer Organization", book:"Computer Organization & Architecture", lectures:30},
      {title:"Compiler Design", book:"Compiler Design", lectures:28},
      {title:"Operating Systems", book:"Operating Systems: Concepts & Practice", lectures:25},
    ],
    faculty:[10,4,3],
    payplans:[
      {name:"Single Payment", installments:[{n:1, amount:49000, due:"At enrolment"}]},
      {name:"Three Installments", installments:[{n:1, amount:20000, due:"At enrolment"},{n:2, amount:15000, due:"Month 4"},{n:3, amount:14000, due:"Month 8"}]},
    ],
    batchIds:[]
  },
];

let BATCHES = {
  1:{id:1, courseId:1, intake:"Jan 2027 · Morning Batch", start:"05 Jan 2027", end:"30 Nov 2027", seatsTotal:150, seatsFilled:112, price:42000, earlyBird:37000, status:"Admissions Open", enrolled:112, lecturesHeld:18, attendanceAvg:88},
  2:{id:2, courseId:1, intake:"Jan 2027 · Evening Batch", start:"06 Jan 2027", end:"01 Dec 2027", seatsTotal:150, seatsFilled:96, price:42000, earlyBird:37000, status:"Admissions Open", enrolled:96, lecturesHeld:17, attendanceAvg:84},
  3:{id:3, courseId:2, intake:"Sep 2026 · Weekend Batch", start:"12 Sep 2026", end:"20 Dec 2026", seatsTotal:60, seatsFilled:54, price:15000, earlyBird:12500, status:"Filling Fast", enrolled:54, lecturesHeld:8, attendanceAvg:91},
  4:{id:4, courseId:4, intake:"Mar 2027 · ML Bootcamp", start:"15 Mar 2027", end:"15 Sep 2027", seatsTotal:100, seatsFilled:78, price:35000, earlyBird:31000, status:"Admissions Open", enrolled:78, lecturesHeld:0, attendanceAvg:0},
  5:{id:5, courseId:5, intake:"Aug 2026 · DBA Certificate", start:"20 Aug 2026", end:"20 Nov 2026", seatsTotal:40, seatsFilled:32, price:18000, earlyBird:15500, status:"Filling Fast", enrolled:32, lecturesHeld:6, attendanceAvg:86},
  6:{id:6, courseId:6, intake:"Oct 2026 · Networking Advanced", start:"15 Oct 2026", end:"15 Feb 2027", seatsTotal:50, seatsFilled:28, price:25000, earlyBird:22000, status:"Admissions Open", enrolled:28, lecturesHeld:0, attendanceAvg:0},
  7:{id:7, courseId:7, intake:"Jan 2028 · SW Eng Professional", start:"20 Jan 2028", end:"20 Sep 2028", seatsTotal:75, seatsFilled:0, price:38000, earlyBird:34000, status:"Coming Soon", enrolled:0, lecturesHeld:0, attendanceAvg:0},
  8:{id:8, courseId:8, intake:"Apr 2027 · Cybersecurity", start:"10 Apr 2027", end:"10 Sep 2027", seatsTotal:45, seatsFilled:23, price:32000, earlyBird:28500, status:"Admissions Open", enrolled:23, lecturesHeld:0, attendanceAvg:0},
  9:{id:9, courseId:9, intake:"Nov 2026 · AI & Data Science", start:"20 Nov 2026", end:"20 Apr 2027", seatsTotal:60, seatsFilled:41, price:28000, earlyBird:25000, status:"Filling Fast", enrolled:41, lecturesHeld:3, attendanceAvg:89},
  10:{id:10, courseId:10, intake:"Feb 2028 · GATE Foundation", start:"15 Feb 2028", end:"15 Apr 2029", seatsTotal:120, seatsFilled:0, price:49000, earlyBird:44000, status:"Coming Soon", enrolled:0, lecturesHeld:0, attendanceAvg:0},
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
  // Additional 55 students
  {id:6, name:"Neha Sharma", email:"neha.sharma@example.com", phone:"+91 98100 22334", courseId:1, batchId:1, status:"Active", joined:"05 Jan 2027",
   dob:"12 Jun 2004", gender:"Female", address:"45 Model Town", city:"Delhi", state:"Delhi", pincode:"110009",
   guardianName:"Rajesh Sharma", guardianPhone:"+91 98100 44556", qualification:"B.Tech Computer Science",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-1234", notes:""},
  {id:7, name:"Arjun Patel", email:"arjun.p@example.com", phone:"+91 98765 43210", courseId:1, batchId:1, status:"Active", joined:"05 Jan 2027",
   dob:"25 Aug 2003", gender:"Male", address:"101 Lake View", city:"Mumbai", state:"Maharashtra", pincode:"400001",
   guardianName:"Mukesh Patel", guardianPhone:"+91 98765 44321", qualification:"B.E. Computer Engineering",
   idType:"PAN", idNumber:"ABCDE1234F", notes:"Full scholarship recipient."},
  {id:8, name:"Sneha Reddy", email:"sneha.r@example.com", phone:"+91 99887 66554", courseId:1, batchId:2, status:"Active", joined:"06 Jan 2027",
   dob:"03 Sep 2004", gender:"Female", address:"78 Jubilee Hills", city:"Hyderabad", state:"Telangana", pincode:"500033",
   guardianName:"Suresh Reddy", guardianPhone:"+91 99887 55443", qualification:"B.Tech Information Technology",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-5678", notes:""},
  {id:9, name:"Karan Singh", email:"karan.s@example.com", phone:"+91 98222 33445", courseId:1, batchId:1, status:"Active", joined:"05 Jan 2027",
   dob:"15 Nov 2003", gender:"Male", address:"56 Green Park", city:"Lucknow", state:"Uttar Pradesh", pincode:"226001",
   guardianName:"Ranjit Singh", guardianPhone:"+91 98222 55443", qualification:"B.Tech Computer Science",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-9012", notes:""},
  {id:10, name:"Pooja Verma", email:"pooja.v@example.com", phone:"+91 97654 32109", courseId:1, batchId:2, status:"Active", joined:"06 Jan 2027",
   dob:"29 Feb 2004", gender:"Female", address:"12 Civil Lines", city:"Nagpur", state:"Maharashtra", pincode:"440001",
   guardianName:"Sanjay Verma", guardianPhone:"+91 97654 09876", qualification:"B.E. Computer Science",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-3456", notes:""},
  {id:11, name:"Vikram Singh", email:"vikram.s@example.com", phone:"+91 98765 11223", courseId:1, batchId:1, status:"Active", joined:"05 Jan 2027",
   dob:"08 Apr 2004", gender:"Male", address:"201 M.G. Road", city:"Jaipur", state:"Rajasthan", pincode:"302001",
   guardianName:"Mahavir Singh", guardianPhone:"+91 98765 33445", qualification:"B.Tech Computer Science",
   idType:"PAN", idNumber:"FGHIJ6789K", notes:""},
  {id:12, name:"Ananya Desai", email:"ananya.d@example.com", phone:"+91 98333 22110", courseId:1, batchId:1, status:"Active", joined:"05 Jan 2027",
   dob:"14 Jul 2004", gender:"Female", address:"34 Viman Nagar", city:"Pune", state:"Maharashtra", pincode:"411014",
   guardianName:"Nitin Desai", guardianPhone:"+91 98333 99887", qualification:"B.Tech Computer Engineering",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-7890", notes:""},
  {id:13, name:"Rahul Saxena", email:"rahul.saxena@example.com", phone:"+91 98200 77665", courseId:1, batchId:2, status:"Active", joined:"06 Jan 2027",
   dob:"22 Oct 2003", gender:"Male", address:"89 Indiranagar", city:"Bangalore", state:"Karnataka", pincode:"560038",
   guardianName:"Amit Saxena", guardianPhone:"+91 98200 55443", qualification:"B.E. Information Technology",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-2345", notes:""},
  {id:14, name:"Meera Iyer", email:"meera.i@example.com", phone:"+91 98456 78901", courseId:2, batchId:3, status:"Active", joined:"12 Sep 2026",
   dob:"05 May 2005", gender:"Female", address:"45 Adyar", city:"Chennai", state:"Tamil Nadu", pincode:"600020",
   guardianName:"Venkat Iyer", guardianPhone:"+91 98456 10987", qualification:"B.Sc. Computer Science",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-6789", notes:"Top performer in batch."},
  {id:15, name:"Gaurav Nair", email:"gaurav.n@example.com", phone:"+91 98765 55443", courseId:2, batchId:3, status:"Active", joined:"12 Sep 2026",
   dob:"11 Jan 2004", gender:"Male", address:"23 Marine Drive", city:"Kochi", state:"Kerala", pincode:"682001",
   guardianName:"Rajan Nair", guardianPhone:"+91 98765 33221", qualification:"B.Tech Computer Science",
   idType:"PAN", idNumber:"LMNOP1234R", notes:""},
  {id:16, name:"Shweta Gupta", email:"shweta.g@example.com", phone:"+91 97654 33221", courseId:2, batchId:3, status:"Pending", joined:"14 Sep 2026",
   dob:"30 Mar 2005", gender:"Female", address:"67 Sachivalaya Marg", city:"Gandhinagar", state:"Gujarat", pincode:"382010",
   guardianName:"Ravi Gupta", guardianPhone:"+91 97654 11009", qualification:"B.C.A.",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-8901", notes:"Document verification pending."},
  {id:17, name:"Aisha Khan", email:"aisha.k@example.com", phone:"+91 98222 88990", courseId:2, batchId:3, status:"Active", joined:"12 Sep 2026",
   dob:"19 Jun 2004", gender:"Female", address:"12 Gulmohar Park", city:"Bhopal", state:"Madhya Pradesh", pincode:"462001",
   guardianName:"Yusuf Khan", guardianPhone:"+91 98222 77665", qualification:"B.Sc. Information Technology",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-4567", notes:""},
  {id:18, name:"Rajesh Kumar", email:"rajesh.k@example.com", phone:"+91 98330 88776", courseId:2, batchId:3, status:"Active", joined:"12 Sep 2026",
   dob:"27 Sep 2004", gender:"Male", address:"89 Ashok Nagar", city:"Patna", state:"Bihar", pincode:"800001",
   guardianName:"Suresh Kumar", guardianPhone:"+91 98330 66554", qualification:"B.Tech Computer Science",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-0123", notes:""},
  {id:19, name:"Kavya Rao", email:"kavya.r@example.com", phone:"+91 98450 11223", courseId:2, batchId:3, status:"Active", joined:"12 Sep 2026",
   dob:"03 Feb 2005", gender:"Female", address:"45 Basavanagudi", city:"Bangalore", state:"Karnataka", pincode:"560004",
   guardianName:"Srinivas Rao", guardianPhone:"+91 98450 44332", qualification:"B.E. Computer Science",
   idType:"PAN", idNumber:"STUVW1234X", notes:""},
  {id:20, name:"Manoj Pillai", email:"manoj.p@example.com", phone:"+91 98765 99887", courseId:2, batchId:3, status:"Pending", joined:"15 Sep 2026",
   dob:"18 Aug 2004", gender:"Male", address:"56 Museum Road", city:"Thiruvananthapuram", state:"Kerala", pincode:"695001",
   guardianName:"Gopal Pillai", guardianPhone:"+91 98765 88776", qualification:"B.Sc. Computer Science",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-3456", notes:"Financial aid application pending."},
  {id:21, name:"Deepika Sharma", email:"deepika.s@example.com", phone:"+91 98123 45678", courseId:3, batchId:0, status:"Active", joined:"15 Jan 2027",
   dob:"04 Apr 2004", gender:"Female", address:"123 Defense Colony", city:"Delhi", state:"Delhi", pincode:"110024",
   guardianName:"Rakesh Sharma", guardianPhone:"+91 98123 76543", qualification:"Class XII with Mathematics",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-7891", notes:"Diploma student."},
  {id:22, name:"Akash Patil", email:"akash.p@example.com", phone:"+91 97654 12345", courseId:3, batchId:0, status:"Active", joined:"15 Jan 2027",
   dob:"11 Nov 2003", gender:"Male", address:"34 Shivaji Nagar", city:"Kolhapur", state:"Maharashtra", pincode:"416001",
   guardianName:"Vijay Patil", guardianPhone:"+91 97654 54321", qualification:"Class XII Science",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-9012", notes:""},
  {id:23, name:"Sara Khan", email:"sara.k@example.com", phone:"+91 98765 43219", courseId:3, batchId:0, status:"Active", joined:"16 Jan 2027",
   dob:"22 Jul 2005", gender:"Female", address:"78 Abids Road", city:"Hyderabad", state:"Telangana", pincode:"500001",
   guardianName:"Imran Khan", guardianPhone:"+91 98765 89123", qualification:"Class XII with Computer Science",
   idType:"PAN", idNumber:"YZABC1234D", notes:""},
  {id:24, name:"Rohit Singh", email:"rohit.s@example.com", phone:"+91 98234 56789", courseId:4, batchId:4, status:"Active", joined:"15 Mar 2027",
   dob:"09 Oct 2004", gender:"Male", address:"56 Rajpath", city:"Lucknow", state:"Uttar Pradesh", pincode:"226001",
   guardianName:"Ranjeet Singh", guardianPhone:"+91 98234 98765", qualification:"B.Tech Computer Science",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-5678", notes:"ML Bootcamp student."},
  {id:25, name:"Nisha Mehta", email:"nisha.m@example.com", phone:"+91 98345 67890", courseId:4, batchId:4, status:"Active", joined:"15 Mar 2027",
   dob:"17 Dec 2004", gender:"Female", address:"23 Park Street", city:"Kolkata", state:"West Bengal", pincode:"700016",
   guardianName:"Sanjay Mehta", guardianPhone:"+91 98345 98760", qualification:"B.E. Computer Engineering",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-2345", notes:""},
  {id:26, name:"Suresh Kumar", email:"suresh.k@example.com", phone:"+91 98456 78902", courseId:4, batchId:4, status:"Active", joined:"16 Mar 2027",
   dob:"31 May 2003", gender:"Male", address:"45 Gandhi Nagar", city:"Madurai", state:"Tamil Nadu", pincode:"625001",
   guardianName:"Ram Kumar", guardianPhone:"+91 98456 20987", qualification:"B.Tech Information Technology",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-6789", notes:"Strong Python background."},
  {id:27, name:"Anjali Shah", email:"anjali.s@example.com", phone:"+91 98765 54321", courseId:4, batchId:4, status:"Active", joined:"15 Mar 2027",
   dob:"28 Aug 2004", gender:"Female", address:"34 Ellisbridge", city:"Ahmedabad", state:"Gujarat", pincode:"380006",
   guardianName:"Nitin Shah", guardianPhone:"+91 98765 12345", qualification:"B.Sc. Computer Science",
   idType:"PAN", idNumber:"DEFGH1234I", notes:"Mathematics background."},
  {id:28, name:"Vivek Reddy", email:"vivek.r@example.com", phone:"+91 98222 33441", courseId:4, batchId:4, status:"Active", joined:"15 Mar 2027",
   dob:"13 Mar 2004", gender:"Male", address:"67 Banjara Hills", city:"Hyderabad", state:"Telangana", pincode:"500034",
   guardianName:"Ravi Reddy", guardianPhone:"+91 98222 11443", qualification:"B.Tech Computer Science",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-8901", notes:""},
  {id:29, name:"Preeti Patel", email:"preeti.p@example.com", phone:"+91 98333 44552", courseId:4, batchId:4, status:"Active", joined:"15 Mar 2027",
   dob:"07 Jun 2004", gender:"Female", address:"89 Anand Vihar", city:"Vadodara", state:"Gujarat", pincode:"390001",
   guardianName:"Raj Patel", guardianPhone:"+91 98333 55441", qualification:"B.E. Information Technology",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-4567", notes:""},
  {id:30, name:"Sandeep Yadav", email:"sandeep.y@example.com", phone:"+91 98450 66772", courseId:4, batchId:4, status:"Active", joined:"16 Mar 2027",
   dob:"19 Sep 2003", gender:"Male", address:"12 Civil Lines", city:"Allahabad", state:"Uttar Pradesh", pincode:"211001",
   guardianName:"Ram Yadav", guardianPhone:"+91 98450 22771", qualification:"B.Tech Computer Engineering",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-0123", notes:"Statistics background."},
  {id:31, name:"Maya Krishnan", email:"maya.k@example.com", phone:"+91 98765 11228", courseId:5, batchId:5, status:"Active", joined:"20 Aug 2026",
   dob:"25 Jan 2005", gender:"Female", address:"78 Mylapore", city:"Chennai", state:"Tamil Nadu", pincode:"600004",
   guardianName:"Krishnan Nair", guardianPhone:"+91 98765 88221", qualification:"B.Com with Computer Applications",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-3456", notes:"DBA Certificate student."},
  {id:32, name:"Ravi Shankar", email:"ravi.s@example.com", phone:"+91 98200 88997", courseId:5, batchId:5, status:"Active", joined:"20 Aug 2026",
   dob:"14 Apr 2004", gender:"Male", address:"56 Malleshwaram", city:"Bangalore", state:"Karnataka", pincode:"560003",
   guardianName:"Shankar Iyer", guardianPhone:"+91 98200 79981", qualification:"B.Tech Computer Science",
   idType:"PAN", idNumber:"IJKLM1234N", notes:"SQL specialist."},
  {id:33, name:"Tanvi Deshmukh", email:"tanvi.d@example.com", phone:"+91 98330 77664", courseId:5, batchId:5, status:"Active", joined:"21 Aug 2026",
   dob:"03 Jul 2004", gender:"Female", address:"89 Koregaon Park", city:"Pune", state:"Maharashtra", pincode:"411001",
   guardianName:"Anil Deshmukh", guardianPhone:"+91 98330 44667", qualification:"B.C.A.",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-5678", notes:""},
  {id:34, name:"Kunal Gupta", email:"kunal.g@example.com", phone:"+91 98456 99881", courseId:5, batchId:5, status:"Active", joined:"20 Aug 2026",
   dob:"21 Oct 2003", gender:"Male", address:"23 Lawrence Road", city:"Amritsar", state:"Punjab", pincode:"143001",
   guardianName:"Rakesh Gupta", guardianPhone:"+91 98456 11889", qualification:"B.Tech Computer Engineering",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-7890", notes:"Database enthusiast."},
  {id:35, name:"Shreya Pillai", email:"shreya.p@example.com", phone:"+91 98765 22331", courseId:6, batchId:6, status:"Active", joined:"15 Oct 2026",
   dob:"11 Feb 2005", gender:"Female", address:"45 Fort Kochi", city:"Kochi", state:"Kerala", pincode:"682001",
   guardianName:"Gopal Pillai", guardianPhone:"+91 98765 11332", qualification:"B.Tech Information Technology",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-9012", notes:"Network Engineering student."},
  {id:36, name:"Amit Shah", email:"amit.s@example.com", phone:"+91 98222 44556", courseId:6, batchId:6, status:"Active", joined:"15 Oct 2026",
   dob:"29 May 2004", gender:"Male", address:"78 Race Course", city:"Baroda", state:"Gujarat", pincode:"390007",
   guardianName:"Ashok Shah", guardianPhone:"+91 98222 65547", qualification:"B.Tech Computer Science",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-2345", notes:"CCNA certified."},
  {id:37, name:"Nandini Reddy", email:"nandini.r@example.com", phone:"+91 98330 66778", courseId:6, batchId:6, status:"Active", joined:"16 Oct 2026",
   dob:"15 Mar 2004", gender:"Female", address:"34 Jubilee Hills", city:"Hyderabad", state:"Telangana", pincode:"500033",
   guardianName:"Suresh Reddy", guardianPhone:"+91 98330 88776", qualification:"B.E. Computer Engineering",
   idType:"PAN", idNumber:"OPQRS1234T", notes:""},
  {id:38, name:"Sachin Tendulkar", email:"sachin.t@example.com", phone:"+91 98450 11229", courseId:6, batchId:6, status:"Active", joined:"15 Oct 2026",
   dob:"24 Apr 2003", gender:"Male", address:"56 Bandra West", city:"Mumbai", state:"Maharashtra", pincode:"400050",
   guardianName:"Ramesh Tendulkar", guardianPhone:"+91 98450 99221", qualification:"B.Tech Information Technology",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-4567", notes:"Network architect aspirant."},
  {id:39, name:"Kavita Nair", email:"kavita.n@example.com", phone:"+91 98765 33220", courseId:6, batchId:6, status:"Active", joined:"16 Oct 2026",
   dob:"09 Aug 2004", gender:"Female", address:"89 Marine Drive", city:"Kochi", state:"Kerala", pincode:"682001",
   guardianName:"Rajan Nair", guardianPhone:"+91 98765 22033", qualification:"B.Sc. Computer Science",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-6789", notes:"Network security focus."},
  {id:40, name:"Vishal Gupta", email:"vishal.g@example.com", phone:"+91 98234 56789", courseId:8, batchId:8, status:"Active", joined:"10 Apr 2027",
   dob:"03 Jan 2004", gender:"Male", address:"12 Connaught Place", city:"New Delhi", state:"Delhi", pincode:"110001",
   guardianName:"Raj Gupta", guardianPhone:"+91 98234 98765", qualification:"B.Tech Computer Science",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-7890", notes:"Cybersecurity Diploma student."},
  {id:41, name:"Pooja Sharma", email:"pooja.s@example.com", phone:"+91 98345 67891", courseId:8, batchId:8, status:"Active", joined:"10 Apr 2027",
   dob:"17 Jun 2005", gender:"Female", address:"34 Sector 14", city:"Gurugram", state:"Haryana", pincode:"122001",
   guardianName:"Rohit Sharma", guardianPhone:"+91 98345 19876", qualification:"B.C.A.",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-9012", notes:""},
  {id:42, name:"Ankit Singh", email:"ankit.s@example.com", phone:"+91 98456 78903", courseId:8, batchId:8, status:"Active", joined:"11 Apr 2027",
   dob:"22 Nov 2003", gender:"Male", address:"56 Vaishali", city:"Jaipur", state:"Rajasthan", pincode:"302021",
   guardianName:"Mahendra Singh", guardianPhone:"+91 98456 30987", qualification:"B.E. Computer Engineering",
   idType:"PAN", idNumber:"UVWXY1234Z", notes:"Security researcher."},
  {id:43, name:"Megha Patel", email:"megha.p@example.com", phone:"+91 98765 44332", courseId:8, batchId:8, status:"Active", joined:"10 Apr 2027",
   dob:"19 Sep 2004", gender:"Female", address:"78 Satellite Road", city:"Ahmedabad", state:"Gujarat", pincode:"380015",
   guardianName:"Dinesh Patel", guardianPhone:"+91 98765 22334", qualification:"B.Tech Information Technology",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-0123", notes:""},
  {id:44, name:"Rahul Jain", email:"rahul.j@example.com", phone:"+91 98222 33445", courseId:9, batchId:9, status:"Active", joined:"20 Nov 2026",
   dob:"31 Mar 2004", gender:"Male", address:"45 M.G. Road", city:"Indore", state:"Madhya Pradesh", pincode:"452001",
   guardianName:"Sanjay Jain", guardianPhone:"+91 98222 55443", qualification:"B.Tech Computer Science",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-2345", notes:"AI & Data Science Certificate student."},
  {id:45, name:"Sonali Desai", email:"sonali.d@example.com", phone:"+91 98330 88776", courseId:9, batchId:9, status:"Active", joined:"20 Nov 2026",
   dob:"14 May 2005", gender:"Female", address:"23 Kothrud", city:"Pune", state:"Maharashtra", pincode:"411038",
   guardianName:"Avinash Desai", guardianPhone:"+91 98330 66775", qualification:"B.Sc. Computer Science",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-3456", notes:"Data science focus."},
  {id:46, name:"Ajay Kumar", email:"ajay.k@example.com", phone:"+91 98450 99887", courseId:9, batchId:9, status:"Active", joined:"21 Nov 2026",
   dob:"27 Jul 2003", gender:"Male", address:"89 Boring Road", city:"Patna", state:"Bihar", pincode:"800001",
   guardianName:"Suresh Kumar", guardianPhone:"+91 98450 88997", qualification:"B.Tech Computer Engineering",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-4567", notes:"Mathematics background."},
  {id:47, name:"Ritu Gupta", email:"ritu.g@example.com", phone:"+91 98765 22110", courseId:9, batchId:9, status:"Active", joined:"20 Nov 2026",
   dob:"10 Oct 2004", gender:"Female", address:"12 Civil Lines", city:"Kanpur", state:"Uttar Pradesh", pincode:"208001",
   guardianName:"Rakesh Gupta", guardianPhone:"+91 98765 11002", qualification:"B.E. Information Technology",
   idType:"PAN", idNumber:"ABCDE6789F", notes:"Deep learning enthusiast."},
  {id:48, name:"Sunny Singh", email:"sunny.s@example.com", phone:"+91 98234 56780", courseId:9, batchId:9, status:"Active", joined:"21 Nov 2026",
   dob:"16 Dec 2004", gender:"Male", address:"45 Park Avenue", city:"Chandigarh", state:"Chandigarh", pincode:"160017",
   guardianName:"Gurvinder Singh", guardianPhone:"+91 98234 08765", qualification:"B.Tech Computer Science",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-5678", notes:""},
  {id:49, name:"Divya Sharma", email:"divya.sh@example.com", phone:"+91 98345 67892", courseId:9, batchId:9, status:"Active", joined:"20 Nov 2026",
   dob:"08 Feb 2005", gender:"Female", address:"67 Sector 22", city:"Noida", state:"Uttar Pradesh", pincode:"201301",
   guardianName:"Ramesh Sharma", guardianPhone:"+91 98345 29876", qualification:"B.Sc. Statistics",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-6789", notes:"Statistics background."},
  {id:50, name:"Manoj Verma", email:"manoj.v@example.com", phone:"+91 98456 78904", courseId:9, batchId:9, status:"Active", joined:"21 Nov 2026",
   dob:"23 Apr 2004", gender:"Male", address:"78 Rajendra Nagar", city:"Lucknow", state:"Uttar Pradesh", pincode:"226001",
   guardianName:"Raj Verma", guardianPhone:"+91 98456 40987", qualification:"B.Tech Computer Engineering",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-7890", notes:""},
  {id:51, name:"Neeraj Singh", email:"neeraj.s@example.com", phone:"+91 98765 55443", courseId:1, batchId:1, status:"Active", joined:"05 Jan 2027",
   dob:"18 Nov 2003", gender:"Male", address:"12 Ashok Nagar", city:"Delhi", state:"Delhi", pincode:"110001",
   guardianName:"Rajan Singh", guardianPhone:"+91 98765 44335", qualification:"B.Tech Computer Science",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-1234", notes:""},
  {id:52, name:"Pallavi Nair", email:"pallavi.n@example.com", phone:"+91 98200 11220", courseId:1, batchId:2, status:"Active", joined:"06 Jan 2027",
   dob:"25 May 2004", gender:"Female", address:"45 Vile Parle", city:"Mumbai", state:"Maharashtra", pincode:"400056",
   guardianName:"Raman Nair", guardianPhone:"+91 98200 99883", qualification:"B.E. Computer Science",
   idType:"PAN", idNumber:"FGHIJ9101K", notes:""},
  {id:53, name:"Avinash Gupta", email:"avinash.g@example.com", phone:"+91 98330 44557", courseId:1, batchId:1, status:"Active", joined:"05 Jan 2027",
   dob:"02 Jul 2003", gender:"Male", address:"34 Kailash Colony", city:"Delhi", state:"Delhi", pincode:"110048",
   guardianName:"Rajeev Gupta", guardianPhone:"+91 98330 11008", qualification:"B.Tech Information Technology",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-5678", notes:""},
  {id:54, name:"Smita Patil", email:"smita.p@example.com", phone:"+91 98450 66779", courseId:1, batchId:1, status:"Active", joined:"05 Jan 2027",
   dob:"13 Aug 2004", gender:"Female", address:"56 Shivaji Park", city:"Kolhapur", state:"Maharashtra", pincode:"416001",
   guardianName:"Suresh Patil", guardianPhone:"+91 98450 11222", qualification:"B.Tech Computer Science",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-8901", notes:"Scholarship candidate."},
  {id:55, name:"Kunal Verma", email:"kunal.v@example.com", phone:"+91 98765 43211", courseId:1, batchId:2, status:"Active", joined:"06 Jan 2027",
   dob:"19 Mar 2004", gender:"Male", address:"78 Civil Lines", city:"Nagpur", state:"Maharashtra", pincode:"440001",
   guardianName:"Sanjay Verma", guardianPhone:"+91 98765 10987", qualification:"B.E. Information Technology",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-0123", notes:""},
  {id:56, name:"Ritu Jain", email:"ritu.j@example.com", phone:"+91 98222 33446", courseId:1, batchId:1, status:"Active", joined:"05 Jan 2027",
   dob:"06 Nov 2003", gender:"Female", address:"23 Malviya Nagar", city:"Jaipur", state:"Rajasthan", pincode:"302017",
   guardianName:"Ramesh Jain", guardianPhone:"+91 98222 55442", qualification:"B.Tech Computer Engineering",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-4567", notes:""},
  {id:57, name:"Vikram Reddy", email:"vikram.r@example.com", phone:"+91 98345 67893", courseId:4, batchId:4, status:"Active", joined:"15 Mar 2027",
   dob:"27 Oct 2004", gender:"Male", address:"45 Banjara Hills", city:"Hyderabad", state:"Telangana", pincode:"500034",
   guardianName:"Prakash Reddy", guardianPhone:"+91 98345 39876", qualification:"B.Tech Computer Science",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-8901", notes:"Python expert."},
  {id:58, name:"Nandita Menon", email:"nandita.m@example.com", phone:"+91 98456 78905", courseId:4, batchId:4, status:"Active", joined:"16 Mar 2027",
   dob:"04 Jan 2005", gender:"Female", address:"12 Juhu Road", city:"Mumbai", state:"Maharashtra", pincode:"400049",
   guardianName:"Mohan Menon", guardianPhone:"+91 98456 50987", qualification:"B.Sc. Computer Science",
   idType:"PAN", idNumber:"LMNOP5678Q", notes:"Data science background."},
  {id:59, name:"Suresh Patel", email:"suresh.p@example.com", phone:"+91 98765 44333", courseId:5, batchId:5, status:"Active", joined:"20 Aug 2026",
   dob:"08 Sep 2004", gender:"Male", address:"67 Satellite Road", city:"Ahmedabad", state:"Gujarat", pincode:"380015",
   guardianName:"Nitin Patel", guardianPhone:"+91 98765 33344", qualification:"B.Tech Computer Engineering",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-2345", notes:"Database administrator."},
  {id:60, name:"Swati Deshmukh", email:"swati.d@example.com", phone:"+91 98200 88996", courseId:6, batchId:6, status:"Active", joined:"15 Oct 2026",
   dob:"16 Apr 2004", gender:"Female", address:"89 Koregaon Park", city:"Pune", state:"Maharashtra", pincode:"411001",
   guardianName:"Sanjay Deshmukh", guardianPhone:"+91 98200 79980", qualification:"B.Tech Information Technology",
   idType:"Aadhaar", idNumber:"XXXX-XXXX-6789", notes:"Network administrator."},
];

/* Lecture Schedule — used by the "Schedule" tab inside each Course.
   date is stored as "YYYY-MM-DD" and times as 24h "HH:MM" so they sort/compare cleanly. */
let LECTURES = [
  {id:1, courseId:1, batchId:1, topic:"Engineering Mathematics — Limits & Continuity", date:"2027-01-05", start:"09:00", end:"10:30", platform:"Google Meet", link:"https://meet.google.com/abc-defg-hij", facultyId:1, notes:"", status:"Scheduled"},
  {id:2, courseId:1, batchId:2, topic:"Engineering Mathematics — Limits & Continuity", date:"2027-01-06", start:"18:00", end:"19:30", platform:"Google Meet", link:"https://meet.google.com/abc-defg-hij", facultyId:1, notes:"", status:"Scheduled"},
  {id:3, courseId:1, batchId:1, topic:"Discrete Mathematics — Set Theory", date:"2027-01-08", start:"09:00", end:"10:30", platform:"Zoom", link:"https://zoom.us/j/1234567890", facultyId:2, notes:"", status:"Scheduled"},
  {id:4, courseId:2, batchId:3, topic:"Arrays & Recursion — Basics", date:"2026-09-12", start:"11:00", end:"12:30", platform:"Zoom", link:"https://zoom.us/j/9876543210", facultyId:2, notes:"Bring previous-year problem set", status:"Completed"},
  {id:5, courseId:1, batchId:1, topic:"Discrete Mathematics — Relations & Functions", date:"2027-01-12", start:"09:00", end:"10:30", platform:"Google Meet", link:"https://meet.google.com/abc-defg-hij", facultyId:2, notes:"", status:"Scheduled"},
  {id:6, courseId:1, batchId:2, topic:"Discrete Mathematics — Relations & Functions", date:"2027-01-13", start:"18:00", end:"19:30", platform:"Google Meet", link:"https://meet.google.com/abc-defg-hij", facultyId:2, notes:"", status:"Scheduled"},
  {id:7, courseId:1, batchId:1, topic:"Theory of Computation — Finite Automata", date:"2027-01-15", start:"09:00", end:"10:30", platform:"Zoom", link:"https://zoom.us/j/1234567891", facultyId:3, notes:"", status:"Scheduled"},
  {id:8, courseId:1, batchId:2, topic:"Theory of Computation — Finite Automata", date:"2027-01-16", start:"18:00", end:"19:30", platform:"Zoom", link:"https://zoom.us/j/1234567891", facultyId:3, notes:"", status:"Scheduled"},
  {id:9, courseId:4, batchId:4, topic:"ML Fundamentals — Linear Regression", date:"2027-03-17", start:"10:00", end:"11:30", platform:"Google Meet", link:"https://meet.google.com/def-ghij-klm", facultyId:5, notes:"", status:"Scheduled"},
  {id:10, courseId:4, batchId:4, topic:"ML Fundamentals — Classification", date:"2027-03-19", start:"10:00", end:"11:30", platform:"Google Meet", link:"https://meet.google.com/def-ghij-klm", facultyId:5, notes:"", status:"Scheduled"},
  {id:11, courseId:5, batchId:5, topic:"Database Design — ER Models", date:"2026-08-22", start:"14:00", end:"15:30", platform:"Zoom", link:"https://zoom.us/j/9876543211", facultyId:6, notes:"", status:"Completed"},
  {id:12, courseId:5, batchId:5, topic:"Database Design — Normalization", date:"2026-08-29", start:"14:00", end:"15:30", platform:"Zoom", link:"https://zoom.us/j/9876543211", facultyId:6, notes:"", status:"Completed"},
  {id:13, courseId:9, batchId:9, topic:"Data Science — Preprocessing", date:"2026-11-22", start:"11:00", end:"12:30", platform:"Google Meet", link:"https://meet.google.com/nop-qrst-uvw", facultyId:5, notes:"", status:"Completed"},
  {id:14, courseId:9, batchId:9, topic:"Data Science — EDA", date:"2026-11-24", start:"11:00", end:"12:30", platform:"Google Meet", link:"https://meet.google.com/nop-qrst-uvw", facultyId:5, notes:"", status:"Scheduled"},
  {id:15, courseId:9, batchId:9, topic:"Deep Learning — Neural Networks Intro", date:"2026-11-29", start:"11:00", end:"12:30", platform:"Google Meet", link:"https://meet.google.com/nop-qrst-uvw", facultyId:5, notes:"", status:"Scheduled"},
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
  {id:6, recipientType:"staff", recipientId:5, type:"Assignment", message:"ML Bootcamp syllabus update has been assigned for your review.", createdAt:"Today, 11:20 AM", createdBy:1, status:"U"},
  {id:7, recipientType:"student", recipientId:24, type:"Batch Update", message:"Your ML Bootcamp 2027 session begins tomorrow at 10:00 AM.", createdAt:"Today, 10:45 AM", createdBy:5, status:"U"},
  {id:8, recipientType:"staff", recipientId:6, type:"Review Queue", message:"3 new student documents uploaded for Database Administration certificate.", createdAt:"Today, 9:30 AM", createdBy:4, status:"U"},
  {id:9, recipientType:"staff", recipientId:8, type:"Assignment", message:"Network Engineering module content revision due this week.", createdAt:"Yesterday, 4:20 PM", createdBy:1, status:"R"},
  {id:10, recipientType:"student", recipientId:31, type:"Payment", message:"DBA Certificate payment confirmation received for installment 2.", createdAt:"2 days ago", createdBy:6, status:"R"},
  {id:11, recipientType:"staff", recipientId:5, type:"Assignment", message:"AI curriculum review meeting scheduled for tomorrow at 3 PM.", createdAt:"Today, 1:15 PM", createdBy:1, status:"U"},
  {id:12, recipientType:"student", recipientId:44, type:"Batch Update", message:"AI & Data Science certificate class rescheduled to 1 PM tomorrow.", createdAt:"Today, 12:00 PM", createdBy:5, status:"U"},
  {id:13, recipientType:"staff", recipientId:9, type:"System", message:"Software Engineering course materials backup completed successfully.", createdAt:"3 days ago", createdBy:0, status:"R"},
  {id:14, recipientType:"student", recipientId:2, type:"Batch Update", message:"Evening batch schedule updated for this week.", createdAt:"Yesterday, 8:30 PM", createdBy:1, status:"R"},
  {id:15, recipientType:"staff", recipientId:7, type:"Review Queue", message:"New cybersecurity audit report awaiting your review.", createdAt:"Today, 8:15 AM", createdBy:4, status:"U"},
];

let STAFF = [
  {id:1, name:"Animesh Adhikari", email:"animesh@adhikariacademy.in", role:"Super Admin", status:"Active"},
  {id:2, name:"Dr. R. K. Menon", email:"rk.menon@adhikariacademy.in", role:"Faculty", status:"Active"},
  {id:3, name:"Prof. Anjali Deshpande", email:"anjali.d@adhikariacademy.in", role:"Faculty", status:"Active"},
  {id:4, name:"Neha Kapoor", email:"neha.kapoor@adhikariacademy.in", role:"Management", status:"Active"},
  {id:5, name:"Sohel", email:"sohel.reviewer@adhikariacademy.in", role:"Reviewer", status:"Inactive"},
  {id:6, name:"Dr. Vikram Singh", email:"vikram.singh@adhikariacademy.in", role:"Faculty", status:"Active"},
  {id:7, name:"Prof. Sunita Reddy", email:"sunita.reddy@adhikariacademy.in", role:"Faculty", status:"Active"},
  {id:8, name:"Dr. Arjun Mehta", email:"arjun.mehta@adhikariacademy.in", role:"Faculty", status:"Active"},
  {id:9, name:"Prof. David D'Souza", email:"david.dsouza@adhikariacademy.in", role:"Faculty", status:"Active"},
  {id:10, name:"Dr. Lakshmi Nair", email:"lakshmi.nair@adhikariacademy.in", role:"Faculty", status:"Active"},
  {id:11, name:"Prof. Gautam Bose", email:"gautam.bose@adhikariacademy.in", role:"Faculty", status:"Active"},
  {id:12, name:"Ravi Sharma", email:"ravi.sharma@adhikariacademy.in", role:"Management", status:"Active"},
  {id:13, name:"Priya Mehta", email:"priya.mehta@adhikariacademy.in", role:"Reviewer", status:"Active"},
  {id:14, name:"Sanjay Kumar", email:"sanjay.kumar@adhikariacademy.in", role:"Management", status:"Active"},
  {id:15, name:"Meera Patel", email:"meera.patel@adhikariacademy.in", role:"Reviewer", status:"Active"},
];

let REVIEWS = [
  {id:1, student:"Divya Kulkarni", docType:"ID Proof (Aadhaar)", context:"Certificate in Data Structures & Algorithms", submitted:"14 Sep 2026", status:"Pending"},
  {id:2, student:"Aman Gupta", docType:"Testimonial Submission", context:"GATE CS/IT Live Coaching 2027", submitted:"Yesterday, 6:40 PM", status:"Pending"},
  {id:3, student:"Priya Nair", docType:"Eligibility Certificate", context:"GATE CS/IT Live Coaching 2027", submitted:"3 days ago", status:"Approved"},
  {id:4, student:"Rahul Fernandes", docType:"ID Proof (PAN)", context:"GATE CS/IT Live Coaching 2027", submitted:"5 days ago", status:"Rejected"},
  {id:5, student:"Aisha Khan", docType:"Academic Transcript", context:"Certificate in Data Structures & Algorithms", submitted:"2 days ago", status:"Pending"},
  {id:6, student:"Rohit Singh", docType:"Work Experience", context:"ML Bootcamp 2027", submitted:"Yesterday, 10:15 AM", status:"Pending"},
  {id:7, student:"Suresh Kumar", docType:"ID Proof (Aadhaar)", context:"ML Bootcamp 2027", submitted:"3 days ago", status:"Approved"},
  {id:8, student:"Neha Sharma", docType:"Qualification Certificate", context:"GATE CS/IT Live Coaching 2027", submitted:"1 week ago", status:"Pending"},
  {id:9, student:"Kunal Gupta", docType:"Work Experience", context:"Database Administration Certificate", submitted:"4 days ago", status:"Approved"},
  {id:10, student:"Maya Krishnan", docType:"Academic Transcript", context:"Database Administration Certificate", submitted:"2 days ago", status:"Rejected"},
  {id:11, student:"Vikram Singh", docType:"ID Proof (PAN)", context:"Network Engineering Certificate", submitted:"Yesterday, 3:45 PM", status:"Pending"},
  {id:12, student:"Swati Deshmukh", docType:"Qualification Certificate", context:"Network Engineering Certificate", submitted:"1 day ago", status:"Pending"},
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
    {id:5, label:"Books Sold", value:"12,456"},
    {id:6, label:"Live Courses", value:"8"},
    {id:7, label:"Certified Alumni", value:"2,341"},
    {id:8, label:"Success Stories", value:"1,287"},
    {id:9, label:"Average Rating", value:"4.8"},
    {id:10, label:"Reviews", value:"3,567"},
  ],
  testimonials:[
    {id:1, name:"Priya Nair", role:"GATE CS 2027 Aspirant", quote:"The Discrete Mathematics book alone reshaped how I approach proofs — worth every rupee.", rating:5, photo:""},
    {id:2, name:"Rahul Fernandes", role:"GATE CS 2027 Aspirant", quote:"Live coaching sessions are paced perfectly for working through previous-year papers.", rating:5, photo:""},
    {id:3, name:"Dr. Vikram Singh", role:"Alumnus & Faculty", quote:"The Theory of Computation Simplified book is the best resource I've encountered for automata theory.", rating:5, photo:""},
    {id:4, name:"Neha Sharma", role:"Data Scientist", quote:"The ML Bootcamp completely transformed my career trajectory. Highly recommended!", rating:5, photo:""},
    {id:5, name:"Prof. David D'Souza", role:"Network Engineer", quote:"The Computer Networks book is comprehensive and up-to-date with modern technologies.", rating:4, photo:""},
    {id:6, name:"Suresh Kumar", role:"Database Administrator", quote:"The Database Systems book covers everything from fundamentals to advanced concepts.", rating:5, photo:""},
    {id:7, name:"Anjali Shah", role:"Software Engineer", quote:"The DSA Interview Prep Pack helped me ace my Google interview!", rating:5, photo:""},
    {id:8, name:"Rohit Singh", role:"AI Researcher", quote:"The AI & Machine Learning Series is exceptional for building a strong foundation.", rating:4, photo:""},
    {id:9, name:"Maya Krishnan", role:"Cybersecurity Analyst", quote:"The Cybersecurity Essentials course gave me practical skills I use daily at work.", rating:5, photo:""},
    {id:10, name:"Kunal Gupta", role:"Cloud Architect", quote:"The Cloud Computing module was incredibly practical and well-structured.", rating:4, photo:""},
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