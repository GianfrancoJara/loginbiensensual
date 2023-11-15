import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RestablecimientoContraseña = () => {
  const [token, setToken] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [loading, setLoading] = useState(false);

  const restablecerContraseña = async () => {
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/auth/reset-password', { token, newPassword: nuevaContraseña });
      toast.success('Contraseña restablecida con éxito.');
    } catch (error) {
      console.error(error);
      toast.error('Error al restablecer la contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="restablecimiento-contraseña-container">
      <h2>Restablecer Contraseña</h2>
      <input
        type="text"
        placeholder="Token de Recuperación"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <input
        type="password"
        placeholder="Nueva Contraseña"
        value={nuevaContraseña}
        onChange={(e) => setNuevaContraseña(e.target.value)}
      />
      <button onClick={restablecerContraseña} disabled={loading}>
        {loading ? 'Restableciendo...' : 'Restablecer Contraseña'}
      </button>
    </div>
  );
};

export default RestablecimientoContraseña;
