function initSite() {
    document.getElementById("current-year").textContent = new Date().getFullYear();
}

initSite();

document.addEventListener("DOMContentLoaded", () => {
    try {
        const isSmall = window.matchMedia && window.matchMedia("(max-width: 600px)").matches;
        if (!isSmall) return;
        const expSection = document.querySelector("#experiencia");
        if (!expSection) return;

        // Avoid running twice
        if (expSection.dataset.accordionized === "1") return;

        const items = Array.from(expSection.querySelectorAll(".main__section-item"));
        items.forEach(item => {
            const titleEl = item.querySelector(".main__section-item-title");
            const metaEl = item.querySelector(".main__section-item-meta");
            const listEl = item.querySelector(".main__section-item-list");

            if (!titleEl || !listEl) return;

            const details = document.createElement("details");
            const summary = document.createElement("summary");
            const strong = document.createElement("strong");
            strong.textContent = titleEl.textContent.trim();
            summary.appendChild(strong);

            if (metaEl) {
                const sep = document.createTextNode(" — ");
                const span = document.createElement("span");
                span.textContent = metaEl.textContent.trim();
                summary.appendChild(sep);
                summary.appendChild(span);
            }

            details.appendChild(summary);
            // Move the list into details
            details.appendChild(listEl);

            // Replace original item with details
            item.parentNode.replaceChild(details, item);
        });

        expSection.dataset.accordionized = "1";
    } catch (e) {
        // Silently ignore
        console && console.warn && console.warn("Accordion enhancement failed:", e);
    }
});