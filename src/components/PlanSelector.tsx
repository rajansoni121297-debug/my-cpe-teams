import { useState } from 'react';
import './PlanSelector.css';

interface Plan {
  id: string;
  name: string;
  price: number;
  category: 'individual' | 'teams';
}

interface PlanSelectorProps {
  onSelect: (plan: Plan) => void;
  onClose?: () => void;
  showClose?: boolean;
}

const plans: Plan[] = [
  { id: 'individual-silver', name: 'Silver', price: 199, category: 'individual' },
  { id: 'individual-gold', name: 'Gold', price: 299, category: 'individual' },
  { id: 'teams-regular', name: 'Regular', price: 199, category: 'teams' },
  { id: 'teams-advance', name: 'Advance', price: 299, category: 'teams' },
  { id: 'teams-premium', name: 'Premium', price: 499, category: 'teams' },
];

const PlanSelector = ({ onSelect, onClose, showClose = false }: PlanSelectorProps) => {
  const [activeTab, setActiveTab] = useState<'individual' | 'teams'>('individual');

  const filteredPlans = plans.filter((p) => p.category === activeTab);

  const getTierColor = (name: string) => {
    switch (name) {
      case 'Silver': return '#8e9aaf';
      case 'Gold': return '#d4a843';
      case 'Regular': return '#4a90d9';
      case 'Advance': return '#7c5cbf';
      case 'Premium': return '#e6525a';
      default: return '#4a90d9';
    }
  };

  const getTierIcon = (name: string) => {
    switch (name) {
      case 'Silver':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="8" r="5" /><path d="M8 13l-3 8h14l-3-8" />
          </svg>
        );
      case 'Gold':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      case 'Regular':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'Advance':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        );
      case 'Premium':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="plan-overlay">
      <div className="plan-modal">
        {showClose && (
          <button className="plan-modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
        <h2 className="plan-title">Choose Your Module</h2>
        <p className="plan-subtitle">Select a plan to continue</p>

        <div className="plan-tabs">
          <button
            className={`plan-tab ${activeTab === 'individual' ? 'active' : ''}`}
            onClick={() => setActiveTab('individual')}
          >
            Individual
          </button>
          <button
            className={`plan-tab ${activeTab === 'teams' ? 'active' : ''}`}
            onClick={() => setActiveTab('teams')}
          >
            Teams
          </button>
        </div>

        <div className="plan-cards">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className="plan-card"
              style={{ '--tier-color': getTierColor(plan.name) } as React.CSSProperties}
              onClick={() => onSelect(plan)}
            >
              <div className="plan-card-icon" style={{ color: getTierColor(plan.name) }}>
                {getTierIcon(plan.name)}
              </div>
              <h3 className="plan-card-name">{plan.name}</h3>
              <div className="plan-card-price">
                <span className="plan-price-dollar">$</span>
                <span className="plan-price-amount">{plan.price}</span>
                <span className="plan-price-period">/yr</span>
              </div>
              <button className="plan-card-btn" style={{ background: getTierColor(plan.name) }}>
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanSelector;
