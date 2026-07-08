// Menu mobile
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Header sombra ao rolar
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 20 ? '0 6px 20px rgba(0,0,0,.15)' : 'none';
});

// Hero: alterna imagem/vídeos a cada 3s (nunca sobrepostos)
const heroMedia = document.querySelector('.hero-media');
if (heroMedia) {
  const items = Array.from(heroMedia.querySelectorAll('.hero-media-item'));
  let current = items.findIndex(item => item.classList.contains('is-active'));
  if (current === -1) current = 0;

  const activate = (index) => {
    items.forEach((item, i) => {
      const active = i === index;
      item.classList.toggle('is-active', active);
      if (item.tagName === 'VIDEO') {
        if (active) {
          item.currentTime = 0;
          item.play().catch(() => {});
        } else {
          item.pause();
        }
      }
    });
  };

  activate(current);

  setInterval(() => {
    current = (current + 1) % items.length;
    activate(current);
  }, 3000);
}

// Ano no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// Formulário de contato (sem backend integrado)
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = form.nome.value.trim();
  const mensagem = form.mensagem.value.trim();
  const assunto = encodeURIComponent(`Contato via site - ${nome}`);
  const corpo = encodeURIComponent(
    `Nome: ${nome}\nE-mail: ${form.email.value}\nEmpresa: ${form.empresa.value}\n\nMensagem:\n${mensagem}`
  );
  window.location.href = `mailto:ehsconsultoriaeng@gmail.com?subject=${assunto}&body=${corpo}`;
  formNote.textContent = 'Abrindo seu cliente de e-mail para enviar a mensagem...';
});
