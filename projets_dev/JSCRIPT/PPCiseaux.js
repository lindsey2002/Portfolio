 // ─── Navigation ───────────────────────────────────────────────
        function goToGame() {
            document.getElementById('screen-menu').style.display = 'none';
            const g = document.getElementById('screen-game');
            g.style.display = 'flex';
            g.style.animation = 'none';
            void g.offsetWidth;
            g.style.animation = 'fadeIn 0.45s ease';
        }
 
        function goToMenu() {
            document.getElementById('screen-game').style.display = 'none';
            const m = document.getElementById('screen-menu');
            m.style.display = 'flex';
            m.style.animation = 'none';
            void m.offsetWidth;
            m.style.animation = 'fadeIn 0.45s ease';
        }
 
        // ─── Game logic (ton code, adapté) ────────────────────────────
        const emojis = { pierre: '✊', papier: '🖐️', ciseaux: '✌️' };
        let wins = 0, draws = 0, losses = 0, score = 0;
 
        function jouer(choixUtilisateur) {
            // Choix ordi
            const liste = ['pierre', 'papier', 'ciseaux'];
            const choixOrdi = liste[Math.floor(Math.random() * 3)];
 
            // Afficher choix
            const divUser = document.getElementById('choix-utilisateur');
            const divOrdi = document.getElementById('choix-ordinateur');
 
            divUser.classList.remove('active');
            divOrdi.classList.remove('active');
 
            void divUser.offsetWidth; // reflow
 
            divUser.textContent = emojis[choixUtilisateur];
            divOrdi.textContent = emojis[choixOrdi];
            divUser.classList.add('active');
            divOrdi.classList.add('active');
 
            // Résultat
            let resultat;
            if (choixUtilisateur === choixOrdi) {
                resultat = 'egalite';
                draws++; score += 1;
            } else if (
                (choixUtilisateur === 'pierre'  && choixOrdi === 'ciseaux') ||
                (choixUtilisateur === 'ciseaux' && choixOrdi === 'papier')  ||
                (choixUtilisateur === 'papier'  && choixOrdi === 'pierre')
            ) {
                resultat = 'gagné';
                wins++; score += 3;
            } else {
                resultat = 'perdu';
                losses++;
            }
 
            const labels = { gagné: '🎉 Gagné !', perdu: '💀 Perdu !', egalite: '🤝 Égalité !' };
 
            const r = document.getElementById('resultats');
            r.classList.remove('show', 'gagné', 'perdu', 'egalite');
            void r.offsetWidth;
            r.textContent = labels[resultat];
            r.className = 'result-text ' + resultat;
            requestAnimationFrame(() => r.classList.add('show'));
 
            // Score
            document.getElementById('cnt-win').textContent  = wins + (wins <= 1 ? ' Victoire' : ' Victoires');
            document.getElementById('cnt-draw').textContent = draws + (draws <= 1 ? ' Nul' : ' Nuls');
            document.getElementById('cnt-lose').textContent = losses + (losses <= 1 ? ' Défaite' : ' Défaites');
            document.getElementById('score-total').textContent = score + ' pts';
        }