/* HP Fashion — one script for every page.
   Pages declare what they want with data attributes; nothing here is page-specific. */

(function () {
  "use strict";

  var BAG_KEY = "hpf.bag.v1";
  var WISH_KEY = "hpf.wish.v1";
  var rupee = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  function bySection(slug) { return PRODUCTS.filter(function (p) { return p.section === slug; }); }
  function findProduct(id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0]; }
  function findSection(slug) { return SECTIONS.filter(function (s) { return s.slug === slug; })[0]; }
  function varietyName(section, variety) {
    var s = findSection(section); if (!s) return variety;
    var v = s.varieties.filter(function (x) { return x.slug === variety; })[0];
    return v ? v.name : variety;
  }

  /* ------------------------------------------------------------------ bag */

  function readBag() {
    try { return JSON.parse(localStorage.getItem(BAG_KEY)) || []; }
    catch (e) { return []; }
  }
  function writeBag(lines) {
    try { localStorage.setItem(BAG_KEY, JSON.stringify(lines)); } catch (e) { /* private mode */ }
    paintBag();
  }
  function addToBag(id, size, qty) {
    var lines = readBag();
    var key = id + "|" + (size || "");
    var hit = lines.filter(function (l) { return l.key === key; })[0];
    if (hit) { hit.qty += (qty || 1); }
    else { lines.push({ key: key, id: id, size: size || "", qty: qty || 1 }); }
    writeBag(lines);
    toast("Added to bag");
  }
  function setQty(key, delta) {
    var lines = readBag().map(function (l) {
      if (l.key === key) l.qty += delta;
      return l;
    }).filter(function (l) { return l.qty > 0; });
    writeBag(lines);
  }

  function paintBag() {
    var lines = readBag();
    var count = lines.reduce(function (n, l) { return n + l.qty; }, 0);
    $$("[data-bag-count]").forEach(function (el) {
      el.textContent = count;
      el.setAttribute("data-empty", count === 0 ? "true" : "false");
    });

    var body = $("[data-bag-body]");
    if (!body) return;
    var total = 0;

    if (!lines.length) {
      body.innerHTML = '<p class="bag__empty">Your bag is empty. Everything we make is on the ' +
        '<a class="link-underline" href="men.html">rails</a>.</p>';
    } else {
      body.innerHTML = lines.map(function (l) {
        var p = findProduct(l.id);
        if (!p) return "";
        total += p.price * l.qty;
        return '<div class="bag-line">' +
          '<img src="' + esc(p.img) + '" alt="' + esc(p.alt) + '" loading="lazy">' +
          '<div><h4>' + esc(p.name) + '</h4>' +
          '<small>' + esc(varietyName(p.section, p.variety)) + (l.size ? " &middot; Size " + esc(l.size) : "") + '</small>' +
          '<div class="bag-line__row"><span class="qty">' +
            '<button type="button" data-qty="' + esc(l.key) + '" data-delta="-1" aria-label="Reduce quantity">&minus;</button>' +
            '<span>' + l.qty + '</span>' +
            '<button type="button" data-qty="' + esc(l.key) + '" data-delta="1" aria-label="Increase quantity">+</button>' +
          '</span><span>' + rupee.format(p.price * l.qty) + '</span></div></div></div>';
      }).join("");
    }

    var totalEl = $("[data-bag-total]");
    if (totalEl) totalEl.textContent = rupee.format(total);
    var checkout = $("[data-checkout]");
    if (checkout) checkout.disabled = !lines.length;
  }

  /* ------------------------------------------------------------- wishlist */

  function readWish() {
    try { return JSON.parse(localStorage.getItem(WISH_KEY)) || []; }
    catch (e) { return []; }
  }
  function writeWish(ids) {
    try { localStorage.setItem(WISH_KEY, JSON.stringify(ids)); } catch (e) { /* private mode */ }
    paintWish();
  }
  function toggleWish(id) {
    var ids = readWish();
    var at = ids.indexOf(id);
    if (at > -1) { ids.splice(at, 1); toast("Removed from wishlist"); }
    else { ids.push(id); toast("Saved to wishlist"); }
    writeWish(ids);
  }

  function paintWish() {
    var ids = readWish();

    $$("[data-wish-count]").forEach(function (el) {
      el.textContent = ids.length;
      el.setAttribute("data-empty", ids.length === 0 ? "true" : "false");
    });

    /* Every heart on the page reflects the same list, wherever it is drawn. */
    $$("[data-wish]").forEach(function (btn) {
      var on = ids.indexOf(btn.getAttribute("data-wish")) > -1;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.setAttribute("aria-label", (on ? "Remove " : "Save ") + (btn.getAttribute("data-wish-name") || "this piece") + (on ? " from" : " to") + " wishlist");
    });

    var body = $("[data-wish-body]");
    if (!body) return;

    if (!ids.length) {
      body.innerHTML = '<p class="bag__empty">Nothing saved yet. Tap the heart on any piece to keep it here.</p>';
      return;
    }

    body.innerHTML = ids.map(function (id) {
      var p = findProduct(id);
      if (!p) return "";
      return '<div class="bag-line">' +
        '<img src="' + esc(p.img) + '" alt="' + esc(p.alt) + '" loading="lazy">' +
        '<div><h4><a href="product.html?id=' + encodeURIComponent(p.id) + '">' + esc(p.name) + '</a></h4>' +
        '<small>' + esc(varietyName(p.section, p.variety)) + '</small>' +
        '<div class="bag-line__row">' +
          '<button class="card__quick" type="button" data-add="' + esc(p.id) + '">Add to bag</button>' +
          '<span>' + rupee.format(p.price) + '</span>' +
        '</div>' +
        '<button class="wish-drop" type="button" data-wish="' + esc(p.id) + '" data-wish-name="' + esc(p.name) + '">Remove</button>' +
        '</div></div>';
    }).join("");
  }

  var HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.35-7-9.5A3.9 3.9 0 0 1 12 7a3.9 3.9 0 0 1 7 3.5C19 15.65 12 20 12 20Z"/></svg>';

  /* ---------------------------------------------------------------- panels */

  var scrim = null;
  function panel(el, open) {
    if (!el) return;
    el.setAttribute("data-open", open ? "true" : "false");
    if (scrim) scrim.setAttribute("data-open", open ? "true" : "false");
    document.body.setAttribute("data-locked", open ? "true" : "false");
  }
  function closeAll() {
    $$("[data-panel]").forEach(function (el) { el.setAttribute("data-open", "false"); });
    if (scrim) scrim.setAttribute("data-open", "false");
    document.body.setAttribute("data-locked", "false");
  }

  var toastTimer;
  function toast(msg) {
    var el = $("[data-toast]");
    if (!el) return;
    el.textContent = msg;
    el.setAttribute("data-show", "true");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.setAttribute("data-show", "false"); }, 2200);
  }

  /* ----------------------------------------------------------- card markup */

  function cardHTML(p) {
    return '<article class="card reveal">' +
      '<div class="card__media">' +
        '<img src="' + esc(p.img) + '" alt="' + esc(p.alt) + '" loading="lazy" width="900" height="1200">' +
        (p.tag ? '<span class="card__tag">' + esc(p.tag) + '</span>' : "") +
        '<button class="card__wish" type="button" data-wish="' + esc(p.id) + '" data-wish-name="' + esc(p.name) + '" aria-pressed="false">' + HEART + '</button>' +
      '</div>' +
      '<p class="card__variety">' + esc(varietyName(p.section, p.variety)) + '</p>' +
      '<h3 class="card__name"><a class="card__link" href="product.html?id=' + encodeURIComponent(p.id) + '">' + esc(p.name) + '</a></h3>' +
      '<p class="card__price">' + rupee.format(p.price) +
        (p.mrp && p.mrp > p.price ? ' <s>' + rupee.format(p.mrp) + '</s>' : "") + '</p>' +
      '<button class="card__quick" type="button" data-add="' + esc(p.id) + '">Add to bag</button>' +
    '</article>';
  }

  /* ----------------------------------------------------------- page render */

  function renderDepartment(host) {
    var slug = host.getAttribute("data-department");
    var section = findSection(slug);
    if (!section) return;
    var items = bySection(slug);

    var filters = $("[data-filters]");
    if (filters) {
      filters.insertAdjacentHTML("afterbegin",
        '<button class="chip" type="button" aria-pressed="true" data-filter="all">All ' + esc(section.label) + '</button>' +
        section.varieties.map(function (v) {
          return '<button class="chip" type="button" aria-pressed="false" data-filter="' + esc(v.slug) + '">' + esc(v.name) + '</button>';
        }).join(""));
    }

    host.innerHTML = section.varieties.map(function (v) {
      var list = items.filter(function (p) { return p.variety === v.slug; });
      return '<section class="variety" id="' + esc(v.slug) + '" data-variety="' + esc(v.slug) + '">' +
        '<div class="variety__head">' +
          '<div><h2>' + esc(v.name) + '</h2></div>' +
          '<p>' + esc(v.blurb) + '</p>' +
        '</div>' +
        '<div class="grid">' + list.map(cardHTML).join("") + '</div>' +
      '</section>';
    }).join("");

    var count = $("[data-count]");
    if (count) count.textContent = items.length + " pieces";

    if (filters) {
      filters.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-filter]");
        if (!btn) return;
        var want = btn.getAttribute("data-filter");
        $$("[data-filter]", filters).forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        var shown = 0;
        $$("[data-variety]", host).forEach(function (block) {
          var on = want === "all" || block.getAttribute("data-variety") === want;
          block.hidden = !on;
          if (on) shown += $$(".card", block).length;
        });
        if (count) count.textContent = shown + " pieces";
        paintWish();
      });
    }
  }

  /* "You are looking for" — three department tabs on the home page. Picking one
     renders that department's whole rail underneath, grouped by variety. */
  function renderLooking(tabHost) {
    var listHost = $("[data-looking-list]");
    var countEl = $("[data-looking-count]");
    if (!listHost) return;

    var covers = { men: "images/m-layer-3.jpg", women: "images/w-saree-4.jpg", kids: "images/k-girl-1.jpg" };

    tabHost.innerHTML = SECTIONS.map(function (section, i) {
      return '<button class="looking__tab" type="button" role="tab" data-looking="' + esc(section.slug) + '"' +
        ' aria-selected="' + (i === 0 ? "true" : "false") + '">' +
        '<img src="' + esc(covers[section.slug]) + '" alt="" loading="lazy" width="900" height="562">' +
        '<span><strong>' + esc(section.label) + '</strong>' +
        '<small>' + bySection(section.slug).length + ' pieces &middot; ' + section.varieties.length + ' departments</small></span>' +
      '</button>';
    }).join("");

    function show(slug) {
      var section = findSection(slug);
      listHost.innerHTML = section.varieties.map(function (v) {
        var list = bySection(slug).filter(function (p) { return p.variety === v.slug; });
        return '<section class="variety">' +
          '<div class="variety__head"><h2>' + esc(v.name) + '</h2><p>' + esc(v.blurb) + '</p></div>' +
          '<div class="grid">' + list.map(cardHTML).join("") + '</div>' +
        '</section>';
      }).join("");
      if (countEl) countEl.textContent = bySection(slug).length + " pieces in " + section.label.toLowerCase();
      wireReveal();
      paintWish();
    }

    tabHost.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-looking]");
      if (!btn) return;
      $$("[data-looking]", tabHost).forEach(function (b) {
        b.setAttribute("aria-selected", b === btn ? "true" : "false");
      });
      show(btn.getAttribute("data-looking"));
    });

    show(SECTIONS[0].slug);
  }

  function renderFeatured(host) {
    var picks = (host.getAttribute("data-featured") || "").split(",").map(function (s) { return s.trim(); });
    var items = picks.map(findProduct).filter(Boolean);
    host.innerHTML = items.map(cardHTML).join("");
  }

  function renderDetail(host) {
    var id = new URLSearchParams(location.search).get("id");
    var p = id ? findProduct(id) : null;

    if (!p) {
      host.innerHTML = '<div class="wrap wrap--narrow band"><p class="eyebrow">Not found</p>' +
        '<h1>That piece has moved</h1><p class="lede">It may have sold through or been renamed. ' +
        'The full rail is still there.</p><p style="margin-top:2rem"><a class="btn" href="men.html">Browse everything</a></p></div>';
      return;
    }

    document.title = p.name + " | HP Fashion";
    var meta = $('meta[name="description"]');
    if (meta) meta.setAttribute("content", p.story);

    var section = findSection(p.section);
    var sizes = p.sizes.map(function (s, i) {
      return '<button class="swatch" type="button" data-size="' + esc(s) + '" aria-pressed="' + (i === 0 ? "true" : "false") + '">' + esc(s) + '</button>';
    }).join("");

    host.innerHTML =
      '<div class="wrap">' +
        '<p class="crumbs"><a href="index.html">Home</a> / <a href="' + esc(p.section) + '.html">' + esc(section.label) + '</a> / ' +
          '<a href="' + esc(p.section) + '.html#' + esc(p.variety) + '">' + esc(varietyName(p.section, p.variety)) + '</a></p>' +
        '<div class="detail">' +
          '<div class="detail__media"><img src="' + esc(p.img) + '" alt="' + esc(p.alt) + '" width="900" height="1200"></div>' +
          '<div>' +
            '<p class="eyebrow">' + esc(varietyName(p.section, p.variety)) + (p.tag ? ' &middot; ' + esc(p.tag) : "") + '</p>' +
            '<h1>' + esc(p.name) + '</h1>' +
            '<div class="detail__price"><strong>' + rupee.format(p.price) + '</strong>' +
              (p.mrp && p.mrp > p.price ? '<s>' + rupee.format(p.mrp) + '</s>' : "") +
              '<em>Inclusive of all taxes</em></div>' +
            '<p class="detail__story">' + esc(p.story) + '</p>' +
            '<span class="field-label">Colour</span>' +
            '<div class="swatches">' + p.colours.map(function (c, i) {
              return '<button class="swatch" type="button" aria-pressed="' + (i === 0 ? "true" : "false") + '">' + esc(c) + '</button>';
            }).join("") + '</div>' +
            '<span class="field-label">Size</span>' +
            '<div class="swatches" data-sizes>' + sizes + '</div>' +
            '<div class="detail__buy">' +
              '<button class="btn" type="button" data-add-detail="' + esc(p.id) + '">Add to bag</button>' +
              '<button class="btn btn--ghost detail__wish" type="button" data-wish="' + esc(p.id) + '" data-wish-name="' + esc(p.name) + '" aria-pressed="false">' + HEART + '<span>Save</span></button>' +
            '</div>' +
            '<dl class="spec">' + p.spec.map(function (row) {
              return '<div><dt>' + esc(row[0]) + '</dt><dd>' + esc(row[1]) + '</dd></div>';
            }).join("") + '</dl>' +
          '</div>' +
        '</div>' +
      '</div>';

    var related = PRODUCTS.filter(function (x) {
      return x.section === p.section && x.variety === p.variety && x.id !== p.id;
    }).slice(0, 4);
    var relHost = $("[data-related]");
    if (relHost && related.length) {
      relHost.innerHTML = related.map(cardHTML).join("");
      var relTitle = $("[data-related-title]");
      if (relTitle) relTitle.textContent = "More " + varietyName(p.section, p.variety).toLowerCase();
    }
  }

  /* --------------------------------------------------------------- search */

  function wireSearch() {
    var box = $("[data-search]");
    if (!box) return;
    var input = $("input", box);
    var out = $("[data-search-results]", box);

    function run() {
      var q = input.value.trim().toLowerCase();
      if (q.length < 2) { out.innerHTML = ""; return; }
      var hits = PRODUCTS.filter(function (p) {
        return (p.name + " " + p.section + " " + varietyName(p.section, p.variety) + " " + p.colours.join(" ")).toLowerCase().indexOf(q) > -1;
      }).slice(0, 8);
      out.innerHTML = hits.length
        ? hits.map(function (p) {
            return '<a href="product.html?id=' + encodeURIComponent(p.id) + '">' +
              '<img src="' + esc(p.img) + '" alt="" loading="lazy">' +
              '<span>' + esc(p.name) + '</span><small>' + rupee.format(p.price) + '</small></a>';
          }).join("")
        : '<p class="bag__empty">Nothing matches &ldquo;' + esc(input.value) + '&rdquo;.</p>';
    }

    input.addEventListener("input", run);
    $("form", box).addEventListener("submit", function (e) { e.preventDefault(); run(); });
  }

  /* --------------------------------------------------------------- reveal */

  function wireReveal() {
    var els = $$('.reveal:not([data-seen])');
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.setAttribute("data-seen", "true"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-seen", "true");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------ init */

  document.addEventListener("DOMContentLoaded", function () {
    scrim = $("[data-scrim]");

    var dept = $("[data-department]");
    if (dept) renderDepartment(dept);

    var looking = $("[data-looking-tabs]");
    if (looking) renderLooking(looking);

    var feat = $("[data-featured]");
    if (feat) renderFeatured(feat);

    var detail = $("[data-detail]");
    if (detail) renderDetail(detail);

    paintBag();
    paintWish();
    wireSearch();
    wireReveal();

    document.addEventListener("click", function (e) {
      var open = e.target.closest("[data-open-panel]");
      if (open) { closeAll(); panel($(open.getAttribute("data-open-panel")), true);
        var inp = $("input", $(open.getAttribute("data-open-panel")));
        if (inp) setTimeout(function () { inp.focus(); }, 320);
        return; }

      if (e.target.closest("[data-close-panel]") || e.target.closest("[data-scrim]")) { closeAll(); return; }

      var wish = e.target.closest("[data-wish]");
      if (wish) { e.preventDefault(); toggleWish(wish.getAttribute("data-wish")); return; }

      var add = e.target.closest("[data-add]");
      if (add) { addToBag(add.getAttribute("data-add"), "", 1); return; }

      var addDetail = e.target.closest("[data-add-detail]");
      if (addDetail) {
        var chosen = $('[data-sizes] .swatch[aria-pressed="true"]');
        addToBag(addDetail.getAttribute("data-add-detail"), chosen ? chosen.textContent : "", 1);
        panel($("[data-panel='bag']"), true);
        return;
      }

      var sw = e.target.closest(".swatch");
      if (sw) {
        $$(".swatch", sw.parentElement).forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
        sw.setAttribute("aria-pressed", "true");
        return;
      }

      var q = e.target.closest("[data-qty]");
      if (q) { setQty(q.getAttribute("data-qty"), Number(q.getAttribute("data-delta"))); return; }

      if (e.target.closest("[data-checkout]")) {
        toast("Checkout opens in store — call 0422 421 8080");
        return;
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAll();
    });

    var yr = $("[data-year]");
    if (yr) yr.textContent = new Date().getFullYear();

    var form = $("[data-contact-form]");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        form.innerHTML = '<p class="eyebrow">Received</p><h3 style="font-family:var(--serif);font-size:1.75rem;margin-bottom:.75rem">Thank you.</h3>' +
          '<p class="lede">This is a demonstration storefront, so nothing was sent. In the shop we answer within one working day.</p>';
      });
    }
  });
})();
