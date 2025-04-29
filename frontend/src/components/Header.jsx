import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 z-50 bg-black/60 backdrop-blur-md">
      {/* Logo o Nombre */}
      <div className="text-white text-2xl font-bold">
        plaNETario 🚀
      </div>

      {/* Botón de acceso al Mapa 3D */}
      <Link to="/map">
        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300 hover:bg-cyan-400 hover:text-white hover:scale-105">
          Ir al Mapa 3D
        </button>
      </Link>
    </header>
  );
}

export default Header;
