import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js';
import { getFirestore, collection, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js';

// Configuración de Firebase
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

    // Referencia al contenedor del acordeón
    const programaAccordion = document.getElementById('programaAccordion');

    // Función para mostrar el programa académico en formato de acordeón
    async function mostrarPrograma() {
        const q = query(collection(db, 'programa'), orderBy('fecha_inicio', 'asc'));
        const querySnapshot = await getDocs(q);

        // Limpia el contenedor del acordeón
        programaAccordion.innerHTML = '';

        let currentDay = '';
        let accordionContent = '';
        let panelCounter = 0;

        querySnapshot.forEach((doc) => {
            const eventData = doc.data();
            const fechaInicio = new Date(eventData.fecha_inicio.seconds * 1000);
            const fechaFin = new Date(eventData.fecha_fin.seconds * 1000);
            const ponente = eventData.ponente;
            const titulo = eventData.titulo;
            const rutaMemorias = eventData.url || '#';

            const horaInicio = fechaInicio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const horaFin = fechaFin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const fechaDia = fechaInicio.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

            // Si es un día diferente, cierra el acordeón anterior y empieza uno nuevo
            if (currentDay !== fechaDia) {
                if (currentDay !== '') {
                    accordionContent += `</div></div></div>`;
                }

                accordionContent += `
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading${panelCounter}">
                            <button class="accordion-button ${panelCounter === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${panelCounter}" aria-expanded="${panelCounter === 0 ? 'true' : 'false'}" aria-controls="collapse${panelCounter}">
                                ${fechaDia}
                            </button>
                        </h2>
                        <div id="collapse${panelCounter}" class="accordion-collapse collapse ${panelCounter === 0 ? 'show' : ''}" aria-labelledby="heading${panelCounter}" data-bs-parent="#programaAccordion">
                            <div class="accordion-body">
                `;
                currentDay = fechaDia;
                panelCounter++;
            }

            // Añade la charla al contenido del acordeón con el nuevo formato
            accordionContent += `
                <div class="mb-3">
                    <br />${horaInicio} - ${horaFin}
                    <br /><strong>${titulo}</strong> <a href="${rutaMemorias}" target="_blank">(Memorias)</a></p>
                    <p>Instructor: ${ponente}</p>
                </div>
            `;
        });

        // Cierra el último acordeón
        accordionContent += `</div></div></div>`;

        // Inserta el contenido generado en el contenedor del acordeón
        programaAccordion.innerHTML = accordionContent;
    }

    // Mostrar el programa al cargar la página
    mostrarPrograma();
});
