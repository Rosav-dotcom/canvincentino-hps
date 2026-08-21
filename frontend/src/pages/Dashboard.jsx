import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../App.css';

const DISTANCES = ["5K", "10K", "15K", "21K", "42K"];

function RunnerBadge({ distancia }) {
  return (
    <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, background: 'rgba(139,45,92,0.1)', color: '#6b1f4a', border: '1px solid rgba(139,45,92,0.2)' }}>
      {distancia}
    </span>
  );
}

function Dashboard() {
  const [runners, setRunners] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    cargarCorredores();
  }, []);

  const cargarCorredores = async () => {
    try {
      const response = await api.get('/api/corredores/');
      setRunners(response.data);
    } catch (err) {
      console.error('Error al cargar corredores');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  const filtered = runners.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.persona?.nombre?.toLowerCase().includes(q) ||
      r.persona?.ap_pat?.toLowerCase().includes(q) ||
      r.persona?.ci?.includes(q) ||
      String(r.numero_corredor).includes(q)
    );
  });

  return (
    <div className="app-bg" style={{ display: 'flex', flexDirection: 'column' }}>
      <header className="admin-topbar">
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#8b2d5c,#5b2a6e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 3px 10px rgba(107,31,74,0.3)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: '15px', fontWeight: 800, color: '#5b2a6e', lineHeight: 1.1 }}>Centro de Atención a la Mujer</p>
            <p style={{ fontSize: '11px', color: '#a07890', lineHeight: 1.2 }}>Sistema de Gestión de Carreras</p>
          </div>
        </div>
      </header>

      <div style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(139,45,92,0.08)', position: 'sticky', top: 69, zIndex: 20 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '10px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b2d5c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#5b2a6e', borderBottom: '2px solid #8b2d5c', paddingBottom: '1px' }}>Dashboard</span>
          </div>
          <button className="btn-wine btn-wine-sm" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>

      <div style={{ flex: 1, position: 'relative', zIndex: 1, padding: '36px 16px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', textShadow: '0 2px 12px rgba(91,42,110,0.4)' }}>Dashboard Administrativo</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', marginTop: '6px' }}>
              Corredores Registrados: <strong style={{ color: 'white' }}>{runners.length}</strong>
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '28px' }}>
            {DISTANCES.map((d) => {
              const count = runners.filter((r) => r.distancia?.distancia === d).length;
              return (
                <div key={d} className="glass-card" style={{ padding: '18px 16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#6b1f4a' }}>{count}</div>
                  <div style={{ fontSize: '11px', color: '#a07890', fontWeight: 600, marginTop: '2px', lineHeight: 1.3 }}>{d}</div>
                </div>
              );
            })}
          </div>

          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#5b2a6e' }}>Corredores Registrados</h3>
                <p style={{ fontSize: '12px', color: '#a07890', marginTop: '2px' }}>{filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'}</p>
              </div>
              <div style={{ position: 'relative' }}>
                <svg style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#b09ab8' }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input type="text" placeholder="Buscar por nombre, CI o número..." value={search} onChange={(e) => setSearch(e.target.value)} className="field-input" style={{ paddingLeft: '30px', fontSize: '13px', width: '260px', padding: '9px 14px 9px 30px' }} />
              </div>
            </div>

            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(139,45,92,0.1)' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Número</th>
                    <th>Nombre</th>
                    <th>CI</th>
                    <th>Celular</th>
                    <th>Distancia</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#b09ab8', fontSize: '14px' }}>No se encontraron corredores</td></tr>
                  ) : (
                    filtered.map((r) => (
                      <tr key={r.id_corredor}>
                        <td><span style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, color: '#8b2d5c' }}>#{String(r.id_corredor).padStart(4, '0')}</span></td>
                        <td>
                          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,rgba(139,45,92,0.12),rgba(91,42,110,0.12))', fontWeight: 700, fontSize: '12px', color: '#6b1f4a' }}>
                            {r.numero_corredor}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, color: '#2d1040', fontSize: '14px' }}>{r.persona?.nombre} {r.persona?.ap_pat}</div>
                          {r.persona?.ap_mat && <div style={{ fontSize: '11px', color: '#a07890' }}>{r.persona?.ap_mat}</div>}
                        </td>
                        <td><span style={{ fontFamily: 'monospace', fontSize: '12.5px', color: '#7a4a7a' }}>{r.persona?.ci}</span></td>
                        <td><span style={{ fontFamily: 'monospace', fontSize: '12.5px', color: '#7a4a7a' }}>{r.persona?.celular || '—'}</span></td>
                        <td><RunnerBadge distancia={r.distancia?.distancia} /></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <footer className="app-footer">© 2024 Centro de Atención a la Mujer. Todos los derechos reservados.</footer>
    </div>
  );
}

export default Dashboard;