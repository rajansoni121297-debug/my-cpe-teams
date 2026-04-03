import { useState } from 'react';
import './Login.css';
import logo from '../assets/logo.png';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLogin();
    }, 500);
  };

  return (
    <div className="login-page">
      <div className="login-bg-pattern"></div>

      <div className="login-container">
        {/* Left side - Logo */}
        <div className="login-left">
          <div className="login-logo">
            <img src={logo} alt="My CPE Logo" />
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="login-right">
          <div className="login-card">
            <h1 className="login-title">Sign In</h1>
            <p className="login-subtitle">Sign in to your account to continue!</p>

            <form onSubmit={handleSubmit} noValidate>
              {/* Email Field */}
              <div className={`login-field ${errors.email ? 'field-error' : ''} ${email ? 'has-value' : ''}`}>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder=" "
                  autoComplete="email"
                />
                <label htmlFor="email">Email<span className="required">*</span></label>
                {errors.email && <span className="field-error-text">{errors.email}</span>}
              </div>

              {/* Password Field */}
              <div className={`login-field ${errors.password ? 'field-error' : ''} ${password ? 'has-value' : ''}`}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                  placeholder=" "
                  autoComplete="current-password"
                />
                <label htmlFor="password">Password<span className="required">*</span></label>
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  )}
                </button>
                {errors.password && <span className="field-error-text">{errors.password}</span>}
              </div>

              {/* Remember me & Forgot Password */}
              <div className="login-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <a href="#forgot" className="forgot-link">Forgot Password?</a>
              </div>

              <button
                type="submit"
                className={`login-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? <span className="btn-loader"></span> : 'Continue'}
              </button>
            </form>

            <p className="login-request">
              Haven't received any credentials yet?{' '}
              <a href="#request" className="request-link">Request Now</a>
            </p>
          </div>
        </div>
      </div>

      <footer className="login-footer">
        <span>©2024 - <strong>my-cpe.com</strong> All rights reserved</span>
        <span className="footer-email">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          support@my-cpe.com
        </span>
      </footer>
    </div>
  );
};

export default Login;
