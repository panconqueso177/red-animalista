import React, { useState } from 'react';

function ConfigMenu({ 
  modoOscuro, setModoOscuro, 
  ocultarFotos, setOcultarFotos, 
  letraGrande, setLetraGrande 
}) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="config-container">
      {/* Botón de la Hamburguesa */}
      <button className="hamburguesa-btn" onClick={() => setMenuAbierto(true)}>
        ☰
      </button>

      {/* Panel Lateral */}
      <div className={`panel-lateral ${menuAbierto ? 'abierto' : ''}`}>
        <button className="cerrar-panel" onClick={() => setMenuAbierto(false)}>✖</button>
        
        <h3>Configuración</h3>
        <p className="panel-desc">Ajusta la web a tu comodidad</p>

        <div className="config-opcion">
          <label>Modo Oscuro</label>
          <input 
            type="checkbox" 
            checked={modoOscuro} 
            onChange={(e) => setModoOscuro(e.target.checked)} 
          />
        </div>

        <div className="config-opcion">
          <label>Ahorro de Datos (Ocultar Fotos)</label>
          <input 
            type="checkbox" 
            checked={ocultarFotos} 
            onChange={(e) => setOcultarFotos(e.target.checked)} 
          />
        </div>

        <div className="config-opcion">
          <label>Letra Grande</label>
          <input 
            type="checkbox" 
            checked={letraGrande} 
            onChange={(e) => setLetraGrande(e.target.checked)} 
          />
        </div>

        <div className="redes-sociales">
          <h4>Nuestras Redes</h4>
          <a href="https://www.instagram.com/redanimalistademanta/" target="_blank" rel="noreferrer">📷 Instagram</a>
          <a href="https://www.tiktok.com/@red.animalista.de" target="_blank" rel="noreferrer">🎵 TikTok</a>
        </div>
      </div>

      {/* Fondo oscuro al abrir el menú */}
      {menuAbierto && <div className="panel-overlay" onClick={() => setMenuAbierto(false)}></div>}
    </div>
  );
}

export default ConfigMenu;