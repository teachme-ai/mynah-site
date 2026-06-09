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

  const workflowExamples = {
    email: {
      raw: 'tell the team i checked the accessibility flow and the app now opens as a proper mac settings window',
      polished: 'I checked the Accessibility flow. The app now opens Settings as a proper Mac preferences window.'
    },
    chat: {
      raw: 'quick update the notarized build is almost ready and i will send the checksum after upload',
      polished: 'Quick update: the notarized build is almost ready. I will send the checksum after upload.'
    },
    prompt: {
      raw: 'write me a careful launch checklist for a mac app distributed outside the app store',
      polished: 'Write a careful launch checklist for a Mac app distributed outside the App Store.'
    },
    notes: {
      raw: 'remember website needs the privacy route visual the workflow tabs and a better download page',
      polished: 'Website notes: add the privacy route visual, workflow tabs, and a stronger download page.'
    }
  };

  const workflowTabs = document.querySelectorAll('[data-workflow]');
  const workflowRaw = document.querySelector('[data-workflow-raw]');
  const workflowPolished = document.querySelector('[data-workflow-polished]');
  workflowTabs.forEach((button) => {
    button.addEventListener('click', () => {
      const example = workflowExamples[button.dataset.workflow];
      if (!example || !workflowRaw || !workflowPolished) return;
      workflowTabs.forEach((tab) => tab.classList.remove('active'));
      button.classList.add('active');
      workflowRaw.textContent = example.raw;
      workflowPolished.textContent = example.polished;
    });
  });

  // Inject full nav and setup mobile toggle on all pages
  const nav = document.querySelector('.nav-shell');
  if (nav) {
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
        <a href="/download/" class="nav-mobile-cta">Download</a>
      </div>
      <a class="nav-cta" href="/download/">Download</a>
    `;

    // Mark the active page link
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    nav.querySelectorAll('.nav-links a:not(.nav-mobile-cta)').forEach((link) => {
      const href = link.getAttribute('href').replace(/\/$/, '') || '/';
      if (path === href || (href !== '/' && path.startsWith(href))) {
        link.style.color = 'var(--brand)';
        link.style.fontWeight = '800';
      }
    });

    // Create & append hamburger button dynamically
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'hamburger-btn';
    toggleBtn.setAttribute('aria-label', 'Toggle menu');
    toggleBtn.innerHTML = `
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    `;
    nav.appendChild(toggleBtn);

    // Toggle menu events
    toggleBtn.addEventListener('click', () => {
      nav.classList.toggle('mobile-menu-active');
      document.body.classList.toggle('menu-open');
    });

    // Close menu when links are clicked
    nav.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('mobile-menu-active');
        document.body.classList.remove('menu-open');
      });
    });
  }
});
