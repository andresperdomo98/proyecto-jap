document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html";
  });
});

const user =
  JSON.parse(localStorage.getItem("login_success")) ||
  false; /* en el caso que haya algo dentro del localStorage se guarda en esta variable */
if (!user) {
  /* si nuestra variable es false, lo mandamos al login */
  window.location.href = "login.html";
} else {
  const usernameDropdown = document.querySelector("#usernameDropdown");
  usernameDropdown.textContent = user.nombre; /* en caso de que estemos logueados, selecciona el elemento del DOM con el ID "usernameDropdown" y luego establece el contenido de texto de ese elemento en el valor almacenado en la propiedad username del objeto user, lo que resulta en que el nombre del usuario se muestra en el menú desplegable. */
}

const logout = document.querySelector("#logout");
logout.addEventListener("click", () => {
  alert("Nos vemos!");
  localStorage.removeItem("login_success");
  window.location.href = "login.html";
});



document.addEventListener('DOMContentLoaded', function () {
  const cambio = document.getElementById('darkButton');
  const modoNoche = localStorage.getItem('darkMode') === 'enabled';

  if (modoNoche) {
    document.body.classList.add('dark-mode');
    cambio.checked = true;
  }

  cambio.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const darkModeEnabled = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', darkModeEnabled ? 'enabled' : 'disabled');
  });
});
// Agrega un evento click al enlace del carrito
document.getElementById('cart-link').addEventListener('click', function (event) {
  event.preventDefault(); // Evita la navegación predeterminada

  // Define el ID de usuario que deseas obtener del carrito
  const userId = 25801;

  // Almacena el ID de usuario en localStorage
  localStorage.setItem("userId", userId);

  // Redirige al usuario a la página cart.html
  window.location.href = "cart.html";
});
