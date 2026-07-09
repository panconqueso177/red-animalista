import React, { useState, useEffect } from 'react';

function HeroSlider() {
  const [slideActual, setSlideActual] = useState(0);
  
  // Estados para detectar el deslizamiento (swipe) en celular
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const slides = [
    {
      id: 0,
      titulo: "¡Dona y Salva una Vida! 💖",
      descripcion: "Nuestra labor depende de corazones generosos como el tuyo. Necesitamos insumos médicos y alimento.",
      infoExtra: "Cta. Ahorros Banco Pichincha: 1234567890 | Nombre: Red Animalista | PayPal: redanimalista@correo.com",
      colorFondo: "#1c5243" 
    },
    {
      id: 1,
      titulo: "📍 Visítanos en nuestro evento",
      descripcion: "Estaremos todo agosto con nuestra carpa recibiendo donaciones físicas, vendiendo cositas y dando peluditos en adopción.",
      infoExtra: "Ubicación: Plaza Central de Manta. ¡Te esperamos todos los fines de semana de agosto!",
      colorFondo: "#154034"
    },
    {
      id: 2,
      titulo: "🚨 Ayuda Urgente: Caso Especial",
      descripcion: "Actualmente tenemos una escasez crítica de alimento para cachorritos rescatados esta semana.",
      infoExtra: "Se necesitan donaciones urgentes de croquetas (Dog Chow/Pedigree) etapa cachorro. ¡Acércate a nuestro punto de acopio!",
      colorFondo: "#9b2c2c" 
    }
  ];

  const irSiguiente = () => {
    setSlideActual((actual) => (actual === slides.length - 1 ? 0 : actual + 1));
  };

  const irAnterior = () => {
    setSlideActual((actual) => (actual === 0 ? slides.length - 1 : actual - 1));
  };

  // Temporizador automático
  useEffect(() => {
    const intervalo = setInterval(irSiguiente, 5000);
    return () => clearInterval(intervalo);
  }, [slides.length]);

  // --- LÓGICA TÁCTIL (SWIPE) ---
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distancia = touchStart - touchEnd;
    const umbral = 50; // Mínimo de píxeles a mover el dedo para que cuente
    
    if (distancia > umbral) irSiguiente(); // Deslizó a la izquierda
    if (distancia < -umbral) irAnterior(); // Deslizó a la derecha
    
    // Reiniciar
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div 
      className="slider-container" 
      style={{ backgroundColor: slides[slideActual].colorFondo }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Flechas Laterales */}
      <button className="slider-arrow prev" onClick={irAnterior}>❮</button>
      <button className="slider-arrow next" onClick={irSiguiente}>❯</button>

      <div className="slider-content">
        <h1 key={`titulo-${slideActual}`} className="animacion-fade">{slides[slideActual].titulo}</h1>
        <p key={`desc-${slideActual}`} className="animacion-fade">{slides[slideActual].descripcion}</p>
        
        <div key={`info-${slideActual}`} className="slider-info-box animacion-fade">
          {slides[slideActual].infoExtra}
        </div>
      </div>

      <div className="slider-dots">
        {slides.map((_, indice) => (
          <span 
            key={indice} 
            className={`dot ${slideActual === indice ? 'activo' : ''}`}
            onClick={() => setSlideActual(indice)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;