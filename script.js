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
    let isHovering = false;
    const codeParticles = ['<p>', '</div>', '=>', '{ }', '<html>', '();', 'return', '100%'];

    if (customCursor) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (!isHovering) {
                customCursor.style.left = mouseX + 'px';
                customCursor.style.top = mouseY + 'px';
            }
            
            // Détecte la couleur sous le curseur pour tout le site
            const elementUnder = document.elementFromPoint(mouseX, mouseY);
            if (elementUnder) {
                const bgColor = window.getComputedStyle(elementUnder).backgroundColor;
                if (bgColor === 'rgb(243, 150, 28)' || elementUnder.classList.contains('button') || elementUnder.classList.contains('btn-primary')) {
                    customCursor.classList.add('dark-color');
                } else {
                    customCursor.classList.remove('dark-color');
                }
            }
        });

        // Pluie constante de code (même sans bouger)
        setInterval(() => {
            const particle = document.createElement('div');
            particle.classList.add('cursor-particle');
            
            if (customCursor.classList.contains('dark-color')) {
                particle.classList.add('dark-color');
            }

            // Léger décalage aléatoire pour que ça tombe autour du curseur
            const offsetX = (Math.random() - 0.5) * 20;
            const offsetY = (Math.random() - 0.5) * 20;

            particle.style.left = (mouseX + offsetX) + 'px';
            particle.style.top = (mouseY + offsetY) + 'px';
            particle.innerText = codeParticles[Math.floor(Math.random() * codeParticles.length)];
            
            document.body.appendChild(particle);

            // Nettoyage après l'animation (2.5s)
            setTimeout(() => {
                particle.remove();
            }, 2500);
        }, 300);

        const interactiveElements = document.querySelectorAll('.interactable, a, button, .menu-item');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                isHovering = true;
                const rect = el.getBoundingClientRect();
                
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                customCursor.style.left = centerX + 'px';
                customCursor.style.top = centerY + 'px';
                
                customCursor.style.width = (rect.width + 30) + 'px';
                customCursor.style.height = (rect.height + 20) + 'px';
                
                customCursor.classList.remove('default');
                customCursor.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', (e) => {
                isHovering = false;
                
                customCursor.style.width = '40px';
                customCursor.style.height = '40px';
                customCursor.style.left = mouseX + 'px';
                customCursor.style.top = mouseY + 'px';
                
                customCursor.classList.remove('hover');
                customCursor.classList.add('default');
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
        'Special Combo': 'Un UI Kit complet développé avec React et designé sur Figma.',
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