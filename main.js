function agregarProducto() {
    var nombreProducto = document.getElementById("nombreProducto").value;
    var cantidadProducto = parseInt(document.getElementById("cantidadProducto").value);
    var precioProducto = parseFloat(document.getElementById("precioProducto").value);

    if (nombreProducto && !isNaN(cantidadProducto) && !isNaN(precioProducto)) {
        var montoTotal = cantidadProducto * precioProducto;

        var tablaPendientes = document.getElementById("tablaPendientes");
        var fila = tablaPendientes.insertRow();
        var celdaProducto = fila.insertCell(0);
        var celdaCantidad = fila.insertCell(1);
        var celdaPrecioUnitario = fila.insertCell(2);
        var celdaMontoTotal = fila.insertCell(3);
        var celdaAcciones = fila.insertCell(4);

        celdaProducto.innerHTML = nombreProducto;
        celdaCantidad.innerHTML = cantidadProducto;
        celdaPrecioUnitario.innerHTML = "$" + precioProducto.toFixed(2);
        celdaMontoTotal.innerHTML = "$" + montoTotal.toFixed(2);
        celdaAcciones.innerHTML = '<button onclick="moverAEstado(\'tablaPendientes\', \'tablaEntregados\', this)">Entregado</button>' +
                                 '<button onclick="eliminarProducto(\'tablaPendientes\', this)">Eliminar</button>';

        // Aplicar estilo a la fila para productos pendientes
        fila.className = "pendiente";
    }

    // Limpiar los campos después de agregar el producto
    document.getElementById("nombreProducto").value = "";
    document.getElementById("cantidadProducto").value = "";
    document.getElementById("precioProducto").value = "";
}

function moverAEstado(tablaOrigenId, tablaDestinoId, boton) {
    var tablaOrigen = document.getElementById(tablaOrigenId);
    var tablaDestino = document.getElementById(tablaDestinoId);

    var fila = boton.parentNode.parentNode;
    var index = fila.rowIndex;

    // Cambiar estilo de la fila para productos entregados
    fila.className = "entregado";

    tablaDestino.appendChild(fila);
    actualizarTotalEntregado();
}

function moverAEntregados() {
    var tablaPendientes = document.getElementById("tablaPendientes");
    var tablaEntregados = document.getElementById("tablaEntregados");

    while (tablaPendientes.rows.length > 0) {
        var fila = tablaPendientes.rows[0];

        // Cambiar estilo de la fila para productos entregados
        fila.className = "entregado";

        tablaEntregados.appendChild(fila);
    }

    actualizarTotalEntregado();
}

function eliminarProducto(tablaId, botonEliminar) {
    var fila = botonEliminar.parentNode.parentNode;
    fila.parentNode.removeChild(fila);
}

function cerrarCaja() {
    var totalEntregado = parseFloat(document.getElementById("totalEntregado").innerText);
    alert("Caja cerrada. Total entregado: $" + totalEntregado.toFixed(2));
}

function actualizarTotalEntregado() {
    var totalEntregado = 0;
    var filas = document.getElementById("tablaEntregados").rows;

    for (var i = 0; i < filas.length; i++) {
        var montoTotal = parseFloat(filas[i].cells[3].innerText.replace("$", ""));
        totalEntregado += montoTotal;
    }

    document.getElementById("totalEntregado").innerText = totalEntregado.toFixed(2);
}
