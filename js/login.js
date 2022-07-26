const cuentas = [
  { nombre: "Reyna", apellido: "Escobar", nip:1122, numCliente: 12345678, saldo: 200 },
  { nombre: "Juan", apellido: "Lopez", nip:2233, numCliente: 55661188, saldo: 290 },
  { nombre: "Maria", apellido: "Perez", nip:3344, numCliente: 88627216, saldo: 67 }
];

// AGREGAR REGISTROS A LOCALSTORAGE
if(!localStorage.getItem("cuentas")) {
  localStorage.setItem("cuentas", JSON.stringify(cuentas));
}


// LIMPIAR LOCALSTORAGE
localStorage.removeItem("usuario");

const formulario = document.getElementById("formulario");
const btnEntrar = document.getElementById('btnEntrar');
const toastLive = document.getElementById('liveToast');
const toast = new bootstrap.Toast(toastLive);

const validarDatos = (cliente, nip) => {
  if(!cliente) {
    mostarAlerta("Debe ingresar su número de cliente.");

    return false;
  }
  if(!nip) {
    mostarAlerta("Debe ingresar su NIP.");
    return false;
  }
  return true;
};

btnEntrar.addEventListener('click', () => {
  // event.preventDefault();
  const numCliente = document.getElementById("cliente").value;
  const nip = document.getElementById("nip").value;

  if(validarDatos(numCliente, nip)) {
    // OBTENER CUENTAS DE LOCALSTORAGE
    const cuentasDB = JSON.parse(localStorage.getItem("cuentas"));

    let usuario = cuentasDB.find(cuenta => {
      if(cuenta.numCliente == numCliente && cuenta.nip == nip) {
        return cuenta;
      }
    });

    if(usuario) {
      delete usuario.nip;
      localStorage.setItem("usuario", JSON.stringify(usuario));
      window.location = "home.html";
    } else {
      mostarAlerta("No se encontro el cliente, favor de intentar de nuevo.")
    }
  }  
})


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
