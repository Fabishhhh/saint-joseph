
// =====================
// HEADER SCROLL
// =====================
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');

    if (!header) return;

    if (window.scrollY > 50) {
        header.style.padding = '5px 0';
        header.style.background = '#ffffffef';
    } else {
        header.style.padding = '10px 0';
        header.style.background = '#ffffff';
    }
});


// =====================
// BURGER MENU
// =====================
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');
const dropdowns = document.querySelectorAll('.has-dropdown');

if (burger && navMenu) {

    // 1. Toggle du menu burger
    burger.addEventListener('click', function() {
        burger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 2. Gestion des Dropdowns sur Mobile (NAVIGATION PROPRE)
    document.querySelectorAll('.has-dropdown > a').forEach(link => {
        link.addEventListener('click', function(e) {
            
            // On s'aligne sur le breakpoint CSS de 1260px
            if (window.innerWidth <= 1260) {
                e.preventDefault();
                e.stopPropagation();

                const parent = this.parentElement;

                // On ferme les autres dropdowns pour n'en laisser qu'un ouvert
                dropdowns.forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('open');
                    }
                });

                // On bascule l'état ouvert du parent actuel
                parent.classList.toggle('open');
            }
        });
    });

    // 3. Fermeture intelligente
    // On ne ferme le menu burger QUE si on clique sur un lien final (pas un parent de dropdown)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            
            const isParent = this.parentElement.classList.contains('has-dropdown');
            
            // Sur mobile, si c'est un parent, on ne ferme pas le burger (on veut voir le sous-menu)
            if (window.innerWidth <= 1260 && isParent) {
                return;
            }

            // Sinon, on ferme tout
            burger.classList.remove('active');
            navMenu.classList.remove('active');
            dropdowns.forEach(d => d.classList.remove('open'));
        });
    });


// =====================
// COUNTERS ANIMATION
// =====================
const counters = document.querySelectorAll('.counter');

const observer = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

        if (entry.isIntersecting) {
            const counter = entry.target;

            function updateCount() {
                const target = parseInt(counter.getAttribute('data-target'));
                const hasPercent = counter.innerText.includes('%');
                const current = parseInt(counter.innerText.replace('%','')) || 0;

                const increment = Math.ceil(target / 100);

                if (current < target) {
                    let value = current + increment;

                    if (value > target) value = target;

                    counter.innerText = value + (hasPercent ? '%' : '');

                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + (hasPercent ? '%' : '');
                }
            }

            updateCount();
            observer.unobserve(counter);
        }

    });

}, {
    threshold: 0.5
});

counters.forEach(function(counter) {
    observer.observe(counter);
});
}