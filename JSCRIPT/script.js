const menuOpen = document.querySelector("#menu-open-button");
const menuClose = document.querySelector("#menu-close-button");

menuOpen.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
})
menuClose.addEventListener("click", () => 
    menuOpen.click());



document.addEventListener("DOMContentLoaded", () => {
    // ==========================================================================
    // 1. GESTION DES FLÈCHES DU SLIDER DES CARTES (FONCTIONNE DÉJÀ)
    // ==========================================================================
    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(item => {
        const slider = item.querySelector(".menu-image-slider");
        const arrowLeft = item.querySelector(".arrow-left");
        const arrowRight = item.querySelector(".arrow-right");

        if (arrowRight && slider) {
            arrowRight.addEventListener("click", (e) => {
                e.stopPropagation(); 
                const imageWidth = slider.querySelector(".menu-image").clientWidth;
                slider.scrollBy({ left: imageWidth, behavior: "smooth" });
            });
        }

        if (arrowLeft && slider) {
            arrowLeft.addEventListener("click", (e) => {
                e.stopPropagation(); 
                const imageWidth = slider.querySelector(".menu-image").clientWidth;
                slider.scrollBy({ left: -imageWidth, behavior: "smooth" });
            });
        }
    });

    // ==========================================================================
    // 2. GESTION DU POP-UP COMPACT (OUVERTURE / FERMETURE / SLIDER)
    // ==========================================================================
    const popupOverlay = document.querySelector(".menu-popup-overlay");
    const popupCloseBtn = document.querySelector(".menu-popup-close");
    const popupTitle = document.querySelector(".menu-popup-title");
    const popupMediaZone = document.querySelector(".menu-popup-media");
    const popupTextZone = document.querySelector(".menu-popup-details .text");

    // Liste des données de tes 6 projets avec styles intégrés pour sécuriser le carrousel
    const projectsData = {
        "Hot Beverages": {
            description: "Application complète développée avec Laravel pour la gestion des commandes en temps réel. Intègre un système de rôles et une base de données optimisée.",
            mediaHTML: `
                <button class="slider-arrow popup-arrow-left" style="position:absolute; top:50%; transform:translateY(-50%); left:10px; z-index:10;"><i class="fas fa-chevron-left"></i></button>
                <div class="popup-slider" style="display:flex; width:100%; height:100%; overflow-x:auto; scroll-snap-type:x mandatory; scroll-behavior:smooth;">
                    <img src="assets/hot-beverages.png" class="menu-image" style="width:100%; height:100%; flex-shrink:0; scroll-snap-align:start; object-fit:cover;">
                    <img src="assets/desserts.png" class="menu-image" style="width:100%; height:100%; flex-shrink:0; scroll-snap-align:start; object-fit:cover;">
                    <img src="assets/refreshment.png" class="menu-image" style="width:100%; height:100%; flex-shrink:0; scroll-snap-align:start; object-fit:cover;">
                </div>
                <button class="slider-arrow popup-arrow-right" style="position:absolute; top:50%; transform:translateY(-50%); right:10px; z-index:10;"><i class="fas fa-chevron-right"></i></button>`
        },
        "Special Combo": {
            description: "Interface web moderne conçue en React. Focus complet sur le design UI/UX adaptatif et l'optimisation des performances graphiques.",
            mediaHTML: `
                <button class="slider-arrow popup-arrow-left" style="position:absolute; top:50%; transform:translateY(-50%); left:10px; z-index:10;"><i class="fas fa-chevron-left"></i></button>
                <div class="popup-slider" style="display:flex; width:100%; height:100%; overflow-x:auto; scroll-snap-type:x mandatory; scroll-behavior:smooth;">
                    <img src="assets/special-combo.png" class="menu-image" style="width:100%; height:100%; flex-shrink:0; scroll-snap-align:start; object-fit:cover;">
                    <img src="assets/refreshment.png" class="menu-image" style="width:100%; height:100%; flex-shrink:0; scroll-snap-align:start; object-fit:cover;">
                </div>
                <button class="slider-arrow popup-arrow-right" style="position:absolute; top:50%; transform:translateY(-50%); right:10px; z-index:10;"><i class="fas fa-chevron-right"></i></button>`
        },
        "Refreshment": {
            description: "Projet d'application mobile cross-platform avec Flutter utilisant Provider pour la gestion d'état globale.",
            mediaHTML: `
                <button class="slider-arrow popup-arrow-left" style="position:absolute; top:50%; transform:translateY(-50%); left:10px; z-index:10;"><i class="fas fa-chevron-left"></i></button>
                <div class="popup-slider" style="display:flex; width:100%; height:100%; overflow-x:auto; scroll-snap-type:x mandatory; scroll-behavior:smooth;">
                    <img src="assets/refreshment.png" class="menu-image" style="width:100%; height:100%; flex-shrink:0; scroll-snap-align:start; object-fit:cover;">
                    <img src="assets/desserts.png" class="menu-image" style="width:100%; height:100%; flex-shrink:0; scroll-snap-align:start; object-fit:cover;">
                </div>
                <button class="slider-arrow popup-arrow-right" style="position:absolute; top:50%; transform:translateY(-50%); right:10px; z-index:10;"><i class="fas fa-chevron-right"></i></button>`
        },
        "Desserts": {
            description: "Script d'automatisation et de traitement de données structurées développé en Python.",
            mediaHTML: `
                <button class="slider-arrow popup-arrow-left" style="position:absolute; top:50%; transform:translateY(-50%); left:10px; z-index:10;"><i class="fas fa-chevron-left"></i></button>
                <div class="popup-slider" style="display:flex; width:100%; height:100%; overflow-x:auto; scroll-snap-type:x mandatory; scroll-behavior:smooth;">
                    <img src="assets/desserts.png" class="menu-image" style="width:100%; height:100%; flex-shrink:0; scroll-snap-align:start; object-fit:cover;">
                    <img src="assets/burger-frenchfries.png" class="menu-image" style="width:100%; height:100%; flex-shrink:0; scroll-snap-align:start; object-fit:cover;">
                </div>
                <button class="slider-arrow popup-arrow-right" style="position:absolute; top:50%; transform:translateY(-50%); right:10px; z-index:10;"><i class="fas fa-chevron-right"></i></button>`
        },
        "Cold Beverages": {
            description: "Jeux et fonctionnalités interactives codés entièrement en JavaScript natif (Vanilla JS).",
            mediaHTML: `
                <button class="slider-arrow popup-arrow-left" style="position:absolute; top:50%; transform:translateY(-50%); left:10px; z-index:10;"><i class="fas fa-chevron-left"></i></button>
                <div class="popup-slider" style="display:flex; width:100%; height:100%; overflow-x:auto; scroll-snap-type:x mandatory; scroll-behavior:smooth;">
                    <img src="assets/cold-beverages.png" class="menu-image" style="width:100%; height:100%; flex-shrink:0; scroll-snap-align:start; object-fit:cover;">
                    <img src="assets/hot-beverages.png" class="menu-image" style="width:100%; height:100%; flex-shrink:0; scroll-snap-align:start; object-fit:cover;">
                </div>
                <button class="slider-arrow popup-arrow-right" style="position:absolute; top:50%; transform:translateY(-50%); right:10px; z-index:10;"><i class="fas fa-chevron-right"></i></button>`
        },
        "Burger Frenchfries": {
            description: "Intégration d'une maquette complexe en HTML5 et CSS3 pur, respectant scrupuleusement les standards du Web.",
            mediaHTML: `
                <button class="slider-arrow popup-arrow-left" style="position:absolute; top:50%; transform:translateY(-50%); left:10px; z-index:10;"><i class="fas fa-chevron-left"></i></button>
                <div class="popup-slider" style="display:flex; width:100%; height:100%; overflow-x:auto; scroll-snap-type:x mandatory; scroll-behavior:smooth;">
                    <img src="assets/burger-frenchfries.png" class="menu-image" style="width:100%; height:100%; flex-shrink:0; scroll-snap-align:start; object-fit:cover;">
                    <img src="assets/cold-beverages.png" class="menu-image" style="width:100%; height:100%; flex-shrink:0; scroll-snap-align:start; object-fit:cover;">
                </div>
                <button class="slider-arrow popup-arrow-right" style="position:absolute; top:50%; transform:translateY(-50%); right:10px; z-index:10;"><i class="fas fa-chevron-right"></i></button>`
        }
    };

    // Masquer les scrollbars par injection de style pour que l'ID unique popup-slider reste propre
    const styleTag = document.createElement("style");
    styleTag.textContent = ".popup-slider::-webkit-scrollbar { display: none !important; }";
    document.head.appendChild(styleTag);

    // Ouvrir le pop-up au clic sur une carte
    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            const projectName = item.querySelector(".name").textContent.trim();
            const data = projectsData[projectName];

            if (data) {
                popupTitle.textContent = projectName;
                popupTextZone.textContent = data.description;
                popupMediaZone.innerHTML = data.mediaHTML;

                // On force la zone média à être le parent référent pour le positionnement des flèches
                popupMediaZone.style.position = "relative";

                popupOverlay.classList.add("active");

                // On initialise les flèches du pop-up
                initPopupSlider();
            }
        });
    });

    // Déplacement précis basé sur la largeur réelle du conteneur injecté
    function initPopupSlider() {
        const popupSlider = popupMediaZone.querySelector(".popup-slider");
        const arrowLeft = popupMediaZone.querySelector(".popup-arrow-left");
        const arrowRight = popupMediaZone.querySelector(".popup-arrow-right");

        if (popupSlider && arrowRight && arrowLeft) {
            arrowRight.addEventListener("click", (e) => {
                e.stopPropagation(); 
                const scrollWidth = popupSlider.clientWidth;
                popupSlider.scrollBy({ left: scrollWidth, behavior: "smooth" });
            });

            arrowLeft.addEventListener("click", (e) => {
                e.stopPropagation();
                const scrollWidth = popupSlider.clientWidth;
                popupSlider.scrollBy({ left: -scrollWidth, behavior: "smooth" });
            });
        }
    }

    // Fermer le pop-up au clic sur la croix
    popupCloseBtn.addEventListener("click", () => {
        popupOverlay.classList.remove("active");
    });

    // Fermer le pop-up en double-cliquant n'importe où
    popupOverlay.addEventListener("dblclick", () => {
        popupOverlay.classList.remove("active");
    });
});