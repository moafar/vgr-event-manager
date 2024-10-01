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
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const eventosPorFecha = document.getElementById('eventosPorFecha'); // Contenedor de escritorio
    const programaAccordion = document.getElementById('programaAccordion'); // Contenedor de móvil

    async function mostrarPrograma() {
        const q = query(collection(db, 'programa'), orderBy('fecha_inicio', 'asc'));
        const querySnapshot = await getDocs(q);

        eventosPorFecha.innerHTML = ''; // Limpiar el contenedor de escritorio
        programaAccordion.innerHTML = ''; // Limpiar el contenedor de móvil

        // Objeto para agrupar los eventos por fecha
        let eventosAgrupadosPorFecha = {};

        // Recorre los documentos y agrupa los eventos por fecha
        querySnapshot.forEach((doc) => {
            const eventData = doc.data();
            const fechaInicio = new Date(eventData.fecha_inicio.seconds * 1000);
            const fechaFormateada = fechaInicio.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            const horaInicio = fechaInicio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const fechaFin = new Date(eventData.fecha_fin.seconds * 1000);
            const horaFin = fechaFin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const evento = {
                hora: `${horaInicio} - ${horaFin}`,
                titulo: eventData.titulo,
                ponente: eventData.ponente,
                rutaMemorias: eventData.ruta_memorias || '#'
            };

            // Agrupar los eventos por fecha
            if (!eventosAgrupadosPorFecha[fechaFormateada]) {
                eventosAgrupadosPorFecha[fechaFormateada] = [];
            }
            eventosAgrupadosPorFecha[fechaFormateada].push(evento);
        });

        // Generar contenido para escritorio y móvil
        let panelCounter = 0;

        for (const fecha in eventosAgrupadosPorFecha) {
            // 1. Generar tablas para la vista de escritorio
            let tablaEventos = `
            <div class="mb-5">
                <h3 class="titulo-fecha">${fecha}</h3>
                <table class="table table-bordered table-hover tabla-eventos"> <!-- Añadimos la clase aquí -->
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">Hora</th>
                            <th scope="col">Título</th>
                            <th scope="col">Instructor</th>
                            <th scope="col">Memorias</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

            eventosAgrupadosPorFecha[fecha].forEach(evento => {
                tablaEventos += `
                    <tr>
                        <td>${evento.hora}</td>
                        <td>${evento.titulo}</td>
                        <td>${evento.ponente}</td>
                        <td><a href="${evento.rutaMemorias}" target="_blank">Ver Memorias</a></td>
                    </tr>
                `;
            });

            tablaEventos += `
                        </tbody>
                    </table>
                </div>
            `;

            eventosPorFecha.innerHTML += tablaEventos;

            // 2. Generar acordeón para la vista móvil
            let acordeonEventos = `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading${panelCounter}">
                        <button class="accordion-button ${panelCounter === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${panelCounter}" aria-expanded="${panelCounter === 0 ? 'true' : 'false'}" aria-controls="collapse${panelCounter}">
                            ${fecha}
                        </button>
                    </h2>
                    <div id="collapse${panelCounter}" class="accordion-collapse collapse ${panelCounter === 0 ? 'show' : ''}" aria-labelledby="heading${panelCounter}" data-bs-parent="#programaAccordion">
                        <div class="accordion-body">
            `;

            eventosAgrupadosPorFecha[fecha].forEach(evento => {
                acordeonEventos += `
                    <p><strong>${evento.hora}</strong></p>
                    <p><strong>${evento.titulo}</strong></p>
                    <p>Instructor: ${evento.ponente}</p>
                    <p><a href="${evento.rutaMemorias}" target="_blank">Ver Memorias</a></p>
                `;
            });

            acordeonEventos += `
                        </div>
                    </div>
                </div>
            `;

            programaAccordion.innerHTML += acordeonEventos;

            panelCounter++;
        }
    }

    mostrarPrograma();
});
