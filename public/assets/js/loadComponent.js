function loadComponent(containerId, filePath, callback) {
    document.addEventListener("DOMContentLoaded", function() {
        fetch(filePath)
            .then(response => response.text())
            .then(data => {
                document.getElementById(containerId).innerHTML = data;
                if (callback) {
                    callback();  // Ejecutar la función callback si está definida
                }
            })
            .catch(error => console.error(`Error al cargar el componente ${filePath}:`, error));
    });
}