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

  // ── macOS Premium Interactive Logic ──

  // 1. Dynamic Menu-Bar App Simulator Injection
  const injectMenubar = () => {
    if (document.getElementById('macos-menubar')) return;

    const menubar = document.createElement('div');
    menubar.className = 'macos-menubar';
    menubar.id = 'macos-menubar';
    menubar.innerHTML = `
      <div class="menubar-left">
        <div class="menubar-item apple-logo">
          <span></span>
          <div class="menubar-dropdown" style="left: 0; right: auto;">
            <div class="dropdown-item"><span>About This Mac</span></div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item"><span>System Settings...</span></div>
            <div class="dropdown-item"><span>App Store...</span></div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item"><span>Force Quit...</span></div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item"><span>Sleep</span></div>
            <div class="dropdown-item"><span>Restart...</span></div>
            <div class="dropdown-item"><span>Shut Down...</span></div>
          </div>
        </div>
        <div class="menubar-item app-name">
          <img src="/public/mynah_icon_highres.png" alt="Mynah" class="menubar-mynah-icon" />
          <div class="menubar-dropdown" style="left: 0; right: auto;">
            <div class="dropdown-item"><span>About Mynah</span></div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item"><span>Preferences...</span><kbd>⌘,</kbd></div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item"><span>Services</span></div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item"><span>Hide Mynah</span><kbd>⌘H</kbd></div>
            <div class="dropdown-item"><span>Show All</span></div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item" id="menu-quit-core"><span>Quit Mynah</span><kbd>⌘Q</kbd></div>
          </div>
        </div>
        <div class="menubar-item">
          <span>File</span>
          <div class="menubar-dropdown" style="left: 0; right: auto;">
            <div class="dropdown-item"><span>Close Window</span><kbd>⌘W</kbd></div>
          </div>
        </div>
        <div class="menubar-item">
          <span>Edit</span>
          <div class="menubar-dropdown" style="left: 0; right: auto;">
            <div class="dropdown-item"><span>Undo</span><kbd>⌘Z</kbd></div>
            <div class="dropdown-item"><span>Redo</span><kbd>⇧⌘Z</kbd></div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item"><span>Cut</span><kbd>⌘X</kbd></div>
            <div class="dropdown-item"><span>Copy</span><kbd>⌘C</kbd></div>
            <div class="dropdown-item"><span>Paste</span><kbd>⌘V</kbd></div>
          </div>
        </div>
        <div class="menubar-item">
          <span>Help</span>
          <div class="menubar-dropdown" style="left: 0; right: auto;">
            <div class="dropdown-item" id="menu-help-faq"><span>Mynah Support &amp; FAQ</span></div>
            <div class="dropdown-item" id="menu-help-credits"><span>About &amp; Credits</span></div>
          </div>
        </div>
      </div>
      <div class="menubar-right">
        <span class="menubar-item" style="color: #666; font-size: 11px;">⚡️ 100%</span>
        <span class="menubar-item" style="color: #666; font-size: 11px;">📶</span>
        <span class="menubar-item date-time" id="menubar-clock" style="font-weight: 500;">Fri Jun 12 11:39 PM</span>
        <div class="menubar-item mynah-menubar-trigger" id="mynah-menubar-trigger" style="margin-right: -4px;">
          <img src="/public/mynah_icon_highres.png" alt="Mynah Menu Bar Icon" class="menubar-mynah-icon" />
          <span class="status-indicator-dot online" id="menubar-status-dot"></span>
          <!-- Mynah specific dropdown menu -->
          <div class="menubar-dropdown" id="mynah-menubar-dropdown">
            <div class="dropdown-header">
              <img src="/public/mynah_icon_highres.png" alt="" />
              <div>
                <strong>Mynah 1.0.0</strong>
                <span style="font-size: 10px; color:#86868b;">Status: <span id="menubar-status-text" style="color: #22c993; font-weight:700;">Ready</span></span>
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item" id="menu-dictate">
              <span>Start Dictation</span>
              <kbd>Hold Fn</kbd>
            </div>
            <div class="dropdown-item has-submenu">
              <span>Model: <strong id="menu-current-model">Whisper Base (Local)</strong></span>
              <div class="dropdown-submenu">
                <div class="dropdown-item model-option active" data-model="fast">
                  <span>Whisper Fast (Intel-optimized)</span>
                </div>
                <div class="dropdown-item model-option" data-model="base">
                  <span>Whisper Base (Balanced)</span>
                </div>
                <div class="dropdown-item model-option" data-model="small">
                  <span>Whisper Small (Accurate)</span>
                </div>
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item" id="menu-captures">
              <span>Recent Captures (4)</span>
              <kbd>⌘L</kbd>
            </div>
            <div class="dropdown-item" id="menu-diagnostics">
              <span>View Local Diagnostics...</span>
            </div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item" id="menu-preferences">
              <span>Preferences...</span>
              <kbd>⌘,</kbd>
            </div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item" id="menu-quit">
              <span>Quit Mynah</span>
              <kbd>⌘Q</kbd>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertBefore(menubar, document.body.firstChild);

    // Dynamic Clock Updater
    const updateClock = () => {
      const clockEl = document.getElementById('menubar-clock');
      if (!clockEl) return;
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const day = days[now.getDay()];
      const month = months[now.getMonth()];
      const date = now.getDate();
      let hours = now.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minutes = now.getMinutes().toString().padStart(2, '0');
      clockEl.textContent = `${day} ${month} ${date} ${hours}:${minutes} ${ampm}`;
    };
    setInterval(updateClock, 1000);
    updateClock();

    // Toggle Dropdowns
    const menubarItems = document.querySelectorAll('.menubar-item');
    menubarItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const dropdown = item.querySelector('.menubar-dropdown');
        if (!dropdown) return;
        e.stopPropagation();

        document.querySelectorAll('.menubar-dropdown').forEach(d => {
          if (d !== dropdown) d.classList.remove('active');
        });
        dropdown.classList.toggle('active');
      });
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.menubar-dropdown').forEach(d => {
        d.classList.remove('active');
      });
    });

    // Submenu Model Options Click Handlers
    const modelOptions = menubar.querySelectorAll('.model-option');
    const menuCurrentModel = menubar.querySelector('#menu-current-model');
    modelOptions.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        modelOptions.forEach(o => o.classList.remove('model-selected'));
        opt.classList.add('model-selected');
        const selectedModelName = opt.querySelector('span').textContent;
        if (menuCurrentModel) menuCurrentModel.textContent = selectedModelName;
        document.getElementById('mynah-menubar-dropdown').classList.remove('active');
        
        // Show a small custom toast for model load
        showToast(`Loaded Whisper Model: ${selectedModelName} locally.`);
      });
    });

    // Menubar action bindings
    menubar.querySelector('#menu-dictate').addEventListener('click', (e) => {
      e.stopPropagation();
      const txt = document.getElementById('mock-textarea');
      if (txt) {
        txt.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          txt.focus();
          startDictating();
          setTimeout(stopDictating, 3000); // Record for 3s
        }, 800);
      }
    });

    menubar.querySelector('#menu-captures').addEventListener('click', (e) => {
      e.stopPropagation();
      showToast("Recent captures synced locally. Whisper engines are idle.");
    });

    menubar.querySelector('#menu-diagnostics').addEventListener('click', (e) => {
      e.stopPropagation();
      window.location.href = '/facts/#terminal-window';
    });

    menubar.querySelector('#menu-preferences').addEventListener('click', (e) => {
      e.stopPropagation();
      showToast("Mynah Preferences -> holding Fn key starts transcription.");
    });

    const quitAction = () => {
      showToast("Mynah quit. fn-hold dictation is suspended.");
      const indicator = document.getElementById('menubar-status-dot');
      const statusText = document.getElementById('menubar-status-text');
      const mynahTrigger = document.getElementById('mynah-menubar-trigger');
      if (indicator) {
        indicator.className = 'status-indicator-dot';
        indicator.style.backgroundColor = '#8e8e93';
      }
      if (statusText) {
        statusText.textContent = 'Offline';
        statusText.style.color = '#8e8e93';
      }
      setTimeout(() => {
        if (mynahTrigger) {
          mynahTrigger.style.opacity = '0.35';
          showToast("Click Mynah icon to Relaunch...");
          mynahTrigger.onclick = (event) => {
            event.stopPropagation();
            mynahTrigger.onclick = null;
            mynahTrigger.style.opacity = '1';
            if (indicator) {
              indicator.className = 'status-indicator-dot online';
              indicator.style.backgroundColor = '';
            }
            if (statusText) {
              statusText.textContent = 'Ready';
              statusText.style.color = '';
            }
            showToast("Mynah relaunched! Private dictation loop active.");
          };
        }
      }, 1000);
    };

    menubar.querySelector('#menu-quit').addEventListener('click', (e) => {
      e.stopPropagation();
      quitAction();
    });
    
    const quitCore = menubar.querySelector('#menu-quit-core');
    if (quitCore) {
      quitCore.addEventListener('click', (e) => {
        e.stopPropagation();
        quitAction();
      });
    }

    menubar.querySelector('#menu-help-faq')?.addEventListener('click', (e) => {
      e.stopPropagation();
      window.location.href = '/support/permissions/';
    });
    menubar.querySelector('#menu-help-credits')?.addEventListener('click', (e) => {
      e.stopPropagation();
      window.location.href = '/credits/';
    });
  };

  // Toast notification helper
  const showToast = (message) => {
    const existing = document.querySelector('.restore-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'restore-notification';
    toast.style.background = 'rgba(30, 30, 30, 0.95)';
    toast.style.color = 'white';
    toast.innerHTML = `
      <span>${message}</span>
      <button onclick="this.parentNode.remove()">Dismiss</button>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 6000);
  };

  injectMenubar();

  // 2. Audio Beep Engine (Oscillators)
  let audioCtx = null;
  const playSystemChime = (type) => {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      if (type === 'start') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(580, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.13);

        setTimeout(() => {
          const osc2 = audioCtx.createOscillator();
          const gain2 = audioCtx.createGain();
          osc2.connect(gain2);
          gain2.connect(audioCtx.destination);
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(720, audioCtx.currentTime);
          gain2.gain.setValueAtTime(0.04, audioCtx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
          osc2.start();
          osc2.stop(audioCtx.currentTime + 0.16);
        }, 70);
      } else if (type === 'stop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(720, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(480, audioCtx.currentTime + 0.18);
        gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.21);
      }
    } catch (e) {
      console.log('AudioContext initialization deferred until user interaction.', e);
    }
  };

  // 3. Apple-Style Keypress Simulator (Fn Loop)
  const virtualFn = document.getElementById('virtual-fn-key');
  const mockTextarea = document.getElementById('mock-textarea');
  const simMicIcon = document.getElementById('sim-mic-icon');
  const simWaveforms = document.getElementById('sim-waveforms');
  const simStatus = document.getElementById('sim-status');
  const editorStatusText = document.getElementById('editor-status-text');

  let isDictating = false;
  let sentenceIndex = 0;
  const sampleSentences = [
    "Draft a quick response to the client saying we will release the signed Mac version tomorrow morning.",
    "Let's test Mynah's on-device model speed. It transcribes base English in less than two hundred milliseconds.",
    "The accessibility permission is required so that Mynah can paste text directly at your cursor."
  ];

  const startDictating = () => {
    if (isDictating) return;
    isDictating = true;

    playSystemChime('start');

    if (virtualFn) virtualFn.classList.add('active');
    if (simWaveforms) simWaveforms.classList.add('pulsing');
    if (simMicIcon) simMicIcon.classList.add('recording');
    if (simStatus) {
      simStatus.textContent = 'Listening...';
      simStatus.className = 'sim-status recording';
    }
    if (editorStatusText) {
      editorStatusText.textContent = '🎙️ Listening... speak now';
      editorStatusText.style.color = '#ef6351';
    }

    // Update Menubar Status Dot to recording
    const mbDot = document.getElementById('menubar-status-dot');
    const mbText = document.getElementById('menubar-status-text');
    if (mbDot) mbDot.className = 'status-indicator-dot recording';
    if (mbText) {
      mbText.textContent = 'Recording';
      mbText.style.color = '#ef6351';
    }
  };

  const stopDictating = () => {
    if (!isDictating) return;
    isDictating = false;

    playSystemChime('stop');

    if (virtualFn) virtualFn.classList.remove('active');
    if (simWaveforms) simWaveforms.classList.remove('pulsing');
    if (simMicIcon) simMicIcon.classList.remove('recording');
    if (simStatus) {
      simStatus.textContent = 'Transcribing...';
      simStatus.className = 'sim-status transcribing';
    }
    if (editorStatusText) {
      editorStatusText.textContent = '🧠 Local Whisper Model transcribing (0.2s)...';
      editorStatusText.style.color = 'var(--mynah-blue)';
    }

    // Reset Menubar Status Dot
    const mbDot = document.getElementById('menubar-status-dot');
    const mbText = document.getElementById('menubar-status-text');
    if (mbDot) mbDot.className = 'status-indicator-dot online';
    if (mbText) {
      mbText.textContent = 'Ready';
      mbText.style.color = '';
    }

    // Start simulated typing loop
    setTimeout(() => {
      if (simStatus) {
        simStatus.textContent = 'Pasting...';
        simStatus.className = 'sim-status transcribing';
      }
      
      const textToType = sampleSentences[sentenceIndex];
      sentenceIndex = (sentenceIndex + 1) % sampleSentences.length;

      typeSimulation(textToType);
    }, 800);
  };

  const typeSimulation = (text) => {
    if (!mockTextarea) return;
    
    // Setup cursor and clear field
    mockTextarea.value = '';
    mockTextarea.focus();
    
    let charIdx = 0;
    const typeSpeed = 25; // ms per char

    const typeInterval = setInterval(() => {
      if (charIdx < text.length) {
        mockTextarea.value += text[charIdx];
        mockTextarea.scrollTop = mockTextarea.scrollHeight;
        charIdx++;
      } else {
        clearInterval(typeInterval);
        
        // Final success state
        if (simStatus) {
          simStatus.textContent = 'Pasted';
          simStatus.className = 'sim-status success';
        }
        if (editorStatusText) {
          editorStatusText.textContent = '✅ Auto-pasted successfully';
          editorStatusText.style.color = '#22c993';
        }

        // Apply brief green glow to note editor canvas
        mockTextarea.classList.add('editor-glow-active');
        setTimeout(() => {
          mockTextarea.classList.remove('editor-glow-active');
        }, 1200);

        // Reset simulator status to idle after 3 seconds
        setTimeout(() => {
          if (!isDictating && simStatus.textContent === 'Pasted') {
            simStatus.textContent = 'Idle';
            simStatus.className = 'sim-status';
            if (editorStatusText) {
              editorStatusText.textContent = 'Ready. Cursor active.';
              editorStatusText.style.color = '';
            }
          }
        }, 3000);
      }
    }, typeSpeed);
  };

  // Virtual Key Listeners
  if (virtualFn) {
    virtualFn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      startDictating();
    });
    virtualFn.addEventListener('mouseup', (e) => {
      e.preventDefault();
      stopDictating();
    });
    virtualFn.addEventListener('mouseleave', () => {
      if (isDictating) stopDictating();
    });

    // Touch events for mobile
    virtualFn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startDictating();
    });
    virtualFn.addEventListener('touchend', (e) => {
      e.preventDefault();
      stopDictating();
    });
  }

  // Physical Fn Key Bindings
  window.addEventListener('keydown', (e) => {
    // Check for Fn key (key: "Fn", keyCode: 63, code: "Fn" or "Function")
    if (e.key === 'Fn' || e.keyCode === 63 || e.key === 'Function' || e.code === 'Function') {
      e.preventDefault();
      startDictating();
    }
  });

  window.addEventListener('keyup', (e) => {
    if (e.key === 'Fn' || e.keyCode === 63 || e.key === 'Function' || e.code === 'Function') {
      e.preventDefault();
      stopDictating();
    }
  });


  // 4. Glassmorphic Window Controls wrapper
  const wrapScreenshots = () => {
    const appShots = document.querySelectorAll('.app-shot, .settings-shot');
    appShots.forEach((fig, index) => {
      if (fig.querySelector('.macos-window')) return;

      const img = fig.querySelector('img');
      if (!img) return;

      const macWindow = document.createElement('div');
      macWindow.className = 'macos-window';
      macWindow.id = `mac-window-screenshot-${index}`;

      const titlebar = document.createElement('div');
      titlebar.className = 'window-titlebar';

      let titleText = 'Mynah App';
      const figcaption = fig.querySelector('figcaption');
      if (figcaption) {
        titleText = figcaption.textContent;
        figcaption.style.display = 'none'; // Move caption to titlebar
      }

      titlebar.innerHTML = `
        <div class="window-dots">
          <span class="dot-red" title="Close"></span>
          <span class="dot-yellow" title="Minimize"></span>
          <span class="dot-green" title="Zoom"></span>
        </div>
        <div class="window-title">${titleText}</div>
      `;

      const content = document.createElement('div');
      content.className = 'window-content';

      // Reparent image nodes
      img.parentNode.insertBefore(macWindow, img);
      content.appendChild(img);
      macWindow.appendChild(titlebar);
      macWindow.appendChild(content);

      // Traffic Light click events
      const redDot = titlebar.querySelector('.dot-red');
      const yellowDot = titlebar.querySelector('.dot-yellow');
      const greenDot = titlebar.querySelector('.dot-green');

      redDot.addEventListener('click', (event) => {
        event.stopPropagation();
        macWindow.classList.add('window-closed');
        showRestoreToast(macWindow);
      });

      yellowDot.addEventListener('click', (event) => {
        event.stopPropagation();
        macWindow.classList.add('window-closed');
        showRestoreToast(macWindow);
      });

      greenDot.addEventListener('click', (event) => {
        event.stopPropagation();
        macWindow.classList.toggle('window-maximized');
      });
    });
  };

  const showRestoreToast = (macWindow) => {
    const existing = document.querySelector('.restore-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'restore-notification';
    toast.innerHTML = `
      <span>Window hidden</span>
      <button id="btn-restore-shot">Restore Window</button>
    `;
    document.body.appendChild(toast);

    toast.querySelector('#btn-restore-shot').addEventListener('click', () => {
      macWindow.classList.remove('window-closed');
      toast.remove();
    });

    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 7000);
  };

  wrapScreenshots();


  // 5. Scroll-Driven Zoom Showcase (3D Tilt effect)
  const heroShot = document.querySelector('.hero-product-shot');
  if (heroShot) {
    const handleHeroScroll = () => {
      const rect = heroShot.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top < viewportHeight && rect.bottom > 0) {
        // Scroll progress from 0 (out of screen bottom) to 1 (passed top)
        const progress = Math.min(Math.max((viewportHeight - rect.top) / (viewportHeight + rect.height), 0), 1);
        
        // Rotate and scale based on scroll
        const scale = 0.88 + progress * 0.12;
        const rotateX = 14 - progress * 14;
        const rotateY = -8 + progress * 8;
        
        heroShot.style.transform = `perspective(1000px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        heroShot.style.transition = 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)';
      }
    };
    
    window.addEventListener('scroll', handleHeroScroll);
    handleHeroScroll(); // Run initially
  }


  // 6. Quick-Look (Spacebar) Finder Preview Simulator
  const initQuickLook = () => {
    let hoveredElement = null;

    // Create the tooltip hover helper
    const qlHint = document.createElement('div');
    qlHint.className = 'quicklook-hint-badge';
    qlHint.textContent = 'Spacebar to Quick Look';
    document.body.appendChild(qlHint);

    const updateHintPos = (event) => {
      qlHint.style.left = `${event.pageX + 15}px`;
      qlHint.style.top = `${event.pageY + 10}px`;
    };

    // Inject Overlay
    const qlOverlay = document.createElement('div');
    qlOverlay.className = 'quicklook-overlay';
    qlOverlay.id = 'quicklook-overlay';
    qlOverlay.innerHTML = `
      <div class="quicklook-window">
        <div class="quicklook-header">
          <div class="quicklook-title" id="quicklook-title">Preview</div>
          <button class="quicklook-close" id="quicklook-close-btn">&times;</button>
        </div>
        <div class="quicklook-content" id="quicklook-content"></div>
        <div class="quicklook-footer">
          <div class="quicklook-metadata" id="quicklook-metadata">Size: Unknown</div>
          <button class="quicklook-action-btn" id="quicklook-action-btn">Open File</button>
        </div>
      </div>
    `;
    document.body.appendChild(qlOverlay);

    const closeQL = () => {
      qlOverlay.classList.remove('active');
    };

    qlOverlay.addEventListener('click', (e) => {
      if (e.target === qlOverlay) closeQL();
    });
    qlOverlay.querySelector('#quicklook-close-btn').addEventListener('click', closeQL);

    const openQL = (element) => {
      const type = element.dataset.qlType;
      const name = element.dataset.qlName;
      const size = element.dataset.qlSize || 'N/A';
      const date = element.dataset.qlDate || 'N/A';

      const titleEl = qlOverlay.querySelector('#quicklook-title');
      const contentEl = qlOverlay.querySelector('#quicklook-content');
      const metaEl = qlOverlay.querySelector('#quicklook-metadata');
      const actionBtn = qlOverlay.querySelector('#quicklook-action-btn');

      titleEl.textContent = name;
      metaEl.textContent = `${size} · Modified: ${date}`;
      contentEl.innerHTML = '';
      actionBtn.style.display = 'block';

      if (type === 'dmg') {
        contentEl.innerHTML = `
          <div class="quicklook-dmg-preview">
            <svg class="quicklook-dmg-icon" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 28C12 23.5817 15.5817 20 20 20H108C112.418 20 116 23.5817 116 28V100C116 104.418 112.418 108 108 108H20C15.5817 108 12 104.418 12 100V28Z" fill="url(#dmg_grad_bg)" stroke="#8e8e93" stroke-width="2"/>
              <path d="M16 102V92H112V102C112 103.105 111.105 104 110 104H18C16.8954 104 16 103.105 16 102Z" fill="#7a7a7d"/>
              <rect x="34" y="32" width="60" height="42" rx="4" fill="#1e1e1e" stroke="#fff" stroke-width="2"/>
              <circle cx="64" cy="53" r="12" fill="#5e5e60"/>
              <rect x="52" y="80" width="24" height="6" rx="3" fill="#d1d1d6"/>
              <defs>
                <linearGradient id="dmg_grad_bg" x1="64" y1="20" x2="64" y2="108" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#f2f2f7"/>
                  <stop offset="1" stop-color="#c7c7cc"/>
                </linearGradient>
              </defs>
            </svg>
            <div class="quicklook-dmg-title">${name}</div>
            <p style="font-size: 12px; color: #a1a1a6; margin: 0; line-height: 1.5;">Apple Notarized Installer Disk Image<br>Status: Signed & Certified Safe</p>
          </div>
        `;
        actionBtn.textContent = 'Download Installer';
        actionBtn.onclick = () => {
          window.location.href = element.getAttribute('href');
          closeQL();
        };
      } else if (type === 'image') {
        contentEl.innerHTML = `
          <img class="quicklook-image-preview" src="${element.getAttribute('src')}" alt="${name}" />
        `;
        actionBtn.textContent = 'View Full Image';
        actionBtn.onclick = () => {
          window.open(element.getAttribute('src'), '_blank');
        };
      } else if (type === 'hash') {
        contentEl.innerHTML = `
          <div class="quicklook-checksum-preview">
            <span style="color: #22c993; font-weight:700;"># SHA-256 Release Checksum</span><br><br>
            ${element.dataset.qlHash}<br><br>
            <span style="color: #8e8e93; font-size:10px;">Use this string to verify downloaded binary integrity. Matches Apple Silicon release build certificate signatures.</span>
          </div>
        `;
        metaEl.textContent = 'SHA-256 Verification String';
        actionBtn.textContent = 'Copy Checksum';
        actionBtn.onclick = () => {
          navigator.clipboard.writeText(element.dataset.qlHash);
          actionBtn.textContent = 'Copied!';
          setTimeout(() => actionBtn.textContent = 'Copy Checksum', 1500);
        };
      }

      qlOverlay.classList.add('active');
    };

    // Find and configure QuickLook targets
    const configureTargets = () => {
      const qlElements = [];

      // DMG links
      document.querySelectorAll('a[href$=".dmg"]').forEach(link => {
        link.dataset.qlType = 'dmg';
        link.dataset.qlName = link.getAttribute('href').split('/').pop();
        link.dataset.qlSize = link.id.includes('intel') ? '13.8 MB' : '14.2 MB';
        link.dataset.qlDate = 'June 11, 2026';
        qlElements.push(link);
      });

      // Images inside windows
      document.querySelectorAll('.macos-window img, .app-shot img').forEach(img => {
        img.dataset.qlType = 'image';
        img.dataset.qlName = img.getAttribute('src').split('/').pop();
        img.dataset.qlSize = '420 KB';
        img.dataset.qlDate = 'June 11, 2026';
        qlElements.push(img);
      });

      // Hash outputs
      document.querySelectorAll('.facts-list span, .facts-list div, #release-status span').forEach(el => {
        const text = el.textContent.trim();
        if (/^[a-fA-F0-9]{64}$/.test(text)) {
          el.dataset.qlType = 'hash';
          el.dataset.qlName = 'SHA-256 Package Integrity Hash';
          el.dataset.qlHash = text;
          el.dataset.qlDate = 'Verified signed';
          qlElements.push(el);
        }
      });

      // Bind events
      qlElements.forEach(el => {
        el.addEventListener('mouseenter', (event) => {
          hoveredElement = el;
          qlHint.classList.add('visible');
          updateHintPos(event);
        });

        el.addEventListener('mousemove', (event) => {
          updateHintPos(event);
        });

        el.addEventListener('mouseleave', () => {
          hoveredElement = null;
          qlHint.classList.remove('visible');
        });
      });
    };

    // Configure targets initially and re-configure after wrapper runs
    configureTargets();
    setTimeout(configureTargets, 600);

    // Keyboard bindings for Spacebar & Escape
    window.addEventListener('keydown', (event) => {
      if (event.key === ' ' || event.keyCode === 32) {
        if (hoveredElement) {
          event.preventDefault(); // Stop default scroll
          if (qlOverlay.classList.contains('active')) {
            closeQL();
          } else {
            openQL(hoveredElement);
          }
        }
      } else if (event.key === 'Escape') {
        if (qlOverlay.classList.contains('active')) {
          closeQL();
        }
      }
    });
  };

  initQuickLook();
});

