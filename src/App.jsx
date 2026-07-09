import React from 'react';
import './App.css';

function App() {
  // Estos son datos de prueba. Más adelante, estos datos vendrán de Supabase.
  const animalitos = [
    { id: 1, nombre: 'Manchas', especie: 'Perro', edad: '2 meses', img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=60' },
    { id: 2, nombre: 'Mishi', especie: 'Gato', edad: '1 año', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=500&q=60' },
    { id: 3, nombre: 'Rocky', especie: 'Perro', edad: '3 años', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=500&q=60' },
  ];

  return (
    <div>
      <header className="header">
        <h1>Red Animalista de Manta</h1>
        <p>Ayudando a peluditos en situación de calle a encontrar un hogar lleno de amor.</p>
      </header>

      <main className="container">
        <h2>Animalitos en adopción</h2>
        <p>¡Conoce a los rescatados que estarán en nuestro evento de agosto!</p>

        <div className="grid">
          {animalitos.map((animal) => (
            <div key={animal.id} className="card">
              <img src={animal.img} alt={`Foto de ${animal.nombre}`} />
              <h3>{animal.nombre}</h3>
              <p>{animal.especie} - {animal.edad}</p>
              <button className="btn">Quiero Adoptarlo</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;