import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js';

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

// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function() {

    // Inicializa Firebase
    const app = initializeApp(firebaseConfig);

    // Inicializa Firestore
    const db = getFirestore(app);

    // Referencias al contenedor de tarjetas
    const cardContainer = document.getElementById('cardContainer');

    // Función para mostrar los eventos en formato de tarjetas
    async function mostrarEventos() {
        const q = query(collection(db, 'tarjetas'), orderBy('orden', 'asc'));
        const querySnapshot = await getDocs(q);

        // Limpia el contenedor de tarjetas
        cardContainer.innerHTML = '';

        // Recorre los documentos y crea las tarjetas
        querySnapshot.forEach((doc) => {
            const eventData = doc.data();
            const card = `
                <div class="col-lg-6 mb-4">
                    <a href="${eventData.url}" class="text-decoration-none">
                        <div class="card text-white border-0 h-100" style="background-color: #56a0dd;">
                            <div class="card-body text-center">
                                <div class="feature bg-gradient text-white rounded-3 mb-4">
                                  <i class="${eventData.icono}" style="font-size: 2rem;"></i>
                                </div>
                                <h2 class="fs-4 fw-bold">${eventData.titulo}</h2>
                                <p class="mb-0">${eventData.subtitulo}</p>
                            </div>
                        </div>
                    </a>
                </div>
            `;

            cardContainer.innerHTML += card;
        });
    }

    // Mostrar los eventos al cargar la página
    mostrarEventos();
});