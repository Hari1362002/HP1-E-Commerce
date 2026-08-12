/* Vel Hospital — site behaviour */
(function () {
  'use strict';

  /* ---------- mobile nav ---------- */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        burger.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        burger.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        burger.focus();
      }
    });
  }

  /* ---------- header shadow on scroll ---------- */
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
      }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
      revealables.forEach(function (el) { io.observe(el); });

      // Safety net: if the observer never fires (zero-height viewport, an odd
      // embedding context), show everything rather than leave a blank page.
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
      if (reduced) { el.textContent = target + suffix; return; }

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

  /* ---------- doctor / department filters ---------- */
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

  /* ---------- appointment form (front-end demo) ---------- */
  var form = document.querySelector('[data-appointment]');
  if (form) {
    var dateInput = form.querySelector('input[type="date"]');
    if (dateInput) {
      var today = new Date();
      dateInput.min = today.toISOString().split('T')[0];
      var max = new Date(today.getTime() + 90 * 86400000);
      dateInput.max = max.toISOString().split('T')[0];
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var ok = form.querySelector('.form__ok');
      var name = (form.querySelector('#name') || {}).value || 'there';
      if (ok) {
        ok.querySelector('[data-ok-text]').textContent =
          'Thanks ' + name.split(' ')[0] + ' — your request has reached the front desk. ' +
          'Our team will call you on the number you gave to confirm the slot. ' +
          'For anything urgent, please ring +91 98430 21700.';
        ok.classList.add('is-on');
        ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    });
  }

  /* ---------- current year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
