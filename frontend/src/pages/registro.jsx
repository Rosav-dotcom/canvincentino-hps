import { useState } from 'react';
import api from '../services/api';

function Registro() {
  const [persona, setPersona] = useState({
    nombre: '',
    ap_pat: '',
    ap_mat: '',
    celular: '',
    ci: '',
  });

  const [corredor, setCorredor] = useState({
    numero_corredor: '',
    distancias_id_dista: '',
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handlePersonaChange = (e) => {
    setPersona({ ...persona, [e.target.name]: e.target.value });
  };

  const handleCorredorChange = (e) => {
    setCorredor({ ...corredor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const response = await api.post('/api/corredores/', {
        persona_data: persona,
        corredor_data: {
          numero_corredor: parseInt(corredor.numero_corredor),
          distancias_id_dista: parseInt(corredor.distancias_id_dista),
        },
      });
      setMensaje('¡Registro exitoso!');
      setPersona({ nombre: '', ap_pat: '', ap_mat: '', celular: '', ci: '' });
      setCorredor({ numero_corredor: '', distancias_id_dista: '' });
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al registrar');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Registro de Corredores</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3>Datos Personales</h3>
        <input type="text" name="nombre" placeholder="Nombre" value={persona.nombre} onChange={handlePersonaChange} required />
        <input type="text" name="ap_pat" placeholder="Apellido Paterno" value={persona.ap_pat} onChange={handlePersonaChange} required />
        <input type="text" name="ap_mat" placeholder="Apellido Materno" value={persona.ap_mat} onChange={handlePersonaChange} required />
        <input type="text" name="celular" placeholder="Celular" value={persona.celular} onChange={handlePersonaChange} required />
        <input type="text" name="ci" placeholder="Carnet de Identidad" value={persona.ci} onChange={handlePersonaChange} required />

        <h3>Datos de Carrera</h3>
        <input type="number" name="numero_corredor" placeholder="Número de Corredor" value={corredor.numero_corredor} onChange={handleCorredorChange} required />
        <select name="distancias_id_dista" value={corredor.distancias_id_dista} onChange={handleCorredorChange} required>
          <option value="">Seleccione distancia</option>
          <option value="1">5K</option>
          <option value="2">10K</option>
          <option value="3">15K</option>
          <option value="4">21K</option>
          <option value="5">42K</option>
        </select>

        <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#2c3e50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Registrar
        </button>
      </form>

      {mensaje && <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '1rem', marginTop: '1rem' }}>{mensaje}</div>}
      {error && <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '1rem', marginTop: '1rem' }}>{error}</div>}
    </div>
  );
}

export default Registro;
