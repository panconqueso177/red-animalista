import React, { useState } from 'react';

const faqData = [
  {
    question: "¿Cuáles son los requisitos para adoptar?",
    answer: "Para adoptar debes ser mayor de edad, llenar nuestro formulario de adopción, presentar copia de cédula, y estar de acuerdo con las visitas de seguimiento. Buscamos asegurarnos de que el animalito vaya a un hogar responsable."
  },
  {
    question: "¿Cómo puedo realizar una donación?",
    answer: "Puedes donar a nuestra cuenta bancaria oficial, por transferencia, o acercarte a nuestros puntos de acopio autorizados para donar alimento, medicinas o cobijas. Toda ayuda es bienvenida."
  },
  {
    question: "¿Qué hago si encuentro un animal abandonado?",
    answer: "Primero, evalúa la situación y asegúrate de que el animal no corra peligro inminente. Si puedes, bríndale refugio temporal y contáctanos por redes sociales con fotos y ubicación. Nuestro equipo te guiará sobre los siguientes pasos."
  },
  {
    question: "¿Dónde están ubicados?",
    answer: "No contamos con un refugio físico de puertas abiertas. Trabajamos mediante una red de Hogares Temporales en toda la ciudad de Manta. Por eso es vital el apoyo de personas dispuestas a acoger un animalito temporalmente."
  },
  {
    question: "¿Cómo funciona ser Hogar Temporal?",
    answer: "Como Hogar Temporal, brindas techo, comida y cariño a un animalito rescatado por un tiempo definido (días o semanas) hasta que le encontremos una familia definitiva. Nosotros cubrimos los gastos veterinarios."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section container">
      <h2 className="section-title">Preguntas Frecuentes</h2>
      <div className="faq-container">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleAccordion(index)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
