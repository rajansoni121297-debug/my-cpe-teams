import { useState } from 'react';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Assessments from './components/Assessments';
import MandatoryAssessments from './components/MandatoryAssessments';
import ExternalHire from './components/ExternalHire';
import Reports from './components/Reports';
import PlanSelector from './components/PlanSelector';

interface Plan {
  id: string;
  name: string;
  price: number;
  category: 'individual' | 'teams';
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [showPlanSelector, setShowPlanSelector] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleLogin = () => {
    setShowPlanSelector(true);
  };

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowPlanSelector(false);
    setIsAuthenticated(true);
    setActiveScreen('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSelectedPlan(null);
    setActiveScreen('dashboard');
  };

  const handleNavigate = (screen: string) => {
    setActiveScreen(screen);
  };

  const handleSwitchPlan = () => {
    setShowPlanSelector(true);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'assessments':
      case 'assessments-list':
        return <Assessments onNavigate={handleNavigate} />;
      case 'mandatory-assessments':
        return <MandatoryAssessments onNavigate={handleNavigate} />;
      case 'external-hire':
        return <ExternalHire onNavigate={handleNavigate} />;
      case 'reports':
      case 'assessment-reports':
      case 'internal-reports':
        return <Reports onNavigate={handleNavigate} initialTab="internal" />;
      case 'external-reports':
        return <Reports onNavigate={handleNavigate} initialTab="external" />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  if (!isAuthenticated && !showPlanSelector) {
    return <Login onLogin={handleLogin} />;
  }

  if (!isAuthenticated && showPlanSelector) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <PlanSelector onSelect={handlePlanSelect} />
      </>
    );
  }

  return (
    <>
      <Layout
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        selectedPlan={selectedPlan}
        onSwitchPlan={handleSwitchPlan}
      >
        {renderScreen()}
      </Layout>
      {showPlanSelector && (
        <PlanSelector
          onSelect={handlePlanSelect}
          onClose={() => setShowPlanSelector(false)}
          showClose
        />
      )}
    </>
  );
}

export default App;
