function toggleNav() {
    document.getElementById('navLinks').classList.toggle('open');
  }
 
  function toggleChip(el) {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('objetHidden').value = el.textContent.trim();
}
 
  function toggleFaq(el) {
    el.classList.toggle('open');
  }
 
  document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const data = new FormData(this);

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString()
  })
  .then(() => {
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('successMsg').style.display = 'block';
  })
  .catch(() => alert('Erreur lors de l\'envoi. Réessaie !'));
});
 
  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));