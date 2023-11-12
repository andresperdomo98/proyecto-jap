function EnviarID(product) {
  localStorage.setItem("prodID", product);
  window.location = "product-info.html";
}

$(document).ready(function () {
  const IDcategoria = localStorage.getItem("catID");

  fetch(
    `https://japceibal.github.io/emercado-api/cats_products/${IDcategoria}.json`
  )
    .then((respuesta) => {
      if (!respuesta.ok) {
      }
      return respuesta.json();
    })
    .then((datos) => {
      console.log("Categoría ID:", datos.catID);
      console.log("Categoría:", datos.catName);

      let productos = datos.products;

      const mostrarProductos = (productos) => {
        $("#productos").empty();
        productos.forEach((producto) => {
          $("#productos").append(`
              <li>
                  <a onclick="EnviarID('${producto.id}')" href="#">${producto.name}</a>
                  <p>${producto.description}</p>
                  <p>${producto.cost} ${producto.currency}</p>
                  <p>${producto.soldCount} unidades vendidas</p>
                  <img src="${producto.image}">
              </li>
          `);
        });
      };

      // Muestra los productos sin ordenar por defecto
      mostrarProductos(productos);

      // Agrega un evento de clic al boton de ordenar ascendente
      $("#ordenarAscendente").on("click", function () {
        // Ordena los productos por precio de forma ascendente (de menor a mayor)
        productos.sort((a, b) => a.cost - b.cost);

        // Muestra los productos ordenados en el DOM
        mostrarProductos(productos);
      });

      // Agrega un evento de clic al boton de ordenar descendente
      $("#ordenarDescendente").on("click", function () {
        // Ordena los productos por precio de forma descendente (de mayor a menor)
        productos.sort((a, b) => b.cost - a.cost);

        // Muestra los productos ordenados en el DOM
        mostrarProductos(productos);
      });

      // Agrega un evento de clic al boton de ordenar por vendidos
      $("#ordenarPorVendidos").on("click", function () {
        // Ordena los productos por cantidad de objetos vendidos de forma descendente (de mayor a menor)
        productos.sort((a, b) => b.soldCount - a.soldCount);

        // Muestra los productos ordenados en el DOM
        mostrarProductos(productos);
      });

      // Agrega un evento de clic al boton de "Aplicar Filtros"
      $("#aplicarFiltros").on("click", aplicarFiltros);

      // Agrega un evento de cambio al campo de entrada del precio minimo
      $("#precioMin").on("change", aplicarFiltros);

      // Agrega un evento de cambio al campo de entrada del precio maximo
      $("#precioMax").on("change", aplicarFiltros);

      // Agrega un evento de clic al boton de "Limpiar Filtros"
      $("#limpiarFiltros").on("click", function () {
        // Limpia los campos de precios minimos y maximos
        $("#precioMin").val("");
        $("#precioMax").val("");

        // Aplica los filtros para mostrar todos los productos sin filtro de precio
        aplicarFiltros();
      });

      // Agrega un evento de entrada al campo de busqueda
      $("#buscador").on("input", function () {
        const textoBusqueda = $(this).val().trim().toLowerCase();

        // Filtra los productos en función del texto de busqueda
        const productosFiltrados = productos.filter((producto) => {
          const titulo = producto.name.toLowerCase();
          const descripcion = producto.description.toLowerCase();
          return (
            titulo.includes(textoBusqueda) ||
            descripcion.includes(textoBusqueda)
          );
        });

        // Muestra los productos filtrados en el DOM
        mostrarProductos(productosFiltrados);
      });

      // Funcion para aplicar los filtros
      function aplicarFiltros() {
        const precioMin = parseFloat($("#precioMin").val());
        const precioMax = parseFloat($("#precioMax").val());

        // Filtra los productos en funcion del rango de precios
        const productosFiltrados = productos.filter((producto) => {
          const costo = producto.cost;
          return (
            (isNaN(precioMin) || costo >= precioMin) &&
            (isNaN(precioMax) || costo <= precioMax)
          );
        });

        // Muestra los productos filtrados en el DOM
        mostrarProductos(productosFiltrados);
      }
    })
    .catch((error) => {
      $(".container").append(
        "<div class='alert alert-danger text-center' role='alert'> <h4 class='alert-heading'>Funcionalidad en desarrollo</h4></div>"
      );
    });
});
