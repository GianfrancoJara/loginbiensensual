import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecuperacionContraseña = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const solicitarRecuperacion = async () => {
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/auth/forgot-password', { email });
      toast.success('Correo electrónico enviado con éxito. Verifica tu bandeja de entrada.');
    } catch (error) {
      console.error(error);
      toast.error('Error al solicitar recuperación de contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recuperacion-contraseña-container">
      <h2>Recuperar Contraseña</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={solicitarRecuperacion} disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar Correo de Recuperación'}
      </button>
    </div>
  );
};

export default RecuperacionContraseña;
