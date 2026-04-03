import { useState, useEffect, useCallback, useRef } from 'react';
import './ExternalHire.css';

const assessmentData = [
  { name: 'QuickBooks - QBO', level: 'Intermediate', questionTypes: [{ type: 'MCQ', count: 20 }], duration: '40', invited: 2, completedNum: 1, completedDen: 2 },
  { name: 'QuickBooks - QBO', level: 'Basic', questionTypes: [{ type: 'MCQ', count: 20 }], duration: '40', invited: 0, completedNum: 0, completedDen: 0 },
  { name: 'CCH Axcess + ProSystem fx Audit Software', level: 'Basic', questionTypes: [{ type: 'MCQ', count: 20 }, { type: 'SIM', count: 4 }], duration: '40', invited: 1, completedNum: 0, completedDen: 1 },
  { name: 'UltraTax Software', level: 'Basic', questionTypes: [{ type: 'MCQ', count: 20 }, { type: 'SUB', count: 5 }], duration: '40', invited: 1, completedNum: 0, completedDen: 1 },
  { name: 'Lacerte Tax Software', level: 'Basic', questionTypes: [{ type: 'MCQ', count: 15 }, { type: 'SIM', count: 3 }, { type: 'SUB', count: 2 }], duration: '40', invited: 1, completedNum: 0, completedDen: 1 },
  { name: 'Drake Tax Software', level: 'Basic', questionTypes: [{ type: 'MCQ', count: 20 }], duration: '40', invited: 0, completedNum: 0, completedDen: 0 },
  { name: 'CCH Axcess Tax Software', level: 'Basic', questionTypes: [{ type: 'AI Video' as string, count: undefined as number | undefined }], duration: '40', invited: 0, completedNum: 0, completedDen: 0 },
  { name: 'NPO Audit', level: 'Intermediate', questionTypes: [{ type: 'MCQ', count: 20 }, { type: 'AI Video', count: undefined as number | undefined }], duration: '40', invited: 0, completedNum: 0, completedDen: 0 },
  { name: 'Yellow Book (GAGAS)', level: 'Intermediate', questionTypes: [{ type: 'MCQ', count: 10 }, { type: 'SIM', count: 5 }, { type: 'SUB', count: 3 }, { type: 'AI Video', count: undefined as number | undefined }], duration: '40', invited: 1, completedNum: 0, completedDen: 1 },
  { name: 'NPO Audit', level: 'Basic', questionTypes: [{ type: 'MCQ', count: 20 }], duration: '40', invited: 3, completedNum: 2, completedDen: 3 },
  { name: 'ProConnect Tax Software', level: 'Basic', questionTypes: [{ type: 'MCQ', count: 20 }], duration: '40', invited: 0, completedNum: 0, completedDen: 0 },
  { name: 'Sage 50 Accounting', level: 'Basic', questionTypes: [{ type: 'MCQ', count: 20 }, { type: 'SIM', count: 3 }], duration: '45', invited: 2, completedNum: 1, completedDen: 2 },
  { name: 'Xero Accounting', level: 'Intermediate', questionTypes: [{ type: 'MCQ', count: 20 }, { type: 'AI Video', count: undefined as number | undefined }], duration: '40', invited: 1, completedNum: 1, completedDen: 1 },
  { name: 'Governmental Accounting', level: 'Advance', questionTypes: [{ type: 'MCQ', count: 25 }, { type: 'SUB', count: 5 }], duration: '60', invited: 0, completedNum: 0, completedDen: 0 },
  { name: 'Financial Reporting Standards', level: 'Intermediate', questionTypes: [{ type: 'MCQ', count: 20 }, { type: 'SIM', count: 5 }], duration: '50', invited: 3, completedNum: 2, completedDen: 3 },
  { name: 'CPA Ethics and Professional Conduct', level: 'Basic', questionTypes: [{ type: 'MCQ', count: 20 }], duration: '40', invited: 0, completedNum: 0, completedDen: 0 },
  { name: 'Tax Operations for Virtual Assistants', level: 'Basic', questionTypes: [{ type: 'MCQ', count: 20 }], duration: '40', invited: 0, completedNum: 0, completedDen: 0 },
  { name: 'Data Interpretation and Logical Reasoning', level: 'Intermediate', questionTypes: [{ type: 'MCQ', count: 20 }, { type: 'SUB', count: 5 }], duration: '40', invited: 0, completedNum: 0, completedDen: 0 },
  { name: 'Single Audit and Uniform Guidance', level: 'Basic', questionTypes: [{ type: 'MCQ', count: 20 }], duration: '40', invited: 0, completedNum: 0, completedDen: 0 },
  { name: 'Accounting Fundamentals for NFP Organizations', level: 'Intermediate', questionTypes: [{ type: 'MCQ', count: 20 }, { type: 'SIM', count: 4 }], duration: '40', invited: 0, completedNum: 0, completedDen: 0 },
];

const qTypeColors: Record<string, { bg: string; color: string; border: string }> = {
  'MCQ': { bg: '#eef2ff', color: '#4F46E5', border: '#c7d2fe' },
  'SIM': { bg: '#fef3c7', color: '#b45309', border: '#fcd34d' },
  'SUB': { bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0' },
  'AI Video': { bg: '#fce7f3', color: '#be185d', border: '#fbcfe8' },
  'ESSAY': { bg: '#f1f5f9', color: '#475569', border: '#cbd5e1' },
};

const PRICE_PER_ASSESSMENT = 99;
const ITEMS_PER_PAGE = 10;

// ─── Custom Dropdown ───────────────────────────────────────────────────────────
interface FilterDropdownProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
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
    <div className="eh-filter-dropdown" ref={ref}>
      <span className="eh-filter-label">{label}</span>
      <div className={`eh-filter-trigger ${open ? 'open' : ''}`} onClick={() => setOpen((o) => !o)}>
        <span className="eh-filter-value">{value}</span>
        <svg className={`eh-filter-chevron ${open ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {open && (
        <div className="eh-filter-menu">
          {options.map((opt) => (
            <div key={opt} className={`eh-filter-item ${value === opt ? 'selected' : ''}`} onClick={() => { onChange(opt); setOpen(false); }}>
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Pagination ────────────────────────────────────────────────────────────────
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, totalRecords, itemsPerPage, onPageChange }: PaginationProps) => {
  const startRecord = totalRecords === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endRecord = Math.min(currentPage * itemsPerPage, totalRecords);

  const getPageNumbers = () => {
    const pages: number[] = [];
    const delta = 2;
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);
    for (let i = left; i <= right; i++) pages.push(i);
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="eh-pagination">
      <div className="eh-pagination-controls">
        <button className="eh-page-btn eh-page-nav" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>← Back</button>
        {getPageNumbers()[0] > 1 && (
          <>
            <button className="eh-page-btn" onClick={() => onPageChange(1)}>1</button>
            {getPageNumbers()[0] > 2 && <span className="eh-page-ellipsis">…</span>}
          </>
        )}
        {getPageNumbers().map((p) => (
          <button key={p} className={`eh-page-btn ${p === currentPage ? 'active' : ''}`} onClick={() => onPageChange(p)}>{p}</button>
        ))}
        {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
          <>
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && <span className="eh-page-ellipsis">…</span>}
            <button className="eh-page-btn" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
          </>
        )}
        <button className="eh-page-btn eh-page-nav" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next →</button>
      </div>
      <div className="eh-pagination-info">
        Showing <strong>{startRecord}–{endRecord}</strong> of <strong>{totalRecords}</strong> Records
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
interface ExternalHireProps {
  onNavigate: (screen: string) => void;
}

const ExternalHire = ({ onNavigate }: ExternalHireProps) => {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('All');
  const [domain, setDomain] = useState('All');
  const [questionType, setQuestionType] = useState('All');
  const [role, setRole] = useState('All');
  const [country, setCountry] = useState('All');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [modalAssessments, setModalAssessments] = useState<any[]>([]);
  const [questionToggles, setQuestionToggles] = useState<Record<number, Record<string, boolean>>>({});
  const [users, setUsers] = useState([{ email: '', firstName: '', lastName: '' }]);
  const [step1Open, setStep1Open] = useState(true);
  const [step2Open, setStep2Open] = useState(true);

  // Payment modal state
  const [selectedCard, setSelectedCard] = useState('card-2');
  const [addingNewCard, setAddingNewCard] = useState(false);
  const [newCardName, setNewCardName] = useState('');
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardCvv, setNewCardCvv] = useState('');
  const [newCardExpiry, setNewCardExpiry] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);

  const filteredData = assessmentData.filter((item) => {
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (level !== 'All' && item.level !== level) return false;
    if (domain !== 'All') return false;
    if (questionType !== 'All' && !item.questionTypes.some((q) => q.type === questionType)) return false;
    return true;
  });

  useEffect(() => { setCurrentPage(1); }, [search, level, domain, questionType, role, country]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const toggleRow = (idx: number) => {
    setSelectedRows((prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]);
  };

  const toggleAll = () => {
    const pageIndices = paginatedData.map((_, i) => (currentPage - 1) * ITEMS_PER_PAGE + i);
    const allSelected = pageIndices.every((i) => selectedRows.includes(i));
    if (allSelected) {
      setSelectedRows((prev) => prev.filter((i) => !pageIndices.includes(i)));
    } else {
      setSelectedRows((prev) => [...new Set([...prev, ...pageIndices])]);
    }
  };

  const clearFilters = () => { setSearch(''); setLevel('All'); setDomain('All'); setQuestionType('All'); setRole('All'); setCountry('All'); };

  const openAssignModal = () => {
    if (selectedRows.length === 0) return;
    const selected = selectedRows.map((idx) => ({ ...filteredData[idx], originalIdx: idx }));
    setModalAssessments(selected);
    const toggles: Record<number, Record<string, boolean>> = {};
    selected.forEach((a, i) => {
      toggles[i] = {};
      a.questionTypes.forEach((qt: any) => { toggles[i][qt.type] = true; });
    });
    setQuestionToggles(toggles);
    setUsers([{ email: '', firstName: '', lastName: '' }]);
    setStep1Open(true);
    setStep2Open(true);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);
  const closePayment = () => setShowPayment(false);

  const handleProceed = () => {
    setShowModal(false);
    setSelectedCard('card-2');
    setAddingNewCard(false);
    setNewCardName(''); setNewCardNumber(''); setNewCardCvv(''); setNewCardExpiry('');
    setSaveCard(false);
    setAcceptTerms(true);
    setShowPayment(true);
  };

  const handleCompletePayment = () => {
    setShowPayment(false);
    setSelectedRows([]);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onNavigate('external-reports');
    }, 2800);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && showModal) closeModal();
  }, [showModal]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const removeModalAssessment = (modalIdx: number) => {
    const assessment = modalAssessments[modalIdx];
    setSelectedRows((prev) => prev.filter((i) => i !== assessment.originalIdx));
    const newAssessments = modalAssessments.filter((_, i) => i !== modalIdx);
    setModalAssessments(newAssessments);
    const newToggles: Record<number, Record<string, boolean>> = {};
    newAssessments.forEach((a, i) => {
      const oldIdx = modalAssessments.indexOf(a);
      newToggles[i] = questionToggles[oldIdx] || {};
    });
    setQuestionToggles(newToggles);
    if (newAssessments.length === 0) setShowModal(false);
  };

  const toggleQuestionType = (assessmentIdx: number, qType: string) => {
    setQuestionToggles((prev) => ({ ...prev, [assessmentIdx]: { ...prev[assessmentIdx], [qType]: !prev[assessmentIdx]?.[qType] } }));
  };

  const addUserRow = () => setUsers((prev) => [...prev, { email: '', firstName: '', lastName: '' }]);
  const removeUserRow = (idx: number) => { if (users.length > 1) setUsers((prev) => prev.filter((_, i) => i !== idx)); };
  const updateUser = (idx: number, field: string, value: string) => setUsers((prev) => prev.map((u, i) => i === idx ? { ...u, [field]: value } : u));

  const numAssessments = modalAssessments.length;
  const numUsers = users.length;
  const totalAssessments = numAssessments * numUsers;
  const totalPayment = totalAssessments * PRICE_PER_ASSESSMENT;
  const amountPerUser = numAssessments * PRICE_PER_ASSESSMENT;

  const pageIndices = paginatedData.map((_, i) => (currentPage - 1) * ITEMS_PER_PAGE + i);
  const allPageSelected = pageIndices.length > 0 && pageIndices.every((i) => selectedRows.includes(i));

  return (
    <div className="eh-page">
      <div className="eh-fixed-header">
        <div className="eh-breadcrumb">
          <span className="eh-breadcrumb-link" onClick={() => onNavigate('dashboard')}>Home</span>
          <span className="eh-breadcrumb-sep">&gt;</span>
          <span className="eh-breadcrumb-link" onClick={() => onNavigate('assessments')}>Assessments</span>
          <span className="eh-breadcrumb-sep">&gt;</span>
          <span className="eh-breadcrumb-current">External Hire</span>
        </div>

        <div className="eh-title-row">
          <div>
            <h1 className="eh-title">External Hire</h1>
            <p className="eh-subtitle">Assign assessments to external candidates and evaluate role-specific competencies.</p>
          </div>
          <button className={`eh-btn-assign ${selectedRows.length > 0 ? 'active' : ''}`} disabled={selectedRows.length === 0} onClick={openAssignModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            Assign Assessment
          </button>
        </div>

        <div className="eh-filters-row">
          <div className="eh-search-wrap">
            <svg className="eh-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" className="eh-search" placeholder="Search assessments..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <FilterDropdown label="Level" value={level} onChange={setLevel} options={['All', 'Basic', 'Intermediate', 'Advance']} />
          <FilterDropdown label="Domain" value={domain} onChange={setDomain} options={['All', 'Accounting', 'Auditing', 'Tax', 'Others']} />
          <FilterDropdown label="Question Type" value={questionType} onChange={setQuestionType} options={['All', 'MCQ', 'SIM', 'SUB', 'AI Video']} />
          <FilterDropdown label="Role" value={role} onChange={setRole} options={['All']} />
          <FilterDropdown label="Country" value={country} onChange={setCountry} options={['All']} />
          <button className="eh-btn-apply">Apply</button>
          <button className="eh-btn-clear" onClick={clearFilters}>Clear All</button>
        </div>

        <div className="eh-info-banner">
          <div className="eh-info-banner-left">
            <span className="eh-info-banner-text">Assign assessments to external candidates for informed hiring decisions – <strong>$99 per assessment</strong>.</span>
            <span className="eh-free-credit-badge">1 Free Assessment Credit Available</span>
          </div>
          <span className="eh-info-link">
            {selectedRows.length > 0
              ? <span className="eh-selected-count">{selectedRows.length} assessment{selectedRows.length > 1 ? 's' : ''} selected</span>
              : 'Select assessment to proceed'
            }
          </span>
        </div>
      </div>

      <div className="eh-scroll-body">
        <div className="eh-table-wrap">
          <table className="eh-table">
            <thead>
              <tr>
                <th className="eh-th-check"><input type="checkbox" checked={allPageSelected} onChange={toggleAll} /></th>
                <th>Assessment Name</th>
                <th>Level</th>
                <th>Questions</th>
                <th>Duration(Min)</th>
                <th>Invited</th>
                <th>Completed</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, idx) => {
                const globalIdx = (currentPage - 1) * ITEMS_PER_PAGE + idx;
                return (
                  <tr key={globalIdx} className={selectedRows.includes(globalIdx) ? 'row-selected' : ''}>
                    <td className="eh-td-check"><input type="checkbox" checked={selectedRows.includes(globalIdx)} onChange={() => toggleRow(globalIdx)} /></td>
                    <td className="eh-td-name">{item.name}</td>
                    <td>{item.level}</td>
                    <td>
                      <div className="eh-question-types">
                        {item.questionTypes.map((qt, i) => {
                          const colors = qTypeColors[qt.type] || qTypeColors['MCQ'];
                          return (
                            <span key={i} className="eh-q-type-tag" style={{ background: colors.bg, color: colors.color, border: `1px solid ${colors.border}` }}>
                              {qt.count ? `${qt.count} ${qt.type}` : qt.type}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td>{item.duration}</td>
                    <td><span className={item.invited > 0 ? 'eh-invited-green' : 'eh-invited-zero'}>{item.invited}</span></td>
                    <td>{item.completedDen > 0 ? `${item.completedNum}/${item.completedDen}` : '-'}</td>
                    <td>
                      <div className="eh-actions">
                        <button className="eh-action-btn" title="Assign Users">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7162EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <line x1="20" y1="8" x2="20" y2="14"></line>
                            <line x1="23" y1="11" x2="17" y2="11"></line>
                          </svg>
                        </button>
                        <button className="eh-action-btn" title="Send Notification">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7162EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                          </svg>
                        </button>
                        <button className="eh-action-btn" title="View">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7162EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} totalRecords={filteredData.length} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
      </div>

      {showModal && (
        <div className="eh-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="eh-modal-container">
            <div className="eh-modal-header">
              <h2 className="eh-modal-title">Assign Assessment</h2>
              <button className="eh-modal-close-btn" onClick={closeModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="eh-modal-body">
              {/* Step 1 */}
              <div className="eh-modal-step">
                <div className="eh-modal-step-header" onClick={() => setStep1Open(!step1Open)}>
                  <div className="eh-modal-step-header-left">
                    <span className="eh-step-icon eh-step-icon-green">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>
                    <span className="eh-step-label">Step 1</span>
                    <span className="eh-step-title">Assessments List</span>
                  </div>
                  <div className="eh-modal-step-header-right">
                    <span className="eh-step-selected-count">{modalAssessments.length} assessment{modalAssessments.length !== 1 ? 's' : ''} selected</span>
                    <span className={`eh-step-chevron ${step1Open ? 'open' : ''}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                  </div>
                </div>
                <div className={`eh-modal-step-content ${step1Open ? 'expanded' : 'collapsed'}`}>
                  <div className="eh-modal-table-wrap">
                    <table className="eh-modal-assessment-table">
                      <thead>
                        <tr>
                          <th>Assessment Name</th>
                          <th>Level</th>
                          <th>Questions</th>
                          <th>Duration(Min)</th>
                          <th>Invited</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {modalAssessments.map((item, idx) => (
                          <tr key={idx}>
                            <td className="eh-td-name">{item.name}</td>
                            <td>{item.level}</td>
                            <td>
                              <div className="eh-modal-question-types">
                                {item.questionTypes.map((qt: any, qi: number) => {
                                  const colors = qTypeColors[qt.type] || qTypeColors['MCQ'];
                                  const isChecked = questionToggles[idx]?.[qt.type] !== false;
                                  return (
                                    <label key={qi} className={`eh-modal-q-type-chip ${isChecked ? '' : 'unchecked'}`}
                                      style={{ background: isChecked ? colors.bg : '#f5f5f5', color: isChecked ? colors.color : '#aaa', border: `1px solid ${isChecked ? colors.border : '#ddd'}` }}>
                                      <input type="checkbox" checked={isChecked} onChange={() => toggleQuestionType(idx, qt.type)} className="eh-modal-q-checkbox" />
                                      {qt.type}{qt.count ? `(${qt.count})` : ''}
                                    </label>
                                  );
                                })}
                              </div>
                            </td>
                            <td>{item.duration}</td>
                            <td><span className={item.invited > 0 ? 'eh-invited-green' : 'eh-invited-zero'}>{item.invited}</span></td>
                            <td>
                              <button className="eh-modal-remove-btn" title="Remove" onClick={() => removeModalAssessment(idx)}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <line x1="8" y1="12" x2="16" y2="12"></line>
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="eh-modal-step">
                <div className="eh-modal-step-header" onClick={() => setStep2Open(!step2Open)}>
                  <div className="eh-modal-step-header-left">
                    <span className="eh-step-icon eh-step-icon-yellow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 2L11 13"></path><path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                      </svg>
                    </span>
                    <span className="eh-step-label">Step 2</span>
                    <span className="eh-step-title">Add Users</span>
                  </div>
                  <div className="eh-modal-step-header-right">
                    <span className={`eh-step-chevron ${step2Open ? 'open' : ''}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                  </div>
                </div>
                <div className={`eh-modal-step-content ${step2Open ? 'expanded' : 'collapsed'}`}>
                  <div className="eh-modal-csv-links">
                    <a href="#download" className="eh-csv-link" onClick={(e) => e.preventDefault()}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7162EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Download CSV Template
                    </a>
                    <span className="eh-csv-divider">|</span>
                    <a href="#import" className="eh-csv-link" onClick={(e) => e.preventDefault()}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7162EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      Import from CSV
                    </a>
                  </div>
                  <div className="eh-user-rows-header">
                    <span className="eh-user-col-header eh-user-col-email">Email</span>
                    <span className="eh-user-col-header eh-user-col-fname">First Name</span>
                    <span className="eh-user-col-header eh-user-col-lname">Last Name</span>
                    <span className="eh-user-col-header eh-user-col-num">No. of Assessments</span>
                    <span className="eh-user-col-header eh-user-col-amount">Amount</span>
                    <span className="eh-user-col-header eh-user-col-action"></span>
                  </div>
                  {users.map((user, idx) => (
                    <div className="eh-user-row" key={idx}>
                      <div className="eh-user-col eh-user-col-email"><input type="email" placeholder="Enter email" value={user.email} onChange={(e) => updateUser(idx, 'email', e.target.value)} className="eh-user-input" /></div>
                      <div className="eh-user-col eh-user-col-fname"><input type="text" placeholder="First name" value={user.firstName} onChange={(e) => updateUser(idx, 'firstName', e.target.value)} className="eh-user-input" /></div>
                      <div className="eh-user-col eh-user-col-lname"><input type="text" placeholder="Last name" value={user.lastName} onChange={(e) => updateUser(idx, 'lastName', e.target.value)} className="eh-user-input" /></div>
                      <div className="eh-user-col eh-user-col-num"><span className="eh-user-readonly-value">{numAssessments}</span></div>
                      <div className="eh-user-col eh-user-col-amount"><span className="eh-user-readonly-value">${amountPerUser}</span></div>
                      <div className="eh-user-col eh-user-col-action">
                        {users.length > 1 && (
                          <button className="eh-modal-remove-btn" title="Remove user" onClick={() => removeUserRow(idx)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="8" y1="12" x2="16" y2="12"></line>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button className="eh-btn-add-user" onClick={addUserRow}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add User
                  </button>
                </div>
              </div>
            </div>

            <div className="eh-modal-pricing-bar">
              <div className="eh-pricing-card">
                <span className="eh-pricing-label">Price Per User</span>
                <span className="eh-pricing-value">${PRICE_PER_ASSESSMENT} / Assessment</span>
              </div>
              <div className="eh-pricing-card eh-pricing-card-center">
                <span className="eh-pricing-label">Total Assessment</span>
                <span className="eh-pricing-value">{totalAssessments} Assessment{totalAssessments !== 1 ? 's' : ''}</span>
              </div>
              <div className="eh-pricing-card">
                <span className="eh-pricing-label">Total Payment</span>
                <span className="eh-pricing-value eh-pricing-total">${totalPayment}</span>
              </div>
            </div>

            <div className="eh-modal-footer">
              <button className="eh-btn-modal-cancel" onClick={closeModal}>Cancel</button>
              <button className="eh-btn-modal-proceed" onClick={handleProceed}>Proceed to Payment</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Payment Modal ── */}
      {showPayment && (
        <div className="eh-payment-overlay" onClick={(e) => { if (e.target === e.currentTarget) closePayment(); }}>
          <div className="eh-payment-modal">
            {/* Header */}
            <div className="eh-payment-header">
              <div>
                <h2 className="eh-payment-title">Review and Complete Payment</h2>
                <p className="eh-payment-subtitle">Confirm details to enable seamless learning.</p>
              </div>
              <button className="eh-payment-close" onClick={closePayment}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="eh-payment-body">
              <h3 className="eh-payment-section-title">Select Payment Card</h3>

              {/* Saved cards */}
              {[
                { id: 'card-0', last4: '8522', name: 'NILESH',         expiry: '11/26' },
                { id: 'card-1', last4: '4242', name: 'THOMAS',         expiry: '11/26' },
                { id: 'card-2', last4: '8521', name: 'THOMAS ANDERSON',expiry: '11/26' },
              ].map((card) => (
                <label key={card.id} className={`eh-card-option ${selectedCard === card.id && !addingNewCard ? 'selected' : ''}`}
                  onClick={() => { setSelectedCard(card.id); setAddingNewCard(false); }}>
                  <div className="eh-card-radio">
                    <div className={`eh-radio-dot ${selectedCard === card.id && !addingNewCard ? 'active' : ''}`} />
                  </div>
                  <div className="eh-card-details">
                    <span className="eh-card-number">XXXX-XXXX-XXXX-{card.last4}</span>
                    <div className="eh-card-meta">
                      <span className="eh-card-name">{card.name}</span>
                      <span className="eh-card-expiry">{card.expiry}</span>
                    </div>
                  </div>
                </label>
              ))}

              {/* Add new card */}
              <label className={`eh-card-option eh-card-option-new ${addingNewCard ? 'selected' : ''}`}
                onClick={() => { setAddingNewCard(true); setSelectedCard(''); }}>
                <div className="eh-card-radio">
                  <div className={`eh-radio-dot ${addingNewCard ? 'active' : ''}`} />
                </div>
                <span className="eh-card-new-label">Add new card</span>
              </label>

              {addingNewCard && (
                <div className="eh-new-card-form">
                  <div className="eh-new-card-row">
                    <input className="eh-new-card-input" placeholder="Card Holder Name" value={newCardName} onChange={(e) => setNewCardName(e.target.value)} />
                    <div className="eh-new-card-input-icon-wrap">
                      <svg width="22" height="16" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)'}}>
                        <circle cx="15" cy="12" r="10" fill="#EB001B" fillOpacity="0.9"/>
                        <circle cx="23" cy="12" r="10" fill="#F79E1B" fillOpacity="0.9"/>
                      </svg>
                      <input className="eh-new-card-input with-icon" placeholder="Card Number" value={newCardNumber} onChange={(e) => setNewCardNumber(e.target.value)} />
                    </div>
                  </div>
                  <div className="eh-new-card-row">
                    <input className="eh-new-card-input" placeholder="CVV" value={newCardCvv} onChange={(e) => setNewCardCvv(e.target.value)} />
                    <input className="eh-new-card-input" placeholder="MM/YY" value={newCardExpiry} onChange={(e) => setNewCardExpiry(e.target.value)} />
                  </div>
                  <label className="eh-save-card-label">
                    <input type="checkbox" checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} className="eh-save-card-checkbox" />
                    <span>Save card details</span>
                  </label>
                </div>
              )}

              {/* Powered by */}
              <div className="eh-powered-by">
                <span className="eh-powered-label">Powered by</span>
                <div className="eh-powered-logos">
                  <span className="eh-pci-badge">PCI DSS</span>
                  <span className="eh-stripe-logo">stripe</span>
                </div>
              </div>

              {/* Terms */}
              <label className="eh-terms-label">
                <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="eh-terms-checkbox" />
                <span>I accept the MYCPE ONE <a href="#terms" className="eh-terms-link" onClick={(e) => e.preventDefault()}>Terms of Services</a> and <a href="#privacy" className="eh-terms-link" onClick={(e) => e.preventDefault()}>Privacy Policy</a></span>
              </label>
            </div>

            {/* Footer */}
            <div className="eh-payment-footer">
              <button className="eh-btn-payment-back" onClick={() => { closePayment(); setShowModal(true); }}>Back</button>
              <button
                className={`eh-btn-complete-payment ${acceptTerms && (selectedCard || addingNewCard) ? 'active' : ''}`}
                disabled={!acceptTerms || (!selectedCard && !addingNewCard)}
                onClick={handleCompletePayment}
              >
                Complete Payment: ${totalPayment}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Success Confirmation ── */}
      {showSuccess && (
        <div className="eh-success-overlay">
          <div className="eh-success-modal">
            <div className="eh-success-icon-wrap">
              <svg className="eh-success-checkmark" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle className="eh-success-checkmark-circle" cx="26" cy="26" r="24" stroke="#16a34a" strokeWidth="2.5" fill="none"/>
                <polyline className="eh-success-checkmark-tick" points="14,27 22,35 38,18" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <div className="eh-success-text-wrap">
              <h3 className="eh-success-title">Assignment Successful!</h3>
              <p className="eh-success-message">The assessment has been assigned<br />to the selected candidates.</p>
            </div>
            <div className="eh-success-redirect-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7162EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Redirecting to Reports...
            </div>
            <div className="eh-success-progress-bar">
              <div className="eh-success-progress-fill" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExternalHire;
