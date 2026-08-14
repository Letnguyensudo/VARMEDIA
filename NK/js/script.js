const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const exploreWorkButton = document.querySelector("#explore-work");
const portfolioModal = document.querySelector("#portfolio-modal");
const modalCloseButton = document.querySelector("#modal-close");
const viewPortfolioLink = document.querySelector("#view-portfolio");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", () => {
        formStatus.textContent = "Sending your request...";
    });
}

if (exploreWorkButton && portfolioModal && modalCloseButton) {
    const closePortfolioModal = ({ returnFocus = true } = {}) => {
        portfolioModal.classList.remove("is-open");

        window.setTimeout(() => {
            portfolioModal.hidden = true;
            document.body.classList.remove("modal-open");

            if (returnFocus) {
                exploreWorkButton.focus();
            }
        }, 280);
    };

    exploreWorkButton.addEventListener("click", () => {
        portfolioModal.hidden = false;
        document.body.classList.add("modal-open");

        window.requestAnimationFrame(() => {
            portfolioModal.classList.add("is-open");
            modalCloseButton.focus();
        });
    });

    modalCloseButton.addEventListener("click", () => closePortfolioModal());

    portfolioModal.addEventListener("click", (event) => {
        if (event.target === portfolioModal) {
            closePortfolioModal();
        }
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !portfolioModal.hidden) {
            closePortfolioModal();
        }
    });

    if (viewPortfolioLink) {
        viewPortfolioLink.addEventListener("click", () => {
            closePortfolioModal({ returnFocus: false });
        });
    }
}
