import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import AnimalCard from './components/AnimalCard';
import ConfigMenu from './components/ConfigMenu';
import './App.css';

function App() {
  const [animalitos, setAnimalitos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // --- ESTADOS DE CONFIGURACIÓN (Con memoria LocalStorage) ---
  const [modoOscuro, setModoOscuro] = useState(() => localStorage.getItem('tema') === 'oscuro');
  const [ocultarFotos, setOcultarFotos] = useState(() => localStorage.getItem('fotos') === 'ocultas');
  const [letraGrande, setLetraGrande] = useState(() => localStorage.getItem('letra') === 'grande');

  // --- EFECTOS PARA APLICAR LA CONFIGURACIÓN ---
  useEffect(() => {
    // Guarda y aplica el modo oscuro en el <body>
    localStorage.setItem('tema', modoOscuro ? 'oscuro' : 'claro');
    if (modoOscuro) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
  }, [modoOscuro]);

  useEffect(() => {
    // Guarda y aplica el tamaño de letra en el <html>
    localStorage.setItem('letra', letraGrande ? 'grande' : 'normal');
    if (letraGrande) document.documentElement.style.fontSize = '20px';
    else document.documentElement.style.fontSize = '16px';
  }, [letraGrande]);

  useEffect(() => {
    // Solo guarda la preferencia de fotos
    localStorage.setItem('fotos', ocultarFotos ? 'ocultas' : 'visibles');
  }, [ocultarFotos]);

  // --- CARGA DE ANIMALITOS ---
  const obtenerAnimales = async () => {
    try {
      setCargando(true);
      const { data, error } = await supabase.from('animales').select('*').eq('adoptado', false);
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
      <nav className="navbar">
        <img src="/logo.png" alt="Logo Red Animalista" className="logo" />
        <h1 className="brand-title">Red Animalista de Manta</h1>
        {/* Aquí inyectamos el menú y le pasamos los controles */}
        <ConfigMenu 
          modoOscuro={modoOscuro} setModoOscuro={setModoOscuro}
          ocultarFotos={ocultarFotos} setOcultarFotos={setOcultarFotos}
          letraGrande={letraGrande} setLetraGrande={setLetraGrande}
        />
      </nav>

      <header className="hero-banner">
        <h1>Red Animalista de Manta</h1>
        <p>Ayudando a peluditos en situación de calle a encontrar un hogar lleno de amor. Únete a nuestra causa y cambia una vida hoy.</p>
      </header>

      <main className="container">
        <h2 className="section-title">Animalitos en Adopción</h2>
        {cargando ? (
          <p style={{ textAlign: 'center' }}>Buscando peluditos...</p>
        ) : animalitos.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Por el momento no hay animalitos registrados.</p>
        ) : (
          <div className="grid">
            {animalitos.map((animal) => (
              // Le pasamos la preferencia de ocultarFotos a la tarjeta
              <AnimalCard key={animal.id} animal={animal} ocultarFotos={ocultarFotos} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;