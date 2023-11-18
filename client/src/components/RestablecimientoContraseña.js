import React, { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";




const ResetPassword = ({ match }) => {
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const resetPassword = async () => {
        try {
            setLoading(true);
            await axios.post(`http://localhost:5000/auth/reset-password/${match.params.token}`, {
                newPassword,
            });
            

            toast.success('Contraseña restablecida con éxito, redireccionando a login...');


            setTimeout(() => {
                window.location.href = "/login";
            }, 2000); 
            
            } catch (error) {
            console.error(error);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='reset-password-container'>
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

