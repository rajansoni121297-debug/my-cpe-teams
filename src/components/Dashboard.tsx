import './Dashboard.css';

const quickAssignData = [
  { name: 'QuickBooks - QBO', level: 'Intermediate', questions: '20 MCQs', duration: '40' },
  { name: 'QuickBooks - QBO', level: 'Basic', questions: '20 MCQs', duration: '40' },
  { name: 'CCH Axcess + ProSystem fx Audit Software', level: 'Basic', questions: '20 MCQs', duration: '40' },
  { name: 'UltraTax Software', level: 'Basic', questions: '20 MCQs', duration: '40' },
  { name: 'Lacerte Tax Software', level: 'Basic', questions: '20 MCQs', duration: '40' },
  { name: 'Drake Tax Software', level: 'Basic', questions: '20 MCQs', duration: '40' },
];

const recentActivities = [
  { user: 'Manvi Jain', action: 'submitted', assessment: 'Governmental Accounting and Financial Reporting', time: 'March 19, 2026 | 04:54 PM IST' },
  { user: 'Manvi Jain', action: 'Viewed', assessment: 'Governmental Accounting and Financial Reporting', time: 'March 19, 2026 | 04:52 PM IST' },
  { user: 'Manvi Jain', action: 'submitted', assessment: 'Drake Tax Software', time: 'March 19, 2026 | 04:52 PM IST' },
  { user: 'Ethan Parker', action: 'submitted', assessment: 'NPO Audit', time: 'March 17, 2026 | 03:24 PM IST' },
  { user: 'Andrew Malcham', action: 'submitted', assessment: 'Governmental Accounting and Financial Reporting', time: 'March 17, 2026 | 03:24 PM IST' },
];

const topPerformers = [
  { rank: 1, name: 'Ethan Parker', score: 95, assessment: 'NPO Audit' },
  { rank: 2, name: 'Andrew Malcham', score: 88, assessment: 'Governmental Accounting' },
  { rank: 3, name: 'Priya Sharma', score: 85, assessment: 'QuickBooks - QBO' },
  { rank: 4, name: 'David Chen', score: 82, assessment: 'UltraTax Software' },
  { rank: 5, name: 'Manvi Jain', score: 78, assessment: 'Drake Tax Software' },
];

const upcomingDeadlines = [
  { name: 'Rajan Soni', date: 'Apr 18, 2026' },
  { name: 'Priya Sharma', date: 'Apr 22, 2026' },
  { name: 'David Chen', date: 'Apr 25, 2026' },
  { name: 'Ethan Parker', date: 'May 01, 2026' },
  { name: 'Andrew Malcham', date: 'May 10, 2026' },
];

const assessmentStats = [
  { label: 'Total Assessments', value: '24', color: '#7162EA' },
  { label: 'Avg Score', value: '76%', color: '#16a34a' },
  { label: 'Pass Rate', value: '40%', color: '#ea580c' },
];

const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32'];

const getInitials = (name: string) =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase();

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="dashboard-left">
          {/* Completion Rate Card */}
          <div className="dash-card">
            <h2 className="dash-card-title">Completion Rate</h2>
            <div className="completion-stats">
              <div className="stat-item">
                <span className="stat-label">Total Assigned</span>
                <span className="stat-value">8</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Finished</span>
                <span className="stat-value stat-green">6 <span className="stat-pct">(75%)</span></span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Pending</span>
                <span className="stat-value stat-orange">2 <span className="stat-pct">(25%)</span></span>
              </div>
            </div>

            <div className="outcome-section">
              <h3 className="outcome-title">Outcome of 6 Finished Users</h3>
              <div className="outcome-bars">
                <div className="outcome-row">
                  <span className="outcome-label outcome-label-pass">Pass</span>
                  <div className="outcome-bar-track">
                    <div className="outcome-bar outcome-bar-green" style={{ width: '0%' }}></div>
                  </div>
                  <span className="outcome-count">0</span>
                </div>
                <div className="outcome-row">
                  <span className="outcome-label outcome-label-fail">Failed</span>
                  <div className="outcome-bar-track">
                    <div className="outcome-bar outcome-bar-red" style={{ width: '100%' }}></div>
                  </div>
                  <span className="outcome-count">10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Assign Card */}
          <div className="dash-card">
            <div className="dash-card-header">
              <h2 className="dash-card-title">Quick Assign</h2>
              <button className="btn-view-all" onClick={() => onNavigate('assessments')}>View All</button>
            </div>
            <div className="quick-assign-table-wrap">
              <table className="quick-assign-table">
                <thead>
                  <tr>
                    <th>Assessment Name</th>
                    <th>Level</th>
                    <th>Questions</th>
                    <th>Duration (Min)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {quickAssignData.map((item, idx) => (
                    <tr key={idx}>
                      <td><span className="link-text">{item.name}</span></td>
                      <td>{item.level}</td>
                      <td>{item.questions}</td>
                      <td>{item.duration}</td>
                      <td><span className="link-purple">Assign</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Performers Card */}
          <div className="dash-card">
            <div className="dash-card-header">
              <h2 className="dash-card-title">Top Performers</h2>
              <button className="btn-view-all" onClick={() => onNavigate('reports')}>View All</button>
            </div>
            <div className="performers-list">
              {topPerformers.map((p) => (
                <div className="performer-item" key={p.rank}>
                  <span className="performer-rank" style={{ color: rankColors[p.rank - 1] || '#aaa' }}>
                    #{p.rank}
                  </span>
                  <div className="performer-avatar">{getInitials(p.name)}</div>
                  <div className="performer-info">
                    <span className="performer-name">{p.name}</span>
                    <span className="performer-assessment">{p.assessment}</span>
                  </div>
                  <span className="performer-score">{p.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="dashboard-right">
          {/* Recent Activity Card */}
          <div className="dash-card">
            <div className="dash-card-header">
              <h2 className="dash-card-title">Recent Activity</h2>
              <button className="btn-view-all" onClick={() => onNavigate('reports')}>View All</button>
            </div>
            <div className="activity-list">
              {recentActivities.map((item, idx) => (
                <div className="activity-item" key={idx}>
                  <div className="activity-content">
                    <p className="activity-text">
                      <span className="link-text">{item.user}</span>
                      {' '}{item.action}{' '}
                      <span className="link-text">{item.assessment}</span>
                    </p>
                    <span className="activity-time">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines Card */}
          <div className="dash-card">
            <div className="dash-card-header">
              <h2 className="dash-card-title">Upcoming Deadlines</h2>
              <button className="btn-view-all">View All</button>
            </div>
            <div className="deadline-list">
              {upcomingDeadlines.map((d, idx) => (
                <div className="deadline-item" key={idx}>
                  <span className="deadline-name">{d.name}</span>
                  <span className="deadline-date">{d.date}</span>
                  <button className="action-icon-btn" title="View">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7162EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment Stats Card */}
          <div className="dash-card">
            <h2 className="dash-card-title" style={{ marginBottom: '16px' }}>Assessment Statistics</h2>
            <div className="assessment-stats-grid">
              {assessmentStats.map((s) => (
                <div className="assessment-stat-item" key={s.label}>
                  <span className="assessment-stat-value" style={{ color: s.color }}>{s.value}</span>
                  <span className="assessment-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
