document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll with sticky header offset (100px)
  const offset = 100;

  const scrollToElement = (element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  // Handle local anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      event.preventDefault();
      scrollToElement(targetElement);
    });
  });

  // Handle hash on page load
  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      // Small timeout to let content/styles settle before scrolling
      setTimeout(() => {
        scrollToElement(targetElement);
      }, 200);
    }
  }

  // Inject full nav on sub-pages
  // The homepage has nav-links already; sub-pages don't — detect by absence
  const nav = document.querySelector('.nav-shell');
  const isSubPage = nav && !nav.querySelector('.nav-links');
  if (!isSubPage) return;

  nav.innerHTML = `
    <a class="brand" href="/" aria-label="Mynah home">
      <img src="/public/mynah_icon_highres.png" alt="" class="brand-mark" />
      <span>Mynah</span>
    </a>
    <div class="nav-links">
      <a href="/">Home</a>
      <a href="/compare/">Compare</a>
      <a href="/credits/">About</a>
      <a href="/support/permissions/">Help</a>
    </div>
    <a class="nav-cta" href="/download/">Download</a>
  `;

  // Mark the active page link
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  nav.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href').replace(/\/$/, '') || '/';
    if (path === href || (href !== '/' && path.startsWith(href))) {
      link.style.color = 'var(--brand)';
      link.style.fontWeight = '800';
    }
  });
});
