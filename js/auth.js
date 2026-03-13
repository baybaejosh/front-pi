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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput
            })
        });

        if (response.ok) {
            // Si el Java nos responde con un 200 OK
            const data = await response.json();
            
            /* NOTA: Tu compañero necesita devolverte en este JSON el "rol" y el "idUsuario".
               Asumiendo que devuelve algo como: { idUsuario: 1, rol: "Admin", username: "..." }
            */
            
            // Guardamos los datos en la memoria del navegador para usarlos en el Dashboard
            localStorage.setItem('saes_usuario', JSON.stringify(data));

            // ¡Redirigimos al Dashboard!
            window.location.href = "dashboard.html";
        } else {
            // Error 401 o 400 (Credenciales inválidas)
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