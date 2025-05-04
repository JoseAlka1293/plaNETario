import { Link } from "react-router-dom";
import logo from "../../public/imgs/Logotipo.png";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-2xl font-bold">
        <img
          src={logo}
          alt="plaNETario"
          className="h-10 md:h-12 lg:h-14 w-auto"
        />
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/home" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/map" className="hover:underline">
              Mapa 3D
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:underline">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
