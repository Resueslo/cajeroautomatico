const toastLive = document.getElementById('liveToast');
const toast = new bootstrap.Toast(toastLive);
const btnSalir = document.getElementById("btnSalir");
const btnRegresar = document.getElementById("btnRegresar");
const elNomUsuario = document.getElementById("nomUsuario");

const montoMaximo = 990;
const montoMinimo = 10;


const usuario = JSON.parse(localStorage.getItem("usuario"));

// SI NO HAY USUARIO LOGEADO
if(!usuario) {
  window.location = "index.html";
}

elNomUsuario.innerText = usuario.nombre;

// CANTIDAD MAXIMA PARA RETIRAR Y DEPOSITAR DEL USUARIO LOGEADO
const montoMaximoRetirarUsuario = usuario.saldo - montoMinimo;
const montoMaximoDepositar = montoMaximo - usuario.saldo;


const actulizarSaldoUsuario = (nuevoSaldo, numCliente ) => {
  const cuentasDB = JSON.parse(localStorage.getItem("cuentas"));

  let indice = cuentasDB.findIndex(cuenta => cuenta.numCliente == numCliente);

  if(indice >= 0) {
    cuentasDB[indice].saldo = nuevoSaldo;
    localStorage.setItem("cuentas", JSON.stringify(cuentasDB));

    usuario.saldo = nuevoSaldo;
    localStorage.setItem("usuario", JSON.stringify(usuario));

    return true;
  }
  return false;
};

const validarNumeros = event => {
  if(!(event.charCode >= 48 && event.charCode <= 57)) {
    event.preventDefault();
  }
};

const cerrarSesion = () => {
  // LIMPIAR LOCALSTORAGE
  localStorage.removeItem("usuario");

  window.location = "index.html";
};


btnSalir.addEventListener("click", function() {
    cerrarSesion();
});

if(btnRegresar) {
  btnRegresar.addEventListener("click", function() {
    window.history.back();
  });
}


// MOSTRAR ALERTAS
const mostarAlerta = (mensaje, tipo) => {
  let contenedorMsj = document.getElementById("msjAlerta");
  let clase;

  switch(tipo) {
    case 1: //success
      clase = "text-bg-success";
    break;
    case 2: //error
      clase = "text-bg-danger";
    break;
    default: //warning
      clase = "text-bg-warning ";
    break;
  }

  if(mensaje) {
    contenedorMsj.innerText = mensaje;
    toastLive.className += ` ${clase}`;
    toast.show();
  }
};