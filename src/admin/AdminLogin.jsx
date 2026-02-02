import { useState } from 'react';
import './AdminLogin.css';

/**
 * AdminLogin - Simple authentication for admin access
 * Split layout with form on left and logo/pattern on right
 */
const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simple hardcoded authentication (replace with real auth later)
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('isAdminAuthenticated', 'true');
        onLogin();
      } else {
        setError('Invalid username or password');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="admin-login">
      {/* Left Side - Login Form */}
      <div className="admin-login__left">
        <div className="admin-login__form-container">
          <a href="/" className="admin-login__return">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5"></path>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Return
          </a>

          <div className="admin-login__header">
            <h1 className="admin-login__title">Sign in to your account</h1>
            <p className="admin-login__subtitle">Enter your credentials to access the admin portal</p>
          </div>

          <form className="admin-login__form" onSubmit={handleSubmit}>
            {error && (
              <div className="admin-login__error">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {error}
              </div>
            )}

            <div className="admin-login__field">
              <label htmlFor="username" className="admin-login__label">
                Username
              </label>
              <div className="admin-login__input-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <input
                  type="text"
                  id="username"
                  className="admin-login__input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="admin-login__field">
              <label htmlFor="password" className="admin-login__label">
                Password
              </label>
              <div className="admin-login__input-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                  type="password"
                  id="password"
                  className="admin-login__input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="admin-login__button"
              disabled={isLoading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="admin-login__hint">
              <small>Demo credentials: <strong>admin</strong> / <strong>admin123</strong></small>
            </div>
          </form>

          <div className="admin-login__footer">
            © 2026 Tag-os Elementary School. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Logo & Pattern */}
      <div className="admin-login__right">
        <div className="admin-login__brand">
          <img 
            src="/media/logo/logotes.png" 
            alt="Tag-os Elementary School" 
            className="admin-login__logo"
          />
          <h2 className="admin-login__brand-name">Tag-os Elementary School</h2>
          <p className="admin-login__brand-tagline">Admin Portal</p>
          <div className="admin-login__brand-description">
            A comprehensive platform for managing announcements, content, and school information.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
