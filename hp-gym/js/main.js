/* HP Gym — site behaviour */
(function () {
  'use strict';

  /* ---------- mobile nav ----------
     A disclosure menu: it has to close on every exit a person expects —
     the burger, a link, a tap outside, Escape, back/forward, and growing
     past the breakpoint where the panel no longer exists. */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');

  if (burger && nav) {
    var isOpen = function () {
      return nav.classList.contains('is-open');
    };

    var setNav = function (open) {
      if (open === isOpen()) return;
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.documentElement.classList.toggle('is-nav-open', open);
    };

    var close = function (returnFocus) {
      if (!isOpen()) return;
      setNav(false);
      if (returnFocus) burger.focus();
    };

    burger.addEventListener('click', function () {
      setNav(!isOpen());
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) close(false);
    });

    // pointerdown, not click: on iOS a click on a non-interactive element
    // does not reliably reach a document-level listener.
    document.addEventListener('pointerdown', function (e) {
      if (!isOpen()) return;
      if (nav.contains(e.target) || burger.contains(e.target)) return;
      close(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close(true);
    });

    // Rotating or resizing past the breakpoint reveals the desktop nav;
    // leaving `is-nav-open` set there would scroll-lock a page with no
    // visible way to unlock it. Test the burger's own computed display so
    // the check can never drift from the stylesheet's breakpoint.
    var closeIfDesktop = function () {
      if (isOpen() && getComputedStyle(burger).display === 'none') close(false);
    };

    var resizeTimer;
    var scheduleCheck = function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(closeIfDesktop, 120);
    };

    if (window.ResizeObserver) {
      new ResizeObserver(scheduleCheck).observe(document.documentElement);
    }
    window.addEventListener('resize', scheduleCheck);
    window.addEventListener('orientationchange', scheduleCheck);
    window.addEventListener('pageshow', function () { close(false); });
  }

  /* ---------- header background on scroll ---------- */
  var head = document.querySelector('.head');
  if (head) {
    var onScroll = function () {
      head.classList.toggle('is-stuck', window.scrollY > 12);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- reveal on scroll ---------- */
  var revealables = document.querySelectorAll('.reveal');
  if (revealables.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px' });
      revealables.forEach(function (el) { io.observe(el); });

      // Safety net: if the observer never fires, show everything rather
      // than leave the page blank.
      window.setTimeout(function () {
        revealables.forEach(function (el) { el.classList.add('is-in'); });
      }, 4000);
    } else {
      revealables.forEach(function (el) { el.classList.add('is-in'); });
    }
  }

  /* ---------- animated counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var run = function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      if (reduced) { el.textContent = target.toLocaleString('en-IN') + suffix; return; }

      var started = null;
      var dur = 1400;
      var step = function (now) {
        if (!started) started = now;
        var p = Math.min((now - started) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString('en-IN') + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { run(entry.target); co.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---------- marquee ----------
     The row is duplicated in the markup so the -50% keyframe loops seamlessly.
     Pause it while the pointer is over the band, and honour reduced motion. */
  var ticker = document.querySelector('.ticker__row');
  if (ticker) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ticker.style.animation = 'none';
    } else {
      ticker.parentElement.addEventListener('mouseenter', function () {
        ticker.style.animationPlayState = 'paused';
      });
      ticker.parentElement.addEventListener('mouseleave', function () {
        ticker.style.animationPlayState = 'running';
      });
    }
  }

  /* ---------- programme / coach filters ---------- */
  var filterBar = document.querySelector('[data-filters]');
  if (filterBar) {
    var targetSel = filterBar.getAttribute('data-filters');
    var items = document.querySelectorAll(targetSel + ' [data-cat]');
    var empty = document.querySelector('[data-empty]');

    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-filter]');
      if (!btn) return;

      var val = btn.getAttribute('data-filter');
      filterBar.querySelectorAll('button').forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });

      var shown = 0;
      items.forEach(function (item) {
        var match = val === 'all' || item.getAttribute('data-cat') === val;
        item.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    });
  }

  /* ---------- monthly / yearly price toggle ----------
     Every price carries both numbers as data attributes, so switching is
     a text swap — no second copy of the pricing table to keep in sync. */
  var toggle = document.querySelector('[data-billing]');
  if (toggle) {
    var prices = document.querySelectorAll('[data-monthly]');

    toggle.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-term]');
      if (!btn) return;

      var term = btn.getAttribute('data-term');
      toggle.querySelectorAll('button').forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });

      prices.forEach(function (el) {
        var amount = el.getAttribute(term === 'yearly' ? 'data-yearly' : 'data-monthly');
        var note = el.parentElement.querySelector('[data-term-label]');
        el.textContent = '₹' + Number(amount).toLocaleString('en-IN');
        if (note) note.textContent = term === 'yearly' ? '/ year' : '/ month';
      });
    });
  }

  /* ---------- forms (front-end demo, nothing is sent) ---------- */
  document.querySelectorAll('[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var ok = form.querySelector('.form__ok');
      var nameField = form.querySelector('input[name="name"]');
      var first = ((nameField && nameField.value) || 'there').trim().split(' ')[0];

      if (ok) {
        ok.textContent =
          'Thanks ' + first + ' — your request is with the front desk. A coach will ' +
          'call you within one working day to book your free trial session. ' +
          'In a hurry? Ring us on +91 90470 33211.';
        ok.classList.add('is-on');
        ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    });
  });

  /* ---------- current year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
