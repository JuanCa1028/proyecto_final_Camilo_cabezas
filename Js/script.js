document.addEventListener("DOMContentLoaded", () => {
    const listaServicios = document.getElementById("lista-servicios");
    const continuarButton = document.getElementById("continuar");
    let servicios = [];
    let cotizacion = [];

    async function cargarServicios() {
        try {
            const response = await fetch("js/servicios.json");
            servicios = await response.json();

            servicios.forEach(servicio => {
                const item = document.createElement("li");
                item.innerHTML = `
                    ${servicio.nombre} - $${servicio.precio}
                    <button class="add" data-id="${servicio.id}">Agregar</button>
                `;
                listaServicios.appendChild(item);
            });
        } catch (error) {
            console.error("Error al cargar los servicios:", error);
        }
    }

    listaServicios.addEventListener("click", e => {
        if (e.target.classList.contains("add")) {
            const id = parseInt(e.target.dataset.id);
            const servicio = servicios.find(s => s.id === id);

            if (!cotizacion.find(c => c.id === id)) {
                cotizacion.push(servicio);
                actualizarEstadoContinuar();
            } else {
                alert("El servicio ya está agregado.");
            }
        }
    });

    function actualizarEstadoContinuar() {
        if (cotizacion.length > 0) {
            continuarButton.classList.add("visible");
            continuarButton.href = "detalle.html"; // Asegura que redirija a detalle.html
            localStorage.setItem("cotizacion", JSON.stringify(cotizacion));
        }
    }

    cargarServicios();
});
