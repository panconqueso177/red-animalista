import React from 'react';

const HowToHelp = () => {
  return (
    <section className="how-to-help-section container">
      <h2 className="section-title">Cómo Ayudar</h2>
      <p className="section-subtitle">Tu apoyo hace posible que sigamos salvando vidas. ¡Descubre cómo sumarte!</p>

      <div className="help-cards-grid">
        <div className="help-card">
          <div className="help-icon"></div>
          <h3>Voluntariado</h3>
          <p>Únete a nuestro equipo y dona tu tiempo. Necesitamos ayuda en rescates, eventos, transporte y paseos.</p>
        </div>

        <div className="help-card">
          <div className="help-icon"></div>
          <h3>Donaciones</h3>
          <p>Cada aporte cuenta. Aceptamos donaciones económicas, alimento, medicinas y juguetes.</p>
        </div>

        <div className="help-card">
          <div className="help-icon"></div>
          <h3>Hogar Temporal</h3>
          <p>Abre las puertas de tu casa temporalmente a un peludito mientras le encontramos su familia definitiva.</p>
        </div>
      </div>
    </section>
  );
};

export default HowToHelp;
