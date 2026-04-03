import './FeedbackDrawer.css';

interface FeedbackData {
  submitted: boolean;
  overallExperience?: number;
  assessmentClearBadge?: string;
  assessmentClearText?: string;
  hadIssuesBadge?: string;
  issueDetail?: string;
  improvement?: string;
}

interface FeedbackDrawerProps {
  open: boolean;
  onClose: () => void;
  feedback?: FeedbackData | null;
  userName: string;
  assessmentName: string;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div style={{ display: 'flex', gap: 4 }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <svg key={star} width="28" height="28" viewBox="0 0 24 24"
        fill={star <= rating ? '#2563eb' : 'none'}
        stroke={star <= rating ? '#2563eb' : '#d1d5db'}
        strokeWidth="1.5"
      >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))}
  </div>
);

const FeedbackDrawer = ({ open, onClose, feedback, userName, assessmentName }: FeedbackDrawerProps) => {
  return (
    <>
      <div className={`fb-overlay ${open ? 'fb-overlay--visible' : ''}`} onClick={onClose} />
      <div className={`fb-drawer ${open ? 'fb-drawer--open' : ''}`}>
        <div className="fb-header">
          <div>
            <h2 className="fb-title">Assessment Feedback</h2>
            <p className="fb-subtitle">{userName} • {assessmentName}</p>
          </div>
          <button className="fb-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="fb-divider" />

        <div className="fb-body">
          {!feedback || !feedback.submitted ? (
            <div className="fb-empty">
              <div className="fb-empty-icon-wrap">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7162EA" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <line x1="4" y1="4" x2="20" y2="20" />
                </svg>
              </div>
              <p className="fb-empty-text">Feedback Not Submitted</p>
            </div>
          ) : (
            <ol className="fb-questions">
              <li className="fb-question-item">
                <p className="fb-question-text">How was your overall experience?</p>
                <StarRating rating={feedback.overallExperience || 0} />
              </li>

              <li className="fb-question-item">
                <p className="fb-question-text">Was the assessment clear and effective?</p>
                {feedback.assessmentClearBadge ? (
                  <span className="fb-badge fb-badge--yes">{feedback.assessmentClearBadge}</span>
                ) : (
                  <div className="fb-text-box">{feedback.assessmentClearText}</div>
                )}
              </li>

              <li className="fb-question-item">
                <p className="fb-question-text">Did you face any issues while performing?</p>
                <span className={`fb-badge ${feedback.hadIssuesBadge === 'No Issues' ? 'fb-badge--no-issues' : 'fb-badge--minor-issues'}`}>
                  {feedback.hadIssuesBadge}
                </span>
                {feedback.issueDetail && (
                  <div className="fb-text-box" style={{ marginTop: 10 }}>{feedback.issueDetail}</div>
                )}
              </li>

              <li className="fb-question-item">
                <p className="fb-question-text">Is there anything we could improve?</p>
                {feedback.improvement && (
                  <div className="fb-text-box">{feedback.improvement}</div>
                )}
              </li>
            </ol>
          )}
        </div>
      </div>
    </>
  );
};

export default FeedbackDrawer;
