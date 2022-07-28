const inputNumCliente  = document.getElementById("numeroCliente");
const inputCantidad  = document.getElementById("cantidadTransferir");
const btnContinur  = document.getElementById("btnContinuar");

// MODAL
const btnSalirModal = document.getElementById("btnSalirModal");
const elCantidadTrasferencia = document.getElementById("cantidadTrasferencia");
const elSaldoActual = document.getElementById("saldoActual");

const validarDatos = () => {
    if(!parseInt(inputNumCliente.value)) {
        mostarAlerta("Favor de ingresar el número de cliente al que desea trasferir.");
        return false;
    }
    if(!parseInt(inputCantidad.value)) {
        mostarAlerta("Favor de ingresar la cantidad a trasferir.");
        return false;
    }
    if(inputCantidad.value > montoMaximoRetirarUsuario) {
        mostarAlerta(`La cantidad máxima que puede trasferir es de: $${montoMaximoRetirarUsuario}`);
        return false;
    }
    return true;
};

const validarTranserencia = () => {
    // OBTENER CUENTAS DE LOCALSTORAGE
    const cuentasDB = JSON.parse(localStorage.getItem("cuentas"));

    let cuentaTrasferir = cuentasDB.find(cuenta => {
      if(cuenta.numCliente == inputNumCliente.value) {
        return cuenta;
      }
    });

    if(cuentaTrasferir && (cuentaTrasferir.numCliente == usuario.numCliente)) {
        mostarAlerta("No se puede traseferir a su propia cuenta.");
        return false;
    }
    if(!cuentaTrasferir) {
        mostarAlerta("El número de cliente ingresado no existe, por favor intente de nuevo.");
        return false;
    }
    const nuevoSaldo = parseInt(cuentaTrasferir.saldo) + parseInt(inputCantidad.value);
    if(nuevoSaldo > montoMaximo) {
        mostarAlerta("El cliente a trasferir supera el monto máximo permitido, favor intente con otra cantidad.");
        return false;
    }

    return true;
};

const realizarTrasferencia = () => {
    let cuentasDB = JSON.parse(localStorage.getItem("cuentas"));

    const indice = cuentasDB.findIndex(cuenta => cuenta.numCliente == inputNumCliente.value);

    if(indice >= 0) {
        cuentasDB[indice].saldo = parseInt(cuentasDB[indice].saldo) + parseInt(inputCantidad.value);
        localStorage.setItem("cuentas", JSON.stringify(cuentasDB));
        return true;
    }
    return false;
};

btnContinuar.addEventListener("click", function(e) {    
    e.preventDefault();
    if(validarDatos() && validarTranserencia()) {
        const exitoTras = realizarTrasferencia();

        if(exitoTras) {
            const nuevoSaldo = parseFloat(usuario.saldo) - parseFloat(inputCantidad.value);
        
            const exito = actulizarSaldoUsuario(nuevoSaldo, usuario.numCliente);
    
            if(exito) {
                cargarDatosModal(inputCantidad.value, nuevoSaldo);
                inputNumCliente.value = "";
                inputCantidad.value = "";
                $("#modalExito").modal("show");
            }
        } else {
            mostarAlerta("Ocurrio un error, intente de nuevo más tarde.");
        }
    }
});

inputNumCliente.addEventListener("keypress", function(event) {
    return validarNumeros(event);
});

inputCantidad.addEventListener("keypress", function(event) {
    return validarNumeros(event);
});

const cargarDatosModal = (cantidad, nuevoSaldo) => {
    elCantidadTrasferencia.innerText = cantidad;
    elSaldoActual.innerHTML = nuevoSaldo;
};


btnSalirModal.addEventListener("click", function() {
    cerrarSesion();
});