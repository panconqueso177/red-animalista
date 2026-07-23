import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h3>Red Animalista Manta</h3>
          <p>Ayudando vidas, creando consciencia y buscando un hogar para los más necesitados.</p>
        </div>

        <div className="footer-contact">
          <h3>Contacto</h3>
          <p>Manta, Ecuador</p>
          <p>redanimalistademanta@gmail.com</p>
        </div>

        <div className="footer-social">
          <h3>Síguenos</h3>
          <div className="social-icons">
            <a href="https://www.tiktok.com/@red.animalista.de" className="social-icon">TikTok</a>
            <a href="https://www.instagram.com/redanimalistademanta/" className="social-icon">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Red Animalista Manta. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
