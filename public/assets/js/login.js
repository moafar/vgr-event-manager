// Importar Firebase y sus servicios
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyClmoOpOuPmkYdheJRZPQUZjbP48gkgtlw",
    authDomain: "vgr-event-manager.firebaseapp.com",
    projectId: "vgr-event-manager",
    storageBucket: "vgr-event-manager.appspot.com",
    messagingSenderId: "636757609514",
    appId: "1:636757609514:web:ca125e0ea718478b5e0753",
    measurementId: "G-WZYGW7PQGH"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Referencias a los elementos de la página
const loginForm = document.getElementById("login-form");
const mainContent = document.getElementById("main-content");
const errorMessage = document.getElementById("error-message");

// Función para verificar el estado de autenticación del usuario
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('Usuario autenticado:', user.email);
        
        // Ocultar el formulario de login usando la clase "hidden"
        loginForm.classList.add('hidden');
        mainContent.style.display = "block";
    } else {
        console.log('Usuario no autenticado');
        
        // Mostrar el formulario de login removiendo la clase "hidden"
        loginForm.classList.remove('hidden');
        mainContent.style.display = "none";
    }
});

// Manejar el formulario de inicio de sesión
const loginFormElement = document.getElementById("login");
loginFormElement.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        console.log('Inicio de sesión exitoso');  // Verificación
    })
    .catch((error) => {
        errorMessage.textContent = "Error al iniciar sesión: " + error.message;
        console.error("Error al iniciar sesión: ", error);  // Verificación
    });
});

// Cerrar sesión
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
    signOut(auth).then(() => {
        console.log('Usuario ha cerrado sesión');  // Verificación
    }).catch((error) => {
        console.error("Error al cerrar sesión: ", error);  // Verificación
    });
});

// Seleccionar el botón de "Cerrar sesión" en el navbar
const logoutNavbarButton = document.getElementById("logout-navbar");

if (logoutNavbarButton) {
    // Agregar el evento click para cerrar sesión
    logoutNavbarButton.addEventListener("click", (e) => {
        e.preventDefault();  // Evitar la acción predeterminada del enlace

        signOut(auth).then(() => {
            console.log('Sesión cerrada desde el navbar');
            // Redirigir al usuario a la página de inicio o mostrar el formulario de login
            window.location.href = "index.html";
        }).catch((error) => {
            console.error("Error al cerrar sesión: ", error);
        });
    });
}

// Asegurarse de que Firebase y signOut estén disponibles globalmente
window.signOutUser = function() {
    signOut(auth).then(() => {
        console.log('Sesión cerrada correctamente');
        // Redirigir o mostrar el formulario de login
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Error al cerrar sesión: ", error);
    });
}