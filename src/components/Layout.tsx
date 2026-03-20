import { useState } from 'react';
import './Layout.css';
import logo from '../assets/logo.png';

interface LayoutProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout = ({ activeScreen, onNavigate, onLogout, children }: LayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'assessments', label: 'Assessments', icon: 'assessments' },
    { id: 'reports', label: 'Reports', icon: 'reports' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
    { id: 'billing', label: 'Billing', icon: 'billing' },
  ];

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'dashboard':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1"></rect>
            <rect x="14" y="3" width="7" height="7" rx="1"></rect>
            <rect x="3" y="14" width="7" height="7" rx="1"></rect>
            <rect x="14" y="14" width="7" height="7" rx="1"></rect>
          </svg>
        );
      case 'assessments':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        );
      case 'reports':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        );
      case 'settings':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        );
      case 'billing':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
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
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <img src={logo} alt="Logo" className="header-logo" />
          <span className="header-brand">
            <span className="brand-bold">MYCPE</span>
            <span className="brand-regular"> ONE</span>
          </span>
        </div>
        <div className="header-right">
          <button className="header-btn header-support-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            Support
          </button>
          <button className="header-btn header-tour-btn">
            Guided Product Tour
          </button>
          <div className="header-user-menu" onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
            <div className="header-avatar">A</div>
            <span className="header-username">Ajay</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            {userDropdownOpen && (
              <div className="header-user-dropdown">
                <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); onNavigate('settings'); setUserDropdownOpen(false); }}>Profile Settings</div>
                <div className="dropdown-item dropdown-logout" onClick={(e) => { e.stopPropagation(); if (onLogout) onLogout(); setUserDropdownOpen(false); }}>Logout</div>
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
          <div className="sidebar-profile">
            <div className="sidebar-avatar">A</div>
            {!sidebarCollapsed && <span className="sidebar-name">Ajay Test</span>}
          </div>
          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`sidebar-item ${activeScreen === item.id ? 'active' : ''}`}
                onClick={() => { onNavigate(item.id); setMobileSidebarOpen(false); }}
                title={sidebarCollapsed ? item.label : ''}
              >
                <span className="sidebar-icon">{renderIcon(item.icon)}</span>
                {!sidebarCollapsed && <span className="sidebar-label">{item.label}</span>}
              </button>
            ))}
          </nav>
          <button
            className="sidebar-collapse-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: sidebarCollapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            >
              <polyline points="15 18 9 12 15 6"></polyline>
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
