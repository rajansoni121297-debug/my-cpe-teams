import { useState } from 'react';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Assessments from './components/Assessments';
import Reports from './components/Reports';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeScreen, setActiveScreen] = useState('dashboard');

  const handleLogin = () => {
    setIsAuthenticated(true);
    setActiveScreen('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveScreen('dashboard');
  };

  const handleNavigate = (screen: string) => {
    setActiveScreen(screen);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'assessments':
        return <Assessments onNavigate={handleNavigate} />;
      case 'reports':
        return <Reports onNavigate={handleNavigate} />;
      case 'settings':
        return (
          <div style={{ padding: 20 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a2e', margin: '0 0 8px' }}>Settings</h1>
            <p style={{ color: '#888', fontSize: 14 }}>Settings page coming soon.</p>
          </div>
        );
      case 'billing':
        return (
          <div style={{ padding: 20 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a2e', margin: '0 0 8px' }}>Billing</h1>
            <p style={{ color: '#888', fontSize: 14 }}>Billing page coming soon.</p>
          </div>
        );
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout activeScreen={activeScreen} onNavigate={handleNavigate} onLogout={handleLogout}>
      {renderScreen()}
    </Layout>
  );
}

export default App;
