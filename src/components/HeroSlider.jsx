import React, { useState, useEffect } from 'react';

function HeroSlider() {
  const [slideActual, setSlideActual] = useState(0);

  // Estados para detectar el deslizamiento (swipe) en celular
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const slides = [
    {
      id: 0,
      titulo: "¡Dona y Salva una Vida!",
      descripcion: "Nuestra labor es apoyada gracias a los corazones generosos de Manta.",
      infoExtra: "Cta. Ahorros Banco Pichincha: | Nombre:",
      colorFondo: "#1c5243"
    },
    {
      id: 1,
      titulo: "¡Proximos Eventos!",
      descripcion: "Este 15 y 16 de agosto animalitos tendrán la oportunidad de tener una familia",
      infoExtra: "Lugar: Megaparque Agustin Intriago, Concha Acustica de Manta | Hora: 12:00PM - 5:00PM",
      colorFondo: "#154034"
    },
    {
      id: 2,
      titulo: "¿Deseas ser parte del voluntariado?",
      descripcion: "Puedes contactarnos a traves de nuestras redes sociales.",
      infoExtra: (
        <span style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <a href="https://www.instagram.com/redanimalistademanta/" target="_blank" rel="noopener noreferrer" style={{ color: "#154034", textDecoration: "underline", fontWeight: "bold" }}>Instagram</a>
          <span>|</span>
          <a href="https://www.tiktok.com/@red.animalista.de" target="_blank" rel="noopener noreferrer" style={{ color: "#154034", textDecoration: "underline", fontWeight: "bold" }}>TikTok</a>
        </span>
      ),
      colorFondo: "#154034"
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
      style={{
        backgroundImage: "url('/banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Capa oscura superpuesta que mantiene la transición de colores suaves */}
      <div
        className="slider-overlay"
        style={{ backgroundColor: slides[slideActual].colorFondo }}
      ></div>

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