
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

if (burger && navMenu) {

    burger.addEventListener('click', function() {
        burger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // fermer le menu quand on clique sur un lien normal
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            burger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}


// =====================
// DROPDOWN MOBILE FIX (IMPORTANT)
// =====================
document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', function(e) {

        if (window.innerWidth <= 1160) {
            e.preventDefault(); // empêche le "#"
            this.parentElement.classList.toggle('open');
        }

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