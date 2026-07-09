import React, { useState, useEffect } from 'react';

function HeroSlider() {
  const [slideActual, setSlideActual] = useState(0);

  // --- AQUÍ EDITAS LA INFORMACIÓN DE TUS 3 NOTICIAS ---
  const slides = [
    {
      id: 0,
      titulo: "¡Dona y Salva una Vida! 💖",
      descripcion: "Nuestra labor depende de corazones generosos como el tuyo. Necesitamos insumos médicos y alimento.",
      // PON LOS DATOS DE TU AMIGA AQUÍ ABAJO:
      infoExtra: "Cta. Ahorros Banco Pichincha: 1234567890 | Nombre: Red Animalista | PayPal: redanimalista@correo.com",
      colorFondo: "#1c5243" 
    },
    {
      id: 1,
      titulo: "📍 Visítanos en nuestro evento",
      descripcion: "Estaremos este agosto con nuestra carpa recibiendo donaciones físicas, vendiendo cositas y dando peluditos en adopción.",
      // PON LA UBICACIÓN EXACTA O LINK DE GOOGLE MAPS AQUÍ:
      infoExtra: "Ubicación: Por ahi lol esto es una prueba. ¡Te esperamos este agosto!",
      colorFondo: "#154034"
    },
    {
      id: 2,
      titulo: "🚨 Ayuda Urgente: Caso Especial",
      descripcion: "Actualmente tenemos una escasez crítica de alimento para cachorritos rescatados esta semana.",
      // PON EL CASO URGENTE AQUÍ:
      infoExtra: "Se necesitan donaciones urgentes de croquetas (Dog Chow/Pedigree) etapa cachorro. ¡Acércate a nuestro punto de acopio!",
      colorFondo: "#9b2c2c" // Un rojo oscuro para dar sentido de urgencia
    }
  ];

  // Cambiar de slide automáticamente cada 5 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideActual((actual) => (actual === slides.length - 1 ? 0 : actual + 1));
    }, 5000);
    return () => clearInterval(intervalo); // Limpieza del intervalo
  }, [slides.length]);

  const irASlide = (indice) => setSlideActual(indice);

  return (
    <div className="slider-container" style={{ backgroundColor: slides[slideActual].colorFondo }}>
      
      {/* Contenido del Slide Actual */}
      <div className="slider-content">
        <h1 className="animacion-fade">{slides[slideActual].titulo}</h1>
        <p className="animacion-fade">{slides[slideActual].descripcion}</p>
        
        {/* Este es el recuadro blanco donde va la información importante (cuentas, mapas, etc.) */}
        <div className="slider-info-box animacion-fade">
          {slides[slideActual].infoExtra}
        </div>
      </div>

      {/* Puntitos de navegación abajo */}
      <div className="slider-dots">
        {slides.map((_, indice) => (
          <span 
            key={indice} 
            className={`dot ${slideActual === indice ? 'activo' : ''}`}
            onClick={() => irASlide(indice)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;