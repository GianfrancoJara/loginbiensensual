const crypto = require('crypto');

// Genera un enlace único para restablecer la contraseña
function generateUniqueLink() {
    return crypto.randomBytes(32).toString('hex');
}

// Verifica si el enlace ha expirado (tiempo en segundos)
function isResetLinkExpired(resetTimestamp) {
    const expirationTime = 60 * 60 * 1000; // 1 hora en milisegundos
    const currentTimestamp = new Date().getTime();
    return currentTimestamp - resetTimestamp > expirationTime;
}


module.exports = {
    generateUniqueLink,
    isResetLinkExpired,
};