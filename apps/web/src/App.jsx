import { useEffect, useState } from 'react';

export default function App() {
  const [message, setMessage] = useState('Loading…');
  const [time, setTime] = useState('');

  useEffect(() => {
    // Same-origin call: the backend owns /api/* (run.routePrefixes), everything else is this SPA.
    // No API base URL or CORS needed — frontend and backend share one URL.
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        setTime(data.time);
      })
      .catch(() => setMessage('Could not reach the backend at /api/hello.'));
  }, []);

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 640, margin: '4rem auto', padding: '0 1rem' }}>
      <h1>Embr: one environment, frontend + backend</h1>
      <p>
        This page is the <strong>static frontend</strong> (built from <code>apps/web</code> and
        served from the CDN). The message below comes from the <strong>backend API</strong> at{' '}
        <code>/api/hello</code> (the Express app in <code>apps/api</code>), running in the same
        environment.
      </p>
      <blockquote style={{ fontSize: '1.25rem', borderLeft: '4px solid #6366f1', paddingLeft: '1rem' }}>
        {message}
        {time && <div style={{ fontSize: '0.85rem', color: '#666' }}>server time: {time}</div>}
      </blockquote>
    </main>
  );
}
