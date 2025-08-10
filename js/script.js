// Utilidades mínimas
(function () {
    const yearEl = document.getElementById('current-year');
    if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

    // CTA imprimir
    function printCV() { window.print(); }
    const printBtn = document.getElementById('printBtn');
    const printBtnMobile = document.getElementById('printBtnMobile');
    if (printBtn) printBtn.addEventListener('click', printCV);
    if (printBtnMobile) printBtnMobile.addEventListener('click', printCV);

    // Acordeones: abiertos por defecto en escritorio, colapsados en móvil
    const accordions = Array.from(document.querySelectorAll('details[data-mobile-collapsible]'));
    const setAccordionMode = () => {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        accordions.forEach(d => {
            if (isMobile) {
                d.removeAttribute('open');
            } else {
                d.setAttribute('open', '');
            }
        });
    };
    setAccordionMode();
    window.addEventListener('resize', setAccordionMode, { passive: true });

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
})();