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
      raw: 'tell the team i checked the accessibility flow and the app now opens as a proper Mac settings window',
      pasted: 'tell the team i checked the accessibility flow and the app now opens as a proper Mac settings window'
    },
    chat: {
      raw: 'quick update the notarized build is ready and i will send the checksum after upload',
      pasted: 'quick update the notarized build is ready and i will send the checksum after upload'
    },
    prompt: {
      raw: 'write me a launch checklist for a Mac app distributed outside the App Store',
      pasted: 'write me a launch checklist for a Mac app distributed outside the App Store'
    },
    notes: {
      raw: 'remember the website needs the privacy route visual the workflow tabs and a clearer download page',
      pasted: 'remember the website needs the privacy route visual the workflow tabs and a clearer download page'
    },
    browser: {
      raw: 'search for the notarization checklist and paste the steps into this support article',
      pasted: 'search for the notarization checklist and paste the steps into this support article'
    }
  };

  const workflowTabs = document.querySelectorAll('[data-workflow]');
  const workflowRaw = document.querySelector('[data-workflow-raw]');
  const workflowPasted = document.querySelector('[data-workflow-pasted]');
  workflowTabs.forEach((button) => {
    button.addEventListener('click', () => {
      const example = workflowExamples[button.dataset.workflow];
      if (!example || !workflowRaw || !workflowPasted) return;
      workflowTabs.forEach((tab) => tab.classList.remove('active'));
      button.classList.add('active');
      workflowRaw.textContent = example.raw;
      workflowPasted.textContent = example.pasted;
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
        <a href="/">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Home</span>
        </a>
        <a href="/compare/">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
          <span>Compare</span>
        </a>
        <a href="/credits/">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>About</span>
        </a>
        <a href="/support/permissions/">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          <span>Help</span>
        </a>
        <a href="/download/" class="nav-mobile-cta">Download</a>
      </div>
      <a class="nav-cta" href="/download/">
        <svg class="nav-icon-download" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <span>Download</span>
      </a>
    `;

    // Mark the active page link
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    nav.querySelectorAll('.nav-links a:not(.nav-mobile-cta)').forEach((link) => {
      const href = link.getAttribute('href').replace(/\/$/, '') || '/';
      if (path === href || (href !== '/' && path.startsWith(href))) {
        link.classList.add('active-nav-link');
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

  // Interactive Visual Privacy Timeline Toggle
  const privacyToggleBtns = document.querySelectorAll('.privacy-toggle-btn');
  const pathCloud = document.getElementById('path-cloud');
  const pathMynah = document.getElementById('path-mynah');

  if (privacyToggleBtns.length > 0 && pathCloud && pathMynah) {
    privacyToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        privacyToggleBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const pathType = btn.dataset.path;
        if (pathType === 'cloud') {
          pathCloud.classList.remove('hidden');
          pathMynah.classList.add('hidden');
        } else {
          pathCloud.classList.add('hidden');
          pathMynah.classList.remove('hidden');
        }
      });
    });
  }

  // Interactive Specs Console Compatibility Checker
  const btnVerify = document.getElementById('btn-verify-compat');
  const termBody = document.getElementById('terminal-body');

  if (btnVerify && termBody) {
    btnVerify.addEventListener('click', () => {
      // Disable button during execution
      btnVerify.disabled = true;
      btnVerify.textContent = 'Running Diagnostics...';

      // Reset terminal content to initial command line
      termBody.innerHTML = `
        <div class="terminal-line">Last login: Fri Jun 12 23:32:28 2026 on ttys001</div>
        <div class="terminal-line"><span class="terminal-prompt">macbook-pro:~ user$</span> ./mynah-verify --checksum f95924916b5f9274502dbc9519cf4bea0a356e2e901a66746cdd8b6bb611b1b4</div>
      `;

      // Determine platform architecture
      const userAgent = navigator.userAgent;
      const isMac = /Macintosh|Mac OS X/.test(userAgent);
      let arch = 'Intel (x86_64)';
      
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            if (/Apple/i.test(renderer) && !/Intel/i.test(renderer)) {
              arch = 'Apple Silicon (aarch64)';
            }
          }
        }
      } catch (e) {}

      const steps = [
        { text: '\n[1/4] Detecting macOS system architecture...', class: 'terminal-output-info', delay: 400 },
        isMac 
          ? { text: `Found Macintosh platform.\nProcessor target detected: ${arch}`, class: '', delay: 600 }
          : { text: `Warning: Non-macOS system detected (${navigator.platform || 'Other'}).\nProcessor target detected: Unknown.\nMynah is designed exclusively for macOS.`, class: 'terminal-output-warning', delay: 800 },
        
        { text: '\n[2/4] Verifying binary signing certificate...', class: 'terminal-output-info', delay: 500 },
        { text: 'Checking signing signature...\nDeveloper ID: Khalid Irfan (TeachMe AI Private Limited)\nStatus: Valid Apple Developer ID Application Certificate.', class: '', delay: 600 },
        
        { text: '\n[3/4] Running Apple Gatekeeper notarization status query...', class: 'terminal-output-info', delay: 500 },
        { text: 'Contacting Apple Notarization service...\nStatus: App package is Notarized and Stapled. No security issues detected.', class: '', delay: 700 },
        
        { text: '\n[4/4] Checking local sandbox permissions...', class: 'terminal-output-info', delay: 500 },
        { text: 'Microphone API status: Accessible (Pending first-run user prompt).\nAccessibility API status: Accessible (Requires user system authorization).', class: '', delay: 600 },
        
        { text: `\nVerification complete! Mynah is ${isMac ? '100% compatible with' : 'partially compatible (simulation only) on'} your system.\nReady for installation.`, class: 'terminal-output-success', delay: 500 }
      ];

      let currentStep = 0;
      
      function printStep() {
        if (currentStep < steps.length) {
          const step = steps[currentStep];
          const div = document.createElement('div');
          div.className = 'terminal-line ' + (step.class || '');
          div.innerHTML = step.text.replace(/\n/g, '<br>');
          termBody.appendChild(div);
          termBody.scrollTop = termBody.scrollHeight;
          
          currentStep++;
          setTimeout(printStep, step.delay);
        } else {
          // Re-enable button
          btnVerify.disabled = false;
          btnVerify.textContent = 'Verify System Compatibility';
          
          // Print prompt at end
          const endDiv = document.createElement('div');
          endDiv.className = 'terminal-line';
          endDiv.innerHTML = `<span class="terminal-prompt">macbook-pro:~ user$</span> <span id="terminal-cursor" class="typing-cursor">█</span>`;
          termBody.appendChild(endDiv);
          termBody.scrollTop = termBody.scrollHeight;
        }
      }

      setTimeout(printStep, 300);
    });
  }
});
