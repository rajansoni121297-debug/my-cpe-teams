import { useState } from 'react';
import './Layout.css';
import logo from '../assets/logo.png';

interface Plan {
  id: string;
  name: string;
  price: number;
  category: 'individual' | 'teams';
}

interface LayoutProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  selectedPlan?: Plan | null;
  onSwitchPlan?: () => void;
  children: React.ReactNode;
}

const Layout = ({ activeScreen, onNavigate, onLogout, selectedPlan, onSwitchPlan, children }: LayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [adminMode, setAdminMode] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [modulesOpen, setModulesOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'user-management', label: 'User Management', icon: 'users', hasSubmenu: true, disabled: true, subItems: [
      { id: 'users-list', label: 'Users' },
      { id: 'teams', label: 'Teams' },
      { id: 'roles', label: 'Roles' },
    ]},
    { id: 'learning-assignment', label: 'Learning Assignment', icon: 'learning-assignment', disabled: true },
    { id: 'content-authoring', label: 'Content Authoring', icon: 'content-authoring', hasSubmenu: true, disabled: true, subItems: [
      { id: 'courses', label: 'Courses' },
      { id: 'learning-paths', label: 'Learning Paths' },
    ]},
    { id: 'event-management', label: 'Event Management', icon: 'event-management', disabled: true },
    { id: 'firm-compliance', label: 'Firm Compliance', icon: 'firm-compliance', disabled: true },
    { id: 'reports', label: 'Report & Analytics', icon: 'reports', hasSubmenu: true, disabled: true, subItems: [
      { id: 'reports-overview', label: 'Reports' },
      { id: 'analytics', label: 'Analytics' },
    ]},
    { id: 'communications', label: 'Communications', icon: 'communications', disabled: true },
    { id: 'assessments', label: 'Assessments', icon: 'assessments', hasSubmenu: true, subItems: [
      { id: 'assessments-list', label: 'Assessments' },
      { id: 'mandatory-assessments', label: 'Mandatory Assessments' },
      { id: 'external-hire', label: 'External Hire' },
      { id: 'assessment-reports', label: 'Reports' },
    ]},
    { id: 'learning-development', label: 'Learning & Development', icon: 'learning-development', hasSubmenu: true, disabled: true, subItems: [
      { id: 'ld-dashboard', label: 'Dashboard' },
      { id: 'ld-programs', label: 'Programs' },
    ]},
    { id: 'billing', label: 'Billing', icon: 'billing', disabled: true },
    { id: 'settings', label: 'Settings', icon: 'settings', hasSubmenu: true, disabled: true, subItems: [
      { id: 'general-settings', label: 'General' },
      { id: 'notifications-settings', label: 'Notifications' },
    ]},
  ];

  const toggleSubmenu = (id: string) => {
    setExpandedMenus((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'dashboard':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        );
      case 'users':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'learning-assignment':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <line x1="8" y1="7" x2="16" y2="7" /><line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        );
      case 'content-authoring':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        );
      case 'event-management':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        );
      case 'firm-compliance':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" />
            <polyline points="17 11 19 13 23 9" />
          </svg>
        );
      case 'reports':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        );
      case 'communications':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        );
      case 'assessments':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        );
      case 'learning-development':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        );
      case 'settings':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        );
      case 'billing':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="layout">
      {/* Top Header Bar */}
      <header className="layout-header">
        <div className="header-left">
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <img src={logo} alt="Logo" className="header-logo" />
          <span className="header-brand">
            <span className="brand-bold">MYCPE</span>
            <span className="brand-regular"> ONE</span>
          </span>

          {/* My Modules Dropdown */}
          <div className="header-modules-wrapper">
            <button className="header-modules-btn" onClick={() => { setModulesOpen(!modulesOpen); setExploreOpen(false); }}>
              My Modules
              <span className="modules-dot"></span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {modulesOpen && (
              <div className="header-modules-dropdown">
                <div className="modules-dropdown-item" onClick={() => { onSwitchPlan?.(); setModulesOpen(false); }}>
                  <span>Switch Module / Plan</span>
                  {selectedPlan && <span className="modules-current">{selectedPlan.category === 'individual' ? 'Individual' : 'Teams'} — {selectedPlan.name}</span>}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="header-right">
          <button className="header-btn header-tour-btn">
            Guided Product Tour
          </button>

          {/* Explore Services */}
          <div className="header-explore-wrapper">
            <button className="header-btn header-explore-btn" onClick={() => { setExploreOpen(!exploreOpen); setModulesOpen(false); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="5" cy="5" r="2" /><circle cx="12" cy="5" r="2" /><circle cx="19" cy="5" r="2" />
                <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
                <circle cx="5" cy="19" r="2" /><circle cx="12" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
              </svg>
              Explore Services
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {exploreOpen && (
              <div className="header-explore-dropdown">
                <div className="explore-dropdown-item">CPE Courses</div>
                <div className="explore-dropdown-item">Live Webinars</div>
                <div className="explore-dropdown-item">Conferences</div>
                <div className="explore-dropdown-item">Podcasts</div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="header-user-menu" onClick={() => { setUserDropdownOpen(!userDropdownOpen); setModulesOpen(false); setExploreOpen(false); }}>
            <div className="header-avatar">T</div>
            <div className="header-user-info">
              <span className="header-username">Thomas</span>
              <span className="header-credits">2 Credits</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
            {userDropdownOpen && (
              <div className="header-user-dropdown">
                <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); onNavigate('settings'); setUserDropdownOpen(false); }}>Profile Settings</div>
                <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); onSwitchPlan?.(); setUserDropdownOpen(false); }}>Switch Module</div>
                <div className="dropdown-item dropdown-logout" onClick={(e) => { e.stopPropagation(); onLogout(); setUserDropdownOpen(false); }}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="layout-body">
        {mobileSidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setMobileSidebarOpen(false)} />
        )}
        {/* Left Sidebar */}
        <aside className={`layout-sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
          {/* Admin/Learner Toggle */}
          <div className="sidebar-role-toggle">
            <span className={`role-label ${adminMode ? 'active' : ''}`}>ADMIN</span>
            <button className="toggle-switch" onClick={() => setAdminMode(!adminMode)}>
              <span className={`toggle-knob ${!adminMode ? 'right' : ''}`}></span>
            </button>
            <span className={`role-label ${!adminMode ? 'active' : ''}`}>LEARNER</span>
          </div>

          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <div key={item.id} className="sidebar-menu-group">
                <button
                  className={`sidebar-item ${activeScreen === item.id || (item.subItems && item.subItems.some(s => s.id === activeScreen)) ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                  onClick={() => {
                    if (item.disabled) return;
                    if (item.hasSubmenu) {
                      toggleSubmenu(item.id);
                    } else {
                      onNavigate(item.id);
                      setMobileSidebarOpen(false);
                    }
                  }}
                  title={sidebarCollapsed ? item.label : ''}
                >
                  <span className="sidebar-icon">{renderIcon(item.icon)}</span>
                  {!sidebarCollapsed && <span className="sidebar-label">{item.label}</span>}
                  {!sidebarCollapsed && item.hasSubmenu && (
                    <svg
                      className={`sidebar-chevron ${expandedMenus.includes(item.id) ? 'expanded' : ''}`}
                      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </button>
                {!sidebarCollapsed && item.hasSubmenu && item.subItems && expandedMenus.includes(item.id) && (
                  <div className="sidebar-submenu">
                    {item.subItems.map((sub) => (
                      <button
                        key={sub.id}
                        className={`sidebar-subitem ${activeScreen === sub.id ? 'active' : ''}`}
                        onClick={() => {
                          onNavigate(sub.id);
                          setMobileSidebarOpen(false);
                        }}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <button
            className="sidebar-collapse-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: sidebarCollapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </aside>

        {/* Content Area */}
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
