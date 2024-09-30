function loadComponent(containerId, filePath, componentName = filePath) {
    document.addEventListener("DOMContentLoaded", function() {
        fetch(filePath)
            .then(response => response.text())
            .then(data => {
                document.getElementById(containerId).innerHTML = data;
            })
            .catch(error => console.error(`Error al cargar el componente ${componentName}:`, error));
    });
}
