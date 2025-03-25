// js/render-products.js
function renderProducts(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  products.forEach(product => {
    const stars = Array.from({ length: 5 }, (_, i) =>
      `<i class="fa fa-star ${i < product.rating ? 'text-warning' : 'text-muted'}"></i>`
    ).join('');

    // Render sản phẩm
    container.innerHTML += `
      <div class="col-6 col-md-4 col-lg-3">
        <div class="card product-card">
          <img src="${product.img}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <div class="rating">${stars}<span class="small">(${product.reviews})</span></div>
            <p class="card-text small text-muted">${product.sold} đã bán</p>
            <div class="price">
              <span class="text-danger fw-bold">${product.price.toLocaleString()}₫</span>
              <span class="text-muted text-decoration-line-through small">${product.oldPrice.toLocaleString()}₫</span>
              <span class="text-success small">-${Math.round((1 - product.price / product.oldPrice) * 100)}%</span>
            </div>
            <button class="btn btn-outline-success btn-sm mt-2 add-to-cart" 
              data-name="${product.title}" 
              data-price="${product.price}">
              <i class="fa fa-cart-plus"></i> Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    `;
  });
 // Gắn sự kiện cho các nút "Thêm vào giỏ"
 attachAddToCartEvents();
}

// Hàm gắn sự kiện cho các nút "Thêm vào giỏ"
function attachAddToCartEvents() {
  const buttons = document.querySelectorAll('.add-to-cart');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const product = {
        name: button.getAttribute('data-name'),
        price: parseInt(button.getAttribute('data-price'), 10),
      };
      addToCart(product);
      alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
    });
  });
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(topSellingProducts, 'top-selling-products');
  renderProducts(newProducts, 'newProducts');
});
