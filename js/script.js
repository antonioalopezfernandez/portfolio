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

    // Acordeones: cerrados por defecto en todas las resoluciones
    const accordions = Array.from(document.querySelectorAll('details[data-mobile-collapsible]'));

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