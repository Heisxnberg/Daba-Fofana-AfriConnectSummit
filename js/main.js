/* ============================================================
   1. DARK MODE
   Le JS bascule l'attribut [data-theme="dark"] sur <html>
   Le CSS s'occupe du reste grâce aux variables CSS
   Le choix est sauvegardé dans localStorage pour persister
   ============================================================ */
 
/**
 * Applique le thème (clair ou sombre) sur la page
 * @param {string} theme - "dark" ou "light"
 */
function appliquerTheme(theme) {
  /* On met l'attribut data-theme sur la balise html */
  document.documentElement.setAttribute('data-theme', theme);
 
  /* On met à jour l'icône du bouton */
  const boutonTheme = document.getElementById('toggle-theme');
  if (boutonTheme) {
    /* Soleil si on est en dark, lune si on est en light */
    boutonTheme.innerHTML = theme === 'dark'
      ? '<i class="bi bi-sun-fill"></i>'
      : '<i class="bi bi-moon-fill"></i>';
  }
}
 
/**
 * Bascule entre dark et light mode, et sauvegarde dans localStorage
 */
function basculerTheme() {
  /* Lit le thème actuel, "light" par défaut */
  const themeCourant = localStorage.getItem('theme') || 'light';
  const nouveauTheme = themeCourant === 'dark' ? 'light' : 'dark';
 
  /* Sauvegarde et applique */
  localStorage.setItem('theme', nouveauTheme);
  appliquerTheme(nouveauTheme);
}
 
/* Initialisation : applique le thème sauvegardé dès le chargement */
(function initialiserTheme() {
  const themeStocke = localStorage.getItem('theme') || 'light';
  appliquerTheme(themeStocke);
})();
 
/* Attache le clic sur le bouton toggle */
document.addEventListener('DOMContentLoaded', function () {
  const boutonTheme = document.getElementById('toggle-theme');
  if (boutonTheme) {
    boutonTheme.addEventListener('click', basculerTheme);
  }
});
 
 
/* ============================================================
   2. NAVBAR DYNAMIQUE AU SCROLL + MENU HAMBURGER
   ============================================================ */
 
/* Change le style de la navbar après 80px de scroll */
function gererNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
 
  /* Ajoute ou retire la classe "scrolled" */
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
 
/* Écoute le scroll pour la navbar */
window.addEventListener('scroll', gererNavbarScroll, { passive: true });
/* Appel immédiat au cas où la page est chargée en plein milieu */
gererNavbarScroll();
 
/* Hamburger mobile : ouverture/fermeture du menu */
document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('burger');
  const navbar = document.getElementById('navbar');
 
  if (burger && navbar) {
    burger.addEventListener('click', function () {
      /* Toggle la classe "ouvert" sur la navbar */
      navbar.classList.toggle('ouvert');
    });
 
    /* Ferme le menu quand on clique sur un lien */
    const liens = navbar.querySelectorAll('a');
    liens.forEach(function (lien) {
      lien.addEventListener('click', function () {
        navbar.classList.remove('ouvert');
      });
    });
  }
});
 
 
/* ============================================================
   3. BOUTON RETOUR EN HAUT
   Apparaît après 300px de scroll, remonte en douceur
   ============================================================ */
 
function gererBoutonHaut() {
  const bouton = document.getElementById('retour-haut');
  if (!bouton) return;
 
  /* Affiche le bouton après 300px */
  if (window.scrollY > 300) {
    bouton.classList.add('visible');
  } else {
    bouton.classList.remove('visible');
  }
}
 
window.addEventListener('scroll', gererBoutonHaut, { passive: true });
gererBoutonHaut();
 
document.addEventListener('DOMContentLoaded', function () {
  const bouton = document.getElementById('retour-haut');
  if (bouton) {
    bouton.addEventListener('click', function () {
      /* Remonte en douceur vers le haut */
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
 
 
/* ============================================================
   4. ANIMATIONS FADE-IN AU SCROLL
   Utilise IntersectionObserver pour détecter quand un élément
   entre dans le viewport, puis ajoute la classe "visible"
   ============================================================ */
 
document.addEventListener('DOMContentLoaded', function () {
  /* Sélectionne tous les éléments à animer */
  const elements = document.querySelectorAll('.fade-in');
  if (elements.length === 0) return;
 
  /* Crée l'observer */
  const observer = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (entree) {
      if (entree.isIntersecting) {
        /* L'élément est visible : on ajoute la classe */
        entree.target.classList.add('visible');
        /* On arrête d'observer cet élément */
        observer.unobserve(entree.target);
      }
    });
  }, {
    threshold: 0.15   /* Déclenche quand 15% de l'élément est visible */
  });
 
  /* Observe chaque élément */
  elements.forEach(function (el) {
    observer.observe(el);
  });
});
 
 
/* ============================================================
   5. COMPTE À REBOURS EN TEMPS RÉEL
   Calcule le temps restant jusqu'à la date de la conférence
   Met à jour chaque seconde
   ============================================================ */
 
function mettreAJourCompteRebours() {
  /* Date fictive de la conférence : 15 novembre 2026 */
  const dateConference = new Date('2026-11-15T09:00:00');
  const maintenant = new Date();
 
  /* Calcul de la différence en millisecondes */
  const diff = dateConference - maintenant;
 
  /* Si la date est passée, on arrête */
  if (diff <= 0) {
    const conteneur = document.getElementById('compte-rebours');
    if (conteneur) conteneur.innerHTML = '<p style="color:#fff;">La conférence a commencé !</p>';
    return;
  }
 
  /* Conversion en jours, heures, minutes, secondes */
  const jours    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const heures   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secondes = Math.floor((diff % (1000 * 60)) / 1000);
 
  /* Mise à jour des éléments HTML */
  const elJours  = document.getElementById('cr-jours');
  const elHeures = document.getElementById('cr-heures');
  const elMin    = document.getElementById('cr-minutes');
  const elSec    = document.getElementById('cr-secondes');
 
  /* Formatage sur 2 chiffres avec padStart */
  if (elJours)  elJours.textContent  = String(jours).padStart(2, '0');
  if (elHeures) elHeures.textContent = String(heures).padStart(2, '0');
  if (elMin)    elMin.textContent    = String(minutes).padStart(2, '0');
  if (elSec)    elSec.textContent    = String(secondes).padStart(2, '0');
}
 
/* Lance et met à jour toutes les secondes */
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('compte-rebours')) {
    mettreAJourCompteRebours();
    setInterval(mettreAJourCompteRebours, 1000);
  }
});
 
 
/* ============================================================
   6. COMPTEURS ANIMÉS DES CHIFFRES CLÉS
   Les nombres s'incrémentent de 0 à leur valeur cible
   quand ils entrent dans le viewport (IntersectionObserver)
   ============================================================ */
 
/**
 * Anime un nombre de 0 jusqu'à sa valeur cible
 * @param {HTMLElement} element - L'élément dont on change le texte
 * @param {number} cible        - La valeur finale
 * @param {number} duree        - Durée en millisecondes
 */
function animerCompteur(element, cible, duree) {
  let debut = 0;
  /* Nombre de mises à jour par seconde */
  const fps = 60;
  const etapes = Math.ceil((duree / 1000) * fps);
  const increment = cible / etapes;
 
  const intervalle = setInterval(function () {
    debut += increment;
    if (debut >= cible) {
      debut = cible;
      clearInterval(intervalle);
    }
    /* Affiche avec séparateur de milliers */
    element.textContent = Math.floor(debut).toLocaleString('fr-FR');
  }, 1000 / fps);
}
 
document.addEventListener('DOMContentLoaded', function () {
  const compteurs = document.querySelectorAll('.chiffre-nombre[data-cible]');
  if (compteurs.length === 0) return;
 
  const observer = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (entree) {
      if (entree.isIntersecting) {
        const element = entree.target;
        const cible = parseInt(element.getAttribute('data-cible'), 10);
        animerCompteur(element, cible, 2000);
        observer.unobserve(element);
      }
    });
  }, { threshold: 0.3 });
 
  compteurs.forEach(function (el) { observer.observe(el); });
});
 
 
/* ============================================================
   7. ONGLETS DU PROGRAMME (programme.html)
   Clic sur un onglet → affiche le panneau correspondant
   ============================================================ */
 
document.addEventListener('DOMContentLoaded', function () {
  const boutons = document.querySelectorAll('.onglet-btn');
  const panneaux = document.querySelectorAll('.onglet-panneau');
 
  if (boutons.length === 0) return;
 
  boutons.forEach(function (bouton) {
    bouton.addEventListener('click', function () {
      /* Retire "actif" de tous les boutons et panneaux */
      boutons.forEach(function (b) { b.classList.remove('actif'); });
      panneaux.forEach(function (p) { p.classList.remove('actif'); });
 
      /* Ajoute "actif" au bouton cliqué */
      bouton.classList.add('actif');
 
      /* Trouve le panneau correspondant via data-onglet */
      const idCible = bouton.getAttribute('data-onglet');
      const panneau = document.getElementById(idCible);
      if (panneau) panneau.classList.add('actif');
    });
  });
 
  /* Active le premier onglet par défaut */
  if (boutons[0]) boutons[0].click();
});
 
 
/* ============================================================
   8. FILTRAGE DYNAMIQUE DES INTERVENANTS (intervenants.html)
   Clic sur un filtre → affiche/cache les cartes par thématique
   ============================================================ */
 
document.addEventListener('DOMContentLoaded', function () {
  const filtres = document.querySelectorAll('.filtre-btn');
  const cartes  = document.querySelectorAll('.intervenant-carte[data-theme]');
 
  if (filtres.length === 0) return;
 
  filtres.forEach(function (filtre) {
    filtre.addEventListener('click', function () {
      /* Met à jour le bouton actif */
      filtres.forEach(function (f) { f.classList.remove('actif'); });
      filtre.classList.add('actif');
 
      /* Lit la valeur du filtre (ex : "ia-tech", "tous") */
      const valeur = filtre.getAttribute('data-filtre');
 
      /* Affiche ou cache les cartes */
      cartes.forEach(function (carte) {
        if (valeur === 'tous' || carte.getAttribute('data-theme') === valeur) {
          carte.classList.remove('cache');
        } else {
          carte.classList.add('cache');
        }
      });
    });
  });
});
 
 
/* ============================================================
   9. VALIDATION DU FORMULAIRE DE CONTACT (contact.html)
   Vérifie chaque champ et affiche des messages d'erreur
   ============================================================ */
 
/**
 * Affiche une erreur sous un champ
 * @param {HTMLElement} champ   - Le champ en erreur
 * @param {string}      message - Le message à afficher
 */
function afficherErreur(champ, message) {
  champ.classList.add('invalide');
  champ.classList.remove('valide');
 
  /* Trouve ou crée le span d'erreur sous le champ */
  let span = champ.nextElementSibling;
  if (!span || !span.classList.contains('message-erreur')) {
    span = document.createElement('span');
    span.classList.add('message-erreur');
    champ.parentNode.insertBefore(span, champ.nextSibling);
  }
  span.textContent = message;
}
 
/**
 * Marque un champ comme valide
 * @param {HTMLElement} champ - Le champ valide
 */
function afficherSuccesChamp(champ) {
  champ.classList.remove('invalide');
  champ.classList.add('valide');
 
  /* Efface le message d'erreur si existant */
  const span = champ.nextElementSibling;
  if (span && span.classList.contains('message-erreur')) {
    span.textContent = '';
  }
}
 
document.addEventListener('DOMContentLoaded', function () {
  const formulaire = document.getElementById('formulaire-contact');
  if (!formulaire) return;
 
  formulaire.addEventListener('submit', function (e) {
    /* Empêche l'envoi réel du formulaire */
    e.preventDefault();
 
    let estValide = true;
 
    /* --- Vérification du nom complet --- */
    const nom = document.getElementById('champ-nom');
    if (nom && nom.value.trim() === '') {
      afficherErreur(nom, 'Veuillez entrer votre nom complet.');
      estValide = false;
    } else if (nom) {
      afficherSuccesChamp(nom);
    }
 
    /* --- Vérification de l'email (regex) --- */
    const email = document.getElementById('champ-email');
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && email.value.trim() === '') {
      afficherErreur(email, 'Veuillez entrer votre email.');
      estValide = false;
    } else if (email && !regexEmail.test(email.value.trim())) {
      afficherErreur(email, 'Format email invalide (ex: nom@domaine.com)');
      estValide = false;
    } else if (email) {
      afficherSuccesChamp(email);
    }
 
    /* --- Vérification du téléphone (minimum 8 chiffres) --- */
    const tel = document.getElementById('champ-tel');
    const chiffresUniquement = tel ? tel.value.replace(/\D/g, '') : '';
    if (tel && tel.value.trim() === '') {
      afficherErreur(tel, 'Veuillez entrer votre numéro de téléphone.');
      estValide = false;
    } else if (tel && chiffresUniquement.length < 8) {
      afficherErreur(tel, 'Le numéro doit contenir au minimum 8 chiffres.');
      estValide = false;
    } else if (tel) {
      afficherSuccesChamp(tel);
    }
 
    /* --- Vérification du type de participation --- */
    const typeParticipation = document.getElementById('champ-type');
    if (typeParticipation && typeParticipation.value === '') {
      afficherErreur(typeParticipation, 'Veuillez choisir un type de participation.');
      estValide = false;
    } else if (typeParticipation) {
      afficherSuccesChamp(typeParticipation);
    }
 
    /* --- Vérification du pays --- */
    const pays = document.getElementById('champ-pays');
    if (pays && pays.value === '') {
      afficherErreur(pays, 'Veuillez sélectionner votre pays.');
      estValide = false;
    } else if (pays) {
      afficherSuccesChamp(pays);
    }
 
    /* --- Vérification du message (minimum 20 caractères) --- */
    const message = document.getElementById('champ-message');
    if (message && message.value.trim() === '') {
      afficherErreur(message, 'Veuillez écrire un message.');
      estValide = false;
    } else if (message && message.value.trim().length < 20) {
      afficherErreur(message, `Message trop court (${message.value.trim().length}/20 caractères minimum).`);
      estValide = false;
    } else if (message) {
      afficherSuccesChamp(message);
    }
 
    /* --- Si tout est valide : affiche le succès et réinitialise --- */
    if (estValide) {
      const succes = document.getElementById('message-succes');
      if (succes) {
        succes.style.display = 'block';
        succes.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
 
      /* Réinitialise le formulaire après 3 secondes */
      setTimeout(function () {
        formulaire.reset();
        /* Retire les classes valide/invalide */
        formulaire.querySelectorAll('input, select, textarea').forEach(function (el) {
          el.classList.remove('valide', 'invalide');
        });
        if (succes) succes.style.display = 'none';
      }, 3000);
    }
  });
});
 
 
/* ============================================================
   10. ANNÉE DYNAMIQUE DANS LE FOOTER
   Injecte l'année courante dans tous les spans #annee
   ============================================================ */
 
document.addEventListener('DOMContentLoaded', function () {
  /* Sélectionne tous les éléments avec l'id "annee" */
  const spans = document.querySelectorAll('#annee');
  const annee = new Date().getFullYear();
  spans.forEach(function (span) {
    span.textContent = annee;
  });
});