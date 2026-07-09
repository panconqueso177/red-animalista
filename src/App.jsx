import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [animalitos, setAnimalitos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerAnimales = async () => {
    try {
      setCargando(true);
      const { data, error } = await supabase
        .from('animales')
        .select('*')
        .eq('adoptado', false);

      if (error) throw error;
      setAnimalitos(data);
    } catch (error) {
      console.error('Error cargando los animalitos:', error.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerAnimales();
  }, []);

  return (
    <div>
      {/* Barra de Navegación con Logo */}
      <nav className="navbar">
        <img src="/logo.png" alt="Logo Red Animalista" className="logo" />
        <h1 className="brand-title">RAM</h1>
      </nav>

      {/* Banner Principal */}
      <header className="hero-banner">
        <h1>Red Animalista de Manta</h1>
        <p>Ayudando a peluditos en situación de calle a encontrar un hogar lleno de amor. Únete a nuestra causa y cambia una vida hoy.</p>
      </header>

      {/* Contenido Principal */}
      <main className="container">
        <h2 className="section-title">Animalitos en Adopción</h2>

        {cargando ? (
          <p style={{ textAlign: 'center' }}>Buscando peluditos...</p>
        ) : animalitos.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Por el momento no hay animalitos registrados. ¡Pronto añadiremos más!</p>
        ) : (
          <div className="grid">
            {animalitos.map((animal) => (
              <div key={animal.id} className="card">
                <img 
                  src={animal.foto_url || 'https://via.placeholder.com/500x300?text=Sin+Foto'} 
                  alt={`Foto de ${animal.nombre}`} 
                />
                <div className="card-content">
                  <h3>{animal.nombre}</h3>
                  <p><strong>{animal.especie}</strong> • {animal.edad}</p>
                  <p style={{ fontSize: '14px', color: '#666' }}>{animal.descripcion}</p>
                  <button className="btn" onClick={() => alert(`¡Gracias por tu interés en ${animal.nombre}! Comunícate con la Red Animalista.`)}>
                    Quiero Adoptarlo
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;