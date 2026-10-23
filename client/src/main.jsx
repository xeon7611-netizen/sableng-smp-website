import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'white', padding: 40, fontFamily: 'sans-serif', background: '#0b0e14', minHeight: '100vh' }}>
          <h1 style={{ color: '#ff5555', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Terjadi Kendala Tampilan:</h1>
          <pre style={{ background: '#181b22', padding: 20, borderRadius: 8, overflow: 'auto', marginBottom: '20px', color: '#ffaaaa' }}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => { localStorage.clear(); window.location.reload(); }}
            style={{ padding: '12px 24px', background: '#55ff55', color: '#000', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold' }}
          >
            Reset Cache & Refresh
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
