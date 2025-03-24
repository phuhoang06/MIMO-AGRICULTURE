// Trong script.js
fetch('includes/header.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('body').insertAdjacentHTML('afterbegin', data);
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
        alert("Mở khung chat ở đây nhé!");
    }
});