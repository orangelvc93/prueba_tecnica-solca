import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  onLogout: () => void; // Añadir prop para manejar el cierre de sesión
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  return (
    <nav className="p-4 bg-blue-500">
      <ul className="flex space-x-4">
        <li>
          <Link to="/library" className="text-white hover:underline">
            Biblioteca
          </Link>
        </li>
        <li>
          <Link to="/add" className="text-white hover:underline">
            Agregar Libro
          </Link>
        </li>
        <li>
          <button
            onClick={onLogout} // Llama a la función de cierre de sesión al hacer clic
            className="text-white hover:underline"
          >
            Cerrar Sesión
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
