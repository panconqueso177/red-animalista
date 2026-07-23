import React from 'react';
const AboutUs = () => {
  return (
    <section className="about-us-section container">
      <h2 className="section-title">Quiénes Somos</h2>
      <div className="about-content">
        <div className="about-image-container">
          <img src="/foto-nosotros.png" alt="Equipo Red Animalista" className="about-image" />
        </div>
        <div className="about-text-card">
          <p>
            En la <strong>Red Animalista Manta</strong>, nos dedicamos a rescatar, rehabilitar y encontrar hogares amorosos para animales en situación de calle, abandono o maltrato.
          </p>
          <p>
            Nuestra misión es crear una sociedad más empática y responsable, donde cada vida importe. Trabajamos incansablemente gracias al apoyo de voluntarios, donantes y hogares temporales que comparten nuestra visión de un mundo sin sufrimiento animal.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
