import React, { useState } from 'react';
import InputField from './InputField';

const CRON_HELPER_URL = 'https://crontab.guru/';

const CronJobForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [schedule, setSchedule] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [scheduleTouched, setScheduleTouched] = useState(false);

  const validateEmail = (val: string) => /.+@.+\..+/.test(val);
  const validateSchedule = (val: string) => /^([*\d\/,\-]+\s+){4}[*\d\/,\-]+$/.test(val.trim());

  const emailError = emailTouched && !validateEmail(email) ? 'Enter a valid email.' : '';
  const scheduleError = scheduleTouched && !validateSchedule(schedule) ? 'Enter a valid cron expression.' : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setEmailTouched(true);
    setScheduleTouched(true);
    if (!validateEmail(email) || !validateSchedule(schedule)) return;
    setLoading(true);
    const res = await fetch('/api/schedule-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), schedule: schedule.trim() }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setMessage(data.message);
      setEmail('');
      setSchedule('');
      setEmailTouched(false);
      setScheduleTouched(false);
    } else {
      setError(data.message || 'Something went wrong');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: '#fff',
        padding: '2.5rem 2.5rem 2rem 2.5rem',
        borderRadius: '1.5rem',
        boxShadow: '0 8px 32px rgba(44, 62, 80, 0.18), 0 1.5px 6px #764ba233',
        minWidth: 320,
        maxWidth: 420,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.3rem',
        position: 'relative',
      }}
    >
      {/* Logo/Icon */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '-0.5rem',
      }}>
        <span style={{
          fontSize: '2.7rem',
          color: '#764ba2',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '50%',
          padding: '0.5rem 0.7rem',
          boxShadow: '0 2px 8px #764ba244',
        }}>
          📧
        </span>
      </div>
      <h2 style={{
        textAlign: 'center',
        color: '#5f2c82',
        marginBottom: 0,
        letterSpacing: '0.02em',
        fontWeight: 700,
        fontSize: '1.6rem',
      }}>
        Schedule Promotion Email
      </h2>
      <p style={{
        textAlign: 'center',
        color: '#888',
        margin: 0,
        fontSize: '1.02rem',
      }}>
        Automate your marketing! Enter an email and a cron schedule.
      </p>
      {/* Email Field */}
      <label style={{ fontWeight: 600, color: '#5f2c82', fontSize: '1.05rem' }} htmlFor="email-input">
        Recipient Email
        <span title="Enter a valid email address." style={{ color: '#888', marginLeft: 4, cursor: 'help' }}>?</span>
      </label>
      <InputField
        id="email-input"
        type="email"
        placeholder="e.g. user@example.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onBlur={() => setEmailTouched(true)}
        required
        aria-invalid={!!emailError}
        aria-describedby="email-error"
      />
      {emailError && <div id="email-error" style={{ color: '#e74c3c', fontSize: '0.97rem', marginTop: '-0.7rem', marginBottom: '-0.7rem' }}>{emailError}</div>}
      {/* Cron Field */}
      <label style={{ fontWeight: 600, color: '#5f2c82', fontSize: '1.05rem' }} htmlFor="cron-input">
        Cron Schedule
        <span title="Use cron format: min hour day month weekday. See helper." style={{ color: '#888', marginLeft: 4, cursor: 'help' }}>?</span>
      </label>
      <InputField
        id="cron-input"
        type="text"
        placeholder="e.g. 0 9 * * *"
        value={schedule}
        onChange={e => setSchedule(e.target.value)}
        onBlur={() => setScheduleTouched(true)}
        required
        aria-invalid={!!scheduleError}
        aria-describedby="cron-error"
      />
      {scheduleError && <div id="cron-error" style={{ color: '#e74c3c', fontSize: '0.97rem', marginTop: '-0.7rem', marginBottom: '-0.7rem' }}>{scheduleError}</div>}
      <a href={CRON_HELPER_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', fontSize: '0.98rem', textAlign: 'right', marginBottom: '-0.7rem', textDecoration: 'underline', alignSelf: 'flex-end' }}>
        Need help with cron? (crontab.guru)
      </a>
      <button
        type="submit"
        disabled={loading}
        style={{
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '0.7rem',
          padding: '1rem',
          fontWeight: 700,
          fontSize: '1.1rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
          marginTop: '0.2rem',
          boxShadow: '0 2px 8px #764ba244',
          transition: 'background 0.2s, opacity 0.2s, box-shadow 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.7rem',
        }}
        onMouseOver={e => (e.currentTarget.style.boxShadow = '0 4px 16px #764ba277')}
        onMouseOut={e => (e.currentTarget.style.boxShadow = '0 2px 8px #764ba244')}
      >
        {loading && <span className="spinner" style={{ width: 18, height: 18, border: '2.5px solid #fff', borderTop: '2.5px solid #764ba2', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} />}
        {loading ? 'Scheduling...' : 'Schedule Email'}
      </button>
      {message && <div style={{ background: '#eafaf1', color: '#27ae60', textAlign: 'center', fontWeight: 600, fontSize: '1.05rem', borderRadius: 8, padding: '0.7rem 0.5rem', marginTop: '0.2rem', border: '1px solid #b2f2d7' }}>{message}</div>}
      {error && <div style={{ background: '#fdeaea', color: '#e74c3c', textAlign: 'center', fontWeight: 600, fontSize: '1.05rem', borderRadius: 8, padding: '0.7rem 0.5rem', marginTop: '0.2rem', border: '1px solid #f5b7b1' }}>{error}</div>}
      <div style={{ fontSize: '0.97rem', color: '#888', textAlign: 'center', marginTop: '0.2rem' }}>
        <strong>Tip:</strong> Cron format is <code>min hour day month weekday</code>
      </div>
      {/* Spinner animation */}
      <style>{`
        @media (max-width: 600px) {
          form {
            min-width: 90vw !important;
            max-width: 98vw !important;
            padding: 1.2rem !important;
          }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
};

export default CronJobForm;