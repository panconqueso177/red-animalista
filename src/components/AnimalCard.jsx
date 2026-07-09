import React, { useState } from 'react';

function AnimalCard({ animal }) {
  // Estado para controlar si la ventana emergente (modal) está abierta o cerrada
  const [modalAbierto, setModalAbierto] = useState(false);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  return (
    <>
      {/* --- TARJETA PRINCIPAL --- */}
      <div className="card">
        <img 
          src={animal.foto_url || 'https://via.placeholder.com/500x300?text=Sin+Foto'} 
          alt={`Foto de ${animal.nombre}`} 
        />
        <div className="card-content">
          <h3>{animal.nombre}</h3>
          <p><strong>{animal.especie}</strong> • {animal.edad}</p>
          <button className="btn" onClick={abrirModal}>
            Saber más sobre mí
          </button>
        </div>
      </div>

      {/* --- VENTANA EMERGENTE (Modal) --- */}
      {/* Si modalAbierto es 'true', se renderiza todo este bloque */}
      {modalAbierto && (
        <div className="modal-overlay" onClick={cerrarModal}>
          {/* El stopPropagation evita que la ventana se cierre si haces clic dentro del cuadro blanco */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={cerrarModal}>✖</button>
            
            <div className="modal-body">
              <img 
                src={animal.foto_url || 'https://via.placeholder.com/500x300?text=Sin+Foto'} 
                alt={animal.nombre} 
                className="modal-img"
              />
              <div className="modal-info">
                <h2>{animal.nombre}</h2>
                <div className="tags">
                  <span className="badge">{animal.especie}</span>
                  <span className="badge">{animal.sexo || 'No especificado'}</span>
                </div>
                
                <p><strong>Edad:</strong> {animal.edad}</p>
                <p><strong>Raza:</strong> {animal.raza || 'No especificada'}</p>
                
                <h4>Mi historia:</h4>
                <p className="historia-texto">
                  {animal.historia || 'Pronto te contaremos más sobre cómo fui rescatado.'}
                </p>
                
                <button 
                  className="btn btn-adoptar" 
                  onClick={() => alert(`¡Qué emoción! Comunícate con la Red Animalista en Instagram/WhatsApp para adoptar a ${animal.nombre}.`)}
                >
                  ¡Quiero Adoptarlo!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AnimalCard;