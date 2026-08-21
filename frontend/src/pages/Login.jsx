import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../App.css';

function Login({ onClose }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!user || !pass) {
      setError(true);
      setTimeout(() => setError(false), 2500);
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const formData = new FormData();
      formData.append('username', user);
      formData.append('password', pass);

      const response = await api.post('/api/auth/login', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      localStorage.setItem('token', response.data.access_token);
      navigate('/dashboard');
      window.location.reload();
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '380px', padding: '36px 36px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#5b2a6e' }}>Admin</h2>
            <p style={{ fontSize: '11px', color: '#a07890', marginTop: '2px' }}>Centro de Atención a la Mujer</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b09ab8', padding: '4px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {error && (
          <div style={{ marginBottom: '16px', padding: '10px 13px', borderRadius: '9px', background: '#fef2f2', border: '1px solid #fecaca', fontSize: '13px', fontWeight: 600, color: '#dc2626' }}>
            Credenciales incorrectas.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input className="field-input" placeholder="Usuario" value={user} onChange={(e) => setUser(e.target.value)} />
          <input 
            className="field-input" 
            placeholder="Contraseña" 
            type="password" 
            value={pass} 
            onChange={(e) => setPass(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
        </div>

        <button 
          className="btn-wine" 
          onClick={handleLogin} 
          style={{ width: '100%', marginTop: '20px', padding: '12px', fontSize: '14px', opacity: loading ? 0.7 : 1 }} 
          disabled={loading}
        >
          {loading ? 'Verificando...' : 'Ingresar'}
        </button>
      </div>
    </div>
  );
}

export default Login;
