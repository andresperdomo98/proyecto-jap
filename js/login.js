const loginForm = document.querySelector("#loginForm");


loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); /* evita que no se recargue la página */
  const email = document.querySelector("#email").value;
  const contrasenia = document.querySelector("#contrasenia").value;
  /* traemos la base de datos */
  const usuario = JSON.parse(localStorage.getItem("users")) || [];
  /* hacemos uso de un find para buscar la contraseña y correo en la base de datos, en el caso de que coincidan, quiere decir que se logueó correctamente el usuario y le damos acceso */
  const validUsuario = usuario.find(
    (usuario) => usuario.email === email && usuario.contrasenia === contrasenia
  );
  if (!validUsuario) {
    /* en caso de que salga undefined, quiere decir que el suario ingresó mal el correo o la contraseña */
    return alert(
      "Usuario y/o contraseña incorrectos!"
    ); /* con el return se sale de la función */
  }
  alert(`Bienvenido ${validUsuario.nombre}`);
  localStorage.setItem(
    "login_success",
    JSON.stringify(validUsuario)
  ); /* para poder ver que hay un usuario logueado */
  window.location.href = "index.html";
});
