import { useRef } from 'react';
import './Dashboard.css';

const notifications = [
  { text: 'New assessment has been assigned : NPO Audit', time: 'March 13, 2026 | 05:49 PM IST', isNew: true },
  { text: 'New assessment has been assigned : NPO Audit', time: 'March 13, 2026 | 05:46 PM IST', isNew: true },
  { text: 'New assessment has been assigned : Accounting Fu...', time: 'March 11, 2026 | 11:36 PM IST', isNew: true },
  { text: 'New assessment has been assigned : Data Interpret...', time: 'March 11, 2026 | 08:40 PM IST', isNew: true },
  { text: 'New assessment has been assigned : Single Audit a...', time: 'March 11, 2026 | 08:37 PM IST', isNew: true },
];

const topCourses = [
  { name: 'Financial Analysis and Readiness Asses...', learners: 3 },
  { name: 'Building Resilient Portfolios: Mitigat...', learners: 2 },
  { name: 'Buy Low, Sell High. Why is it so Diffi...', learners: 2 },
  { name: 'Behavioral Finance: How to Bring Your...', learners: 2 },
  { name: 'Are Your Clients Financially Healthy?...', learners: 2 },
  { name: 'An Overview of Financial Planning – De...', learners: 2 },
  { name: 'Advisors Guide to an Advanced Look at...', learners: 2 },
  { name: 'Advisors Guide to Serving The Next Gen...', learners: 2 },
  { name: 'A Million Dollar Baby', learners: 2 },
  { name: 'Personal Finance – What are Crypto Ass...', learners: 2 },
  { name: 'Personal Finance Trends Mastery', learners: 2 },
  { name: '10-Point Financial Health Check', learners: 2 },
  { name: 'AI and Real Estate: Your Winning Inves...', learners: 2 },
  { name: 'A to Z of Time Value of Money', learners: 2 },
  { name: 'AI and Personal Finance: Best Alternat...', learners: 2 },
];

const spotlightCourses = [
  'Maximizing Your Tax Advantage: The Fringe Benefits Route in 2024-25',
  'Gambling, Gifts & Awards Tax Issues Under OBBB For 2026',
  'Military Tax Traps: Common Errors That Trigger Audits',
  'Easing Commercial Loan Approvals',
  'Understanding IRS Audit Triggers for Small Business',
  'Tax Planning Strategies for High Net Worth Individuals',
];

const quickLinks = [
  'Learning Dashboard', 'Billing', 'Support', 'Firm Compliance',
  'Course Creation', 'Content Assignment', 'Learning Plans',
];

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  const scrollSpotlight = (direction: 'up' | 'down') => {
    if (spotlightRef.current) {
      const amount = direction === 'up' ? -120 : 120;
      spotlightRef.current.scrollBy({ top: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Row 1: Learning Analytics, Firm Compliance, Notifications */}
      <div className="dash-row dash-row-3">
        {/* Learning Analytics */}
        <div className="dash-card">
          <div className="dash-card-title-bar">
            <h2 className="dash-card-title">Learning Analytics</h2>
          </div>
          <div className="dash-card-body">
            <div className="analytics-stats">
              <div className="analytics-stat-item">
                <span className="analytics-stat-value">380.7 Hours</span>
                <span className="analytics-stat-label">Total Learning Hours</span>
              </div>
              <div className="analytics-stat-item">
                <span className="analytics-stat-value">190 Hours</span>
                <span className="analytics-stat-label">Avg. Hours per User</span>
              </div>
              <div className="analytics-stat-item">
                <span className="analytics-stat-value">17%</span>
                <span className="analytics-stat-label">Completion Rate</span>
              </div>
            </div>
            <div className="top-learners">
              <h3 className="top-learners-title">Top Learners</h3>
              <div className="top-learner-row">
                <span className="top-learner-name">Thomas Anderson</span>
                <span className="top-learner-hours">65.5 Hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Firm Compliance */}
        <div className="dash-card">
          <div className="dash-card-title-bar">
            <h2 className="dash-card-title">Firm Compliance</h2>
          </div>
          <div className="dash-card-body">
            <div className="compliance-content">
              <div className="compliance-chart">
                <svg viewBox="0 0 140 140" className="donut-chart">
                  <circle cx="70" cy="70" r="56" fill="none" stroke="#e8e8ee" strokeWidth="14" />
                  <circle cx="70" cy="70" r="56" fill="none" stroke="#7162EA" strokeWidth="14"
                    strokeDasharray="0 352" strokeLinecap="round"
                    transform="rotate(-90 70 70)" />
                  <text x="70" y="70" textAnchor="middle" dominantBaseline="central"
                    className="donut-text">0%</text>
                </svg>
              </div>
              <div className="compliance-details">
                <div className="compliance-row">
                  <span className="compliance-dot compliant"></span>
                  <span className="compliance-label">Compliant</span>
                  <span className="compliance-value">0 Users</span>
                </div>
                <div className="compliance-row">
                  <span className="compliance-dot non-compliant"></span>
                  <span className="compliance-label">Non-Compliant</span>
                  <span className="compliance-value">2 Users</span>
                </div>
                <div className="compliance-rate-row">
                  <span className="compliance-label">Compliance Rate</span>
                  <span className="compliance-value">0%</span>
                </div>
                <div className="compliance-deadlines">
                  <h4 className="deadlines-title">Upcoming Deadlines:</h4>
                  <div className="deadline-row">
                    <span>Alaska - CPA(US)</span>
                    <span>31 Dec, 2027</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="dash-card dash-card-notifications">
          <div className="dash-card-title-bar">
            <h2 className="dash-card-title notification-title">Notifications</h2>
          </div>
          <div className="dash-card-body dash-card-body-flex">
            <div className="notifications-list">
              {notifications.map((n, idx) => (
                <div className="notification-item" key={idx}>
                  <div className="notification-text-wrap">
                    <span className="notification-text">{n.text}</span>
                    {n.isNew && <span className="notification-badge">New</span>}
                  </div>
                  <span className="notification-time">{n.time}</span>
                </div>
              ))}
            </div>
            <div className="notifications-footer">
              <div className="powered-by">
                Powered by
                <span className="powered-brand"> <strong>MYCPE</strong> ONE</span>
              </div>
              <button className="btn-view-all">View All</button>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Course Performance, Course in Spotlight, Subscription Overview */}
      <div className="dash-row dash-row-3">
        {/* Course Performance */}
        <div className="dash-card">
          <div className="dash-card-title-bar">
            <h2 className="dash-card-title">Course Performance</h2>
          </div>
          <div className="dash-card-body">
            <div className="course-perf-table">
              <div className="course-perf-header">
                <span>Top Performing Courses</span>
                <span>Learners</span>
              </div>
              <div className="course-perf-body">
                {topCourses.map((c, idx) => (
                  <div className="course-perf-row" key={idx}>
                    <span className="course-name">{c.name}</span>
                    <span className="course-learners">{c.learners}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Course in Spotlight */}
        <div className="dash-card">
          <div className="dash-card-title-bar">
            <h2 className="dash-card-title">Course in Spotlight</h2>
          </div>
          <div className="dash-card-body spotlight-body">
            <button className="spotlight-scroll-btn spotlight-scroll-up" onClick={() => scrollSpotlight('up')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
            <div className="spotlight-list" ref={spotlightRef}>
              {spotlightCourses.map((course, idx) => (
                <div className="spotlight-item" key={idx}>
                  <div className="spotlight-tag">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    <span>Upcoming Live Webinar</span>
                  </div>
                  <p className="spotlight-course-name">{course}</p>
                </div>
              ))}
            </div>
            <button className="spotlight-scroll-btn spotlight-scroll-down" onClick={() => scrollSpotlight('down')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </div>

        {/* Subscription Overview */}
        <div className="dash-card">
          <div className="dash-card-title-bar">
            <h2 className="dash-card-title">Subscription Overview</h2>
          </div>
          <div className="dash-card-body">
            <div className="subscription-content">
              <div className="subscription-chart">
                <svg viewBox="0 0 140 140" className="donut-chart">
                  <circle cx="70" cy="70" r="56" fill="none" stroke="#e8e8ee" strokeWidth="14" />
                  <circle cx="70" cy="70" r="56" fill="none" stroke="#7162EA" strokeWidth="14"
                    strokeDasharray="39 313" strokeLinecap="round"
                    transform="rotate(-90 70 70)" />
                  <text x="70" y="70" textAnchor="middle" dominantBaseline="central"
                    className="donut-text donut-text-lg">18</text>
                </svg>
              </div>
              <div className="subscription-details">
                <div className="sub-row">
                  <span>Total Users</span>
                  <span className="sub-value">18</span>
                </div>
                <div className="sub-row">
                  <span><span className="sub-dot active-dot"></span>Active Users</span>
                  <span className="sub-value">2</span>
                </div>
                <div className="sub-row">
                  <span><span className="sub-dot inactive-dot"></span>Inactive Users</span>
                  <span className="sub-value">16</span>
                </div>
                <div className="sub-row">
                  <span><span className="sub-dot invited-dot"></span>Invited Users</span>
                  <span className="sub-value">0</span>
                </div>
                <div className="sub-row sub-validity">
                  <span>Subscription Validity</span>
                  <span className="sub-value">Expires on 01 Jun, 2026</span>
                </div>
                <div className="sub-row">
                  <span>Renewal In</span>
                  <span className="sub-value sub-value-highlight">70 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Quick Links */}
      <div className="dash-row">
        <div className="dash-card dash-card-full">
          <div className="dash-card-title-bar">
            <h2 className="dash-card-title">Quick Links</h2>
          </div>
          <div className="dash-card-body">
            <div className="quick-links">
              {quickLinks.map((link, idx) => (
                <button className="quick-link-btn" key={idx} onClick={() => onNavigate('dashboard')}>
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
