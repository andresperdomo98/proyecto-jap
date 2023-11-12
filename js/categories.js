const ORDENAR_ASC_POR_NOMBRE = "AZ";
const ORDENAR_DESC_POR_NOMBRE = "ZA";
const ORDENAR_POR_PROD = "Cant.";
let arregloCategoriasActual = [];
let criterioOrdenamientoActual = undefined;
let cuentaMinima = undefined;
let cuentaMaxima = undefined;

function ordenarCategorias(criterio, arreglo) {
  let resultado = [];
  if (criterio === ORDENAR_ASC_POR_NOMBRE) {
    resultado = arreglo.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  } else if (criterio === ORDENAR_DESC_POR_NOMBRE) {
    resultado = arreglo.sort(function (a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
  } else if (criterio === ORDENAR_POR_PROD) {
    resultado = arreglo.sort(function (a, b) {
      let cuentaA = parseInt(a.productCount);
      let cuentaB = parseInt(b.productCount);

      if (cuentaA > cuentaB) {
        return -1;
      }
      if (cuentaA < cuentaB) {
        return 1;
      }
      return 0;
    });
  }

  return resultado;
}

function colocarCategoriaID(id) {
  localStorage.setItem("catID", id);
  window.location = "products.html";
}

function mostrarListaCategorias() {
  let htmlAAgregar = "";
  for (let i = 0; i < arregloCategoriasActual.length; i++) {
    let category = arregloCategoriasActual[i];

    if (
      (cuentaMinima == undefined ||
        (cuentaMinima != undefined &&
          parseInt(category.productCount) >= cuentaMinima)) &&
      (cuentaMaxima == undefined ||
        (cuentaMaxima != undefined && parseInt(category.productCount) <= cuentaMaxima))
    ) {
      htmlAAgregar += `
            <div onclick="colocarCategoriaID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name}</h4>
                            <small class="text-muted">${category.productCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `;
    }

    document.getElementById("cat-list-container").innerHTML =
      htmlAAgregar;
  }
}

function ordenarYMostrarCats(criterioOrden, arregloCats) {
  criterioOrdenamientoActual = criterioOrden;

  if (arregloCats != undefined) {
    arregloCategoriasActual = arregloCats;
  }

  arregloCategoriasActual = ordenarCategorias(
    criterioOrdenamientoActual,
    arregloCategoriasActual
  );

  //Muestro las categorías ordenadas
  mostrarListaCategorias();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CATEGORIES_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      arregloCategoriasActual = resultObj.data;
      mostrarListaCategorias();
      //ordenarYMostrarCats(ORDENAR_ASC_POR_NOMBRE, resultObj.data);
    }
  });

  document.getElementById("sortAsc").addEventListener("click", function () {
    ordenarYMostrarCats(ORDENAR_ASC_POR_NOMBRE);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    ordenarYMostrarCats(ORDENAR_DESC_POR_NOMBRE);
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    ordenarYMostrarCats(ORDENAR_POR_PROD);
  });

  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

      cuentaMinima = undefined;
      cuentaMaxima = undefined;

      mostrarListaCategorias();
    });

  document
    .getElementById("rangeFilterCount")
    .addEventListener("click", function () {
      //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
      //de productos por categoría.
      cuentaMinima = document.getElementById("rangeFilterCountMin").value;
      cuentaMaxima = document.getElementById("rangeFilterCountMax").value;

      if (cuentaMinima != undefined && cuentaMinima != "" && parseInt(cuentaMinima) >= 0) {
        cuentaMinima = parseInt(cuentaMinima);
      } else {
        cuentaMinima = undefined;
      }

      if (cuentaMaxima != undefined && cuentaMaxima != "" && parseInt(cuentaMaxima) >= 0) {
        cuentaMaxima = parseInt(cuentaMaxima);
      } else {
        cuentaMaxima = undefined;
      }

      mostrarListaCategorias();
    });
});
