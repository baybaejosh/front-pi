document.addEventListener('DOMContentLoaded', () => {
    // 1. Buscamos la caja donde auth.js guardó todo
    const usuarioString = localStorage.getItem('saes_usuario');

    if (!usuarioString) {
        // Si no hay sesión, patada de regreso al login
        window.location.href = 'index.html';
        return;
    }

    // 2. Convertimos el texto a un objeto JSON
    const usuario = JSON.parse(usuarioString);

    // 3. Inyectamos los datos en los <span> de tu HTML
    document.getElementById('nombreUser').innerText = usuario.nombreCompleto;
    document.getElementById('rolUser').innerText = usuario.rol;

    // 4. Lógica para mostrar solo el panel correcto
    // (Ocultamos todos por defecto)
    document.getElementById('panelAdmin').style.display = 'none';
    document.getElementById('panelProfe').style.display = 'none';
    document.getElementById('panelAlumno').style.display = 'none';

    // (Mostramos el que le toca)
    if (usuario.rol === 'Administrador') {
        document.getElementById('panelAdmin').style.display = 'block';
    } else if (usuario.rol === 'Profesor') {
        document.getElementById('panelProfe').style.display = 'block';
    } else if (usuario.rol === 'Alumno') {
        document.getElementById('panelAlumno').style.display = 'block';
    }
});

// Funciones de los botones
function cerrarSesion() {
    localStorage.removeItem('saes_usuario');
    window.location.href = 'index.html';
}

function irA(ruta) {
    window.location.href = ruta;
}