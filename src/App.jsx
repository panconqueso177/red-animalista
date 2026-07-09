import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import './App.css';
import AnimalCard from './components/AnimalCard';


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
        <h1 className="brand-title">Red Animalista de Manta</h1>
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
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;