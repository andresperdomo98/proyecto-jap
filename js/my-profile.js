// Elementos del formulario
const form = document.querySelector('form');
const primerNombreInput = document.getElementById('primerNombre');
const segundoNombreInput = document.getElementById('segundoNombre');
const primerApellidoInput = document.getElementById('primerApellido');
const segundoApellidoInput = document.getElementById('segundoApellido');
const emailUsuarioInput = document.getElementById('emailUsuario');
const telefonoInput = document.getElementById('telefono');
const imagenInput = document.getElementById('imagen');

// Función para guardar los datos en el localStorage
function guardarDatosEnLocalStorage(primerNombre, segundoNombre, primerApellido, segundoApellido, emailUsuario, telefono, imagen) {
  const usuarioActual = datosUsuario.email;
  const clavePerfil = 'perfilDatos_' + usuarioActual;

  const datos = {
    usuario: usuarioActual,
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    emailUsuario,
    telefono,
    imagen
  };

  // Guardamos los datos en el localStorage
  localStorage.setItem(clavePerfil, JSON.stringify(datos));
}

// Datos del usuario obtenidos del localStorage
const datosUsuario = JSON.parse(localStorage.getItem("login_success"));

// Función que prellena el campo de correo electrónico con el email del usuario
function mailUsuario() {
  const inputEmail = document.getElementById('emailUsuario');
  inputEmail.value = datosUsuario.email;
}

// Función para llenar los campos del formulario con datos
function llenarCamposFormulario(datos) {
  primerNombreInput.value = datos.primerNombre;
  segundoNombreInput.value = datos.segundoNombre;
  primerApellidoInput.value = datos.primerApellido;
  segundoApellidoInput.value = datos.segundoApellido;
  telefonoInput.value = datos.telefono;
  // Llamamos a la función que prellena el campo de correo
  mailUsuario();
}

// Función para cargar los datos del localStorage al formulario
function cargarDatosDeLocalStorage() {
  if (localStorage.getItem('perfilDatos')) {
    const usuarioActual = datosUsuario.email;
    const clavePerfil = 'perfilDatos_' + usuarioActual;
    const datos = JSON.parse(localStorage.getItem(clavePerfil));

    if (datos && datos.usuario === usuarioActual) {
      // Llenamos los campos del formulario con los datos cargados
      llenarCamposFormulario(datos);
    }
  }
}

// Función para mostrar la imagen de perfil
function mostrarImagen() {
  const imagenPerfil = document.getElementById('imagenPerfil');
  const usuarioActual = datosUsuario.email;
  const clavePerfil = 'perfilDatos_' + usuarioActual;
  const perfilDatos = JSON.parse(localStorage.getItem(clavePerfil));

  if (perfilDatos && perfilDatos.imagen) {
    // Si hay una imagen en el perfil, la mostramos
    imagenPerfil.src = perfilDatos.imagen;
  } else {
    // Si no hay imagen, mostramos una por defecto
    imagenPerfil.src = './img/img_perfil.png';
  }
}

// Evento cuando se selecciona un archivo de imagen
imagenInput.addEventListener('change', function (event) {
  const file = event.target.files[0];

  if (file) {
    // Leemos y mostramos la imagen utilizando FileReader
    const reader = new FileReader();
    reader.onload = function (e) {
      const imagenPerfil = document.getElementById('imagenPerfil');
      imagenPerfil.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Evento para el botón "Guardar cambios"
document.getElementById('guardarCambios').addEventListener('click', function (event) {
  event.preventDefault();

  const primerNombre = primerNombreInput.value.trim();
  const segundoNombre = segundoNombreInput.value.trim();
  const primerApellido = primerApellidoInput.value.trim();
  const segundoApellido = segundoApellidoInput.value.trim();
  const emailUsuario = emailUsuarioInput.value.trim();
  const telefono = telefonoInput.value.trim();
  const imagenInputFile = imagenInput.files[0];
  let imagen = '';


  // Si no se selecciona una imagen, simplemente validamos y guardamos los datos
  if (validarCampos(primerNombre, primerApellido, telefono)) {
    guardarDatosEnLocalStorage(primerNombre, segundoNombre, primerApellido, segundoApellido, emailUsuario, telefono, imagen);
    // Mostramos la imagen y llenamos los campos después de guardar
    mostrarImagen();
    llenarCamposFormulario({ primerNombre, segundoNombre, primerApellido, segundoApellido, emailUsuario, telefono });
    alert("¡Datos guardados con éxito!");
    location.reload();
  }
})


// Función para validar campos obligatorios
function validarCampos(primerNombre, primerApellido, telefono) {
    if (!primerNombre || !primerApellido || !telefono) {
      alert("Por favor, completa los campos obligatorios marcados con *.");
      return false;
    }
    return true;
  }

// Mostramos la imagen al cargar la página
mostrarImagen();

// Evento para el campo de teléfono (removemos caracteres no numéricos)
telefonoInput.addEventListener('input', function () {
  this.value = this.value.replace(/\D/g, '');
});

// Cargamos datos del localStorage al formulario al cargar la página
cargarDatosDeLocalStorage();
