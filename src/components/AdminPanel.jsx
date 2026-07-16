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
  const [archivoFoto, setArchivoFoto] = useState(null);
  const [mensajeForm, setMensajeForm] = useState('');
  const [animalesActivos, setAnimalesActivos] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSesion(session);
      if (session) obtenerAnimalesActivos();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSesion(session);
      if (session) obtenerAnimalesActivos();
    });

    return () => subscription.unsubscribe();
  }, []);

  const obtenerAnimalesActivos = async () => {
    const { data, error } = await supabase.from('animales').select('*').eq('adoptado', false);
    if (!error && data) {
      setAnimalesActivos(data);
    }
  };

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
      
      let publicFotoUrl = '';

      // Subir foto si existe
      if (archivoFoto) {
        const fileExt = archivoFoto.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('mascotas')
          .upload(fileName, archivoFoto);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('mascotas').getPublicUrl(fileName);
        publicFotoUrl = urlData.publicUrl;
      }

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
            foto_url: publicFotoUrl,
            adoptado: false
          }
        ]);

      if (error) throw error;

      setMensajeForm('Registrado con éxito');
      setNombre('');
      setEdad('');
      setRaza('');
      setHistoria('');
      setArchivoFoto(null);
      
      // Refrescar lista de animales
      obtenerAnimalesActivos();
    } catch (error) {
      setMensajeForm(`Error al guardar: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  const manejarAdoptado = async (id) => {
    if (!window.confirm("¿Estás seguro de marcar este animalito como adoptado?")) return;
    try {
      setCargando(true);
      const { error } = await supabase.from('animales').update({ adoptado: true }).eq('id', id);
      if (error) throw error;
      obtenerAnimalesActivos();
    } catch (error) {
      alert(`Error al actualizar: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  // --- VISTA 1: INICIAR SESIÓN ---
  if (!sesion) {
    return (
      <div className="admin-login-container">
        <form onSubmit={manejarLogin} className="admin-card-login">
          <h2>Panel de Administración</h2>
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
              <label>Foto de la Mascota</label>
              <input type="file" accept="image/*" onChange={(e) => setArchivoFoto(e.target.files[0])} />
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

        <div className="admin-form" style={{ marginTop: '2rem' }}>
          <h3>Animalitos en adopción</h3>
          {animalesActivos.length === 0 ? (
            <p>No hay animales activos en este momento.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {animalesActivos.map(animal => (
                <li key={animal.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 10px', borderBottom: '1px solid #e5e4e7' }}>
                  <div>
                    <strong>{animal.nombre}</strong> <span style={{ color: '#666', fontSize: '0.9rem' }}>({animal.especie})</span>
                  </div>
                  <button onClick={() => manejarAdoptado(animal.id)} disabled={cargando} style={{ cursor: 'pointer', backgroundColor: '#4ade80', color: '#121212', fontWeight: 'bold', padding: '8px 15px', borderRadius: '8px', border: 'none', transition: 'transform 0.2s' }}>
                    ¡Adoptado! 🎉
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;