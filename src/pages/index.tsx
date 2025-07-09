import React from 'react';
import CronJobForm from '../components/CronJobForm';

const Home: React.FC = () => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Segoe UI, Inter, Arial, sans-serif',
    position: 'relative',
    padding: '0 1rem',
  }}>
    <header style={{
      width: '100%',
      maxWidth: 480,
      margin: '2.5rem 0 1.2rem 0',
      textAlign: 'center',
    }}>
      <h1 style={{
        color: '#fff',
        fontWeight: 800,
        fontSize: '2.1rem',
        letterSpacing: '0.01em',
        margin: 0,
        textShadow: '0 2px 8px #764ba277',
      }}>
        CronMailer
      </h1>
      <p style={{ color: '#e0e0e0', fontSize: '1.08rem', margin: '0.5rem 0 0 0' }}>
        Effortlessly schedule and automate your emails with cron jobs.
      </p>
    </header>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
      <CronJobForm />
    </div>
    <footer style={{
      width: '100%',
      textAlign: 'center',
      color: '#fff',
      fontSize: '1rem',
      padding: '1.2rem 0 0.7rem 0',
      letterSpacing: '0.03em',
      marginTop: 'auto',
      opacity: 0.93,
      fontWeight: 500,
      textShadow: '0 1px 4px #764ba277',
    }}>
      &copy; {new Date().getFullYear()} <span style={{fontWeight:700}}>CronMailer</span> &mdash; Crafted with <span style={{color:'#e25555'}}>♥</span>
    </footer>
    <style>{`
      @media (max-width: 600px) {
        header h1 { font-size: 1.4rem !important; }
        header p { font-size: 0.98rem !important; }
      }
    `}</style>
  </div>
);

export default Home;