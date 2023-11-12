/* Tomamos los valores del formulario */
const signupForm = document.querySelector("#signupForm");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const contrasenia = document.querySelector("#password").value;
  const nameUsr = localStorage.setItem("nameUsr", nombre);

  /* Chequeamos que el email ingresado no esté en la base de datos, si está NO lo guardamos y en caso de que no lo esté, SÍ lo vamos a guardar */
  const Users =
    JSON.parse(localStorage.getItem("users")) ||
    []; /* en el caso de que el storage tenga usuarios, los guarda, sino va a tenr un array vacío*/
  const isUserRegistered = Users.find(
    (user) => user.email === email
  ); /* buscamos un usuario que tenga el mismo mail que se acaba de ingresar en el formulario */
  if (isUserRegistered) {
    /* si esta variable tiene un valor válido, significa que este valor YA está registrado y mandamos una alerta */
    return alert("El usuario ya esta registado!");
  }

  /* En caso de que no tenga un valor válido, significa que NO está registrado y debemos guardarlo en la base de datos */
  Users.push({
    nombre: nombre,
    email: email,
    contrasenia: contrasenia,
  }); /* creamos un array y guardamos los valores del formulario */
  localStorage.setItem(
    "users",
    JSON.stringify(Users)
  ); /* los valores del array los agregamos al localStorage */
  alert("Registro Exitoso!");
  window.location.href = "login.html";
});
