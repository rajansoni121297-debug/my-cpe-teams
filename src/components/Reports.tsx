import { useState, useEffect, useRef } from 'react';
import './Reports.css';

const reportData = [
  { name: 'Ethan Parker', email: 'ethan.parker.us@yopmail.com', assessment: 'NPO Audit', type: 'MCQ', score: '5%', result: 'Fail', assignedOn: 'Mar 17 2026', status: 'Completed', assignedBy: 'Ajay Test', completedOn: 'Mar 17 2026', proctoring: 'Need to review', flags: 6 },
  { name: 'Sagar Somiya', email: 'sagarsomiya@yopmail.com', assessment: 'Estate & Gift Tax', type: 'MCQ', score: '5%', result: 'Fail', assignedOn: 'Feb 17 2026', status: 'Completed', assignedBy: 'Ajay Test', completedOn: 'Feb 17 2026', proctoring: 'Need to review', flags: 38 },
  { name: 'a d', email: 'abc@gmail.com', assessment: 'Accounting Fundamentals for NFP Organizations', type: 'MCQ', score: '-', result: '-', assignedOn: 'Feb 12 2026', status: 'Lapsed', assignedBy: 'Ajay Test', completedOn: 'Mar 15 2026', proctoring: 'Get Rate', flags: 0 },
  { name: 'a d', email: 'abc@gmail.com', assessment: 'Governmental Accounting and Financial Reporting', type: 'MCQ', score: '-', result: '-', assignedOn: 'Feb 12 2026', status: 'Lapsed', assignedBy: 'Ajay Test', completedOn: 'Mar 15 2026', proctoring: 'Get Rate', flags: 0 },
  { name: 'Rajan Soni', email: 'rajansoni121297@gmail.com', assessment: 'Governmental Accounting and Financial Reporting', type: 'MCQ', score: '-', result: '-', assignedOn: 'Feb 12 2026', status: 'Lapsed', assignedBy: 'Ajay Test', completedOn: 'Mar 15 2026', proctoring: 'Get Rate', flags: 0 },
  { name: 'Manvi Jain', email: 'manvijain12@yopmail.com', assessment: 'Ethics and Professional Conduct for Accountants', type: 'MCQ', score: '-', result: '-', assignedOn: 'Feb 09 2026', status: 'Lapsed', assignedBy: 'Ajay Test', completedOn: 'Mar 12 2026', proctoring: 'Get Rate', flags: 0 },
  { name: 'Manvi Jain', email: 'manvi121212@yopmail.com', assessment: 'Accounting Fundamentals for NFP Organizations', type: 'MCQ', score: '5%', result: 'Fail', assignedOn: 'Feb 09 2026', status: 'Completed', assignedBy: 'Ajay Test', completedOn: 'Feb 09 2026', proctoring: 'Need to review', flags: 5 },
  { name: 'Manvi Jain', email: 'manvi121212@yopmail.com', assessment: 'Governmental Accounting and Financial Reporting', type: 'MCQ', score: '0%', result: 'Fail', assignedOn: 'Feb 09 2026', status: 'Completed', assignedBy: 'Ajay Test', completedOn: 'Feb 09 2026', proctoring: 'Need to review', flags: 8 },
  { name: 'Raj Soni', email: 'Rajsoni999999999@yopmail.com', assessment: 'Ethics and Professional Conduct for Accountants', type: 'MCQ', score: '-', result: '-', assignedOn: 'Feb 09 2026', status: 'Lapsed', assignedBy: 'Ajay Test', completedOn: 'Mar 12 2026', proctoring: 'Get Rate', flags: 0 },
  { name: 'Raj Soni', email: 'Rajsoni121212@yopmail.com', assessment: 'Accounting Fundamentals for NFP Organizations', type: 'MCQ', score: '-', result: '-', assignedOn: 'Feb 09 2026', status: 'Lapsed', assignedBy: 'Ajay Test', completedOn: 'Mar 12 2026', proctoring: 'Get Rate', flags: 0 },
];

interface FilterDropdownProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: (string | { label: string; value: string })[];
}

const FilterDropdown = ({ label, value, onChange, options }: FilterDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="r-filter-dropdown" ref={ref}>
      <span className="r-filter-dropdown-label">{label}</span>
      <div className={`r-filter-dropdown-trigger ${open ? 'open' : ''}`} onClick={() => setOpen((o) => !o)}>
        <span className="r-filter-dropdown-value">{value || `Select ${label}`}</span>
        <svg className={`r-filter-dropdown-chevron ${open ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {open && (
        <div className="r-filter-dropdown-menu">
          {options.map((opt) => {
            const val = typeof opt === 'string' ? opt : opt.value;
            const lbl = typeof opt === 'string' ? opt : opt.label;
            return (
              <div key={val} className={`r-filter-dropdown-item ${value === val ? 'selected' : ''}`} onClick={() => { onChange(val); setOpen(false); }}>
                {lbl}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

interface ReportsProps {
  onNavigate: (screen: string) => void;
}

const Reports = ({ onNavigate }: ReportsProps) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [resultFilter, setResultFilter] = useState('');
  const [level, setLevel] = useState('All');
  const [domain, setDomain] = useState('All');
  const [assignedOn, setAssignedOn] = useState('');
  const [completedOn, setCompletedOn] = useState('');
  const [proctoringVerdict, setProctoringVerdict] = useState('All');
  const [assignedBy, setAssignedBy] = useState('All');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalRecords = 25;

  const toggleRow = (idx: number) => {
    setSelectedRows((prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]);
  };

  const toggleAll = () => {
    if (selectedRows.length === reportData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(reportData.map((_, i) => i));
    }
  };

  const clearFilters = () => {
    setSearch(''); setStatusFilter(''); setResultFilter(''); setLevel('All');
    setDomain('All'); setAssignedOn(''); setCompletedOn(''); setProctoringVerdict('All'); setAssignedBy('All');
  };

  return (
    <div className="reports-page">
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={() => onNavigate('dashboard')}>Home</span>
        <span className="breadcrumb-sep">&gt;</span>
        <span className="breadcrumb-link" onClick={() => onNavigate('assessments')}>Assessments</span>
        <span className="breadcrumb-sep">&gt;</span>
        <span className="breadcrumb-current">Assessment Reports</span>
      </div>

      <div className="reports-title-row">
        <div>
          <h1 className="page-title">Assessment Reports</h1>
          <p className="page-subtitle">Access candidate results and insights to make informed decisions.</p>
        </div>
        <div className="reports-actions">
          <span className="sample-report-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7162EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Sample Report
          </span>
          <div className="search-input-wrap">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" className="search-input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button className="btn-customize-reminders">Customize Reminders (0)</button>
        </div>
      </div>

      <div className="r-filters-row">
        <FilterDropdown label="Status" value={statusFilter} onChange={setStatusFilter} options={[{ label: 'All', value: '' }, { label: 'Pending', value: 'Pending' }, { label: 'Completed', value: 'Completed' }, { label: 'Lapsed - Not Attempted', value: 'Lapsed - Not Attempted' }]} />
        <FilterDropdown label="Result" value={resultFilter} onChange={setResultFilter} options={[{ label: 'All', value: '' }, { label: 'Pass', value: 'Pass' }, { label: 'Fail', value: 'Fail' }]} />
        <FilterDropdown label="Level" value={level} onChange={setLevel} options={['All', 'Basic', 'Intermediate', 'Advance']} />
        <FilterDropdown label="Domain" value={domain} onChange={setDomain} options={['All', 'Accounting', 'Auditing', 'Tax', 'Others']} />
        <div className="r-filter-date-wrap">
          <span className="r-filter-date-label">Assigned On</span>
          <input type="date" className="r-filter-date" value={assignedOn} onChange={(e) => setAssignedOn(e.target.value)} />
        </div>
        <div className="r-filter-date-wrap">
          <span className="r-filter-date-label">Completed On</span>
          <input type="date" className="r-filter-date" value={completedOn} onChange={(e) => setCompletedOn(e.target.value)} />
        </div>
        <FilterDropdown label="Proctoring Verdict" value={proctoringVerdict} onChange={setProctoringVerdict} options={['All', 'Clean', 'Need to review']} />
        <FilterDropdown label="Assigned By" value={assignedBy} onChange={setAssignedBy} options={['All']} />
        <button className="btn-apply">Apply</button>
        <button className="btn-clear" onClick={clearFilters}>Clear</button>
      </div>

      <div className="report-table-wrap">
        <table className="report-table">
          <thead>
            <tr>
              <th className="th-check"><input type="checkbox" checked={selectedRows.length === reportData.length && reportData.length > 0} onChange={toggleAll} /></th>
              <th>Candidate Name</th>
              <th>Assessment Name</th>
              <th>Type</th>
              <th>Score</th>
              <th>Result</th>
              <th>Assigned On</th>
              <th>Status</th>
              <th>Assigned By</th>
              <th>Feedback</th>
              <th>Completed On</th>
              <th>Proctoring Verdict</th>
              <th>No. of Flags</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((item, idx) => (
              <tr key={idx} className={selectedRows.includes(idx) ? 'row-selected' : ''}>
                <td className="td-check"><input type="checkbox" checked={selectedRows.includes(idx)} onChange={() => toggleRow(idx)} /></td>
                <td>
                  <div className="candidate-cell">
                    <span className="candidate-name">{item.name}</span>
                    <span className="candidate-email">{item.email}</span>
                  </div>
                </td>
                <td className="td-assessment">{item.assessment}</td>
                <td>{item.type}</td>
                <td>{item.score}</td>
                <td>
                  {item.result === 'Pass' && <span className="badge badge-pass">Pass</span>}
                  {item.result === 'Fail' && <span className="badge badge-fail">Fail</span>}
                  {item.result === '-' && <span>-</span>}
                </td>
                <td className="td-date">{item.assignedOn}</td>
                <td>
                  {item.status === 'Completed' && <span className="badge badge-completed">Completed</span>}
                  {item.status === 'Lapsed' && <span className="badge badge-lapsed">Lapsed</span>}
                  {item.status === 'Pending' && <span className="badge badge-pending">Pending</span>}
                </td>
                <td>{item.assignedBy}</td>
                <td><span className="feedback-link">View</span></td>
                <td className="td-date">{item.completedOn}</td>
                <td>
                  {item.proctoring === 'Need to review' && <span className="badge badge-review">Need to review</span>}
                  {item.proctoring === 'Get Rate' && <span className="badge badge-getrate">Get Rate</span>}
                  {item.proctoring === 'Clean' && <span className="badge badge-clean">Clean</span>}
                </td>
                <td>{item.flags > 0 ? <span className="flags-badge">{item.flags}</span> : <span className="flags-none">-</span>}</td>
                <td>
                  <div className="action-icons">
                    {item.status === 'Completed' ? (
                      <>
                        <button className="action-icon-btn" title="Download Report">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7162EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                        </button>
                        <button className="action-icon-btn" title="View">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7162EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </button>
                      </>
                    ) : (
                      <button className="action-icon-btn" title="Flag">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                          <line x1="4" y1="22" x2="4" y2="15"></line>
                        </svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-bar">
        <div className="pagination-info">
          Showing{' '}
          <select className="pagination-select" value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          {' '}of {totalRecords} Records
        </div>
        <div className="pagination-controls">
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>Back</button>
          {[1, 2, 3].map((p) => (
            <button key={p} className={`pagination-btn ${currentPage === p ? 'active' : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>
          ))}
          <button className="pagination-btn" disabled={currentPage === 3} onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
