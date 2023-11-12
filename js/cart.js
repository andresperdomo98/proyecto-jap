document.addEventListener("DOMContentLoaded", function () {

  const apiUrl = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {

      const productName = document.getElementById("product-name");
      const productCost = document.getElementById("product-cost");
      const productQuantityInput = document.getElementById("product-quantity");
      const productCurrency = document.getElementById("product-currency");
      const productImage = document.getElementById("product-image");
      const productSubtotal = document.getElementById("product-subtotal");

      productName.textContent = data.articles[0].name;
      productCost.textContent = data.articles[0].unitCost;
      productQuantityInput.value = 1;
      productCurrency.textContent = data.articles[0].currency;
      productImage.src = data.articles[0].image;

      const calculateSubtotal = () => {
        const newQuantity = parseInt(productQuantityInput.value, 10);

        if (newQuantity >= 1) {
          const newSubtotal = data.articles[0].unitCost * newQuantity;
          productSubtotal.textContent = newSubtotal + " " + data.articles[0].currency;
        } else {
          productQuantityInput.value = 1;
          const newSubtotal = data.articles[0].unitCost * 1;
          productSubtotal.textContent = newSubtotal + " " + data.articles[0].currency;
        }
      };

      productQuantityInput.addEventListener("input", calculateSubtotal);
      calculateSubtotal();
    })
    .catch((error) => {
      console.error("Error al obtener datos del carrito de compras:", error);
    });

  let miArray = JSON.parse(localStorage.getItem("miArrayKey")) || [];
  let productoNuevo = localStorage.getItem("prodCarrito");

  if (productoNuevo) {
    let producto = JSON.parse(productoNuevo);
    const productoExistente = miArray.find((p) => p.nombre === producto.nombre);
    if (productoExistente) {
      productoExistente.cantidad = 1;
    } else {
      producto.cantidad = 1;
      miArray.push(producto);
    }
    const precioProducto = producto.precio * producto.cantidad;
    producto.precioTotal = precioProducto;
    localStorage.setItem("miArrayKey", JSON.stringify(miArray));
  }

  miArray.forEach(function (producto) {
    const productInfoDiv = document.createElement("div");
    const productName = document.createElement("h2");
    const quantityLabel = document.createElement("label");
    const productQuantityInput = document.createElement("input");
    const imagen = document.createElement("img");
    const productCost = document.createElement("p");
    const eliminarButton = document.createElement("button");

    quantityLabel.textContent = "Cantidad:";
    productQuantityInput.setAttribute("type", "number");
    productQuantityInput.id = "cantidad";
    productQuantityInput.classList.add("cantidad");
    imagen.classList.add("img-fluid", "rounded");
    productQuantityInput.classList.add("form-control");
    productQuantityInput.classList.add("actualizador-cantidad");
    imagen.style.maxWidth = "200px";
    productName.textContent = `${producto.nombre}`;
    productQuantityInput.value = 1;
    productQuantityInput.min = 1;
    imagen.src = producto.imagen[0];
    eliminarButton.textContent = "Eliminar";
    eliminarButton.classList.add("btn", "btn-danger", "eliminar-producto");

    const calculateSubtotal = () => {
      const newQuantity = parseInt(productQuantityInput.value, 10);

      if (newQuantity >= 1) {
        producto.cantidad = newQuantity;
        const newSubtotal = producto.precio * newQuantity;
        productCost.textContent = `Subtotal: ${newSubtotal} ${producto.moneda}`;
        localStorage.setItem("Valor1", newSubtotal);
      }
      else {
        productQuantityInput.value = 1;
        producto.cantidad = 1;
        const newSubtotal = producto.precio * 1;
        productCost.textContent = `Subtotal: ${newSubtotal} ${producto.moneda}`;
      }
    };

    productQuantityInput.addEventListener("input", calculateSubtotal);
    calculateSubtotal();

    eliminarButton.addEventListener("click", function () {
      miArray = miArray.filter((p) => p.nombre !== producto.nombre);
      localStorage.setItem("miArrayKey", JSON.stringify(miArray));
      productInfoDiv.remove();
      actualizarCostos();
    });

    productInfoDiv.appendChild(productName);
    productInfoDiv.appendChild(quantityLabel);
    productInfoDiv.appendChild(productQuantityInput);
    productInfoDiv.appendChild(imagen);
    productInfoDiv.appendChild(productCost);
    productInfoDiv.appendChild(eliminarButton);

    const carritoLista = document.querySelector("#otrasCompras");
    carritoLista.appendChild(productInfoDiv);
  });

  const btnLimpiar = document.querySelector("#LimpiarCarrito");
  btnLimpiar.addEventListener("click", function () {
    localStorage.removeItem("miArrayKey");
    localStorage.removeItem("prodCarrito");
    location.reload();
  });

  const numeroTarjeta = document.getElementById('numero-tarjeta');

  numeroTarjeta.addEventListener("input", function () {
    // Eliminar todos los caracteres no numéricos
    let value = this.value.replace(/\D/g, '');

    // Asegurarse de que no supere los 16 dígitos (longitud máxima de tarjeta de crédito)
    if (value.length > 16) {
      value = value.slice(0, 16);
    }

    // Dar formato a 4 dígitos en 4
    if (value.length > 4) {
      value = value.match(/.{1,4}/g).join(' ');
    }

    // Establecer el valor formateado en el campo
    this.value = value;
  });

  const codigoSeguridadInput = document.getElementById("codigo-seguridad");

  codigoSeguridadInput.addEventListener("input", function () {
    const inputValue = codigoSeguridadInput.value;
    const sanitizedValue = inputValue.replace(/[^0-9]/g, ""); // Elimina todos los caracteres que no sean números
    codigoSeguridadInput.value = sanitizedValue;
  });

  const vencimientoInput = document.getElementById("vencimiento");

  vencimientoInput.addEventListener("input", function () {
    let inputValue = vencimientoInput.value;
    // Eliminar caracteres que no son números
    inputValue = inputValue.replace(/\D/g, "");

    // Aplicar formato MM/AA (dos dígitos, seguidos de una barra, seguidos de dos dígitos)
    if (inputValue.length > 2) {
      inputValue = inputValue.substring(0, 2) + "/" + inputValue.substring(2, 4);
    }

    vencimientoInput.value = inputValue;
  });

  // Selecciona el elemento de entrada
  const numCuentaInput = document.getElementById("num-cuenta");

  // Agrega un evento de escucha para validar la entrada
  numCuentaInput.addEventListener("input", function (e) {
    // Obtiene el valor actual del campo de entrada
    let inputValue = e.target.value;

    // Elimina cualquier carácter que no sea un número
    inputValue = inputValue.replace(/[^0-9]/g, "");

    // Asigna el valor limpio nuevamente al campo de entrada
    e.target.value = inputValue;
  });


  const opcionCredito = document.getElementById('opcionCredito');
  const opcionCuenta = document.getElementById('opcionCuenta');
  const codigoSeguridad = document.getElementById('codigo-seguridad');
  const vencimiento = document.getElementById('vencimiento');
  const numCuenta = document.getElementById('num-cuenta');
  const noSelectionText = document.getElementById('noSelectionText');

  opcionCredito.addEventListener('change', () => {
    numeroTarjeta.disabled = !opcionCredito.checked;
    codigoSeguridad.disabled = !opcionCredito.checked;
    vencimiento.disabled = !opcionCredito.checked;

    numCuenta.disabled = opcionCredito.checked;

    // Actualizar el texto según la selección
    noSelectionText.textContent = opcionCredito.checked ? 'Tarjeta de crédito seleccionada.' : 'No se ha seleccionado.';
  });


  opcionCuenta.addEventListener('change', () => {
    numCuenta.disabled = !opcionCuenta.checked;

    numeroTarjeta.disabled = opcionCuenta.checked;
    codigoSeguridad.disabled = opcionCuenta.checked;
    vencimiento.disabled = opcionCuenta.checked;

    // Actualizar el texto según la selección
    noSelectionText.textContent = opcionCuenta.checked ? 'Transferencia bancaria seleccionada.' : 'No se ha seleccionado.';
  });

  function calcularCostoTotal() {
    let costoTotalProductos = 0;

    miArray.forEach(function (producto) {
      if (producto.moneda === "UYU") {
        costoTotalProductos += (producto.precioTotal / 40) * producto.cantidad;
      }
      else {
        costoTotalProductos += producto.precioTotal * producto.cantidad;
      }
    });

    return costoTotalProductos;
  }

  function actualizarCostos() {
    const subtotalElement = document.getElementById("subtotal");
    const envioElement = document.getElementById("envio");
    const totalElement = document.getElementById("total");
    const productQuantityInput = document.getElementById("product-quantity");
    const tipodeenvio = document.querySelector('input[name="tipodeenvio"]:checked');

    // Obtener el costo unitario y cantidad del producto del fetch
    const costoUnitario = parseFloat(document.getElementById("product-cost").textContent);
    console.log(costoUnitario);
    const cantidadProducto = parseInt(productQuantityInput.value, 10);

    // Calcular el subtotal del producto del fetch
    const subtotalProducto = costoUnitario * cantidadProducto;

    // Calcular el costo de envío según el tipo de envío seleccionado


    // Calcular el costo total considerando los productos del localStorage
    const costoTotalProductosLocalStorage = calcularCostoTotal();

    // Calcular el subtotal total como la suma del subtotal del producto del fetch y el subtotal de los productos en el localStorage
    const subtotal = subtotalProducto + costoTotalProductosLocalStorage + 0;

    let costoEnvio = 0;
    if (tipodeenvio) {
      const tipoEnvio = tipodeenvio.value;
      if (tipoEnvio === "premium") {
        costoEnvio = subtotal * 0.15;
      } else if (tipoEnvio === "express") {
        costoEnvio = subtotal * 0.07;
      } else if (tipoEnvio === "standard") {
        costoEnvio = subtotal * 0.05;
      }
    }
    // Sumar el costo de envío al subtotal para obtener el costo total
    const costoTotal = subtotal + costoEnvio + 0;
    if (isNaN(costoUnitario)) {
      costoUnitario = 0;
    }

    // Actualizar los elementos en la tabla de costos
    subtotalElement.textContent = `USD ${subtotal.toFixed(2)}`;
    envioElement.textContent = `USD ${costoEnvio.toFixed(2)}`;
    totalElement.textContent = `USD ${costoTotal.toFixed(2)}`;
  }


  document.getElementById("product-quantity").addEventListener("input", actualizarCostos);
  document.getElementById("cantidad").addEventListener("input", actualizarCostos);

  const opcionesEnvio = document.querySelectorAll('input[name="tipodeenvio"]');
  opcionesEnvio.forEach((opcion) => {
    opcion.addEventListener("change", actualizarCostos);
  });

  const productQuantityInputs = document.querySelectorAll(".cantidad");
  productQuantityInputs.forEach((productQuantityInput) => {
    productQuantityInput.addEventListener("input", actualizarCostos);
  });

  actualizarCostos();
});

const confirmarCompraButton = document.getElementById("confirmarCompra");

confirmarCompraButton.addEventListener("click", function () {
  const calle = document.getElementById("calle").value;
  const numero = document.getElementById("numero").value;
  const esquina = document.getElementById("esquina").value;
  const formaEnvio = document.querySelector('input[class="tipodeenvio"]:checked');
  const formaPago = document.querySelector('input[class="formadepago"]:checked');

  if (calle === "" || numero === "" || esquina === "") {
    alert("Los campos de dirección (calle, número y esquina) no pueden estar vacíos.");
    return;
  }

  if (!formaEnvio) {
    alert("Debes seleccionar una forma de envío.");
    return;
  }

  const productQuantityInputs = document.querySelectorAll(".cantidad");
  for (const input of productQuantityInputs) {
    const cantidad = parseInt(input.value, 10);
    if (isNaN(cantidad) || cantidad <= 0) {
      alert("La cantidad para cada artículo debe estar definida y ser mayor a 0.");
      return;
    }
  }

  if (!formaPago) {
    alert("Debes seleccionar una forma de pago.");
    return;
  }

  const numeroTarjeta = document.getElementById("numero-tarjeta");
  const codigoSeguridad = document.getElementById("codigo-seguridad");
  const vencimiento = document.getElementById("vencimiento");
  const numCuenta = document.getElementById("num-cuenta");

  if (formaPago.value === "credito" && (numeroTarjeta.value === "" || codigoSeguridad.value === "" || vencimiento.value === "")) {
    alert("Por favor, completa los campos de la tarjeta de crédito.");
    return;
  } else if (formaPago.value === "cuenta" && numCuenta.value === "") {
    alert("Por favor, completa el número de cuenta para la transferencia bancaria.");
    return;
  }

  alert("¡La compra se ha realizado exitosamente!");
});
