// Changement de style au scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '5px 0';
        header.style.background = '#ffffffef';
    } else {
        header.style.padding = '10px 0';
        header.style.background = '#ffffff';
    }
});

// On pourrait ajouter ici la logique pour un menu burger mobile