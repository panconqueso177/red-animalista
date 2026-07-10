import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function AdminPanel() {
  const [sesion, setSesion] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);

  // Campos del formulario para la nueva mascota
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('Perro');
  const [edad, setEdad] = useState('');
  const [sexo, setSexo] = useState('Macho');
  const [raza, setRaza] = useState('');
  const [historia, setHistoria] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [mensajeForm, setMensajeForm] = useState('');

  // Comprobar si ya hay una sesión activa al cargar la página
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSesion(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSesion(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Iniciar Sesión
  const manejarLogin = async (e) => {
    e.preventDefault();
    try {
      setCargando(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error) {
      alert(`Error al iniciar sesión: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  // Cerrar Sesión
  const manejarLogout = async () => {
    await supabase.auth.signOut();
    setSesion(null);
  };

  // Guardar nueva mascota en Supabase
  const manejarGuardarMascota = async (e) => {
    e.preventDefault();
    try {
      setCargando(true);
      setMensajeForm('');

      const { error } = await supabase
        .from('animales')
        .insert([
          {
            nombre,
            especie,
            edad,
            sexo,
            raza,
            historia,
            foto_url: fotoUrl,
            adoptado: false
          }
        ]);

      if (error) throw error;

      setMensajeForm('🎉 ¡Mascota registrada con éxito!');
      // Limpiar el formulario
      setNombre('');
      setEdad('');
      setRaza('');
      setHistoria('');
      setFotoUrl('');
    } catch (error) {
      setMensajeForm(`❌ Error al guardar: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  // --- VISTA 1: INICIAR SESIÓN ---
  if (!sesion) {
    return (
      <div className="admin-login-container">
        <form onSubmit={manejarLogin} className="admin-card-login">
          <h2>Panel de Administración 🔐</h2>
          <p>Solo personal autorizado</p>
          
          <div className="input-group">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button type="submit" className="btn" disabled={cargando}>
            {cargando ? 'Ingresando...' : 'Entrar'}
          </button>
          
          <a href="#" className="volver-btn">⬅ Volver al sitio público</a>
        </form>
      </div>
    );
  }

  // --- VISTA 2: FORMULARIO DE AGREGAR MASCOTA ---
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Panel de Control 🐾</h2>
        <div>
          <a href="#" className="btn-secundario">Ver Sitio</a>
          <button onClick={manejarLogout} className="btn-logout">Cerrar Sesión</button>
        </div>
      </div>

      <div className="admin-content">
        <form onSubmit={manejarGuardarMascota} className="admin-form">
          <h3>Registrar Nuevo Peludito</h3>
          {mensajeForm && <p className="mensaje-alerta">{mensajeForm}</p>}

          <div className="form-grid">
            <div className="input-group">
              <label>Nombre de la mascota</label>
              <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>

            <div className="input-group">
              <label>Especie</label>
              <select value={especie} onChange={(e) => setEspecie(e.target.value)}>
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
              </select>
            </div>

            <div className="input-group">
              <label>Edad (Ej: 2 meses, 1 año)</label>
              <input type="text" required value={edad} onChange={(e) => setEdad(e.target.value)} />
            </div>

            <div className="input-group">
              <label>Sexo</label>
              <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>
            </div>

            <div className="input-group">
              <label>Raza (Mestizo, Siamés, etc.)</label>
              <input type="text" value={raza} onChange={(e) => setRaza(e.target.value)} />
            </div>

            <div className="input-group">
              <label>Enlace de la Foto (Supabase Public URL)</label>
              <input type="text" value={fotoUrl} onChange={(e) => setFotoUrl(e.target.value)} placeholder="https://..." />
            </div>
          </div>

          <div className="input-group full-width">
            <label>Su historia (Escribe algo lindo y emotivo)</label>
            <textarea rows="4" value={historia} onChange={(e) => setHistoria(e.target.value)} />
          </div>

          <button type="submit" className="btn" disabled={cargando}>
            {cargando ? 'Guardando en la base de datos...' : 'Publicar Mascota'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminPanel;