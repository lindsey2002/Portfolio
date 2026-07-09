document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. GESTION DU MENU MOBILE
    // ==========================================================================
    const menuOpen = document.querySelector("#menu-open-button");
    const menuClose = document.querySelector("#menu-close-button");

    if(menuOpen) {
        menuOpen.addEventListener("click", () => {
            document.body.classList.toggle("show-mobile-menu");
        });
    }
    
    if(menuClose) {
        menuClose.addEventListener("click", () => {
            document.body.classList.remove("show-mobile-menu");
        });
    }

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            document.body.classList.remove("show-mobile-menu");
        });
    });

    // ==========================================================================
    // 2. CURSEUR PERSONNALISÉ & PLUIE DE CODE
    // ==========================================================================
    const customCursor = document.getElementById('custom-cursor');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    const codeParticles = ['<p>', '</div>', '=>', '{ }', '<html>', '();', 'return', '100%'];

    // --- Helpers ---
    function spawnParticle(x, y, isDark) {
        const particle = document.createElement('div');
        particle.classList.add('cursor-particle');
        if (isDark) particle.classList.add('dark-color');
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        particle.style.left = (x + offsetX) + 'px';
        particle.style.top  = (y + offsetY) + 'px';
        particle.innerText = codeParticles[Math.floor(Math.random() * codeParticles.length)];
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 2500);
    }

    function updateCursorColor() {
        const el = document.elementFromPoint(mouseX, mouseY);
        if (el) {
            const bg = window.getComputedStyle(el).backgroundColor;
            const isOrange = bg === 'rgb(243, 150, 28)';
            customCursor.classList.toggle('dark-color', isOrange);
        }
    }

    function shrinkCursor() {
        customCursor.style.width  = '40px';
        customCursor.style.height = '40px';
        customCursor.style.left   = mouseX + 'px';
        customCursor.style.top    = mouseY + 'px';
        customCursor.classList.remove('hover');
        customCursor.classList.add('default');
    }

    if (customCursor) {
        // --- Souris ---
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            updateCursorColor();
            // Toujours repositionner (même en hover, on met à jour mouseX/Y
            // mais on ne bouge le curseur que hors hover)
            if (!customCursor.classList.contains('hover')) {
                customCursor.style.left = mouseX + 'px';
                customCursor.style.top  = mouseY + 'px';
            }
        });

        // Pluie constante (souris)
        setInterval(() => {
            const isDark = customCursor.classList.contains('dark-color');
            spawnParticle(mouseX, mouseY, isDark);
        }, 300);

        // --- Touch (mobile) ---
        document.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            mouseX = touch.clientX;
            mouseY = touch.clientY;
            customCursor.style.left = mouseX + 'px';
            customCursor.style.top  = mouseY + 'px';
            updateCursorColor();
        }, { passive: true });

        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            mouseX = touch.clientX;
            mouseY = touch.clientY;
            customCursor.style.left = mouseX + 'px';
            customCursor.style.top  = mouseY + 'px';
            // Particule au tap
            const isDark = customCursor.classList.contains('dark-color');
            for (let i = 0; i < 3; i++) spawnParticle(mouseX, mouseY, isDark);
        }, { passive: true });

        // --- Hover sur éléments interactifs ---
        const interactiveElements = document.querySelectorAll('.interactable, a, button, .menu-item');

        // Observer de redimensionnement pour que le curseur suive quand on scrolle
        const recalcIfHovered = () => {
            const hovered = document.querySelector(':hover .interactable, a:hover, button:hover, .menu-item:hover');
            if (!hovered) shrinkCursor();
        };
        window.addEventListener('scroll', recalcIfHovered, { passive: true });

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width  / 2;
                const centerY = rect.top  + rect.height / 2;

                customCursor.style.left   = centerX + 'px';
                customCursor.style.top    = centerY + 'px';
                customCursor.style.width  = (rect.width  + 30) + 'px';
                customCursor.style.height = (rect.height + 20) + 'px';

                customCursor.classList.remove('default');
                customCursor.classList.add('hover');
            });

            // mouseleave = retour immédiat, sans clic nécessaire
            el.addEventListener('mouseleave', () => {
                shrinkCursor();
            });
        });

        customCursor.classList.add('default');
    }


    // ==========================================================================
    // 3. FILTRES DE PROJETS
    // ==========================================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.menu-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ==========================================================================
    // 4. LOGIQUE DES PROJETS (SLIDER INTERNE + POPUP)
    // ==========================================================================
    const menuItems = document.querySelectorAll('.menu-item');
    const popupOverlay = document.querySelector('.menu-popup-overlay');
    const popupClose = document.querySelector('.menu-popup-close');
    const popupMedia = document.querySelector('.menu-popup-media');
    const popupTitle = document.querySelector('.menu-popup-title');
    const popupText = document.querySelector('.menu-popup-details .text');

    // Descriptions simulées pour le popup
    const descriptions = {
        'Hot Beverages': 'Un système complet de gestion de commandes réalisé avec Laravel.',
        'Portrait side': 'Magnifique portrait pour rappeler que la nature et l\'homme ne font qu\'un .',
        'Bien mangé': 'Une superbe affiche pour rappeler l\'importance de la nourriture dans notre vie.  Est designé sur Photoshop.',
        'Ardoise graphique': 'Acheté des ardoises graphique aussi bien utile aux adultes qu\'aux enfants, pour la prise de notes ou s exercer .',
        'Refreshment': 'Application mobile cross-platform codée en Flutter.',
        'Desserts': 'Scripts d\'automatisation Python pour l\'analyse de données.',
        'Brand Identity': 'Refonte complète de l\'identité visuelle et charte graphique.',
        'Burger Frenchfries': 'Maquettes interactives et prototypage UX avancé.'
    };

    menuItems.forEach(item => {
        // Slider interne
        const slider = item.querySelector('.menu-image-slider');
        const arrowLeft = item.querySelector('.arrow-left');
        const arrowRight = item.querySelector('.arrow-right');

        if (slider && arrowLeft && arrowRight) {
            arrowLeft.addEventListener('click', (e) => {
                e.stopPropagation(); // Évite d'ouvrir le popup
                slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
            });
            arrowRight.addEventListener('click', (e) => {
                e.stopPropagation();
                slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
            });
        }

        // Ouverture du Popup
        item.addEventListener('click', () => {
            const name = item.querySelector('.name').innerText;
            const images = item.querySelectorAll('.menu-image');
            
            popupTitle.innerText = name;
            popupText.innerText = descriptions[name] || 'Détails du projet...';
            
            popupMedia.innerHTML = '';
            images.forEach(img => {
                const clonedImg = img.cloneNode(true);
                popupMedia.appendChild(clonedImg);
            });

            popupOverlay.classList.add('active');
        });
    });

    if (popupClose) {
        popupClose.addEventListener('click', () => {
            popupOverlay.classList.remove('active');
        });
    }
    
    if (popupOverlay) {
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                popupOverlay.classList.remove('active');
            }
        });
    }

    // ==========================================================================
    // 5. CONTACT BOUTON (SMART PHONE)
    // ==========================================================================
    const phoneBtn = document.getElementById('phone-btn');
    if (phoneBtn) {
        phoneBtn.addEventListener('click', () => {
            const phoneNumber = "221770918916";
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isMobile) {
                window.location.href = `tel:+${phoneNumber}`;
            } else {
                window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}`, '_blank');
            }
        });
    }

    // ==========================================================================
    // 6. ANIMATIONS AU SCROLL
    // ==========================================================================
    const scrollElements = document.querySelectorAll('.scroll-anim');

    const elementInView = (el, dividend = 1.1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.1)) {
                el.classList.add('show');
            }
        });
    }

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    handleScrollAnimation();
});