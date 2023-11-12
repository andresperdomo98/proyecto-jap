const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL =
  "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let mostrarSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let esconderSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let resultado = {};
  mostrarSpinner();
  return fetch(url)
    .then((respuesta) => {
      if (respuesta.ok) {
        return respuesta.json();
      } else {
        throw Error(respuesta.statusText);
      }
    })
    .then(function (respuesta) {
      resultado.status = "ok";
      resultado.data = respuesta;
      esconderSpinner();
      return resultado;
    })
    .catch(function (error) {
      resultado.status = "error";
      resultado.data = error;
      esconderSpinner();
      return resultado;
    });
};
