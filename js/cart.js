document.addEventListener("DOMContentLoaded", () => {
  const cartButton = document.getElementById("cartButton");
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const clearCart = document.getElementById("clearCart");

  // Lấy giỏ hàng từ localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateCartCount = () => {
    cartCount.textContent = cart.length;
  };

  // Render giỏ hàng
  const renderCart = () => {
    cartItems.innerHTML = "";
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        ${item.name} - ${item.price}₫
        <button class="btn btn-sm btn-danger" data-index="${index}">Xóa</button>
      `;
      cartItems.appendChild(li);
    });

    // Thêm sự kiện xóa sản phẩm
    document.querySelectorAll("#cartItems button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartCount();
      });
    });
  };



  // Xóa toàn bộ giỏ hàng
  clearCart.addEventListener("click", () => {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  });

  // Hiển thị giỏ hàng khi nhấn nút
  cartButton.addEventListener("click", () => {
    renderCart();
    const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
    cartModal.show();
  });

  // Cập nhật số lượng khi tải trang
  updateCartCount();


  
});