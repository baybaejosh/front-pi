// /js/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Recuperamos los datos del usuario de la memoria
    const usuarioString = localStorage.getItem('saes_usuario');

    // 2. Si no hay datos, significa que intentó saltarse el login
    if (!usuarioString) {
        window.location.href = "index.html";
        return;
    }

    const usuario = JSON.parse(usuarioString);

    // 3. Pintamos sus datos en la barra superior
    document.getElementById('nombreUser').innerText = usuario.nombreUsuario;
    document.getElementById('rolUser').innerText = usuario.rol;

    // 4. Lógica de control de acceso (Mostramos los paneles según el rol)
    // Nos basamos exactamente en el string "Administrador" que mandó tu compa
    if (usuario.rol === 'Administrador') {
        document.getElementById('panelAdmin').style.display = 'block';
    } 
    else if (usuario.rol === 'Profesor' || usuario.rol === 'Docente') { // Por si acaso cambian el string
        document.getElementById('panelProfe').style.display = 'block';
    } 
    else if (usuario.rol === 'Alumno' || usuario.rol === 'Estudiante') {
        document.getElementById('panelAlumno').style.display = 'block';
    }
});

// Función simple para navegar a las pantallas de trabajo
function irA(ruta) {
    window.location.href = ruta;
}

// Función para limpiar la memoria y regresar al login
function cerrarSesion() {
    localStorage.removeItem('saes_usuario');
    window.location.href = "index.html";
}