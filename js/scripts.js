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