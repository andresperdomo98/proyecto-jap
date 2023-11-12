document.addEventListener("DOMContentLoaded", function () {
  // Obtenemos una referencia al elemento <span> del nombre de usuario
  const valorUsuario = document.getElementById("usernameDropdown");
  const usuario = valorUsuario.textContent;

  // Obtenemos el ID del producto almacenado en el Local Storage
  const nuevoID = localStorage.getItem("prodID");
  const IDcategoria = localStorage.getItem("catID"); //Aca traemos el id de categoria del producto seleccionado

  // Construimos las URLs para obtener información del producto y comentarios
  let productoInfoURL = `https://japceibal.github.io/emercado-api/products/${nuevoID}.json`;
  const comentariosURL = `https://japceibal.github.io/emercado-api/products_comments/${nuevoID}.json`;
  const productosRelacionados = `https://japceibal.github.io/emercado-api/cats_products/${IDcategoria}.json`;


  /* Agregar compras al carrito */
  const btnAgregar = document.querySelector("#btnagregarcompra");
  btnAgregar.addEventListener('click', function () {
    fetch(productoInfoURL)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Error al cargar la información del producto.");
        }
        return respuesta.json();
      })
      .then((productoData) => {

        let datos = {
          nombre: productoData.name,
          precio: productoData.cost,
          imagen: productoData.images,
          moneda: productoData.currency
        };
        let productoJSON = JSON.stringify(datos);
        localStorage.setItem('prodCarrito', productoJSON);
        alert("Se agrego correctamente al carrito")
      });
  });


  // Obtener información del producto relacionado
  fetch(productosRelacionados)
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error(
          "Error al cargar la información de productos relacionados."
        );
      }
      return respuesta.json();
    })
    .then((productosRelacionados) => {
      console.log(productosRelacionados);
      const datosElement = document.getElementById("relacionado");

      if (Array.isArray(productosRelacionados.products)) {
        let contenidoHTML = "";

        // Convertir nuevoID a un número entero
        const nuevoIDNumero = parseInt(nuevoID);

        // Filtrar los productos relacionados para excluir el producto principal
        const productosMostrar = productosRelacionados.products.filter(
          (producto) => {
            return producto.id !== nuevoIDNumero;
          }
        );

        // Limitar la cantidad de productos relacionados a 2
        const productosLimitados = productosMostrar.slice(0, 2);

        // Iterar sobre los productos relacionados y construir el HTML
        productosLimitados.forEach((producto) => {
          contenidoHTML += `
        <div class="producto-container">
          <img src="${producto.image}" alt="${producto.name}" style="width: 150px;">
          <p>${producto.name}</p>
          <button class="ver-producto" data-producto-id="${producto.id}">Ver Producto</button>
        </div>
      `;
        });
        document.getElementById("relacionado").innerHTML = contenidoHTML;

        // Agregar un evento clic a los botones de "Ver Producto"
        document.querySelectorAll(".ver-producto").forEach((boton) => {
          boton.addEventListener("click", function () {
            const productoId = this.getAttribute("data-producto-id");
            // Redirige a la página del producto relacionado
            window.location.href = `product-info.html?id=${productoId}`;
          });
        });

        // Establecer el contenido completo en el elemento
        datosElement.innerHTML = contenidoHTML;
      } else {
        // En caso de que productosRelacionados.products no sea un array
        datosElement.innerHTML = "No se encontraron productos relacionados.";
      }
    })
    .catch((error) => {
      console.error(
        "Error al cargar la información de productos relacionados:",
        error
      );
    });

  // Establecer el contenido completo en el elemento

  // Función para obtener el HTML de las estrellas según el puntaje
  function traerEstrellas(puntaje) {
    const puntajeMaximo = 5;
    const estrellasRellenadas = "★".repeat(puntaje);
    const estrellasVacias = "☆".repeat(puntajeMaximo - puntaje);
    return estrellasRellenadas + estrellasVacias;
  }

  // Obtener y mostrar los comentarios del Local Storage
  const comentariosAlmacenados =
    JSON.parse(localStorage.getItem("comentarios")) || [];

  // Función para generar el HTML de un comentario
  function generarHTMLComentario(comentario) {
    const estrellasHTML = traerEstrellas(comentario.puntaje);
    return `
      <div class="comentario">
        <div class="usuario">${comentario.user}</div>
        <div class="fecha">${comentario.dateTime}</div>
        <div class="puntuacion">
          <div class="estrellas-container">${estrellasHTML}</div>
        </div>
        <div class="descripcion">${comentario.description}</div>
      </div>
    `;
  }

  // Contenedor de comentarios en la página
  const comentariosElement = document.getElementById("comentarios-container");

  // Mostrar los comentarios del Local Storage en la página
  comentariosAlmacenados.forEach((comentario) => {
    const comentarioHTML = generarHTMLComentario(comentario);
    comentariosElement.innerHTML += comentarioHTML;
  });

  // Obtener información del producto a través de fetch
  fetch(productoInfoURL)
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al cargar la información del producto.");
      }
      return respuesta.json();
    })
    .then((productoData) => {
      const datosElement = document.getElementById("datosproducto");

      let contenidoHTML = `
        <h3>${productoData.name}</h3>
        <p><b>Precio</b></p>
        <p>${productoData.cost} ${productoData.currency}</p>
        <p><b>Descripción</b></p>
        <p>${productoData.description}</p>
        <p><b>Categoría</b></p>
        <p>${productoData.category}</p>
        <p><b>Cantidad de vendidos</b></p>
        <p>${productoData.soldCount} unidades vendidas</p>
        <div id="miCarrusel" class="carousel carousel-dark slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
      `;

      // Agregamos los indicadores del carrusel basado en las imágenes del producto
      productoData.images.forEach((image, index) => {
        contenidoHTML += `
          <button type="button" data-bs-target="#miCarrusel" data-bs-slide-to="${index}" ${index === 0 ? 'class="active" aria-current="true"' : ""
          } aria-label="Slide ${index + 1}"></button>
        `;
      });

      contenidoHTML += `
          </div>
          <div class="carousel-inner">
      `;

      // Agregamos las imágenes al carrusel y marcamos la primera como activa
      productoData.images.forEach((ima, index) => {
        contenidoHTML += `
          <div class="carousel-item ${index === 0 ? "active" : ""
          }" data-bs-interval="3000">
            <img src="${image}" class="d-block w-100" alt="Slide ${index + 1}">
          </div>
        `;
      });

      contenidoHTML += `
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#miCarrusel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#miCarrusel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      `;

      // Establecer el contenido completo en el elemento
      datosElement.innerHTML = contenidoHTML;

      // Obtener una referencia al carrusel por su ID
      const miCarrusel = document.getElementById("miCarrusel");

      // Iniciar manualmente el carrusel
      const carruselBootstrap = new bootstrap.Carousel(miCarrusel, {});

      // Obtener y mostrar los comentarios a través de fetch
      fetch(comentariosURL)
        .then((respuesta) => {
          if (!respuesta.ok) {
            throw new Error("Error al cargar los comentarios.");
          }
          return respuesta.json();
        })
        .then((comentariosData) => {
          console.log(comentariosData);
          const comentariosElement = document.getElementById(
            "comentarios-container"
          );

          // Iterar sobre los comentarios y mostrarlos
          comentariosData.forEach((comentario) => {
            const estrellasHTML = traerEstrellas(comentario.puntaje);
            const comentarioHTML = `
              <div class="comentario">
                <div class="usuario">${comentario.user}</div>
                <div class="fecha">${comentario.dateTime}</div>
                <div class="puntuacion">
                  <div class="estrellas-container">${estrellasHTML}</div>
                </div>
                <div class="descripcion">${comentario.description}</div>
              </div>
            `;
            comentariosElement.innerHTML += comentarioHTML;
          });
        })
        .catch((error) => {
          console.error("Error al cargar los comentarios:", error);
        });
    })
    .catch((error) => {
      console.error("Error al cargar la información del producto:", error);
    });

  // Función para actualizar el contador de caracteres restantes en el formulario
  document.getElementById("textarea").addEventListener("input", function () {
    var maxCaracteres = 250; // Establecemos la cantidad máxima permitida de caracteres
    var texto = this.value; // Obtener el valor del <textarea> actual
    var caracteresRestantes = maxCaracteres - texto.length;

    // Actualiza el contador en la página
    document.getElementById("contador").textContent = caracteresRestantes;

    // Limita la longitud del texto en el textarea
    if (caracteresRestantes < 0) {
      this.value = texto.slice(0, maxCaracteres);
      caracteresRestantes = 0;
      document.getElementById("contador").textContent = caracteresRestantes;
    }
  });

  /* Tomamos datos del comentario */
  const commentForm = document.querySelector("#comentar");
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const puntaje = document.querySelector("#mi-puntuacion").value;
    const comentario = document.querySelector("#textarea").value;
    const fechaActual = new Date();
    const formatoFechaHora = fechaActual
      .toISOString()
      .slice(0, 19)
      .replace("T", " "); // Formatear la fecha y hora en "aaaa-mm-dd hh:mm:ss"

    // Borrar el contenido del textarea
    document.querySelector("#textarea").value = ""; // Esto limpia el textarea

    // Definir los datos que deseas enviar
    const Comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    Comentarios.push({
      puntaje: puntaje,
      description: comentario,
      user: usuario, // Asigna el nombre de usuario almacenado
      dateTime: formatoFechaHora,
    });

    // Guardar los comentarios actualizados en el Local Storage
    localStorage.setItem("comentarios", JSON.stringify(Comentarios));

    // Mostrar el último comentario en la página
    if (Comentarios.length > 0) {
      const ultimoComentario = Comentarios[Comentarios.length - 1];
      const comentarioHTML = generarHTMLComentario(ultimoComentario);
      comentariosElement.innerHTML += comentarioHTML;
    }

    // Función para borrar los comentarios del Local Storage
    function borrarComentariosLocalStorage() {
      localStorage.removeItem("comentarios");
    }

    // El evento beforeunload se dispara justo antes de que la página se recargue o cierre
    window.addEventListener("beforeunload", borrarComentariosLocalStorage);
  });
});




