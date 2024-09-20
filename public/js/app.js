import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js';

// Configuración de Firebase (usa tu propio código de configuración)
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

// Inicializar Firestore
const db = getFirestore(app);

// Referencias a los elementos del DOM
const dataForm = document.getElementById('dataForm');
const dataInput = document.getElementById('dataInput');
const outputDiv = document.getElementById('output');

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
        dataInput.value = ''; // Limpiar el campo de entrada
        mostrarEventos();
    } catch (error) {
        console.error("Error al agregar el evento: ", error);
    }
});

// Función para mostrar los eventos en la página
async function mostrarEventos() {
    const q = query(collection(db, 'events'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);

    outputDiv.innerHTML = '';
    querySnapshot.forEach((doc) => {
        outputDiv.innerHTML += `<p>${doc.data().name}</p>`;
    });
}

// Mostrar los eventos al cargar la página
mostrarEventos();
