import { useState } from 'react';
import axios from 'axios';
import '../App.css';

const DISTANCES = ["5K", "10K", "15K", "21K", "42K"];

function Registro({ onAdminClick }) {
  const [form, setForm] = useState({
    nombre: '', ap_pat: '', ap_mat: '',
    celular: '', ci: '', numero: '', distancia: '',
  });
  const [flash, setFlash] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errors, setErrors] = useState({});

  const set = (k) => (v) => {
    setForm((f) => ({ ...f, [k]: v }));
    // Limpiar error del campo cuando el usuario escribe
    if (errors[k]) {
      setErrors((prev) => ({ ...prev, [k]: '' }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    // Validar nombre
    if (!form.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    } else if (form.nombre.trim().length < 2) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar apellido paterno
    if (!form.ap_pat.trim()) {
      nuevosErrores.ap_pat = 'El apellido paterno es obligatorio';
    } else if (form.ap_pat.trim().length < 2) {
      nuevosErrores.ap_pat = 'El apellido paterno debe tener al menos 2 caracteres';
    }

    // Validar apellido materno
    if (!form.ap_mat.trim()) {
      nuevosErrores.ap_mat = 'El apellido materno es obligatorio';
    } else if (form.ap_mat.trim().length < 2) {
      nuevosErrores.ap_mat = 'El apellido materno debe tener al menos 2 caracteres';
    }

    // Validar celular (solo números, 7-8 dígitos)
    if (!form.celular.trim()) {
      nuevosErrores.celular = 'El celular es obligatorio';
    } else if (!/^\d{7,8}$/.test(form.celular.trim())) {
      nuevosErrores.celular = 'El celular debe tener 7-8 dígitos numéricos';
    }

    // Validar CI (solo números, 5-10 dígitos)
    if (!form.ci.trim()) {
      nuevosErrores.ci = 'El carnet de identidad es obligatorio';
    } else if (!/^\d{5,10}$/.test(form.ci.trim())) {
      nuevosErrores.ci = 'El CI debe tener 5-10 dígitos numéricos';
    }

    // Validar número de corredor
    if (!form.numero.trim()) {
      nuevosErrores.numero = 'El número de corredor es obligatorio';
    } else if (parseInt(form.numero) <= 0) {
      nuevosErrores.numero = 'El número debe ser mayor a 0';
    }

    // Validar distancia
    if (!form.distancia) {
      nuevosErrores.distancia = 'Debe seleccionar una distancia';
    }

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFlash('');
    setErrorMsg('');

    if (!validarFormulario()) {
      setErrorMsg('Por favor complete todos los campos obligatorios correctamente.');
      setTimeout(() => setErrorMsg(''), 3000);
      return;
    }

    try {
      const distanciaMap = {
        "5K": 1,
        "10K": 2,
        "15K": 3,
        "21K": 4,
        "42K": 5
      };

      const payload = {
        persona_data: {
          nombre: form.nombre.trim(),
          ap_pat: form.ap_pat.trim(),
          ap_mat: form.ap_mat.trim(),
          celular: form.celular.trim(),
          ci: form.ci.trim(),
        },
        corredor_data: {
          numero_corredor: parseInt(form.numero),
          distancias_id_dista: distanciaMap[form.distancia] || 1,
        },
      };

      const response = await axios.post('http://localhost:8000/api/corredores/', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      setFlash('success');
      setForm({ nombre: '', ap_pat: '', ap_mat: '', celular: '', ci: '', numero: '', distancia: '' });
      setErrors({});
      setTimeout(() => setFlash(''), 3000);
    } catch (err) {
      setErrorMsg(err.response?.data?.detail || 'Error al registrar');
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  return (
    <div className="app-bg" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px 24px', position: 'relative', zIndex: 1 }}>
        <div className="glass-card" style={{ width: '100%', maxWidth: '560px', padding: '36px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '4px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#8b2d5c,#5b2a6e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#8b2d5c', letterSpacing: '0.13em', textTransform: 'uppercase' }}>
                  Centro de Atención a la Mujer
                </span>
              </div>
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#5b2a6e', lineHeight: 1.2 }}>
                Registro de Corredores
              </h1>
              <p style={{ fontSize: '11px', color: '#a07890', marginTop: '2px' }}>
                Sistema de Gestión de Carreras
              </p>
            </div>
            <button className="btn-wine btn-wine-sm" onClick={onAdminClick} style={{ marginLeft: '16px', flexShrink: 0 }}>
              Login
            </button>
          </div>

          {flash === 'success' && (
            <div style={{ margin: '16px 0 0', padding: '11px 14px', borderRadius: '10px', background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#15803d' }}>Corredor registrado exitosamente</span>
            </div>
          )}
          {errorMsg && (
            <div style={{ margin: '16px 0 0', padding: '11px 14px', borderRadius: '10px', background: '#fef2f2', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#dc2626' }}>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="section-label"><span>Datos Personales</span></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <input className="field-input" placeholder="Nombre *" value={form.nombre} onChange={(e) => set('nombre')(e.target.value)} style={errors.nombre ? { borderColor: '#dc2626' } : {}} />
                {errors.nombre && <span style={{ fontSize: '11px', color: '#dc2626', marginTop: '4px', display: 'block' }}>{errors.nombre}</span>}
              </div>
              <div>
                <input className="field-input" placeholder="Apellido Paterno *" value={form.ap_pat} onChange={(e) => set('ap_pat')(e.target.value)} style={errors.ap_pat ? { borderColor: '#dc2626' } : {}} />
                {errors.ap_pat && <span style={{ fontSize: '11px', color: '#dc2626', marginTop: '4px', display: 'block' }}>{errors.ap_pat}</span>}
              </div>
              <div>
                <input className="field-input" placeholder="Apellido Materno *" value={form.ap_mat} onChange={(e) => set('ap_mat')(e.target.value)} style={errors.ap_mat ? { borderColor: '#dc2626' } : {}} />
                {errors.ap_mat && <span style={{ fontSize: '11px', color: '#dc2626', marginTop: '4px', display: 'block' }}>{errors.ap_mat}</span>}
              </div>
              <div>
                <input className="field-input" placeholder="Celular *" type="tel" value={form.celular} onChange={(e) => set('celular')(e.target.value.replace(/[^0-9]/g, ''))} style={errors.celular ? { borderColor: '#dc2626' } : {}} />
                {errors.celular && <span style={{ fontSize: '11px', color: '#dc2626', marginTop: '4px', display: 'block' }}>{errors.celular}</span>}
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <input className="field-input" placeholder="Carnet de Identidad *" value={form.ci} onChange={(e) => set('ci')(e.target.value.replace(/[^0-9]/g, ''))} style={errors.ci ? { borderColor: '#dc2626' } : {}} />
                {errors.ci && <span style={{ fontSize: '11px', color: '#dc2626', marginTop: '4px', display: 'block' }}>{errors.ci}</span>}
              </div>
            </div>

            <div className="section-label"><span>Datos de Carrera</span></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <input className="field-input" placeholder="Número de Corredor *" value={form.numero} onChange={(e) => set('numero')(e.target.value.replace(/[^0-9]/g, ''))} style={errors.numero ? { borderColor: '#dc2626' } : {}} />
                {errors.numero && <span style={{ fontSize: '11px', color: '#dc2626', marginTop: '4px', display: 'block' }}>{errors.numero}</span>}
              </div>
              <div>
                <select className="field-input" value={form.distancia} onChange={(e) => set('distancia')(e.target.value)} style={errors.distancia ? { borderColor: '#dc2626' } : {}}>
                  <option value="" disabled>Seleccione distancia *</option>
                  {DISTANCES.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.distancia && <span style={{ fontSize: '11px', color: '#dc2626', marginTop: '4px', display: 'block' }}>{errors.distancia}</span>}
              </div>
            </div>

            <button type="submit" className="btn-wine" style={{ width: '100%', marginTop: '24px', padding: '13px', fontSize: '15px' }}>
              Registrar
            </button>
          </form>
        </div>
      </div>
      <footer className="app-footer">© 2024 Centro de Atención a la Mujer. Todos los derechos reservados.</footer>
    </div>
  );
}

export default Registro;