const btnContinuar = document.getElementById("btnContinuar");
const inputCantidad = document.getElementById("cantidadRetirar");

// MODAL
const btnSalirModal = document.getElementById("btnSalirModal");
const elCantidadRetiro = document.getElementById("cantidadRetiro");
const elSaldoActual = document.getElementById("saldoActual");

const validarDatos = () => {
    if(!parseInt(inputCantidad.value)) {
        mostarAlerta("Favor de ingresar una cantidad.");
        return false;
    }
    if(inputCantidad.value < montoMinimo) {
        mostarAlerta(`La cantidad minima que puede depositar es de: $${montoMinimo}`);
        return false;
    }
    if(inputCantidad.value > montoMaximoDepositar) {
        mostarAlerta(`La cantidad máxima que puede depositar es de: $${montoMaximoDepositar}`);
        return false;
    }
    return true;
};

btnContinuar.addEventListener("click", function(e) {    
    e.preventDefault();
    if(validarDatos()) {
        const nuevoSaldo = parseFloat(usuario.saldo) + parseFloat(inputCantidad.value);
        
        const exito = actulizarSaldoUsuario(nuevoSaldo, usuario.numCliente);

        if(exito) {
            cargarDatosModal(inputCantidad.value, nuevoSaldo);
            inputCantidad.value = "";
            $("#modalExito").modal("show");
        }
    }
});

inputCantidad.addEventListener("keypress", function(event) {
    return validarNumeros(event);
});

const cargarDatosModal = (cantidad, nuevoSaldo) => {
    elCantidadRetiro.innerText = cantidad;
    elSaldoActual.innerHTML = nuevoSaldo;
};


btnSalirModal.addEventListener("click", function() {
    cerrarSesion();
});