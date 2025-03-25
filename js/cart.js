class CartManager {
    constructor() {
        this.cart = [];
        this.cartButton = document.getElementById("cartButton");
        this.cartItems = document.getElementById("cartItems");
        this.cartCount = document.getElementById("cartCount");
        this.clearCartBtn = document.getElementById("clearCart");
        this.cartModal = null;
        
        this.init();
    }

    init() {
        // Kiểm tra các element cần thiết
        if (!this.cartButton || !this.cartItems || !this.cartCount || !this.clearCartBtn) {
            console.error("Không tìm thấy các element cần thiết cho giỏ hàng");
            return;
        }

        // Khởi tạo modal
        const modalElement = document.getElementById("cartModal");
        if (!modalElement) {
            console.error("Không tìm thấy modal giỏ hàng");
            return;
        }
        this.cartModal = new bootstrap.Modal(modalElement);

        // Load giỏ hàng từ localStorage
        this.loadCart();

        // Thêm các event listeners
        this.cartButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.showCart();
        });

        this.clearCartBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.clearCart();
        });

        // Cập nhật số lượng sản phẩm
        this.updateCartCount();
    }

    loadCart() {
        try {
            const cartData = localStorage.getItem("cart");
            if (cartData) {
                this.cart = JSON.parse(cartData);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Lỗi khi đọc giỏ hàng:", error);
            return false;
        }
    }

    saveCart() {
        try {
            localStorage.setItem("cart", JSON.stringify(this.cart));
            this.updateCartCount();
            return true;
        } catch (error) {
            console.error("Lỗi khi lưu giỏ hàng:", error);
            return false;
        }
    }

    updateCartCount() {
        if (this.cartCount) {
            this.cartCount.textContent = this.cart.length;
        }
    }

    addToCart(title, price, img) {
        this.cart.push({ title, price, img });
        this.saveCart();
        this.showNotification(`Đã thêm "${title}" vào giỏ hàng!`);
    }

    removeFromCart(index) {
        this.cart.splice(index, 1);
        this.saveCart();
        this.renderCartItems();
        this.showNotification("Đã xóa sản phẩm khỏi giỏ hàng!");
    }

    clearCart() {
        if (this.cart.length === 0) {
            this.showNotification("Giỏ hàng đã trống!");
            return;
        }

        if (confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?")) {
            this.cart = [];
            this.saveCart();
            this.renderCartItems();
            this.showNotification("Đã xóa toàn bộ giỏ hàng!");
        }
    }

    groupItems() {
        const grouped = {};
        this.cart.forEach(item => {
            if (!grouped[item.title]) {
                grouped[item.title] = {
                    title: item.title,
                    price: item.price,
                    img: item.img,
                    quantity: 1
                };
            } else {
                grouped[item.title].quantity++;
            }
        });
        return Object.values(grouped);
    }

    updateQuantity(index, change) {
        const groupedItems = this.groupItems();
        const item = groupedItems[index];
        
        if (typeof change === 'number') {
            // Nếu change là số, tăng/giảm số lượng
            const newQuantity = item.quantity + change;
            if (newQuantity < 1) return;
            
            // Cập nhật số lượng trong giỏ hàng
            const currentItems = this.cart.filter(cartItem => cartItem.title === item.title);
            if (change > 0) {
                // Thêm sản phẩm mới
                this.cart.push({ title: item.title, price: item.price, img: item.img });
            } else {
                // Xóa một sản phẩm
                const itemIndex = this.cart.findIndex(cartItem => cartItem.title === item.title);
                if (itemIndex !== -1) {
                    this.cart.splice(itemIndex, 1);
                }
            }
        } else {
            // Nếu change là giá trị từ input, cập nhật số lượng mới
            const newQuantity = parseInt(change);
            if (isNaN(newQuantity) || newQuantity < 1) return;
            
            const currentItems = this.cart.filter(cartItem => cartItem.title === item.title);
            const currentQuantity = currentItems.length;
            
            if (newQuantity > currentQuantity) {
                // Thêm sản phẩm
                for (let i = currentQuantity; i < newQuantity; i++) {
                    this.cart.push({ title: item.title, price: item.price, img: item.img });
                }
            } else {
                // Xóa sản phẩm
                for (let i = currentQuantity; i > newQuantity; i--) {
                    const itemIndex = this.cart.findIndex(cartItem => cartItem.title === item.title);
                    if (itemIndex !== -1) {
                        this.cart.splice(itemIndex, 1);
                    }
                }
            }
        }
        
        this.saveCart();
        this.renderCartItems();
    }

    renderCartItems() {
        if (!this.cartItems) return;
        
        this.cartItems.innerHTML = "";

        if (this.cart.length === 0) {
            this.cartItems.innerHTML = `<li class="list-group-item text-center text-muted">Giỏ hàng trống</li>`;
            return;
        }

        const groupedItems = this.groupItems();
        this.cartItems.innerHTML = groupedItems.map((item, index) => `
            <li class="list-group-item">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <img src="${item.img}" alt="${item.title}" class="me-3" style="width: 80px; height: 80px; object-fit: cover;">
                        <div class="flex-grow-1">
                            <h6 class="mb-0">${item.title}</h6>
                            <div class="d-flex justify-content-between align-items-center mt-2">
                                <div class="input-group" style="width: 120px;">
                                    <button class="btn btn-outline-secondary btn-sm" type="button" 
                                            onclick="cartManager.updateQuantity(${index}, -1)">-</button>
                                    <input type="number" class="form-control form-control-sm text-center" 
                                           value="${item.quantity}" min="1" max="99" 
                                           onchange="cartManager.updateQuantity(${index}, this.value)">
                                    <button class="btn btn-outline-secondary btn-sm" type="button" 
                                            onclick="cartManager.updateQuantity(${index}, 1)">+</button>
                                </div>
                                <div class="text-success">${(item.price * item.quantity).toLocaleString()}₫</div>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-danger ms-2" onclick="cartManager.removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        `).join("");
    }

    showCart() {
        if (this.cartModal) {
            this.renderCartItems();
            this.cartModal.show();
        }
    }

    showNotification(message) {
        const notification = document.createElement("div");
        notification.className = "toast-notification";
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    getCartData() {
        return {
            items: this.groupItems(),
            totalAmount: this.calculateTotalAmount()
        };
    }

    calculateTotalAmount() {
        return this.cart.reduce((sum, item) => sum + item.price, 0);
    }
}

// Khởi tạo CartManager khi DOM đã load
let cartManager;
document.addEventListener("DOMContentLoaded", () => {
    cartManager = new CartManager();
});