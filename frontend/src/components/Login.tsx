// src/components/Login.tsx
import React, { useState } from "react";
import axios from "axios";

interface LoginProps {
  onLogin: () => void; // Cambié el tipo para no requerir el username
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      if (response.status === 200) {
        onLogin(); // Llama a onLogin cuando la autenticación es exitosa
      }
    } catch (error) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="max-w-sm p-4 m-auto bg-white rounded-lg shadow-xl">
      <h2 className="mb-4 text-xl font-bold">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
