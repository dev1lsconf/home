document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    const navLinks = document.querySelectorAll('.nav-mobile .nav-link'); // Links dentro del menú móvil

    // Toggle del menú móvil al hacer clic en el botón
    navToggle.addEventListener('click', () => {
        navMobile.classList.toggle('active');
        navToggle.classList.toggle('active'); // Para animar el icono de hamburguesa
        // Opcional: Bloquear scroll del body cuando el menú está abierto
        // document.body.classList.toggle('no-scroll');
    });

    // Cerrar el menú móvil al hacer clic en un enlace (para navegación fluida)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMobile.classList.remove('active');
            navToggle.classList.remove('active');
            // document.body.classList.remove('no-scroll');
        });
    });

    // Opcional: Smooth scroll para enlaces internos (requiere ajuste si usas overflow)
    // const internalLinks = document.querySelectorAll('a[href^="#"]');
    // internalLinks.forEach(link => {
    //     link.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         document.querySelector(this.getAttribute('href')).scrollIntoView({
    //             behavior: 'smooth'
    //         });
    //     });
    // });

});