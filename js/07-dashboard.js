/* ============================================================
   DASHBOARD
   ============================================================ */
function renderDashboard(){
  const pendingReviews = REVIEWS.filter(r=>r.status==="Pending").length;
  const activeStudents = STUDENTS.filter(s=>s.status==="Active").length;
  const activeCourses = COURSES.filter(c=>c.status==="Active").length;
  const publishedBooks = BOOKS.filter(b=>b.status==="Published").length;
  const totalRevenue = 845000; // Mock total revenue
  const totalSubscribers = BOOKS.reduce((sum, b) => sum + b.activeSubs, 0);
  const totalEnrollments = STUDENTS.length;
  const completionRate = Math.round((STUDENTS.filter(s=>s.status==="Graduated").length / STUDENTS.length) * 100);
  
  // Calculate monthly revenue trend (mock data based on actual enrollment patterns)
  const monthlyRevenue = [
    {month: "Jan", revenue: 62000, target: 58000},
    {month: "Feb", revenue: 78000, target: 60000},
    {month: "Mar", revenue: 95000, target: 75000},
    {month: "Apr", revenue: 112000, target: 85000},
    {month: "May", revenue: 98000, target: 82000},
    {month: "Jun", revenue: 135000, target: 90000},
    {month: "Jul", revenue: 154000, target: 110000},
    {month: "Aug", revenue: 128000, target: 100000},
    {month: "Sep", revenue: 89000, target: 78000},
    {month: "Oct", revenue: 76000, target: 70000},
    {month: "Nov", revenue: 92000, target: 75000},
    {month: "Dec", revenue: 105000, target: 80000}
  ];

  // Course distribution for pie chart
  const courseTypeDistribution = {
    "Coaching": COURSES.filter(c => c.type === "Coaching").length,
    "Certificate": COURSES.filter(c => c.type === "Certificate").length,
    "Diploma": COURSES.filter(c => c.type === "Diploma").length
  };

  // Category distribution for books
  const bookCategories = {};
  BOOKS.forEach(b => {
    const cat = CATEGORIES.find(c => c.id === b.catId);
    if (cat) {
      bookCategories[cat.name] = (bookCategories[cat.name] || 0) + 1;
    }
  });

  // Recent enrollments (last 7 days)
  const recentEnrollments = STUDENTS.slice(0, 8);

  // Top performing books
  const topBooks = [...BOOKS].sort((a, b) => b.activeSubs - a.activeSubs).slice(0, 5);

  // Batch occupancy
  const batchStats = Object.values(BATCHES).map(b => ({
    ...b,
    occupancy: Math.round((b.seatsFilled / b.seatsTotal) * 100)
  }));

  document.getElementById('content').innerHTML = `
    <style>
      /* Dashboard-specific clean typography */
      .dashboard-content * {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      }
      
      .dashboard-content {
        padding: 0 4px;
      }
      
      .dashboard-content .kpi-value {
        font-weight: 600;
        letter-spacing: -0.02em;
        color: #0a0a0a;
      }
      
      .dashboard-content .stat-label {
        font-weight: 500;
        letter-spacing: 0.01em;
      }
      
      .dashboard-content .chart-label {
        font-weight: 500;
      }
      
      .progress-bar {
        background: #f2f2f2;
        border-radius: 4px;
        height: 4px;
        overflow: hidden;
        margin-top: 6px;
      }
      
      .progress-fill {
        background: #1a1a1a;
        height: 100%;
        border-radius: 4px;
        transition: width 0.8s ease;
      }
      
      .progress-fill.orange {
        background: #d46b1a;
      }
      
      .progress-fill.green {
        background: #1a7a3a;
      }
      
      .progress-fill.red {
        background: #b33a3a;
      }
      
      .mini-stat {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 0;
      }
      
      .mini-stat .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        display: inline-block;
        flex-shrink: 0;
      }
      
      .mini-stat .dot.blue { background: #1a1a8a; }
      .mini-stat .dot.green { background: #1a7a3a; }
      .mini-stat .dot.orange { background: #d46b1a; }
      .mini-stat .dot.red { background: #b33a3a; }
      
      .trend-up { color: #1a7a3a; }
      .trend-down { color: #b33a3a; }
      
      .pie-visual {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 24px;
        flex-wrap: wrap;
      }
      
      .pie-legend {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      .pie-legend-item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 13px;
        color: #1a1a1a;
      }
      
      .pie-color {
        width: 12px;
        height: 12px;
        border-radius: 2px;
        display: inline-block;
      }
      
      .donut-chart {
        position: relative;
        width: 140px;
        height: 140px;
      }
      
      .donut-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
      }
      
      .donut-center .number {
        font-size: 24px;
        font-weight: 600;
        color: #0a0a0a;
      }
      
      .donut-center .label {
        font-size: 11px;
        color: #666;
      }
      
      .stat-card-mini {
        background: white;
        border-radius: 8px;
        padding: 20px;
        border: 1px solid #e8e8e8;
        transition: all 0.2s ease;
      }
      
      .stat-card-mini:hover {
        border-color: #ccc;
      }
      
      .stat-card-mini .number {
        font-size: 28px;
        font-weight: 600;
        color: #0a0a0a;
        letter-spacing: -0.02em;
      }
      
      .stat-card-mini .label {
        font-size: 13px;
        color: #666;
        margin-top: 4px;
      }
      
      .badge-status {
        display: inline-block;
        padding: 2px 10px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 500;
      }
      
      .badge-status.active { background: #e6f2ea; color: #1a7a3a; }
      .badge-status.draft { background: #f5f0e6; color: #8a6d1a; }
      .badge-status.pending { background: #f5f0e6; color: #8a6d1a; }
      .badge-status.published { background: #e6eaf2; color: #1a3a7a; }
      .badge-status.graduated { background: #e6f2ea; color: #1a7a3a; }
      
      .grid-3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        margin-bottom: 24px;
      }
      
      .grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-bottom: 24px;
      }
      
      .page-head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 28px;
        flex-wrap: wrap;
        gap: 16px;
      }
      
      .page-head h1 {
        font-size: 24px;
        font-weight: 600;
        color: #0a0a0a;
        letter-spacing: -0.02em;
        margin: 0 0 4px 0;
      }
      
      .page-head p {
        color: #666;
        font-size: 14px;
        margin: 0;
      }
      
      .kpi-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        margin-bottom: 24px;
      }
      
      .kpi-card {
        background: white;
        border-radius: 8px;
        padding: 20px;
        border: 1px solid #e8e8e8;
        transition: all 0.2s ease;
      }
      
      .kpi-card:hover {
        border-color: #ccc;
      }
      
      .kpi-card .kpi-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }
      
      .kpi-card .kpi-icon {
        width: 36px;
        height: 36px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        background: #f5f5f5;
        color: #0a0a0a;
      }
      
      .kpi-card .kpi-label {
        font-size: 13px;
        color: #666;
        margin-bottom: 4px;
      }
      
      .kpi-card .kpi-value {
        font-size: 28px;
        font-weight: 600;
        color: #0a0a0a;
        letter-spacing: -0.02em;
      }
      
      .kpi-card .kpi-sub {
        font-size: 12px;
        color: #888;
        margin-top: 4px;
      }
      
      .kpi-card .kpi-trend {
        font-size: 12px;
        font-weight: 500;
        padding: 2px 8px;
        border-radius: 12px;
        background: #f5f5f5;
      }
      
      .kpi-card .kpi-trend.trend-up {
        color: #1a7a3a;
        background: #e6f2ea;
      }
      
      .kpi-card .kpi-trend.trend-down {
        color: #b33a3a;
        background: #f2e6e6;
      }
      
      .card {
        background: white;
        border-radius: 8px;
        border: 1px solid #e8e8e8;
        overflow: hidden;
      }
      
      .card .card-head {
        padding: 20px 24px 16px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f0f0f0;
      }
      
      .card .card-head h3 {
        font-size: 15px;
        font-weight: 600;
        color: #0a0a0a;
        margin: 0;
      }
      
      .card .card-head .muted-note {
        font-size: 12px;
        color: #888;
      }
      
      .card .card-body {
        padding: 20px 24px 24px 24px;
      }
      
      .pill-select {
        padding: 4px 12px;
        border-radius: 16px;
        border: 1px solid #e0e0e0;
        background: white;
        font-size: 12px;
        color: #333;
        cursor: pointer;
        outline: none;
      }
      
      .pill-select:focus {
        border-color: #999;
      }
      
      .chart-bars {
        display: flex;
        height: 200px;
        align-items: flex-end;
        gap: 8px;
        padding-top: 20px;
      }
      
      .bar-col {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
      }
      
      .bar-col .bar {
        width: 60%;
        border-radius: 3px 3px 1px 1px;
        transition: height 0.6s ease;
        min-height: 4px;
        position: relative;
      }
      
      .bar-col .bar .bar-value {
        position: absolute;
        top: -18px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 10px;
        font-weight: 500;
        color: #333;
        white-space: nowrap;
      }
      
      .bar-col .bar-label {
        font-size: 11px;
        font-weight: 500;
        color: #888;
        margin-top: 6px;
      }
      
      .activity-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      .activity-list li {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 0;
        border-bottom: 1px solid #f5f5f5;
      }
      
      .activity-list li:last-child {
        border-bottom: none;
      }
      
      .activity-list .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        font-size: 13px;
        color: #333;
        flex-shrink: 0;
      }
      
      .activity-list .student-name {
        font-weight: 500;
        font-size: 14px;
        color: #0a0a0a;
      }
      
      .activity-list .student-detail {
        font-size: 12px;
        color: #888;
      }
      
      .btn-primary {
        background: #0a0a0a;
        color: white;
        border: none;
        padding: 8px 20px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      
      .btn-primary:hover {
        background: #1a1a1a;
      }
      
      .btn-outline {
        background: transparent;
        color: #333;
        border: 1px solid #d0d0d0;
        padding: 8px 20px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      
      .btn-outline:hover {
        background: #f5f5f5;
        border-color: #bbb;
      }
      
      @media (max-width: 1200px) {
        .kpi-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      @media (max-width: 992px) {
        .grid-2 {
          grid-template-columns: 1fr;
        }
      }
      
      @media (max-width: 768px) {
        .kpi-grid {
          grid-template-columns: 1fr;
        }
        .grid-3 {
          grid-template-columns: 1fr;
        }
        .page-head {
          flex-direction: column;
          align-items: flex-start;
        }
        .page-head h1 {
          font-size: 20px;
        }
        .chart-bars {
          height: 150px;
        }
      }
    </style>

    <div class="dashboard-content">
      ${crumbs([{label:"Home"},{label:"Dashboard"}])}
      
      <div class="page-head">
        <div>
          <h1>Welcome back, ${esc(SESSION.name.split(" ")[0])}</h1>
          <p>${esc(SESSION.role)} · Academy performance overview</p>
        </div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button class="btn-primary" onclick="openQuickAddMenu()">+ Quick action</button>
          <button class="btn-outline" onclick="alert('Exporting report...')">Export</button>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-top">
            <div class="kpi-icon">₹</div>
            <span class="kpi-trend trend-up">+12.4%</span>
          </div>
          <div class="kpi-label">Total Revenue</div>
          <div class="kpi-value">₹${(totalRevenue/1000).toFixed(1)}L</div>
          <div class="kpi-sub">vs ₹7.52L last month</div>
        </div>
        
        <div class="kpi-card">
          <div class="kpi-top">
            <div class="kpi-icon">👤</div>
            <span class="kpi-trend trend-up">+${activeStudents - 112} this week</span>
          </div>
          <div class="kpi-label">Active Students</div>
          <div class="kpi-value">${activeStudents}</div>
          <div class="kpi-sub">Across ${Object.keys(BATCHES).length} batches</div>
        </div>
        
        <div class="kpi-card">
          <div class="kpi-top">
            <div class="kpi-icon">📖</div>
            <span class="kpi-trend trend-up">+${totalSubscribers}</span>
          </div>
          <div class="kpi-label">Total Subscribers</div>
          <div class="kpi-value">${totalSubscribers.toLocaleString()}</div>
          <div class="kpi-sub">Across ${publishedBooks} published books</div>
        </div>
        
        <div class="kpi-card">
          <div class="kpi-top">
            <div class="kpi-icon">⏳</div>
            <span class="kpi-trend ${pendingReviews > 0 ? 'trend-down' : 'trend-up'}">${pendingReviews > 0 ? '⚠' : '✓'} ${pendingReviews} pending</span>
          </div>
          <div class="kpi-label">Review Queue</div>
          <div class="kpi-value">${pendingReviews}</div>
          <div class="kpi-sub">Documents awaiting approval</div>
        </div>
      </div>

      <!-- Mini Stats Row -->
      <div class="grid-3">
        <div class="stat-card-mini">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="number">${publishedBooks}</div>
              <div class="label">Published Books</div>
            </div>
            <span style="font-size: 24px; opacity: 0.5;">📚</span>
          </div>
          <div class="mini-stat">
            <span class="dot green"></span>
            <span style="font-size: 13px; color: #666;">${BOOKS.filter(b => b.status === 'Draft').length} in draft</span>
          </div>
        </div>
        
        <div class="stat-card-mini">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="number">${activeCourses}</div>
              <div class="label">Active Courses</div>
            </div>
            <span style="font-size: 24px; opacity: 0.5;">🎓</span>
          </div>
          <div class="mini-stat">
            <span class="dot blue"></span>
            <span style="font-size: 13px; color: #666;">${COURSES.filter(c => c.status === 'Draft').length} in draft</span>
          </div>
        </div>
        
        <div class="stat-card-mini">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="number">${completionRate}%</div>
              <div class="label">Graduation Rate</div>
            </div>
            <span style="font-size: 24px; opacity: 0.5;">🏆</span>
          </div>
          <div class="mini-stat">
            <span class="dot orange"></span>
            <span style="font-size: 13px; color: #666;">${STUDENTS.filter(s => s.status === 'Graduated').length} graduates</span>
          </div>
        </div>
      </div>

      <!-- Main Charts Row -->
      <div class="grid-2">
        <!-- Revenue Chart -->
        <div class="card">
          <div class="card-head">
            <div>
              <h3>Revenue Overview</h3>
              <div class="muted-note">Monthly performance vs targets</div>
            </div>
            <select class="pill-select">
              <option>This year</option>
              <option>Last year</option>
            </select>
          </div>
          <div class="card-body">
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 13px;">
              <div><span style="color: #888;">Revenue</span> <span style="font-weight: 500; color: #0a0a0a;">●</span></div>
              <div><span style="color: #888;">Target</span> <span style="font-weight: 500; color: #d0d0d0;">●</span></div>
            </div>
            <div class="chart-bars">
              ${monthlyRevenue.slice(0, 8).map((m, i) => {
                const height = Math.round((m.revenue / Math.max(...monthlyRevenue.map(r => r.revenue))) * 100);
                const targetHeight = Math.round((m.target / Math.max(...monthlyRevenue.map(r => r.revenue))) * 100);
                return `
                  <div class="bar-col">
                    <div style="position: relative; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; align-items: center;">
                      <div style="position: relative; width: 100%; display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: flex-end;">
                        <div style="position: absolute; bottom: ${height}%; width: 100%;">
                          <div style="background: #e8e8e8; height: 2px; border-radius: 1px; width: 60%; margin: 0 auto;"></div>
                        </div>
                        <div class="bar" 
                             style="height: ${Math.max(height, 4)}%; background: ${height > 70 ? '#0a0a0a' : '#555'}; 
                                    width: 60%;">
                          <span class="bar-value">₹${(m.revenue/1000).toFixed(0)}K</span>
                        </div>
                      </div>
                    </div>
                    <span class="bar-label">${m.month}</span>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        </div>

        <!-- Course Distribution + Batch Occupancy -->
        <div class="card">
          <div class="card-head">
            <h3>Program Distribution</h3>
          </div>
          <div class="card-body">
            <div class="pie-visual">
              <div style="position: relative; width: 120px; height: 120px;">
                <svg viewBox="0 0 100 100" style="transform: rotate(-90deg);">
                  ${(() => {
                    const total = COURSES.length;
                    let currentAngle = 0;
                    const colors = ['#0a0a0a', '#2a5a3a', '#8a6d1a'];
                    const types = ['Coaching', 'Certificate', 'Diploma'];
                    const values = types.map(t => COURSES.filter(c => c.type === t).length);
                    
                    return types.map((type, idx) => {
                      const percentage = (values[idx] / total) * 100;
                      if (percentage === 0) return '';
                      const angle = (percentage / 100) * 360;
                      const startAngle = currentAngle;
                      const endAngle = currentAngle + angle;
                      currentAngle = endAngle;
                      
                      const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                      const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                      const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                      const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                      const largeArc = angle > 180 ? 1 : 0;
                      
                      return `<path d="M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z" 
                               fill="${colors[idx]}" stroke="white" stroke-width="2"/>`;
                    }).join('');
                  })()}
                </svg>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                  <div style="font-size: 20px; font-weight: 600; color: #0a0a0a;">${COURSES.length}</div>
                  <div style="font-size: 10px; color: #888;">Total</div>
                </div>
              </div>
              <div class="pie-legend">
                <div class="pie-legend-item">
                  <span class="pie-color" style="background: #0a0a0a;"></span>
                  <span>Coaching <strong>${courseTypeDistribution["Coaching"]}</strong></span>
                </div>
                <div class="pie-legend-item">
                  <span class="pie-color" style="background: #2a5a3a;"></span>
                  <span>Certificate <strong>${courseTypeDistribution["Certificate"]}</strong></span>
                </div>
                <div class="pie-legend-item">
                  <span class="pie-color" style="background: #8a6d1a;"></span>
                  <span>Diploma <strong>${courseTypeDistribution["Diploma"]}</strong></span>
                </div>
              </div>
            </div>
            <div style="margin-top: 20px; border-top: 1px solid #f0f0f0; padding-top: 20px;">
              <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 500; color: #666; margin-bottom: 10px;">
                <span>Batch Occupancy</span>
                <span>${Math.round(Object.values(BATCHES).reduce((sum, b) => sum + (b.seatsFilled / b.seatsTotal), 0) / Object.values(BATCHES).length * 100)}% Avg</span>
              </div>
              ${Object.values(BATCHES).slice(0, 4).map(b => {
                const occ = Math.round((b.seatsFilled / b.seatsTotal) * 100);
                const color = occ > 75 ? 'green' : occ > 50 ? 'orange' : 'red';
                return `
                  <div style="margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between; font-size: 12px;">
                      <span style="color: #555;">${b.intake}</span>
                      <span style="font-weight: 500; color: #0a0a0a;">${b.seatsFilled}/${b.seatsTotal}</span>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill ${color}" style="width: ${occ}%;"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Top Books & Recent Enrollments -->
      <div class="grid-2">
        <div class="card">
          <div class="card-head">
            <h3>Top Performing Books</h3>
            <div class="muted-note">By active subscribers</div>
          </div>
          <div class="card-body">
            ${topBooks.map((book, idx) => {
              const author = AUTHORS[book.authorId];
              const maxSubs = topBooks[0]?.activeSubs || 1;
              const width = Math.round((book.activeSubs / maxSubs) * 100);
              return `
                <div style="margin-bottom: 16px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0;">
                      <span style="font-size: 13px; font-weight: 500; color: #aaa; width: 20px; flex-shrink: 0;">#${idx + 1}</span>
                      <div style="min-width: 0; flex: 1;">
                        <div style="font-weight: 500; font-size: 14px; color: #0a0a0a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${book.title}</div>
                        <div style="font-size: 12px; color: #888;">${author ? author.name : 'Unknown'}</div>
                      </div>
                    </div>
                    <div style="text-align: right; flex-shrink: 0; margin-left: 12px;">
                      <div style="font-weight: 600; color: #0a0a0a; font-size: 14px;">${book.activeSubs}</div>
                      <div style="font-size: 10px; color: #aaa;">subscribers</div>
                    </div>
                  </div>
                  <div class="progress-bar" style="height: 3px;">
                    <div class="progress-fill" style="width: ${width}%; background: ${idx === 0 ? '#0a0a0a' : '#555'};"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="card">
          <div class="card-head">
            <h3>Recent Enrollments</h3>
            <div class="muted-note">Latest student activity</div>
          </div>
          <div class="card-body">
            <ul class="activity-list">
              ${recentEnrollments.slice(0, 6).map((student, idx) => {
                const course = COURSES.find(c => c.id === student.courseId);
                const batch = BATCHES[student.batchId];
                const initials = student.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                return `
                  <li>
                    <div class="avatar">${initials}</div>
                    <div style="flex: 1; min-width: 0;">
                      <div class="student-name">${student.name}</div>
                      <div class="student-detail">
                        ${course ? course.title : 'Unknown Course'} · 
                        ${batch ? batch.intake : 'Unknown Batch'}
                      </div>
                    </div>
                    <div>
                      <span class="badge-status ${student.status.toLowerCase()}">${student.status}</span>
                    </div>
                  </li>
                `;
              }).join('')}
            </ul>
          </div>
        </div>
      </div>

      <!-- Quick Stats Footer -->
      <div class="grid-2">
        <div class="card" style="background: #0a0a0a; color: white; border: none;">
          <div class="card-body" style="padding: 28px 32px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
              <div>
                <div style="font-size: 13px; opacity: 0.6; font-weight: 400;">Quick Stats</div>
                <div style="font-size: 32px; font-weight: 600; margin: 8px 0; letter-spacing: -0.02em;">${STUDENTS.length}</div>
                <div style="font-size: 14px; opacity: 0.7;">Total Students Enrolled</div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 13px; opacity: 0.6; font-weight: 400;">Graduation Rate</div>
                <div style="font-size: 32px; font-weight: 600; margin: 8px 0; letter-spacing: -0.02em;">${completionRate}%</div>
                <div style="font-size: 14px; opacity: 0.7;">${STUDENTS.filter(s => s.status === 'Graduated').length} Graduated</div>
              </div>
            </div>
            <div style="display: flex; gap: 32px; margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
              <div>
                <div style="font-size: 12px; opacity: 0.6;">Active Courses</div>
                <div style="font-size: 20px; font-weight: 600; margin-top: 2px;">${activeCourses}</div>
              </div>
              <div>
                <div style="font-size: 12px; opacity: 0.6;">Published Books</div>
                <div style="font-size: 20px; font-weight: 600; margin-top: 2px;">${publishedBooks}</div>
              </div>
              <div>
                <div style="font-size: 12px; opacity: 0.6;">Faculty</div>
                <div style="font-size: 20px; font-weight: 600; margin-top: 2px;">${Object.keys(AUTHORS).length}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-head">
            <h3>Growth Indicators</h3>
          </div>
          <div class="card-body">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div>
                <div style="font-size: 12px; color: #888;">Student Growth</div>
                <div style="font-size: 22px; font-weight: 600; color: #1a7a3a; letter-spacing: -0.02em;">+23%</div>
                <div style="font-size: 11px; color: #aaa;">vs last quarter</div>
              </div>
              <div>
                <div style="font-size: 12px; color: #888;">Revenue Growth</div>
                <div style="font-size: 22px; font-weight: 600; color: #0a0a0a; letter-spacing: -0.02em;">+18%</div>
                <div style="font-size: 11px; color: #aaa;">vs last quarter</div>
              </div>
              <div>
                <div style="font-size: 12px; color: #888;">Book Sales</div>
                <div style="font-size: 22px; font-weight: 600; color: #8a6d1a; letter-spacing: -0.02em;">+32%</div>
                <div style="font-size: 11px; color: #aaa;">vs last quarter</div>
              </div>
              <div>
                <div style="font-size: 12px; color: #888;">Engagement</div>
                <div style="font-size: 22px; font-weight: 600; color: #2a5a3a; letter-spacing: -0.02em;">87%</div>
                <div style="font-size: 11px; color: #aaa;">Average attendance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}