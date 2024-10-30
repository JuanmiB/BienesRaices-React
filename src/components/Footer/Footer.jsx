
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white px-6 py-8">
      <div className="container mx-auto">
        <div className="footer-content flex flex-col space-y-8 md:flex-row md:justify-between md:space-y-0">
          
          {/* Sección 1: Categorías de Propiedades */}
          <div className="property-categories">
            <h2 className="text-lg font-bold mb-4">Categorías de Propiedades</h2>
            <ul>
              <li><a href="#">Casas</a></li>
              <li><a href="#">Apartamentos</a></li>
              <li><a href="#">Locales Comerciales</a></li>
              <li><a href="#">Oficinas</a></li>
              <li><a href="#">Terrenos</a></li>
            </ul>
          </div>
          
          {/* Sección 2: Sobre Nosotros */}
          <div className="site-info">
            <h2 className="text-lg font-bold mb-4">Sobre Nosotros</h2>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet...
            </p>
          </div>
          
          {/* Sección 3: Redes Sociales */}
          <div className="social-media">
            <h2 className="text-lg font-bold mb-4">Redes</h2>
            <ul className="flex space-x-4">
              <li><a href="https://facebook.com">Facebook</a></li>
              <li><a href="https://twitter.com">Twitter</a></li>
              <li><a href="https://instagram.com">Instagram</a></li>
              <li><a href="https://linkedin.com">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        {/* Pie de página */}
        <div className="footer-bottom mt-8 text-center text-gray-500">
          <p>© 2024 BienesRaices. Juan Miguel Bogado.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;