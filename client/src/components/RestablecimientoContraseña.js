// Componente de React para el restablecimiento de contraseña

import React, { useState } from 'react';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';




const ResetPassword = ({ match }) => {
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const resetPassword = async () => {
        try {
            setLoading(true);
            await axios.post(`http://localhost:5000/auth/reset-password/${match.params.token}`, {
                newPassword,
            });
            // Manejar éxito y redirigir al inicio de sesión, por ejemplo
        } catch (error) {
            console.error(error);
            // Manejar error, por ejemplo, mostrar un mensaje al usuario
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Restablecer Contraseña</h2>
            <input
                type="password"
                placeholder="Nueva Contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={resetPassword} disabled={loading}>
                {loading ? 'Restableciendo...' : 'Restablecer Contraseña'}
            </button>
        </div>
    );
};

export default ResetPassword;

