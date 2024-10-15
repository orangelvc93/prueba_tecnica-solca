import React, { useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddBook from "./components/AddBook";
import Library from "./pages/Library";
import Home from "./pages/Home";
import Login from "./components/Login"; // Asegúrate de que esta línea esté incluida

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/library");
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Cambia el estado a false
    navigate("/login"); // Redirige a la página de inicio de sesión
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={handleLogout} />{" "}
      {/* Pasa la función de cierre de sesión */}
      <div className="p-4">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/library"
            element={isLoggedIn ? <Library /> : <Navigate to="/login" />}
          />
          <Route
            path="/add"
            element={isLoggedIn ? <AddBook /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
