document.addEventListener("DOMContentLoaded", () => {
    const detalleServicios = document.getElementById("detalle-servicios");
    const totalDetalle = document.getElementById("total-detalle");
    const formCotizacion = document.getElementById("form-cotizacion");
    const resultadoFinal = document.getElementById("resultado-final");

    const cotizacion = JSON.parse(localStorage.getItem("cotizacion")) || [];
    let total = 0;

    function mostrarServicios() {
        cotizacion.forEach(servicio => {
            const item = document.createElement("li");
            item.textContent = `${servicio.nombre} - $${servicio.precio}`;
            detalleServicios.appendChild(item);
            total += servicio.precio;
        });

        totalDetalle.textContent = total.toFixed(2);
    }

    formCotizacion.addEventListener("submit", e => {
        e.preventDefault();

        const dias = parseInt(document.getElementById("dias").value);
        const impuestos = parseInt(document.getElementById("impuestos").value);

        const totalImpuestos = total * (impuestos / 100);
        const totalFinal = total + totalImpuestos;
        const costoPorDia = totalFinal / dias;

        resultadoFinal.textContent = `Costo final: $${totalFinal.toFixed(2)} (Costo por día: $${costoPorDia.toFixed(2)})`;
    });

    mostrarServicios();
});
