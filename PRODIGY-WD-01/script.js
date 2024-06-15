window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#222'; // Change background color when scrolled
    } else {
        navbar.style.backgroundColor = '#333'; // Default background color
    }
});
