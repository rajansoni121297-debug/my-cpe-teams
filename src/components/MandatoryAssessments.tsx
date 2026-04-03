import { useState } from 'react';
import './MandatoryAssessments.css';

const allAssessments = [
  { name: 'Accounting Fundamentals', level: 'Intermediate', domain: 'Accounting', department: 'Tax Advisory', designation: 'Manager', frequency: '-', learners: 1, completed: 0, pending: 1 },
  { name: 'Practical Applications of US GAAP', level: 'Basic', domain: 'Accounting', department: 'Tax Advisory', designation: 'Manager', frequency: '-', learners: 1, completed: 0, pending: 1 },
];

const levelOptions = ['All', 'Basic', 'Intermediate', 'Advanced'];
const domainOptions = ['All', 'Accounting', 'Auditing', 'Tax', 'Ethics', 'Finance'];
const departmentOptions = ['All', 'Tax Advisory', 'Audit', 'Consulting', 'Management'];

interface MandatoryAssessmentsProps {
  onNavigate: (screen: string) => void;
}

const MandatoryAssessments = ({ onNavigate }: MandatoryAssessmentsProps) => {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [domainFilter, setDomainFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const filtered = allAssessments.filter((a) => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (levelFilter !== 'All' && a.level !== levelFilter) return false;
    if (domainFilter !== 'All' && a.domain !== domainFilter) return false;
    if (deptFilter !== 'All' && a.department !== deptFilter) return false;
    return true;
  });

  const renderDropdown = (label: string, value: string, options: string[], setValue: (v: string) => void, id: string) => (
    <div className="ma-filter-dropdown">
      <span className="ma-filter-label">{label}</span>
      <div
        className={`ma-filter-trigger ${openFilter === id ? 'open' : ''}`}
        onClick={() => setOpenFilter(openFilter === id ? null : id)}
      >
        <span className="ma-filter-value">{value}</span>
        <svg className={`ma-filter-chevron ${openFilter === id ? 'open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
      </div>
      {openFilter === id && (
        <div className="ma-filter-menu">
          {options.map((opt) => (
            <div
              key={opt}
              className={`ma-filter-item ${value === opt ? 'selected' : ''}`}
              onClick={() => { setValue(opt); setOpenFilter(null); }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="ma-page">
      <div className="ma-fixed-header">
      <div className="ma-breadcrumb">
        <span className="ma-breadcrumb-link" onClick={() => onNavigate('dashboard')}>Home</span>
        <span className="ma-breadcrumb-sep">&gt;</span>
        <span className="ma-breadcrumb-link" onClick={() => onNavigate('assessments')}>Assessments</span>
        <span className="ma-breadcrumb-sep">&gt;</span>
        <span className="ma-breadcrumb-current">Mandatory Assessment</span>
      </div>

      <div className="ma-title-row">
        <div>
          <h1 className="ma-title">Mandatory Assessment</h1>
        </div>
        <div className="ma-search-wrap">
          <input
            type="text"
            className="ma-search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg className="ma-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        </div>
      </div>

      <div className="ma-filters-row">
        {renderDropdown('Level', levelFilter, levelOptions, setLevelFilter, 'level')}
        {renderDropdown('Domain', domainFilter, domainOptions, setDomainFilter, 'domain')}
        {renderDropdown('Department', deptFilter, departmentOptions, setDeptFilter, 'dept')}
        <button className="ma-btn-apply" onClick={() => setOpenFilter(null)}>Apply</button>
        <button className="ma-btn-clear" onClick={() => { setLevelFilter('All'); setDomainFilter('All'); setDeptFilter('All'); }}>Clear</button>
      </div>

      </div>
      <div className="ma-scroll-body">
      <div className="ma-table-wrap">
        <table className="ma-table">
          <thead>
            <tr>
              <th>Assessment Name</th>
              <th>Level</th>
              <th>Domain</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Frequency</th>
              <th>Learners</th>
              <th>Completed</th>
              <th>Pending</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={10} className="ma-empty">No assessments found</td></tr>
            ) : (
              filtered.map((a, idx) => (
                <tr key={idx}>
                  <td className="ma-td-name">{a.name}</td>
                  <td>{a.level}</td>
                  <td>{a.domain}</td>
                  <td>{a.department}</td>
                  <td>{a.designation}</td>
                  <td>{a.frequency}</td>
                  <td>{a.learners}</td>
                  <td>{a.completed}</td>
                  <td>{a.pending}</td>
                  <td><span className="ma-view-link">View</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default MandatoryAssessments;
