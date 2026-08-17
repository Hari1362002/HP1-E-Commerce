/* HP Jewellery — site behaviour.
   Everything here degrades gracefully: without JS the markup still reads. */

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ------------------------------------------------------------ header -- */

  var header = $(".header");
  if (header && !header.classList.contains("is-static")) {
    var onScroll = function () {
      header.classList.toggle("is-solid", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ------------------------------------------------------------ drawer -- */

  var burger = $(".burger");
  var drawer = $(".drawer");
  if (burger && drawer) {
    var setDrawer = function (open) {
      burger.setAttribute("aria-expanded", String(open));
      drawer.classList.toggle("is-open", open);
      drawer.setAttribute("aria-hidden", String(!open));
      document.body.classList.toggle("is-locked", open);
    };
    burger.addEventListener("click", function () {
      setDrawer(burger.getAttribute("aria-expanded") !== "true");
    });
    // Close on link tap, on Escape, and if the viewport grows past the breakpoint
    $$(".drawer__link, .drawer a", drawer).forEach(function (a) {
      a.addEventListener("click", function () { setDrawer(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        setDrawer(false);
        burger.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) setDrawer(false);
    });
  }

  /* ------------------------------------------------------- scroll cues -- */

  var progress = $(".progress");
  var toTop = $(".to-top");
  if (progress || toTop) {
    var tick = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var p = max > 0 ? window.scrollY / max : 0;
      if (progress) progress.style.transform = "scaleX(" + p + ")";
      if (toTop) toTop.classList.toggle("is-on", window.scrollY > 700);
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
  }
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
  }

  /* ------------------------------------------------------------ reveal -- */

  var revealables = $$(".reveal, .split-txt");
  if (revealables.length) {
    if (!("IntersectionObserver" in window) || reduced) {
      revealables.forEach(function (el) { el.classList.add("is-in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          // Anything already above the viewport — a deep link, a reload part-way
          // down the page, a fast flick — never fires an intersection, so reveal
          // it straight away rather than leaving it invisible forever.
          var passed = entry.boundingClientRect.bottom < 0;
          if (!entry.isIntersecting && !passed) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
      revealables.forEach(function (el) { io.observe(el); });
    }
  }

  /* Wrap each character of a .split-txt so it can stagger in.
     Characters are grouped inside per-word spans, otherwise the inline-block
     letters become individual break opportunities and headings split mid-word. */
  $$(".split-txt").forEach(function (el) {
    if (reduced) return;
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (token) {
            if (!token) return;
            if (/^\s+$/.test(token)) { frag.appendChild(document.createTextNode(" ")); return; }
            var word = document.createElement("span");
            word.className = "wd";
            token.split("").forEach(function (ch) {
              var s = document.createElement("span");
              s.className = "ch";
              s.textContent = ch;
              word.appendChild(s);
            });
            frag.appendChild(word);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          walk(child);
        }
      });
    };
    walk(el);
    $$(".ch", el).forEach(function (s, i) { s.style.setProperty("--ci", i); });
  });

  /* -------------------------------------------------------------- tilt -- */
  /* Pointer-driven 3D tilt. Fine pointers only — touch has no hover to undo it. */

  if (fine && !reduced) {
    $$("[data-tilt]").forEach(function (el) {
      var max = parseFloat(el.getAttribute("data-tilt")) || 6;
      var raf = null;
      el.addEventListener("pointermove", function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = null;
          var r = el.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          el.style.setProperty("--ry", (px * max).toFixed(2) + "deg");
          el.style.setProperty("--rx", (-py * max).toFixed(2) + "deg");
        });
      });
      el.addEventListener("pointerleave", function () {
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--rx", "0deg");
      });
    });
  }

  /* ------------------------------------------------------------ quotes -- */

  var quotes = $(".quotes");
  if (quotes) {
    var track = $(".quotes__track", quotes);
    var slides = $$(".quote", quotes);
    var dots = $$(".dot", quotes);
    var i = 0;
    var timer = null;

    var go = function (n) {
      i = (n + slides.length) % slides.length;
      track.style.transform = "translateX(" + (-i * 100) + "%)";
      dots.forEach(function (d, k) { d.setAttribute("aria-selected", String(k === i)); });
      slides.forEach(function (s, k) { s.setAttribute("aria-hidden", String(k !== i)); });
    };
    var restart = function () {
      if (reduced || timer === false) return;
      clearInterval(timer);
      timer = setInterval(function () { go(i + 1); }, 7000);
    };

    var prev = $("[data-quote-prev]", quotes);
    var next = $("[data-quote-next]", quotes);
    if (prev) prev.addEventListener("click", function () { go(i - 1); restart(); });
    if (next) next.addEventListener("click", function () { go(i + 1); restart(); });
    dots.forEach(function (d, k) {
      d.addEventListener("click", function () { go(k); restart(); });
    });

    // Pause while the reader is hovering or tabbing through
    quotes.addEventListener("pointerenter", function () { clearInterval(timer); });
    quotes.addEventListener("pointerleave", restart);
    quotes.addEventListener("focusin", function () { clearInterval(timer); });

    go(0);
    restart();
  }

  /* -------------------------------------------------------------- rail -- */

  $$("[data-rail]").forEach(function (rail) {
    var id = rail.getAttribute("data-rail");
    var target = document.getElementById(id);
    if (!target) return;
    var dir = rail.hasAttribute("data-rail-prev") ? -1 : 1;
    rail.addEventListener("click", function () {
      var card = target.firstElementChild;
      var step = card ? card.getBoundingClientRect().width + 16 : target.clientWidth * 0.8;
      target.scrollBy({ left: dir * step, behavior: reduced ? "auto" : "smooth" });
    });
  });

  /* ----------------------------------------------------------- filters -- */

  var filterBar = $("[data-filters]");
  if (filterBar) {
    var items = $$("[data-cat]");
    var count = $("[data-filter-count]");
    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter");
      if (!btn) return;
      var want = btn.getAttribute("data-filter");
      $$(".filter", filterBar).forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      var shown = 0;
      items.forEach(function (el) {
        var hit = want === "all" || el.getAttribute("data-cat") === want;
        el.classList.toggle("is-hidden", !hit);
        if (hit) shown++;
      });
      if (count) count.textContent = shown;
    });
  }

  /* --------------------------------------------------------- accordion -- */

  $$(".acc__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
    });
  });

  /* ------------------------------------------------- pressable groups -- */
  /* Swatches, sizes and viewer modes all behave as single-choice groups. */

  $$("[data-group]").forEach(function (group) {
    group.addEventListener("click", function (e) {
      var btn = e.target.closest("[aria-pressed]");
      if (!btn || !group.contains(btn)) return;
      $$("[aria-pressed]", group).forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      group.dispatchEvent(new CustomEvent("group:change", { detail: { button: btn } }));
    });
  });

  /* --------------------------------------------------------- pdp views -- */

  var pdpModes = $("[data-pdp-modes]");
  if (pdpModes) {
    pdpModes.addEventListener("group:change", function (e) {
      var mode = e.detail.button.getAttribute("data-mode");
      $$("[data-pane]").forEach(function (p) {
        p.classList.toggle("is-active", p.getAttribute("data-pane") === mode);
      });
    });
  }

  var thumbs = $("[data-thumbs]");
  if (thumbs) {
    thumbs.addEventListener("group:change", function (e) {
      var src = e.detail.button.getAttribute("data-src");
      var alt = e.detail.button.getAttribute("data-alt") || "";
      var main = $("[data-pdp-main]");
      if (!main || !src) return;
      main.src = src;
      main.alt = alt;
      // Switch back to the photo pane so the choice is visible
      $$("[data-pane]").forEach(function (p) {
        p.classList.toggle("is-active", p.getAttribute("data-pane") === "photo");
      });
      $$("[data-mode]").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-mode") === "photo"));
      });
    });
  }

  /* ------------------------------------------------------------- forms -- */
  /* Static site — no backend. Validate, then acknowledge locally. */

  $$("form[data-local]").forEach(function (form) {
    var msg = $(".form-msg", form) || $("#" + form.getAttribute("data-msg"));
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var note = form.getAttribute("data-success") || "Thank you — we'll be in touch shortly.";
      if (msg) msg.textContent = note;
      form.reset();
    });
  });

  /* ------------------------------------------------------------- misc  -- */

  $$("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Live gold rate ticker — illustrative, seeded so it reads steady per day
  $$("[data-rate]").forEach(function (el) {
    var base = parseFloat(el.getAttribute("data-rate"));
    var day = new Date().getDate();
    var val = base + ((day * 37) % 220) - 110;
    el.textContent = "₹" + val.toLocaleString("en-IN");
  });
})();
