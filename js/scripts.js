// Trong script.js
fetch('includes/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
        // Sau khi header đã được chèn, khởi tạo cartManager:
        cartManager = new CartManager();
    });


fetch('includes/footer.html')
    .then(response => response.text())
    .then(data=>{
        document.querySelector('body').insertAdjacentHTML('beforeend',data);
    })

// Load chat widget
fetch('includes/chat-widget.html')
    .then(res => res.text())
    .then(html => {
        document.body.insertAdjacentHTML('beforeend', html);
    });

document.addEventListener('click', function(e) {
    if (e.target.closest('#chat-btn')) {
    
    }
});