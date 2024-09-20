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

    // Referencias a los elementos del DOM
    const dataForm = document.getElementById('dataForm');
    const dataInput = document.getElementById('dataInput');
    const cardContainer = document.getElementById('cardContainer');

    // Función para guardar un nuevo evento en Firestore
    dataForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const inputData = dataInput.value;

        try {
            await addDoc(collection(db, 'events'), {
                name: inputData,
                timestamp: new Date()
            });
            console.log("Evento agregado con éxito!");
            dataInput.value = ''; // Limpia el campo de entrada
            mostrarEventos();  // Refresca la vista
        } catch (error) {
            console.error("Error al agregar el evento: ", error);
        }
    });

    // Función para mostrar los eventos en formato de tarjetas
    async function mostrarEventos() {
        const q = query(collection(db, 'events'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);

        // Limpia el contenedor de tarjetas
        cardContainer.innerHTML = '';

        // Recorre los documentos y crea las tarjetas
        querySnapshot.forEach((doc) => {
            const eventData = doc.data();
            const card = `
                <div class="col-md-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">${eventData.name}</h5>
                            <p class="card-text">Agregado el: ${new Date(eventData.timestamp.seconds * 1000).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            `;
            cardContainer.innerHTML += card;
        });
    }

    // Mostrar los eventos al cargar la página
    mostrarEventos();
});
