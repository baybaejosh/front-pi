// /js/auth.js

document.getElementById('loginForm').addEventListener('submit', async function(event) {
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
        // Hacemos la petición a la API de tu compañero usando la variable global
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

        if (response.ok) {
            const data = await response.json();
            
            // Validamos la llave "exito" que nos mandó tu compañero
            if (data.exito === true) {
                // Guardamos el JSON enterito en memoria
                localStorage.setItem('saes_usuario', JSON.stringify(data));
                window.location.href = "dashboard.html";
            } else {
                mensajeError.innerText = "Credenciales incorrectas.";
                mensajeError.style.display = "block";
            }
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