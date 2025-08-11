/* ===============================
   Comportamiento de la interfaz
   -------------------------------
   - Inicializa textos dinámicos (año actual)
   - Gestiona acciones de impresión
   - Prepara acordeones y mejoras de accesibilidad
   - Controla el menú móvil (hamburguesa)
   - Cierra la navegación al seleccionar enlaces en móvil
   Nota: todo va encapsulado en una IIFE para no ensuciar el global.
   =============================== */
// Utilidades mínimas
/* Encapsula toda la lógica para evitar variables globales */
(function () {
    /* Inserta el año actual si existe el marcador en el DOM */
    const yearEl = document.getElementById('current-year');
    if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

    // CTA imprimir
    /* Acción: abre el diálogo de impresión del navegador */
    function printCV() { window.print(); }
    /* Soporta botón de impresión en escritorio y en móvil */
    const printBtn = document.getElementById('printBtn');
    const printBtnMobile = document.getElementById('printBtnMobile');
    if (printBtn) printBtn.addEventListener('click', printCV);
    if (printBtnMobile) printBtnMobile.addEventListener('click', printCV);

    // Acordeones: cerrados por defecto en todas las resoluciones
    /* Selecciona acordeones marcados como colapsables en móvil para poder mejorar su UX */
    const accordions = Array.from(document.querySelectorAll('details[data-mobile-collapsible]'));

    /* Accesibilidad: manejo con teclado de <summary> y foco visible en los acordeones */
    // Mejoras de accesibilidad: teclado para summary
    accordions.forEach(d => {
        const s = d.querySelector('summary');
        if (!s) return;
        s.setAttribute('role', 'button');
        s.setAttribute('aria-expanded', d.hasAttribute('open') ? 'true' : 'false');
        d.addEventListener('toggle', () => {
            s.setAttribute('aria-expanded', d.open ? 'true' : 'false');
        });
    });

    // Lógica para el menú de hamburguesa
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.site-nav nav');

    /* Menú móvil: alterna la visibilidad y bloquea el scroll de fondo */
    hamburgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open'); // Evita scroll del body cuando el menú está abierto
    });

    /* Comportamiento móvil: al navegar, se cierra el menú para volver al contenido */
    // Cierra el menú al hacer clic en un enlace (en móvil)
    const navLinks = document.querySelectorAll('.menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active'); // Oculta el panel de navegación
            document.body.classList.remove('menu-open'); // Restituye el scroll del body
        });
    });
})();