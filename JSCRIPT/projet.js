 /* ── DATA — remplace les textes et les src d'images ── */
  const projects = [
    {
      title:  "Affiche Événement Culturel",
      cat:    "Affiche & Flyer",
      desc:   "Conception d'une affiche pour un événement culturel universitaire. Travail sur la hiérarchie typographique, l'équilibre visuel et l'impact couleur pour capter l'attention en un coup d'œil.",
      tools:  ["Photoshop", "Illustrator"],
      color:  "p-blue",
      img: "assets/dev-clair.png"
      
      // img: "images/projet1.jpg"
    },
    {
      title:  "Identité Visuelle — Brand",
      cat:    "Logo & Identité visuelle",
      desc:   "Création d'une identité visuelle complète : logo, palette de couleurs, typographie et charte graphique. Projet réalisé dans le cadre du cours de design graphique en Licence Infographie.",
      tools:  ["Illustrator", "Figma"],
      emoji:  "✦",
      color:  "p-dark",
      // img: "images/projet2.jpg"
    },
    {
      title:  "Mockup App Mobile UI",
      cat:    "Mockup UI",
      desc:   "Reproduction et redesign d'une interface d'application mobile existante sur Figma. Travail sur l'expérience utilisateur, les composants réutilisables et la cohérence du design system.",
      tools:  ["Figma", "Photoshop"],
      emoji:  "📱",
      color:  "p-yellow",
      // img: "images/projet3.jpg"
    }
  ];
 
  let currentIndex = 0;
 
  function openLightbox(index) {
    currentIndex = index;
    renderLightbox();
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
 
  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  }
 
  function closeLightboxOutside(e) {
    if (e.target === document.getElementById('lightbox')) closeLightbox();
  }
 
  function renderLightbox() {
    const p = projects[currentIndex];
    document.getElementById('lbCurrent').textContent = currentIndex + 1;
    document.getElementById('lbTotal').textContent   = projects.length;
    document.getElementById('lbCat').textContent     = p.cat;
    document.getElementById('lbTitle').textContent   = p.title;
    document.getElementById('lbDesc').textContent    = p.desc;
 
    // Tools
    const toolsEl = document.getElementById('lbTools');
    toolsEl.innerHTML = p.tools.map(t => `<span class="lb-tool">${t}</span>`).join('');
 
    // Placeholder (swap for <img> when you have real images)
    const ph = document.getElementById('lbPlaceholder');
    ph.className = `lb-placeholder ${p.color}`;
    ph.innerHTML = `<img src="${p.img}" alt="${p.title}" style="width:100%;height:100%;object-fit:contain;">`;
  }
 
  function nextProject() {
    currentIndex = (currentIndex + 1) % projects.length;
    renderLightbox();
  }
 
  function prevProject() {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    renderLightbox();
  }
 
  // Keyboard nav
  document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowRight') nextProject();
    if (e.key === 'ArrowLeft')  prevProject();
  });
 
  /* ── FILTER ── */
  function filterTiles(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.tile[data-cat]').forEach(tile => {
      if (cat === 'all' || tile.dataset.cat === cat) {
        tile.style.opacity   = '1';
        tile.style.transform = 'scale(1)';
        tile.style.pointerEvents = 'auto';
      } else {
        tile.style.opacity   = '0.15';
        tile.style.transform = 'scale(0.97)';
        tile.style.pointerEvents = 'none';
      }
    });
  }
 
  /* ── CUSTOM CURSOR ── */
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
 
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
 
  function animateCursor() {
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
 
  document.querySelectorAll('a, button, .tile-inner, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); cursorRing.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); cursorRing.classList.remove('hover'); });
  });
 
  /* ── NAV ── */
  function toggleNav() {
    document.getElementById('navLinks').classList.toggle('open');
  }
 
  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('visible'), i * 80);
    });
  }, { threshold: 0.08 });
  reveals.forEach(el => observer.observe(el));