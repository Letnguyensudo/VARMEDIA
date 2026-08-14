document.querySelectorAll("header, .site-header").forEach((header) => {
    const menuToggle = header.querySelector(".menu-toggle");
    const nav = header.querySelector("nav");

    if (!menuToggle || !nav) return;

    const closeMenu = () => {
        nav.classList.remove("is-open");
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        menuToggle.classList.toggle("is-open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });
});
