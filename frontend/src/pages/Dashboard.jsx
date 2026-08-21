import { useState, useEffect } from 'react';
import api from '../services/api';

function Dashboard() {
  const [corredores, setCorredores] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarCorredores();
  }, []);

  const cargarCorredores = async () => {
    try {
      const response = await api.get('/api/corredores/');
      setCorredores(response.data);
    } catch (err) {
      setError('Error al cargar corredores');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Dashboard Administrativo</h2>
      <h3>Corredores Registrados: {corredores.length}</h3>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '0.75rem' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '0.75rem' }}>Número</th>
            <th style={{ border: '1px solid #ddd', padding: '0.75rem' }}>Nombre</th>
            <th style={{ border: '1px solid #ddd', padding: '0.75rem' }}>CI</th>
            <th style={{ border: '1px solid #ddd', padding: '0.75rem' }}>Distancia</th>
          </tr>
        </thead>
        <tbody>
          {corredores.map((corredor) => (
            <tr key={corredor.id_corredor}>
              <td style={{ border: '1px solid #ddd', padding: '0.75rem' }}>{corredor.id_corredor}</td>
              <td style={{ border: '1px solid #ddd', padding: '0.75rem' }}>{corredor.numero_corredor}</td>
              <td style={{ border: '1px solid #ddd', padding: '0.75rem' }}>
                {corredor.persona?.nombre} {corredor.persona?.ap_pat}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '0.75rem' }}>{corredor.persona?.ci}</td>
              <td style={{ border: '1px solid #ddd', padding: '0.75rem' }}>{corredor.distancia?.distancia}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {error && <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '1rem', marginTop: '1rem' }}>{error}</div>}
    </div>
  );
}

export default Dashboard;
