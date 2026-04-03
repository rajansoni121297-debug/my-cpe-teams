import { useState, useEffect, useCallback, useRef } from 'react';
import './Assessments.css';

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
];

const qTypeColors: Record<string, { bg: string; color: string; border: string }> = {
  'MCQ':      { bg: '#eef2ff', color: '#4F46E5', border: '#c7d2fe' },
  'SIM':      { bg: '#fef3c7', color: '#b45309', border: '#fcd34d' },
  'SUB':      { bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0' },
  'AI Video': { bg: '#fce7f3', color: '#be185d', border: '#fbcfe8' },
  'ESSAY':    { bg: '#f1f5f9', color: '#475569', border: '#cbd5e1' },
};

// Minutes per question (or fixed minutes for types without count)
const DURATION_PER_TYPE: Record<string, number> = {
  'MCQ':      2,
  'SIM':      5,
  'SUB':      3,
  'AI Video': 10,
  'ESSAY':    5,
};

function calcDuration(questionTypes: any[], toggles: Record<string, boolean>): number {
  return questionTypes.reduce((total: number, qt: any) => {
    if (toggles[qt.type] === false) return total;
    const mins = qt.count
      ? qt.count * (DURATION_PER_TYPE[qt.type] ?? 2)
      : (DURATION_PER_TYPE[qt.type] ?? 10);
    return total + mins;
  }, 0);
}

const ITEMS_PER_PAGE = 10;

// ─── Mock Users & Groups ───────────────────────────────────────────────────────
const usersData = [
  { name: 'test new',        email: 'test0906@yopmail.com',          reportingManager: '-',             qualifications: [],                    extraQuals: 0, designation: '' },
  { name: 'Thomas Anderson', email: 'thomas.anderson@yopmail.com',   reportingManager: '-',             qualifications: ['CA - Ireland'],       extraQuals: 3, designation: 'Manager' },
  { name: 'Sarah Johnson',   email: 'sarah.johnson@firm.com',        reportingManager: 'Michael Brown', qualifications: ['CPA'],               extraQuals: 0, designation: 'Senior Associate' },
  { name: 'Emily Chen',      email: 'emily.chen@firm.com',           reportingManager: 'Sarah Johnson', qualifications: ['CFA', 'CPA'],        extraQuals: 0, designation: 'Associate' },
  { name: 'Robert Williams', email: 'robert.w@firm.com',             reportingManager: 'Thomas Anderson', qualifications: ['EA'],              extraQuals: 0, designation: 'Partner' },
  { name: 'Priya Patel',     email: 'priya.patel@firm.com',          reportingManager: 'Emily Chen',    qualifications: ['ACCA'],              extraQuals: 1, designation: 'Senior Associate' },
];

const groupsData = [
  { name: 'Test',                     description: 'Testing',            tags: ['Test'], users: 1, createdDate: '26 Mar, 2026' },
  { name: 'Govern Tax',               description: 'test',               tags: [],       users: 2, createdDate: '19 Dec, 2025' },
  { name: 'Audit and Assurance tax',  description: 'For tax',            tags: [],       users: 0, createdDate: '19 Dec, 2025' },
  { name: 'Taxation Audit a',         description: 'Foe tax',            tags: [],       users: 0, createdDate: '19 Dec, 2025' },
  { name: 'Forensic Accounting',      description: 'Forensic Accounting',tags: [],       users: 3, createdDate: '28 Oct, 2025' },
  { name: 'Tax Advisory',             description: 'Tax Advisory',       tags: [],       users: 6, createdDate: '27 Oct, 2025' },
];

// ─── Custom Dropdown ───────────────────────────────────────────────────────────
interface FilterDropdownProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
}

const FilterDropdown = ({ label, value, onChange, options, placeholder }: FilterDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const display = value === 'All' ? (placeholder || label) : value;

  return (
    <div className="filter-dropdown" ref={ref}>
      <div className={`filter-dropdown-trigger ${open ? 'open' : ''}`} onClick={() => setOpen((o) => !o)}>
        <span className="filter-dropdown-value" style={{ color: value === 'All' ? '#aaa' : '#333' }}>{display}</span>
        <svg className={`filter-dropdown-chevron ${open ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {open && (
        <div className="filter-dropdown-menu">
          {options.map((opt) => (
            <div key={opt} className={`filter-dropdown-item ${value === opt ? 'selected' : ''}`} onClick={() => { onChange(opt); setOpen(false); }}>
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Labeled Filter Dropdown (floated label style) ─────────────────────────────
const LabeledFilterDropdown = ({ label, value, onChange, options }: FilterDropdownProps) => {
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
    <div className="filter-dropdown labeled" ref={ref}>
      <span className="filter-dropdown-label">{label}</span>
      <div className={`filter-dropdown-trigger ${open ? 'open' : ''}`} onClick={() => setOpen((o) => !o)}>
        <span className="filter-dropdown-value">{value}</span>
        <svg className={`filter-dropdown-chevron ${open ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {open && (
        <div className="filter-dropdown-menu">
          {options.map((opt) => (
            <div key={opt} className={`filter-dropdown-item ${value === opt ? 'selected' : ''}`} onClick={() => { onChange(opt); setOpen(false); }}>
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
    <div className="pagination-bar">
      <div className="pagination-controls">
        <button className="pagination-btn pagination-nav" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>← Back</button>
        {getPageNumbers()[0] > 1 && (
          <>
            <button className="pagination-btn" onClick={() => onPageChange(1)}>1</button>
            {getPageNumbers()[0] > 2 && <span className="pagination-ellipsis">…</span>}
          </>
        )}
        {getPageNumbers().map((p) => (
          <button key={p} className={`pagination-btn ${p === currentPage ? 'active' : ''}`} onClick={() => onPageChange(p)}>{p}</button>
        ))}
        {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
          <>
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && <span className="pagination-ellipsis">…</span>}
            <button className="pagination-btn" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
          </>
        )}
        <button className="pagination-btn pagination-nav" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next →</button>
      </div>
      <div className="pagination-info">
        Showing <strong>{startRecord}–{endRecord}</strong> of <strong>{totalRecords}</strong> Records
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
interface AssessmentsProps {
  onNavigate: (screen: string) => void;
}

const Assessments = ({ onNavigate }: AssessmentsProps) => {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('All');
  const [domain, setDomain] = useState('All');
  const [questionType, setQuestionType] = useState('All');
  const [role, setRole] = useState('All');
  const [country, setCountry] = useState('All');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [modalAssessments, setModalAssessments] = useState<any[]>([]);
  const [questionToggles, setQuestionToggles] = useState<Record<number, Record<string, boolean>>>({});
  const [step1Open, setStep1Open] = useState(true);
  const [step2Open, setStep2Open] = useState(true);

  // Step 2 — Users/Groups tab state
  const [activeTab, setActiveTab] = useState<'users' | 'groups'>('users');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);

  // Users filters
  const [userSearch, setUserSearch] = useState('');
  const [filterReportingManager, setFilterReportingManager] = useState('All');
  const [filterGroup, setFilterGroup] = useState('All');
  const [filterQualification, setFilterQualification] = useState('All');
  const [filterRole, setFilterRole] = useState('All');
  const [filterCountry, setFilterCountry] = useState('All');
  const [filterState, setFilterState] = useState('All');
  const [filterCity, setFilterCity] = useState('All');

  // Groups filters
  const [groupSearch, setGroupSearch] = useState('');

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
    setStep1Open(true);
    setStep2Open(true);
    setActiveTab('users');
    setSelectedUsers([]);
    setSelectedGroups([]);
    setUserSearch('');
    setGroupSearch('');
    setFilterReportingManager('All');
    setFilterGroup('All');
    setFilterQualification('All');
    setFilterRole('All');
    setFilterCountry('All');
    setFilterState('All');
    setFilterCity('All');
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleAssign = () => {
    setShowModal(false);
    setSelectedRows([]);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onNavigate('internal-reports');
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
    setQuestionToggles((prev) => ({
      ...prev,
      [assessmentIdx]: { ...prev[assessmentIdx], [qType]: !prev[assessmentIdx]?.[qType] },
    }));
  };

  // Filtered users/groups
  const filteredUsers = usersData.filter((u) => {
    if (userSearch && !u.name.toLowerCase().includes(userSearch.toLowerCase()) && !u.email.toLowerCase().includes(userSearch.toLowerCase())) return false;
    if (filterReportingManager !== 'All' && u.reportingManager !== filterReportingManager) return false;
    if (filterQualification !== 'All' && !u.qualifications.includes(filterQualification)) return false;
    return true;
  });

  const filteredGroups = groupsData.filter((g) => {
    if (groupSearch && !g.name.toLowerCase().includes(groupSearch.toLowerCase())) return false;
    return true;
  });

  const toggleUser = (idx: number) => setSelectedUsers((prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]);
  const toggleAllUsers = () => {
    const allSelected = filteredUsers.every((_, i) => selectedUsers.includes(i));
    setSelectedUsers(allSelected ? [] : filteredUsers.map((_, i) => i));
  };

  const toggleGroup = (idx: number) => setSelectedGroups((prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]);
  const toggleAllGroups = () => {
    const allSelected = filteredGroups.every((_, i) => selectedGroups.includes(i));
    setSelectedGroups(allSelected ? [] : filteredGroups.map((_, i) => i));
  };

  const assignCount = activeTab === 'users' ? selectedUsers.length : selectedGroups.length;

  const pageIndices = paginatedData.map((_, i) => (currentPage - 1) * ITEMS_PER_PAGE + i);
  const allPageSelected = pageIndices.length > 0 && pageIndices.every((i) => selectedRows.includes(i));
  const isMultiSelect = modalAssessments.length > 1;

  return (
    <div className="assessments-page">
      <div className="assessments-fixed-header">
        <div className="breadcrumb">
          <span className="breadcrumb-link" onClick={() => onNavigate('dashboard')}>Home</span>
          <span className="breadcrumb-sep">&gt;</span>
          <span className="breadcrumb-current">Assessments</span>
        </div>

        <div className="assessments-title-row">
          <div>
            <h1 className="page-title">Assessment</h1>
            <p className="page-subtitle">Assign assessments to new hires and evaluate role-specific competencies.</p>
          </div>
          <button className={`btn-assign-assessment ${selectedRows.length > 0 ? 'active' : ''}`} disabled={selectedRows.length === 0} onClick={openAssignModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            Assign Firm User
          </button>
        </div>

        <div className="filters-row">
          <div className="search-input-wrap">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" className="search-input" placeholder="Search assessments..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <LabeledFilterDropdown label="Level" value={level} onChange={setLevel} options={['All', 'Basic', 'Intermediate', 'Advance']} />
          <LabeledFilterDropdown label="Domain" value={domain} onChange={setDomain} options={['All', 'Accounting', 'Auditing', 'Tax', 'Others']} />
          <LabeledFilterDropdown label="Question Type" value={questionType} onChange={setQuestionType} options={['All', 'MCQ', 'SIM', 'SUB', 'AI Video']} />
          <LabeledFilterDropdown label="Role" value={role} onChange={setRole} options={['All']} />
          <LabeledFilterDropdown label="Country" value={country} onChange={setCountry} options={['All']} />
          <button className="btn-apply">Apply</button>
          <button className="btn-clear" onClick={clearFilters}>Clear All</button>
        </div>

        <div className="info-banner">
          <div className="info-banner-left">
            <span className="info-banner-text">Assign assessments to firm users and evaluate role-specific competencies.</span>
          </div>
          <span className="info-banner-link">
            {selectedRows.length > 0
              ? <span className="selected-count">{selectedRows.length} assessment{selectedRows.length > 1 ? 's' : ''} selected</span>
              : 'Select assessment to proceed'
            }
          </span>
        </div>
      </div>

      <div className="assessments-scroll-body">
        <div className="assessment-table-wrap">
          <table className="assessment-table">
            <thead>
              <tr>
                <th className="th-check"><input type="checkbox" checked={allPageSelected} onChange={toggleAll} /></th>
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
                    <td className="td-check"><input type="checkbox" checked={selectedRows.includes(globalIdx)} onChange={() => toggleRow(globalIdx)} /></td>
                    <td className="td-name">{item.name}</td>
                    <td>{item.level}</td>
                    <td>
                      <div className="question-types">
                        {item.questionTypes.map((qt, i) => {
                          const colors = qTypeColors[qt.type] || qTypeColors['MCQ'];
                          return (
                            <span key={i} className="q-type-tag" style={{ background: colors.bg, color: colors.color, border: `1px solid ${colors.border}` }}>
                              {qt.count ? `${qt.count} ${qt.type}` : qt.type}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td>{item.duration}</td>
                    <td><span className={item.invited > 0 ? 'invited-green' : 'invited-zero'}>{item.invited}</span></td>
                    <td>{item.completedDen > 0 ? `${item.completedNum}/${item.completedDen}` : '-'}</td>
                    <td>
                      <div className="action-icons">
                        <button className="action-icon-btn" title="Assign Users">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7162EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <line x1="20" y1="8" x2="20" y2="14"></line>
                            <line x1="23" y1="11" x2="17" y2="11"></line>
                          </svg>
                        </button>
                        <button className="action-icon-btn" title="Send Notification">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7162EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                          </svg>
                        </button>
                        <button className="action-icon-btn" title="View">
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

      {/* ── Modal ── */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="modal-container">

            {/* Header */}
            <div className="modal-header">
              <h2 className="modal-title">Assign Assessment</h2>
              <button className="modal-close-btn" onClick={closeModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="modal-body">

              {/* ── Step 1: Assessments List ── */}
              <div className="modal-step">
                <div className="modal-step-header" onClick={() => setStep1Open(!step1Open)}>
                  <div className="modal-step-header-left">
                    <span className="step-icon step-icon-green">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>
                    <span className="step-label">Step 1</span>
                    <span className="step-title">Assessments List</span>
                  </div>
                  <div className="modal-step-header-right">
                    <span className="step-selected-count">{modalAssessments.length} assessment{modalAssessments.length !== 1 ? 's' : ''} selected</span>
                    <span className={`step-chevron ${step1Open ? 'open' : ''}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                  </div>
                </div>
                <div className={`modal-step-content ${step1Open ? 'expanded' : 'collapsed'}`}>
                  <div className="modal-table-wrap">
                    <table className="modal-assessment-table">
                      <thead>
                        <tr>
                          <th>Assessment Name</th>
                          <th>Level</th>
                          <th>Questions</th>
                          <th>Duration(Min)</th>
                          <th>Invited</th>
                          {isMultiSelect && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {modalAssessments.map((item, idx) => {
                          const toggles = questionToggles[idx] || {};
                          const dynamicDuration = calcDuration(item.questionTypes, toggles);
                          return (
                            <tr key={idx}>
                              <td className="td-name">{item.name}</td>
                              <td>{item.level}</td>
                              <td>
                                <div className="modal-question-types">
                                  {item.questionTypes.map((qt: any, qi: number) => {
                                    const colors = qTypeColors[qt.type] || qTypeColors['MCQ'];
                                    const isChecked = toggles[qt.type] !== false;
                                    return (
                                      <label key={qi} className={`modal-q-type-chip ${isChecked ? '' : 'unchecked'}`}
                                        style={{ background: isChecked ? colors.bg : '#f5f5f5', color: isChecked ? colors.color : '#aaa', border: `1px solid ${isChecked ? colors.border : '#ddd'}` }}>
                                        <input type="checkbox" checked={isChecked} onChange={() => toggleQuestionType(idx, qt.type)} className="modal-q-checkbox" />
                                        {qt.type}{qt.count ? `(${qt.count})` : ''}
                                      </label>
                                    );
                                  })}
                                </div>
                              </td>
                              <td>
                                <span className="dynamic-duration">
                                  {dynamicDuration}
                                  <span className="duration-unit"> min</span>
                                </span>
                              </td>
                              <td><span className={item.invited > 0 ? 'invited-green' : 'invited-zero'}>{item.invited}</span></td>
                              {isMultiSelect && (
                                <td>
                                  <button className="modal-remove-btn" title="Remove" onClick={() => removeModalAssessment(idx)}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <line x1="8" y1="12" x2="16" y2="12"></line>
                                    </svg>
                                  </button>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* ── Step 2: Select Staff ── */}
              <div className="modal-step">
                <div className="modal-step-header modal-step-header-purple" onClick={() => setStep2Open(!step2Open)}>
                  <div className="modal-step-header-left">
                    <span className="step-icon step-icon-yellow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 2L11 13"></path><path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                      </svg>
                    </span>
                    <span className="step-label">Step 2</span>
                    <span className="step-title">Select Assessments for Assignment</span>
                  </div>
                  <div className="modal-step-header-right">
                    <span className={`step-chevron ${step2Open ? 'open' : ''}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                  </div>
                </div>

                <div className={`modal-step-content ${step2Open ? 'expanded' : 'collapsed'}`}>

                  {/* Tabs */}
                  <div className="staff-tabs">
                    <button className={`staff-tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>Users</button>
                    <button className={`staff-tab ${activeTab === 'groups' ? 'active' : ''}`} onClick={() => setActiveTab('groups')}>Groups</button>
                  </div>

                  {/* ── Users Tab ── */}
                  {activeTab === 'users' && (
                    <div className="staff-tab-content">
                      {/* Filters row 1 */}
                      <div className="staff-filters-row">
                        <div className="staff-search-wrap">
                          <svg className="staff-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                          <input className="staff-search" placeholder="Search" value={userSearch} onChange={(e) => setUserSearch(e.target.value)} />
                        </div>
                        <FilterDropdown label="Reporting Manager" value={filterReportingManager} onChange={setFilterReportingManager} placeholder="Select Reporting Manager" options={['All', '-', 'Michael Brown', 'Sarah Johnson', 'Thomas Anderson', 'Emily Chen']} />
                        <FilterDropdown label="Group" value={filterGroup} onChange={setFilterGroup} placeholder="Select Group" options={['All', 'Tax Advisory', 'Forensic Accounting', 'Govern Tax']} />
                        <FilterDropdown label="Qualification" value={filterQualification} onChange={setFilterQualification} placeholder="Select Qualifications" options={['All', 'CPA', 'CFA', 'CA - Ireland', 'ACCA', 'EA']} />
                        <button className="btn-apply">Apply</button>
                        <button className="btn-clear" onClick={() => { setUserSearch(''); setFilterReportingManager('All'); setFilterGroup('All'); setFilterQualification('All'); setFilterRole('All'); setFilterCountry('All'); setFilterState('All'); setFilterCity('All'); }}>Clear All</button>
                      </div>
                      {/* Filters row 2 */}
                      <div className="staff-filters-row staff-filters-row-2">
                        <FilterDropdown label="Role" value={filterRole} onChange={setFilterRole} placeholder="Select Role" options={['All', 'Manager', 'Associate', 'Senior Associate', 'Partner']} />
                        <FilterDropdown label="Country" value={filterCountry} onChange={setFilterCountry} placeholder="Select Country" options={['All', 'United States', 'India', 'Canada', 'United Kingdom']} />
                        <FilterDropdown label="State" value={filterState} onChange={setFilterState} placeholder="Select State" options={['All', 'California', 'New York', 'Texas']} />
                        <FilterDropdown label="City" value={filterCity} onChange={setFilterCity} placeholder="Select City" options={['All', 'San Francisco', 'New York City', 'Austin']} />
                      </div>

                      <div className="staff-proceed-hint">
                        {selectedUsers.length > 0
                          ? <span className="staff-selected-hint">{selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected</span>
                          : 'Select user to proceed'
                        }
                      </div>

                      <div className="staff-table-wrap">
                        <table className="staff-table">
                          <thead>
                            <tr>
                              <th className="staff-th-check">
                                <input type="checkbox"
                                  checked={filteredUsers.length > 0 && filteredUsers.every((_, i) => selectedUsers.includes(i))}
                                  onChange={toggleAllUsers}
                                />
                              </th>
                              <th>User Name</th>
                              <th>Email</th>
                              <th>Reporting Manager</th>
                              <th>Qualification</th>
                              <th>Designation</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredUsers.map((u, i) => (
                              <tr key={i} className={selectedUsers.includes(i) ? 'staff-row-selected' : ''} onClick={() => toggleUser(i)} style={{ cursor: 'pointer' }}>
                                <td className="staff-td-check" onClick={(e) => e.stopPropagation()}>
                                  <input type="checkbox" checked={selectedUsers.includes(i)} onChange={() => toggleUser(i)} />
                                </td>
                                <td className="staff-td-name">{u.name}</td>
                                <td className="staff-td-email">{u.email}</td>
                                <td>{u.reportingManager}</td>
                                <td>
                                  {u.qualifications.length > 0 ? (
                                    <div className="qual-tags">
                                      <span className="qual-tag">{u.qualifications[0]}</span>
                                      {(u.extraQuals > 0 || u.qualifications.length > 1) && (
                                        <span className="qual-more">+{u.extraQuals || u.qualifications.length - 1} more</span>
                                      )}
                                    </div>
                                  ) : '—'}
                                </td>
                                <td>{u.designation || '—'}</td>
                              </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                              <tr><td colSpan={6} className="staff-empty">No users found</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* ── Groups Tab ── */}
                  {activeTab === 'groups' && (
                    <div className="staff-tab-content">
                      <div className="staff-filters-row">
                        <div className="staff-search-wrap">
                          <svg className="staff-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                          <input className="staff-search" placeholder="Search" value={groupSearch} onChange={(e) => setGroupSearch(e.target.value)} />
                        </div>
                        <button className="btn-apply">Apply</button>
                        <button className="btn-clear" onClick={() => setGroupSearch('')}>Clear All</button>
                      </div>

                      <div className="staff-proceed-hint">
                        {selectedGroups.length > 0
                          ? <span className="staff-selected-hint">{selectedGroups.length} group{selectedGroups.length > 1 ? 's' : ''} selected</span>
                          : 'Select group to proceed'
                        }
                      </div>

                      <div className="staff-table-wrap">
                        <table className="staff-table">
                          <thead>
                            <tr>
                              <th className="staff-th-check">
                                <input type="checkbox"
                                  checked={filteredGroups.length > 0 && filteredGroups.every((_, i) => selectedGroups.includes(i))}
                                  onChange={toggleAllGroups}
                                />
                              </th>
                              <th>Group Name</th>
                              <th>Group Description</th>
                              <th>Group Tags</th>
                              <th>Users</th>
                              <th>Created Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredGroups.map((g, i) => (
                              <tr key={i} className={selectedGroups.includes(i) ? 'staff-row-selected' : ''} onClick={() => toggleGroup(i)} style={{ cursor: 'pointer' }}>
                                <td className="staff-td-check" onClick={(e) => e.stopPropagation()}>
                                  <input type="checkbox" checked={selectedGroups.includes(i)} onChange={() => toggleGroup(i)} />
                                </td>
                                <td className="staff-td-name">{g.name}</td>
                                <td>{g.description}</td>
                                <td>
                                  {g.tags.length > 0
                                    ? g.tags.map((t, ti) => <span key={ti} className="group-tag">{t}</span>)
                                    : '—'
                                  }
                                </td>
                                <td>
                                  <span className={g.users > 0 ? 'group-users-count' : 'group-users-zero'}>{g.users}</span>
                                </td>
                                <td>{g.createdDate}</td>
                              </tr>
                            ))}
                            {filteredGroups.length === 0 && (
                              <tr><td colSpan={6} className="staff-empty">No groups found</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>{/* end modal-body */}

            {/* Footer */}
            <div className="modal-footer">
              <button className="btn-modal-cancel" onClick={closeModal}>Cancel</button>
              <button className={`btn-modal-assign ${assignCount > 0 ? 'active' : ''}`} disabled={assignCount === 0} onClick={handleAssign}>
                Assign{assignCount > 0 ? ` (${assignCount})` : ''}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── Success Confirmation ── */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-icon-wrap">
              <svg className="success-checkmark" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle className="success-checkmark-circle" cx="26" cy="26" r="24" stroke="#16a34a" strokeWidth="2.5" fill="none"/>
                <polyline className="success-checkmark-tick" points="14,27 22,35 38,18" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <div className="success-text-wrap">
              <h3 className="success-title">Assignment Successful!</h3>
              <p className="success-message">The assessment has been assigned<br />to the selected firm users.</p>
            </div>
            <div className="success-redirect-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7162EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Redirecting to Reports...
            </div>
            <div className="success-progress-bar">
              <div className="success-progress-fill" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assessments;
