import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import AnimalCard from './components/AnimalCard';
import ConfigMenu from './components/ConfigMenu';
import HeroSlider from './components/HeroSlider';
import AdminPanel from './components/AdminPanel';
import AboutUs from './components/AboutUs';
import HowToHelp from './components/HowToHelp';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [animalitos, setAnimalitos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroEspecie, setFiltroEspecie] = useState('Todos');

  // --- SISTEMA DE RUTAS POR HASH ---
  const [rutaActual, setRutaActual] = useState(window.location.hash);

  useEffect(() => {
    const manejarCambioRuta = () => setRutaActual(window.location.hash);
    window.addEventListener('hashchange', manejarCambioRuta);
    return () => window.removeEventListener('hashchange', manejarCambioRuta);
  }, []);

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
    // Solo cargamos los animales si estamos en la vista pública
    if (rutaActual !== '#admin') {
      obtenerAnimales();
    }
  }, [rutaActual]);

  const animalitosFiltrados = animalitos.filter((animal) => {
    if (filtroEspecie === 'Todos') return true;
    return animal.especie.toLowerCase() === filtroEspecie.toLowerCase();
  });

  // --- CONDICIONAL DE RUTA: SI ES #admin, MUESTRA EL PANEL ---
  if (rutaActual === '#admin') {
    return <AdminPanel />;
  }

  // --- DE LO CONTRARIO, MUESTRA LA WEB PÚBLICA ---
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

      <HeroSlider />

      <AboutUs />

      <HowToHelp />
      
      <FAQ />

      <main className="container">
        <h2 className="section-title">Animalitos en Adopción</h2>

        <div className="filtros-container">
          <button className={`btn-filtro ${filtroEspecie === 'Todos' ? 'activo' : ''}`} onClick={() => setFiltroEspecie('Todos')}>
            Todos
          </button>
          <button className={`btn-filtro ${filtroEspecie === 'Perro' ? 'activo' : ''}`} onClick={() => setFiltroEspecie('Perro')}>
            Perritos
          </button>
          <button className={`btn-filtro ${filtroEspecie === 'Gato' ? 'activo' : ''}`} onClick={() => setFiltroEspecie('Gato')}>
            Gatitos
          </button>
        </div>

        {cargando ? (
          <p style={{ textAlign: 'center' }}>Buscando peluditos...</p>
        ) : animalitosFiltrados.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No hay peluditos en esta categoría por ahora.</p>
        ) : (
          <div className="grid">
            {animalitosFiltrados.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} ocultarFotos={ocultarFotos} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;