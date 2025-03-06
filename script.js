document.addEventListener("DOMContentLoaded", () => {
  console.log("Página cargada. ¡Listo para usar!");

  /* ===============================
     Modal de Detalle del Producto
  =============================== */
  const productImages = document.querySelectorAll(".gallery img");
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modal-image");
  const closeModal = document.querySelector(".close");

  // Ejemplo de detalles para cada producto
  const productDetails = {
    "images/product1.jpg": {
      title: "Laptop",
      description: "Potente laptop para tus necesidades profesionales.",
      price: "$1999.99",
    },
    "images/product2.jpg": {
      title: "Smartwatch",
      description: "Mantén el control de tu salud y notificaciones.",
      price: "$299.99",
    },
    // ... agrega más detalles según necesites
  };

  productImages.forEach((img) => {
    img.addEventListener("click", () => {
      modal.classList.add("show");
      modalImage.src = img.src;
      const details = productDetails[img.getAttribute("src")];
      if (details) {
        document.getElementById("modal-title").textContent = details.title;
        document.getElementById("modal-description").textContent = details.description;
        document.getElementById("modal-price").textContent = details.price;
      } else {
        document.getElementById("modal-title").textContent = "Producto";
        document.getElementById("modal-description").textContent = "Sin descripción.";
        document.getElementById("modal-price").textContent = "$0.00";
      }
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });

  /* ===============================
         Filtro de Productos
  =============================== */
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const filter = searchInput.value.toLowerCase();
      const productItems = document.querySelectorAll(".product-item");
      productItems.forEach((item) => {
        const title = item.querySelector("img").getAttribute("data-title").toLowerCase();
        item.style.display = title.includes(filter) ? "flex" : "none";
      });
    });
  }

  /* ===============================
          Carrito de Compras
  =============================== */
  let cart = [];

  // Función para actualizar el modal del carrito
  function updateCartModal() {
    const cartItemsDiv = document.getElementById("cart-items");
    cartItemsDiv.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += parseFloat(item.price);
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");
      itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${item.img}" alt="${item.product}" width="50" style="border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.2);">
          <span>${item.product} - $${item.price}</span>
        </div>
        <button data-index="${index}" class="remove-item" style="background-color: red; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Eliminar</button>
      `;
      cartItemsDiv.appendChild(itemDiv);
    });

    document.getElementById("cart-total").textContent = `Total: $${total.toFixed(2)}`;

    // Asignar eventos para eliminar productos
    const removeButtons = document.querySelectorAll(".remove-item");
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        cart.splice(index, 1);
        updateCartModal();
        // Reactivar el botón "Agregar al Carrito" si el producto ya no está en el carrito
        addToCartButtons.forEach((btn) => {
          const prod = btn.getAttribute("data-product");
          const exists = cart.find(item => item.product === prod);
          if (!exists) {
            btn.textContent = "Agregar al Carrito";
            btn.disabled = false;
            btn.classList.remove("selected");
          }
        });
      });
    });
  }

  // Manejo de clic en "Agregar al Carrito"
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const product = button.getAttribute("data-product");
      const price = button.getAttribute("data-price");
      const img = button.getAttribute("data-img");

      // Verificar si el producto ya está en el carrito
      const exists = cart.find(item => item.product === product);
      if (!exists) {
        cart.push({ product, price, img });
        alert(`${product} agregado al carrito`);
        updateCartModal();
        // Marcar el botón como seleccionado
        button.textContent = "Seleccionado";
        button.disabled = true;
        button.classList.add("selected");
      } else {
        alert(`${product} ya está en el carrito`);
      }
    });
  });

  // Abrir el modal del carrito con efecto elegante
  const viewCartBtn = document.getElementById("view-cart-btn");
  const cartModal = document.getElementById("cart-modal");
  const closeCartBtn = document.querySelector(".close-cart");
  if (viewCartBtn) {
    viewCartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      updateCartModal();
      cartModal.classList.add("show");
    });
  }
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => {
      cartModal.classList.remove("show");
    });
  }
  window.addEventListener("click", (event) => {
    if (event.target === cartModal) {
      cartModal.classList.remove("show");
    }
  });

  // Finalizar compra: vacía el carrito y reactiva todos los botones "Agregar al Carrito"
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length > 0) {
        alert("Compra finalizada. ¡Gracias por tu compra!");
        cart = [];
        updateCartModal();
        cartModal.classList.remove("show");
        addToCartButtons.forEach((button) => {
          button.textContent = "Agregar al Carrito";
          button.disabled = false;
          button.classList.remove("selected");
        });
      } else {
        alert("El carrito está vacío.");
      }
    });
  }
});
