import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import AnimalCard from './components/AnimalCard';
import ConfigMenu from './components/ConfigMenu';
import './App.css';

function App() {
  const [animalitos, setAnimalitos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // --- ESTADO DEL FILTRO ---
  // Por defecto, queremos que se muestren "Todos"
  const [filtroEspecie, setFiltroEspecie] = useState('Todos');

  // --- ESTADOS DE CONFIGURACIÓN ---
  const [modoOscuro, setModoOscuro] = useState(() => localStorage.getItem('tema') === 'oscuro');
  const [ocultarFotos, setOcultarFotos] = useState(() => localStorage.getItem('fotos') === 'ocultas');
  const [letraGrande, setLetraGrande] = useState(() => localStorage.getItem('letra') === 'grande');

  useEffect(() => {
    localStorage.setItem('tema', modoOscuro ? 'oscuro' : 'claro');
    if (modoOscuro) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
  }, [modoOscuro]);

  useEffect(() => {
    localStorage.setItem('letra', letraGrande ? 'grande' : 'normal');
    if (letraGrande) document.documentElement.style.fontSize = '20px';
    else document.documentElement.style.fontSize = '16px';
  }, [letraGrande]);

  useEffect(() => {
    localStorage.setItem('fotos', ocultarFotos ? 'ocultas' : 'visibles');
  }, [ocultarFotos]);

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

  // --- LÓGICA MÁGICA DEL FILTRO ---
  // Creamos una nueva lista temporal dependiendo del botón presionado
  const animalitosFiltrados = animalitos.filter((animal) => {
    if (filtroEspecie === 'Todos') return true;
    
    // Convertimos todo a minúsculas por si en Supabase escribieron "Perro", "PERRO" o "perro"
    return animal.especie.toLowerCase() === filtroEspecie.toLowerCase();
  });

  return (
    <div>
      <nav className="navbar">
        <img src="/logo.png" alt="Logo Red Animalista" className="logo" />
        <h1 className="brand-title">Red Animalista de Manta</h1>
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

        {/* --- BOTONES DE FILTRO --- */}
        <div className="filtros-container">
          <button 
            className={`btn-filtro ${filtroEspecie === 'Todos' ? 'activo' : ''}`} 
            onClick={() => setFiltroEspecie('Todos')}
          >
            Todos
          </button>
          <button 
            className={`btn-filtro ${filtroEspecie === 'Perro' ? 'activo' : ''}`} 
            onClick={() => setFiltroEspecie('Perro')}
          >
            Perritos
          </button>
          <button 
            className={`btn-filtro ${filtroEspecie === 'Gato' ? 'activo' : ''}`} 
            onClick={() => setFiltroEspecie('Gato')}
          >
            Gatitos
          </button>
        </div>

        {cargando ? (
          <p style={{ textAlign: 'center' }}>Buscando peluditos...</p>
        ) : animalitosFiltrados.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No hay peluditos en esta categoría por ahora.</p>
        ) : (
          <div className="grid">
            {/* Dibujamos la lista filtrada, NO la lista original */}
            {animalitosFiltrados.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} ocultarFotos={ocultarFotos} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;