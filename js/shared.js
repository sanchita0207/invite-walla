/* =========================================================
   InviteWalla — Shared Nav + Footer
   js/shared.js
   =========================================================
   Injects the site-wide header and footer into any page
   that includes this script. Pages must contain:

     <div id="iwSharedNav"></div>   ← nav mount
     <div id="iwSharedFooter"></div> ← footer mount

   Pass data-root="/" or data-root="../" on the script tag
   to control relative paths (for subdirectory pages).

   Example (root page):
     <script src="/js/shared.js" data-root="/"></script>
   Example (subdirectory page):
     <script src="/js/shared.js" data-root="/"></script>
========================================================= */

(function () {
  "use strict";

  /* ── Resolve root path from script tag ──────────────── */
  var scripts  = document.querySelectorAll('script[src*="shared.js"]');
  var scriptEl = scripts[scripts.length - 1];
  var root     = (scriptEl && scriptEl.getAttribute('data-root')) || '/';

  /* Ensure root ends with / */
  if (root.slice(-1) !== '/') root += '/';

  /* ── Detect current page for active nav state ───────── */
  var path = window.location.pathname.replace(/\/$/, '') || '/';

  function isActive(href) {
    var clean = href.replace(/\/$/, '') || '/';
    return path === clean;
  }

  /* ── Nav HTML ────────────────────────────────────────── */
  function buildNav() {
    /* Links that work from any page — always absolute paths */
    var links = [
      { href: '/#occasions',    label: 'Occasions'   },
      { href: '/#how-it-works', label: 'How it works'},
      { href: '/#pricing',      label: 'Invitations' },
      { href: '/invite/wedding/aanya-rohan/', label: 'See Example', ariaLabel: 'See a sample digital wedding invitation by InviteWalla' },
      { href: '/faq/',          label: 'FAQ'         },
    ];

    var desktopLis = links.map(function (l) {
      var aria = l.ariaLabel ? ' aria-label="' + l.ariaLabel + '"' : '';
      var active = isActive(l.href) ? ' class="iw-nav-active"' : '';
      return '<li' + active + '><a href="' + l.href + '"' + aria + '>' + l.label + '</a></li>';
    }).join('\n          ');

    var mobileLis = links.map(function (l) {
      var aria = l.ariaLabel ? ' aria-label="' + l.ariaLabel + '"' : '';
      return '<li><a href="' + l.href + '"' + aria + '>' + l.label + '</a></li>';
    }).join('\n          ');

    return [
      '<header class="iw-nav" id="iwNav" role="banner">',
      '  <nav aria-label="Main navigation">',
      '    <a class="iw-nav-logo" href="/" aria-label="InviteWalla home">',
      '      <span class="iw-nav-logo-text">InviteWalla</span>',
      '    </a>',
      '    <ul class="iw-nav-links" role="list">',
      '      ' + desktopLis,
      '      <li><a href="/#enquire" class="iw-nav-cta">Create My Invitation</a></li>',
      '    </ul>',
      '    <button class="iw-nav-toggle" id="iwNavToggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="iwMobileMenu">',
      '      <span></span><span></span><span></span>',
      '    </button>',
      '  </nav>',
      '  <div class="iw-mobile-menu" id="iwMobileMenu" hidden>',
      '    <ul role="list">',
      '      ' + mobileLis,
      '      <li><a href="/#enquire" class="iw-mobile-cta">Create My Invitation</a></li>',
      '    </ul>',
      '  </div>',
      '</header>',
    ].join('\n');
  }

  /* ── Footer HTML ─────────────────────────────────────── */
  function buildFooter() {
    var year = new Date().getFullYear();
    return [
      '<footer class="iw-footer" role="contentinfo">',
      '  <div class="iw-section-container">',
      '    <div class="iw-footer-inner">',
      '',
      '      <div class="iw-footer-brand">',
      '        <p class="iw-footer-logo">InviteWalla</p>',
      '        <p class="iw-footer-tagline">Har khaas mauke ka,<br>khaas bulawa.</p>',
      '        <p class="iw-footer-sub">Beautiful Invitations for Every Celebration.</p>',
      '        <div class="iw-footer-social">',
      '          <a href="https://instagram.com/invitewalla" target="_blank" rel="noopener noreferrer" aria-label="InviteWalla on Instagram" class="iw-footer-social-link">',
      '            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
      '          </a>',
      '          <a href="https://wa.me/917055747717" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp InviteWalla" class="iw-footer-social-link">',
      '            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.828L.057 23.999l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.645-.525-5.153-1.437l-.369-.221-3.742.981.998-3.649-.241-.374A9.949 9.949 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>',
      '          </a>',
      '        </div>',
      '      </div>',
      '',
      '      <nav aria-label="Footer navigation">',
      '        <ul class="iw-footer-links" role="list">',
      '          <li><a href="/#how-it-works">How it works</a></li>',
      '          <li><a href="/#occasions">Occasions</a></li>',
      '          <li><a href="/#pricing">Invitations &amp; Pricing</a></li>',
      '          <li><a href="/invite/wedding/aanya-rohan/">See an example</a></li>',
      '          <li><a href="/faq/">FAQ</a></li>',
      '          <li><a href="/#enquire">Create my invitation</a></li>',
      '        </ul>',
      '      </nav>',
      '',
      '    </div>',
      '    <p class="iw-footer-copy">&copy; ' + year + ' InviteWalla. All rights reserved.</p>',
      '  </div>',
      '</footer>',
    ].join('\n');
  }

  /* ── Inject ──────────────────────────────────────────── */
  function inject() {
    var navMount    = document.getElementById('iwSharedNav');
    var footerMount = document.getElementById('iwSharedFooter');

    if (navMount)    navMount.outerHTML    = buildNav();
    if (footerMount) footerMount.outerHTML = buildFooter();

    /* ── Nav scroll behaviour ─────────────────────────── */
    var nav = document.getElementById('iwNav');
    if (nav) {
      window.addEventListener('scroll', function () {
        nav.classList.toggle('scrolled', window.scrollY > 40);
      }, { passive: true });
      /* Set initial state */
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }

    /* ── Mobile menu toggle ───────────────────────────── */
    var toggle = document.getElementById('iwNavToggle');
    var menu   = document.getElementById('iwMobileMenu');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        var open = menu.hidden;
        menu.hidden = !open;
        toggle.setAttribute('aria-expanded', String(open));
        /* Animate hamburger → X */
        var spans = toggle.querySelectorAll('span');
        if (open) {
          spans[0].style.transform = 'translateY(7px) rotate(45deg)';
          spans[1].style.opacity   = '0';
          spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
        } else {
          spans[0].style.transform = '';
          spans[1].style.opacity   = '';
          spans[2].style.transform = '';
        }
      });
    }
  }

  /* Run after DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

  /* ── Google Analytics ────────────────────────────────── */
  (function initGA() {
    var id = (typeof SITE_CONFIG !== 'undefined') && SITE_CONFIG.gaMeasurementId;
    if (!id) return;
    var s = document.createElement('script');
    s.async = true;
    s.src   = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', id);
  })();

})();
