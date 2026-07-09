import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [animalitos, setAnimalitos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Esta función hace la petición asíncrona a Supabase
  const obtenerAnimales = async () => {
    try {
      setCargando(true);
      const { data, error } = await supabase
        .from('animales')
        .select('*')
        .eq('adoptado', false); // Solo trae los que no han sido adoptados

      if (error) throw error;
      setAnimalitos(data);
    } catch (error) {
      console.error('Error cargando los animalitos:', error.message);
    } finally {
      setCargando(false);
    }
  };

  // Ejecuta la función automáticamente cuando la página carga
  useEffect(() => {
    obtenerAnimales();
  }, []);

  return (
    <div>
      <header className="header">
        <h1>Red Animalista de Manta</h1>
        <p>Ayudando a peluditos en situación de calle a encontrar un hogar lleno de amor.</p>
      </header>

      <main className="container">
        <h2>Animalitos en adopción</h2>
        <p>¡Conoce a los rescatados que estarán en nuestro evento de agosto!</p>

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
                <h3>{animal.nombre}</h3>
                <p><strong>{animal.especie}</strong> - {animal.edad}</p>
                <p style={{ padding: '0 10px', fontSize: '14px', color: '#555' }}>{animal.descripcion}</p>
                <button className="btn" onClick={() => alert(`¡Gracias por tu interés en ${animal.nombre}! Comunícate con la Red Animalista.`)}>
                  Quiero Adoptarlo
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;