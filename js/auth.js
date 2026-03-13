// /js/auth.js

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    // Evitamos que la página se recargue al darle enter
    event.preventDefault();

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const btnSubmit = document.getElementById('btnSubmit');
    const mensajeError = document.getElementById('mensajeError');

    // Estado de carga
    btnSubmit.disabled = true;
    btnSubmit.innerText = "Validando...";
    mensajeError.style.display = "none";

    try {
        // Hacemos la petición a la API de Node usando la variable global
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput
            })
        });

        // Leemos el JSON sin importar si fue error 401 o éxito 200
        const data = await response.json();

        // Validamos la llave "exito" 
        if (data.exito === true) {
            // ¡AQUÍ ESTÁ LA MAGIA! Guardamos TODO el objeto para que el Dashboard no te rechace
            localStorage.setItem('saes_usuario', JSON.stringify(data));

            // Redirigimos al panel
            window.location.href = "dashboard.html";
        } else {
            // Si mandaste mal la boleta o pass, ahora sí te saldrá el texto rojo
            mensajeError.innerText = data.mensaje || "Credenciales incorrectas.";
            mensajeError.style.display = "block";
        }

    } catch (error) {
        console.error("Error al conectar con la API:", error);
        mensajeError.innerText = "Error de conexión con el servidor.";
        mensajeError.style.display = "block";
    } finally {
        // Restauramos el botón
        btnSubmit.disabled = false;
        btnSubmit.innerText = "Iniciar Sesión";
    }
});