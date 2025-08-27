<script>
/* GHL Confetti on Opportunity Won - Only when URL contains "/opportunities/list" */
(function () {
  // Helper: check if URL contains "/opportunities/list"
  function isOpportunitiesPage() {
    return window.location.pathname.includes('/opportunities/list');
  }

  // Load external script helper
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src; s.async = true; s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  // Confetti burst
  function party() {
    if (!window.confetti || !isOpportunitiesPage()) return;

    let canvas = document.getElementById('confetti-top-layer');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'confetti-top-layer';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '999999999'; // Always above everything
      document.body.appendChild(canvas);
    }

    const confettiInstance = window.confetti.create(canvas, { resize: true, useWorker: true });

    // Main burst
    confettiInstance({ particleCount: 140, spread: 70, origin: { y: 0.6 } });
    // Side bursts
    setTimeout(() => confettiInstance({ particleCount: 100, angle: 60, spread: 55, origin: { x: 0 } }), 200);
    setTimeout(() => confettiInstance({ particleCount: 100, angle: 120, spread: 55, origin: { x: 1 } }), 350);
  }

  // Detect Won status in payload
  function isWonPayload(body) {
    try {
      let s = body;
      if (body && typeof body !== 'string') s = JSON.stringify(body);
      s = (s || '').toLowerCase();
      return (
        s.includes('"status":"won"') ||
        s.includes('"opportunitystatus":"won"') ||
        s.includes('"pipeline_status":"won"') ||
        s.includes('"won":true') ||
        /"stage"\s*:\s*".*won.*"/.test(s)
      );
    } catch { return false; }
  }

  // Main initialization
  function initConfetti() {
    if (!isOpportunitiesPage()) return;

    loadScript('https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js')
      .then(function () {
        // Hook into fetch
        const _fetch = window.fetch;
        window.fetch = function (resource, init) {
          try {
            if (init && init.body && isWonPayload(init.body)) setTimeout(party, 300);
          } catch {}
          return _fetch.apply(this, arguments);
        };

        // Hook into XHR
        const _send = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function (body) {
          try { if (isWonPayload(body)) setTimeout(party, 300); } catch {}
          return _send.call(this, body);
        };

        // Observe DOM for Won notifications
        const observer = new MutationObserver((mutations) => {
          for (const m of mutations) {
            for (const n of m.addedNodes) {
              if (n.nodeType !== 1) continue;
              const text = (n.textContent || '').toLowerCase();
              if (text.includes('marked as won') || text.includes('opportunity won')) {
                party(); return;
              }
            }
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // Manual test trigger
        window.triggerGHLConfetti = party;
      })
      .catch(function () {
        console.warn('Confetti library failed to load.');
      });
  }

  // Initial check
  initConfetti();

  // Watch for SPA URL changes
  let lastPath = window.location.pathname;
  setInterval(() => {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname;
      initConfetti();
    }
  }, 1000);
})();
</script>
