import { translations } from './translations.js';

// Scroll suave para todos os links internos
const links = document.querySelectorAll('a[href^="#"], .navbar a');
links.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Animação fade-in ao rolar
function fadeInOnScroll() {
  const fadeEls = document.querySelectorAll('.fade-in');
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.style.animationDelay = '0.1s';
      el.classList.add('animated');
    }
  });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('DOMContentLoaded', fadeInOnScroll);

// Feedback visual em cards e botões
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mousedown', () => {
    card.style.transform += ' scale(0.97)';
  });
  card.addEventListener('mouseup', () => {
    card.style.transform = card.style.transform.replace(' scale(0.97)', '');
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = card.style.transform.replace(' scale(0.97)', '');
  });
});

// Adiciona fade-in a elementos principais
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('main > section, .card, .frase-destaque').forEach(el => {
    el.classList.add('fade-in');
  });
  fadeInOnScroll();
});

// Fade-in para elementos da seção de vídeo
function fadeInVideoOnScroll() {
  const fadeEls = document.querySelectorAll('.fade-in-video');
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
      el.style.transition = 'opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1)';
    }
  });
}
window.addEventListener('scroll', fadeInVideoOnScroll);
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-in-video').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(40px)';
  });
  fadeInVideoOnScroll();
});

// Função para definir o idioma
export function setLanguage(lang) {
  localStorage.setItem('siteLang', lang);
  document.documentElement.lang = lang;
  const langMap = { 'pt-BR': 'pt', 'en-US': 'en' };
  const translationLang = langMap[lang] || lang;
  import('./translations.js').then(({ translations }) => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[translationLang] && translations[translationLang][key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translations[translationLang][key];
        } else if (el.hasAttribute('alt')) {
          el.alt = translations[translationLang][key];
        } else {
          el.innerHTML = translations[translationLang][key];
        }
      }
    });
    // Atualiza destaque dos botões de idioma
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      const btnLang = btn.getAttribute('aria-label') === 'English' ? 'en-US' : 'pt-BR';
      if (btnLang === lang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  });
}

// Inicialização do seletor de idiomas e botões
window.addEventListener('DOMContentLoaded', () => {
  const languageSelector = document.getElementById('languageSelector');
  const savedLang = localStorage.getItem('siteLang') || 'pt-BR';
  setLanguage(savedLang);
  if (languageSelector) {
    languageSelector.value = savedLang;
    languageSelector.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  }
  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = btn.getAttribute('aria-label') === 'English' ? 'en-US' : 'pt-BR';
      setLanguage(lang);
    });
  });
});
