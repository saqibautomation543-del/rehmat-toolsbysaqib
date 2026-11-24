/* ============================================================
   Rehmat Tools — homepage logic (index.html)
   Reads store from localStorage "rehmat_site_v1",
   falls back to DEFAULT_PRODUCTS / DEFAULT_SETTINGS.
   ============================================================ */
(function () {
  "use strict";
  var store = window.Store.load();
  var S = store.settings;          // settings shortcut
  var esc = window.RT.esc;
  var CATS = ["All", "AI Tools", "AI Video & Voice", "SEO Tools", "Streaming", "Music", "VPN", "Design", "Productivity"];
  var state = { cat: "All", q: "" };

  /* ---------- helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function waLink(text) { return window.RT.wa(S.whatsappNumber, text); }
  // Image with graceful fallback (competitor logos + posters)
  function imgTag(src, alt, cls) {
    var fb = "assets/img/posters/poster-h-chatgpt.webp";
    if (src && src.indexOf("logos/") !== -1) {
      fb = src.replace("assets/img/logos/", "assets/img/posters/poster-h-").replace(".jpg", ".webp");
    } else if (src && src.indexOf("posters/") !== -1) {
      fb = src.replace("assets/img/posters/poster-h-", "assets/img/logos/").replace(".webp", ".jpg");
    }
    return '<img src="' + esc(src) + '" alt="' + esc(alt) + '" class="' + (cls || "") + '"' +
      ' onerror="if(!this.dataset.fb){this.dataset.fb=\'1\';this.src=\'' + esc(fb) + '\';}else{this.outerHTML=\'<div class=&quot;img-fallback&quot;&gt;' + esc(alt.charAt(0).toUpperCase()) + '</div>\';}">';
  }
  function offPct(p) {
    if (!p.originalPrice || p.originalPrice <= p.price) return 0;
    return Math.round((1 - p.price / p.originalPrice) * 100);
  }

  /* ---------- 1. ticker ---------- */
  function renderTicker() {
    var t = S.tickerText || "";
    var half = '<span>' + esc(t) + '</span><span>•</span>';
    var html = "";
    for (var i = 0; i < 6; i++) html += half; // duplicated for seamless loop
    $("tickerTrack").innerHTML = html + html;
  }

  /* ---------- 3. category pills ---------- */
  function renderCats() {
    $("catPills").innerHTML = CATS.map(function (c) {
      return '<button class="pill' + (state.cat === c ? " active" : "") + '" data-cat="' + esc(c) + '">' + esc(c) + "</button>";
    }).join("");
    var btns = $("catPills").querySelectorAll("button");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        state.cat = this.getAttribute("data-cat");
        renderCats(); renderProducts();
      });
    }
  }

  /* ---------- 4. hero ---------- */
  function renderHero() {
    if ($("heroKicker")) $("heroKicker").textContent = S.heroKicker || "MEGA DEAL";
    if ($("heroTitle")) $("heroTitle").textContent = S.heroTitle || "Buy 2 Get 1 Free on all AI tools";
    if ($("heroSubtitle")) $("heroSubtitle").textContent = S.heroSubtitle || "Premium AI tools at the lowest prices in Pakistan. Instant delivery on WhatsApp.";
    
    var heroImgEl = $("heroImg");
    if (heroImgEl) {
      var posterSrc = S.heroImage || "assets/img/posters/poster-h-chatgpt.webp";
      if (!posterSrc.includes("-h-") && !posterSrc.includes("-p-")) {
        posterSrc = "assets/img/posters/poster-h-chatgpt.webp";
      }
      heroImgEl.innerHTML = 
        '<div class="hero-deal-card-3d">' +
          '<div class="hero-card-shine-wrap">' +
            '<div class="hero-live-badge">🔥 MEGA DEAL • 60% OFF</div>' +
            '<img src="' + esc(posterSrc) + '" alt="ChatGPT Plus AI Suite" class="hero-featured-poster" onerror="this.src=\'assets/img/posters/poster-h-chatgpt.webp\'">' +
            '<div class="hero-continuous-shine"></div>' +
          '</div>' +
          '<div class="hero-deal-footer">' +
            '<div class="hero-deal-title-row">' +
              '<span class="hero-deal-tag">⚡ LIMITED TIME OFFER</span>' +
              '<span class="hero-deal-status">● Live Now</span>' +
            '</div>' +
            '<div class="hero-timer-box">' +
              '<div class="hero-timer-title">ENDS IN:</div>' +
              '<div class="hero-timer-digits">' +
                '<div class="cd-slot"><span id="cdH">14</span><label>HRS</label></div>' +
                '<span class="cd-colon">:</span>' +
                '<div class="cd-slot"><span id="cdM">35</span><label>MIN</label></div>' +
                '<span class="cd-colon">:</span>' +
                '<div class="cd-slot"><span id="cdS">42</span><label>SEC</label></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
      startHeroCountdown();
    }

    var chips = (S.heroTrustChips || ["⚡ 45 Min Delivery", "🛡️ Warranty Included", "💳 JazzCash / Easypaisa"]).filter(Boolean);
    if ($("heroChips")) {
      $("heroChips").innerHTML = chips.map(function (c) {
        return '<span class="hero-chip">' + esc(c) + "</span>";
      }).join("");
    }
  }

  var cdTimerStarted = false;
  function startHeroCountdown() {
    if (cdTimerStarted) return;
    cdTimerStarted = true;
    var h = 14, m = 35, s = 42;
    setInterval(function() {
      s--;
      if (s < 0) { s = 59; m--; }
      if (m < 0) { m = 59; h--; }
      if (h < 0) { h = 23; }
      var hEl = $("cdH"), mEl = $("cdM"), sEl = $("cdS");
      if (hEl) hEl.textContent = (h < 10 ? "0" : "") + h;
      if (mEl) mEl.textContent = (m < 10 ? "0" : "") + m;
      if (sEl) sEl.textContent = (s < 10 ? "0" : "") + s;
    }, 1000);
  }

  /* ---------- 4b. stats strip ---------- */
  function renderStats() {
    var st = (S.heroStats || []).filter(function (x) { return x && (x.value || x.label); });
    var el = $("heroStats");
    if (!st.length) { if (el) el.style.display = "none"; return; }
    if (el) el.style.display = "";
    el.innerHTML = st.slice(0, 4).map(function (x) {
      return '<div class="stat-tile"><b>' + esc(x.value || "") + '</b><span>' + esc(x.label || "") + "</span></div>";
    }).join("");
  }

  /* ---------- 4c. featured deal ---------- */
  function renderFeaturedDeal() {
    var fd = S.featuredDeal || {};
    var sec = $("featuredDeal");
    if (!fd.enabled || !fd.productId) { if (sec) sec.style.display = "none"; return; }
    var prod = null;
    for (var i = 0; i < store.products.length; i++) if (store.products[i].id === fd.productId) prod = store.products[i];
    if (!prod) { if (sec) sec.style.display = "none"; return; }
    if (sec) sec.style.display = "";
    var pct = offPct(prod);
    var points = (fd.points || []).filter(Boolean).map(function (pt) {
      return "<li>✓ " + esc(pt) + "</li>";
    }).join("");
    sec.innerHTML =
      '<div class="deal-card">' +
        '<div class="deal-img">' + imgTag(prod.img, prod.name) + "</div>" +
        "<div>" +
          '<div class="deal-badge">' + esc(fd.badge || "Featured Deal") + "</div>" +
          '<h3 class="deal-title">' + esc(fd.title || prod.name) + "</h3>" +
          '<div class="deal-name">' + esc(prod.name) + "</div>" +
          '<ul class="deal-points">' + points + "</ul>" +
          '<div class="deal-price-row"><span class="deal-price">' + window.RT.money(prod.price) + "</span>" +
          (prod.originalPrice > prod.price ? '<span class="price-old">' + window.RT.money(prod.originalPrice) + "</span>" : "") +
          (pct ? '<span class="off-badge">' + pct + "% OFF</span>" : "") + "</div>" +
          '<div class="deal-btns">' +
            '<a class="btn btn-light" href="' + waLink("A.o.a, I want the featured deal: " + prod.name) + '" target="_blank" rel="noopener">⚡ Grab Deal Now</a>' +
            '<a class="btn btn-green" href="' + waLink("A.o.a, I want the featured deal: " + prod.name) + '" target="_blank" rel="noopener">💬 Order on WhatsApp</a>' +
          "</div>" +
        "</div>" +
      "</div>";
  }

  /* ---------- 4d. trust bar ---------- */
  function renderTrustBar() {
    var bar = $("trustBar");
    var t = (S.trustBar || "").trim();
    if (!S.trustBarEnabled || !t) { if (bar) bar.style.display = "none"; return; }
    if (bar) bar.style.display = "";
    var half = '<span>' + esc(t) + '</span><span>✦</span>';
    var html = "";
    for (var i = 0; i < 4; i++) html += half;
    $("trustBarTrack").innerHTML = html + html;
  }

  /* ---------- popular searches ---------- */
  function renderPopSearches() {
    var list = (S.popularSearches || []).filter(Boolean);
    var el = $("popSearches");
    if (!list.length) { if (el) el.style.display = "none"; return; }
    if (el) el.style.display = "";
    el.innerHTML = '<span class="pop-label">Popular:</span>' + list.map(function (q) {
      return '<button class="pop-chip" data-q="' + esc(q) + '">' + esc(q) + "</button>";
    }).join("");
    var btns = el.querySelectorAll(".pop-chip");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        state.q = this.getAttribute("data-q");
        $("searchInput").value = state.q;
        state.cat = "All"; renderCats(); renderProducts();
        document.getElementById("products").scrollIntoView({ behavior: "smooth" });
      });
    }
  }

  /* ---------- 5. tools marquee ---------- */
  function renderMarquee() {
    var items = store.products.map(function (p) {
      return imgTag(p.img, p.name);
    }).join("");
    // duplicate the list for a seamless infinite loop
    $("marqueeTrack").innerHTML = items + items;
  }

  /* ---------- 6. products grid ---------- */
  function filteredProducts() {
    var q = state.q.trim().toLowerCase();
    return store.products.filter(function (p) {
      var okCat = state.cat === "All" || p.category === state.cat;
      var okQ = !q || (p.name + " " + p.category).toLowerCase().indexOf(q) !== -1;
      return okCat && okQ;
    });
  }
  function cardHTML(p) {
    var vars = p.variations || [{ duration: p.validity || '1 Month', price: p.price, oldPrice: p.originalPrice }];
    var activeIdx = p.activeVariationIndex || 0;
    var activeVar = vars[activeIdx] || vars[0];

    var pct = (activeVar.oldPrice > activeVar.price) ? Math.round(((activeVar.oldPrice - activeVar.price) / activeVar.oldPrice) * 100) : 0;
    
    // Top-Left Badges (Competitor Style)
    var tlBadges = [];
    if (p.bestSeller || (p.sold && p.sold > 15) || p.id.indexOf("chatgpt") !== -1 || p.id.indexOf("canva") !== -1 || p.id.indexOf("surfshark") !== -1) {
      tlBadges.push('<span class="card-badge is-bestseller">🔥 Best Seller</span>');
    }
    if (pct >= 15) {
      tlBadges.push('<span class="card-badge is-save">Save ' + pct + '%</span>');
    }

    // Bottom image overlay badges (Competitor Style)
    var stockText = (p.stock === 0) ? 'Out of Stock' : 'In Stock • 30-60m';
    var dotColor = (p.stock === 0) ? '#EF4444' : '#22C55E';
    var pkgText = (vars.length > 1) ? ('📦 ' + vars.length + ' Packages') : ('📦 ' + (activeVar.duration || '1 Month'));

    var meta = [];
    if (p.accessType) meta.push("🔒 " + esc(p.accessType));
    if (p.warranty) meta.push("🛡️ " + esc(p.warranty));

    var priceTxt = (activeVar.price > 0) ? window.RT.money(activeVar.price) : "💬 Price on WhatsApp";
    var oldPriceTxt = (activeVar.oldPrice > activeVar.price) ? '<span class="price-old" id="pold-' + esc(p.id) + '">' + window.RT.money(activeVar.oldPrice) + '</span>' : '';
    
    // Duration selector pills (1M, 6M, 12M etc.)
    var durationPills = "";
    if (vars.length > 1) {
      durationPills = '<div class="card-duration-selector" data-id="' + esc(p.id) + '">';
      for (var vi = 0; vi < vars.length; vi++) {
        var v = vars[vi];
        var isAct = (vi === activeIdx) ? ' active' : '';
        durationPills += '<button type="button" class="dur-pill' + isAct + '" onclick="window.selectProductVariation(\'' + esc(p.id) + '\', ' + vi + ')" data-id="' + esc(p.id) + '" data-vi="' + vi + '">' + esc(v.label || v.duration) + '</button>';
      }
      durationPills += '</div>';
    }

    var waMsg = "A.o.a i want to discuss about " + p.name + " (" + activeVar.duration + ") for Rs. " + activeVar.price;
    var orderBtn = (p.stock === 0)
      ? '<a class="btn btn-green" id="wbtn-' + esc(p.id) + '" data-act="order" href="' + waLink("A.o.a, is " + p.name + " available?") + '" target="_blank" rel="noopener">💬 Ask on WhatsApp</a>'
      : '<a class="btn btn-green" id="wbtn-' + esc(p.id) + '" data-act="order" href="' + waLink(waMsg) + '" target="_blank" rel="noopener">💬 Order on WhatsApp</a>';

    var inWish = (typeof getWish === 'function' && getWish().indexOf(p.id) !== -1);

    return '<div class="card" data-id="' + esc(p.id) + '">' +
      '<div class="card-img">' +
        (tlBadges.length ? '<div class="card-badges-tl">' + tlBadges.join('') + '</div>' : '') +
        '<div class="card-actions-tr">' +
          '<button type="button" class="card-circle-btn" data-act="wish" data-id="' + esc(p.id) + '" title="Wishlist">' + (inWish ? '❤️' : '🤍') + '</button>' +
          '<button type="button" class="card-circle-btn" data-act="details" title="View details">👁️</button>' +
        '</div>' +
        imgTag(p.img, p.name) +
        '<div class="card-img-bottom-bar">' +
          '<span class="card-stock-pill"><i class="stock-dot" style="background:' + dotColor + ';box-shadow:0 0 8px ' + dotColor + '"></i><span>' + stockText + '</span></span>' +
          '<span class="card-pkg-pill" id="ppkg-' + esc(p.id) + '">' + esc(pkgText) + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="card-body">' +
        '<div class="card-cat">' + esc(p.category || "") + "</div>" +
        '<div class="card-name">' + esc(p.name) + "</div>" +
        (meta.length ? '<div class="card-meta">' + meta.join(" • ") + "</div>" : "") +
        (p.about ? '<div class="card-desc">' + esc(p.about) + "</div>" : "") +
        durationPills +
        '<div class="price-block"><span class="price-label">' + (vars.length > 1 ? "SELECTED DURATION PRICE" : "PLAN PRICE") + '</span>' +
        '<div class="price-row"><span class="price" id="pprice-' + esc(p.id) + '">' + priceTxt + "</span>" +
        oldPriceTxt +
        '<span class="validity" id="pval-' + esc(p.id) + '">🕐 ' + esc(activeVar.duration) + "</span></div></div>" +
        '<div class="card-actions">' +
          orderBtn +
          '<button class="btn btn-outline" data-act="quickadd" type="button" onclick="window.quickAddProductWithVariation(\'' + esc(p.id) + '\')">🛒 Add</button>' +
          '<button class="btn btn-outline" data-act="details" type="button">Details</button>' +
        "</div>" +
      "</div>" +
    "</div>";
  }

  // Global helper for interactive duration selection
  window.selectProductVariation = function(prodId, varIndex) {
    var p = findProduct(prodId);
    if (!p || !p.variations || !p.variations[varIndex]) return;
    p.activeVariationIndex = varIndex;
    var v = p.variations[varIndex];

    // Update displayed price
    var priceEl = document.getElementById('pprice-' + prodId);
    if (priceEl) priceEl.innerText = window.RT.money(v.price);

    // Update old price
    var oldEl = document.getElementById('pold-' + prodId);
    if (oldEl) {
      if (v.oldPrice > v.price) {
        oldEl.innerText = window.RT.money(v.oldPrice);
        oldEl.style.display = 'inline';
      } else {
        oldEl.style.display = 'none';
      }
    }

    // Update validity
    var valEl = document.getElementById('pval-' + prodId);
    if (valEl) valEl.innerText = '🕐 ' + v.duration;

    // Update WhatsApp link
    var wbtn = document.getElementById('wbtn-' + prodId);
    if (wbtn) {
      var msg = "A.o.a i want to discuss about " + p.name + " (" + v.duration + ") for Rs. " + v.price;
      wbtn.href = waLink(msg);
    }

    // Update active pill styling
    var container = document.querySelector('.card-duration-selector[data-id="' + prodId + '"]');
    if (container) {
      var buttons = container.querySelectorAll('.dur-pill');
      buttons.forEach(function(b, idx) {
        if (idx === varIndex) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
    }
  };

  // Quick add with active variation
  window.quickAddProductWithVariation = function(prodId) {
    var p = findProduct(prodId);
    if (!p) return;
    var vars = p.variations || [{ duration: p.validity || '1 Month', price: p.price }];
    var activeVar = vars[p.activeVariationIndex || 0];

    addToCart(prodId, activeVar.duration, activeVar.price);
    toastCart(p.name + " (" + activeVar.duration + ") added to cart ✓");
  };

  function openDetails(id) {
    var p = null;
    for (var i = 0; i < store.products.length; i++) if (store.products[i].id === id) p = store.products[i];
    if (!p) return;
    var pct = offPct(p);
    var feats = (p.features || []).map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("");
    // payment methods box
    var pms = (S.paymentMethods || []).filter(function (m) { return m.visible; });
    var payRows = pms.map(function (m) {
      var detail = (m.number && String(m.number).trim())
        ? esc(m.number) + (m.accountTitle ? " (" + esc(m.accountTitle) + ")" : "")
        : "Details will be shared on WhatsApp";
      return '<div class="pay-row"><span class="pm-name">' + esc(m.name) + '</span><span class="pm-num">' + detail + "</span></div>";
    }).join("");
    // related: same category, up to 4, excluding self
    var rel = store.products.filter(function (x) { return x.category === p.category && x.id !== p.id; }).slice(0, 4);
    var relHtml = rel.length ? rel.map(function (r) {
      return '<div class="rel-card" data-rel="' + esc(r.id) + '">' + imgTag(r.img, r.name) + "<div>" + esc(r.name) + "</div></div>";
    }).join("") : '<p style="font-size:13px;color:#8a8271">No related products.</p>';

    $("detailsBody").innerHTML =
      '<div class="det-grid">' +
        "<div>" + imgTag(p.img, p.name, "det-img") + "</div>" +
        "<div>" +
          '<div class="det-badges">' +
            '<span class="badge">' + esc(p.category || "") + "</span>" +
            '<span class="badge badge-green">Available</span>' +
            '<span class="badge">Validity: ' + esc(p.validity || "") + "</span>" +
          "</div>" +
          '<div class="det-name">' + esc(p.name) + "</div>" +
          '<div class="det-price-row"><span class="price" style="font-size:26px">' + window.RT.money(p.price) + "</span>" +
          (p.originalPrice > p.price ? '<span class="price-old">' + window.RT.money(p.originalPrice) + "</span>" : "") +
          (pct ? '<span class="off-badge">' + pct + "% OFF</span>" : "") + "</div>" +
          '<div class="whatfor-box"><h4>🎯 What is this tool for?</h4><p>' + esc(p.about || "") + "</p></div>" +
          '<ul class="det-feats">' + feats + "</ul>" +
          '<div class="pay-box"><h4>💳 Payment methods</h4>' + payRows + "</div>" +
          '<a class="btn btn-dark det-order" href="' + waLink("A.o.a i want to discuss about " + p.name) + '" target="_blank" rel="noopener">💬 Order Now on WhatsApp</a>' +
        "</div>" +
      "</div>" +
      '<div class="trust-row">' +
        '<div class="trust-item"><b>✔ Confirmed first</b><span>Price & plan agreed on WhatsApp</span></div>' +
        '<div class="trust-item"><b>⚡ Fast delivery</b><span>Access after confirmation</span></div>' +
        '<div class="trust-item"><b>💬 Real human support</b><span>On WhatsApp, 24/7</span></div>' +
        '<div class="trust-item"><b>🛡 25-day warranty</b><span>Free replacement cover</span></div>' +
      "</div>" +
      '<div class="related"><h4>Related products</h4><div class="related-row">' + relHtml + "</div></div>";

    var relCards = $("detailsBody").querySelectorAll("[data-rel]");
    for (var j = 0; j < relCards.length; j++) {
      relCards[j].addEventListener("click", function () { openDetails(this.getAttribute("data-rel")); });
    }
    openOverlay("detailsOverlay");
  }
  function openPolicy(i) {
    var pols = (S.policies || []).filter(function (x) { return x && x.title; });
    var p = pols[i];
    if (!p) return;
    $("policyTitle").textContent = p.title;
    $("policyText").textContent = p.text || "";
    openOverlay("policyOverlay");
  }
  function openOverlay(id) { $(id).classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeOverlay(id) { $(id).classList.remove("open"); document.body.style.overflow = ""; }

  /* ---------- 13. floating elements ---------- */
  var PROOFS = [
    "<b>Ali</b> bought Super Grok — 30 minutes ago",
    "<b>Ahmed</b> bought ChatGPT Plus — 42 minutes ago",
    "<b>Fatima</b> bought Netflix — 15 minutes ago",
    "<b>Usman</b> bought CapCut Pro — 55 minutes ago"
  ];
  var proofIdx = 0;
  function initCouponWidget() {
    var w = $("couponWidget");
    if (!w) return;
    var act = (S.coupons || []).filter(function (c) { return c.active; });
    if (!S.couponWidgetEnabled || !act.length) { w.style.display = "none"; return; }
    var c = act[0];
    $("cwCode").textContent = c.code;
    $("cwSub").textContent = c.percent + "% off — mention this code on WhatsApp";
    w.style.display = "block";
    $("couponWidgetClose").addEventListener("click", function () { w.style.display = "none"; });
    $("cwCopy").addEventListener("click", function () {
      var done = function () { $("cwCopy").textContent = "Copied ✓"; setTimeout(function () { $("cwCopy").textContent = "Copy"; }, 1500); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(c.code).then(done, done);
      else done();
    });
  }
  function initFloating() {
    initCouponWidget();
    // WhatsApp channel popup after 12s
    setTimeout(function () { $("channelPopup").classList.add("show"); }, 12000);
    $("channelClose").addEventListener("click", function () { $("channelPopup").classList.remove("show"); });
    $("channelJoin").href = S.channelLink;
    // social proof toast every 45s
    setInterval(function () {
      var t = $("socialToast");
      t.innerHTML = PROOFS[proofIdx % PROOFS.length];
      proofIdx++;
      t.classList.add("show");
      setTimeout(function () { t.classList.remove("show"); }, 5000);
    }, 45000);
    // FAB
    $("waFab").href = waLink("A.o.a i want to discuss about a tool");
  }

  /* ---------- 12. cart + wishlist (localStorage, WhatsApp checkout) ---------- */
  var CART_KEY = "rehmat_cart_v1";
  var WISH_KEY = "rehmat_wish_v1";
  function loadList(key) {
    try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch (e) { return []; }
  }
  function saveList(key, list) { localStorage.setItem(key, JSON.stringify(list)); }
  function getCart() { return loadList(CART_KEY); }
  function getWish() { return loadList(WISH_KEY); }
  function isWished(id) { return getWish().indexOf(id) !== -1; }
  function addToCart(id) {
    var cart = getCart();
    var line = null;
    for (var i = 0; i < cart.length; i++) if (cart[i].id === id) line = cart[i];
    if (line) line.qty++;
    else cart.push({ id: id, qty: 1 });
    saveList(CART_KEY, cart);
    renderCartBadge();
  }
  function toggleWish(id) {
    var w = getWish();
    var i = w.indexOf(id);
    if (i === -1) w.push(id); else w.splice(i, 1);
    saveList(WISH_KEY, w);
    renderCartBadge();
  }
  function findProduct(id) {
    for (var i = 0; i < store.products.length; i++) if (store.products[i].id === id) return store.products[i];
    return null;
  }
  function renderCartBadge() {
    var n = getCart().reduce(function (a, l) { return a + l.qty; }, 0);
    $("cartCount").textContent = n;
    $("cartTabCount").textContent = n;
    $("wishTabCount").textContent = getWish().length;
  }
  function cartTotal() {
    return getCart().reduce(function (a, l) {
      var p = findProduct(l.id);
      return a + (p ? (Number(p.price) || 0) * l.qty : 0);
    }, 0);
  }
  function renderCart() {
    var cart = getCart();
    var list = $("cartList");
    if (!cart.length) {
      list.innerHTML = '<p style="text-align:center;color:#8a8271;padding:20px">Your cart is empty. Tap <b>Quick Add</b> on any product.</p>';
    } else {
      list.innerHTML = cart.map(function (l) {
        var p = findProduct(l.id);
        if (!p) return "";
        return '<div class="cart-line"><img src="' + esc(p.img) + '" alt="" onerror="this.style.visibility=\'hidden\'">' +
          '<div class="cart-line-info"><b>' + esc(p.name) + '</b><span>' + window.RT.money(p.price) + (p.validity ? " · " + esc(p.validity) : "") + "</span></div>" +
          '<div class="cart-qty"><button data-qty="-1" data-id="' + esc(p.id) + '">−</button><span>' + l.qty + '</span><button data-qty="1" data-id="' + esc(p.id) + '">+</button></div>' +
          '<button class="cart-rm" data-rm="' + esc(p.id) + '">✕</button></div>';
      }).join("");
    }
    var wish = getWish();
    $("wishList").innerHTML = wish.length ? wish.map(function (id) {
      var p = findProduct(id);
      if (!p) return "";
      return '<div class="cart-line"><img src="' + esc(p.img) + '" alt="" onerror="this.style.visibility=\'hidden\'">' +
        '<div class="cart-line-info"><b>' + esc(p.name) + '</b><span>' + window.RT.money(p.price) + "</span></div>" +
        '<button class="btn btn-green btn-sm" data-wish-add="' + esc(p.id) + '">＋ Add to Cart</button>' +
        '<button class="cart-rm" data-wish-rm="' + esc(p.id) + '">✕</button></div>';
    }).join("") : '<p style="text-align:center;color:#8a8271;padding:20px">No wishlisted items yet.</p>';
    var total = cartTotal();
    $("cartTotal").innerHTML = cart.length ? "<b>Total: " + window.RT.money(total) + "</b>" : "";
    var msg = "A.o.a, I want to order:%0A";
    cart.forEach(function (l) {
      var p = findProduct(l.id);
      if (p) msg += "• " + p.name + " x" + l.qty + " — " + window.RT.money(p.price) + "%0A";
    });
    if (cart.length) msg += "Total: " + window.RT.money(total);
    $("cartWaBtn").href = "https://wa.me/" + (S.whatsappNumber || "923147505963") + "?text=" + msg;
    var qs = list.querySelectorAll("[data-qty]");
    for (var i = 0; i < qs.length; i++) qs[i].addEventListener("click", function () {
      var id = this.getAttribute("data-id");
      var d = Number(this.getAttribute("data-qty"));
      var c = getCart();
      for (var k = 0; k < c.length; k++) if (c[k].id === id) { c[k].qty += d; if (c[k].qty <= 0) c.splice(k, 1); }
      saveList(CART_KEY, c); renderCartBadge(); renderCart();
    });
    var rms = list.querySelectorAll("[data-rm]");
    for (var j = 0; j < rms.length; j++) rms[j].addEventListener("click", function () {
      var id = this.getAttribute("data-rm");
      saveList(CART_KEY, getCart().filter(function (l) { return l.id !== id; }));
      renderCartBadge(); renderCart();
    });
    var was = document.querySelectorAll("[data-wish-add]");
    for (var m = 0; m < was.length; m++) was[m].addEventListener("click", function () {
      addToCart(this.getAttribute("data-wish-add"));
      renderCart();
    });
    var wrms = document.querySelectorAll("[data-wish-rm]");
    for (var n2 = 0; n2 < wrms.length; n2++) wrms[n2].addEventListener("click", function () {
      toggleWish(this.getAttribute("data-wish-rm"));
      renderCart(); renderProducts();
    });
  }
  function toastCart(msg) {
    var t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2200);
  }
  function initCart() {
    $("headerWaBtn").href = waLink("A.o.a, I want to order a tool");
    $("cartBtn").addEventListener("click", function () { renderCart(); openOverlay("cartOverlay"); });
    $("cartClose").addEventListener("click", function () { closeOverlay("cartOverlay"); });
    $("cartOverlay").addEventListener("click", function (e) { if (e.target === this) closeOverlay("cartOverlay"); });
    var tabs = document.querySelectorAll("[data-ctab]");
    for (var i = 0; i < tabs.length; i++) tabs[i].addEventListener("click", function () {
      var tab = this.getAttribute("data-ctab");
      for (var j = 0; j < tabs.length; j++) tabs[j].classList.toggle("active", tabs[j] === this);
      $("cartList").style.display = tab === "cart" ? "" : "none";
      $("wishList").style.display = tab === "wish" ? "" : "none";
      $("cartTotal").style.display = tab === "cart" ? "" : "none";
      $("cartWaBtn").style.display = tab === "cart" ? "" : "none";
    });
    renderCartBadge();
  }

  /* ---------- header: search + reviews button ---------- */
  function initHeader() {
    $("searchInput").addEventListener("input", function () {
      state.q = this.value;
      renderProducts();
    });
    var cs = $("courseSearch");
    if (cs) cs.addEventListener("input", function () {
      courseState.q = this.value;
      renderCourses();
    });
    $("policyClose").addEventListener("click", function () { closeOverlay("policyOverlay"); });
    $("policyOverlay").addEventListener("click", function (e) { if (e.target === this) closeOverlay("policyOverlay"); });
    $("reviewsBtn").addEventListener("click", function () {
      var el = $("reviews");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ---------- footer ---------- */
  function renderFooter() {
    $("waContactLink").href = waLink("A.o.a");
    $("waContactLink").textContent = "WhatsApp: 0314-7505963";
    $("channelFooterLink").href = S.channelLink;
    if (S.footerAbout) $("footerAbout").textContent = S.footerAbout;
    $("waChatNow").href = waLink("A.o.a, I need help");
    $("trackOrderLink").href = waLink("A.o.a, I want to track my order");
    var fe = $("footerEmail");
    if (fe) fe.innerHTML = S.supportEmail ? "✉️ Email Support: <b>" + esc(S.supportEmail) + "</b> • Delivery time: 45 minutes" : "Delivery time: 45 minutes";
    var ft = $("footerTrust");
    if (ft) ft.textContent = S.footerTrust || "";
    // footer stats row (from hero stats)
    var fs = $("footerStats");
    if (fs) {
      var st2 = (S.heroStats || []).filter(function (x) { return x && (x.value || x.label); });
      fs.innerHTML = st2.slice(0, 4).map(function (x) {
        return '<div class="fstat"><b>' + esc(x.value || "") + '</b><span>' + esc(x.label || "") + "</span></div>";
      }).join("");
    }
    // popular subscriptions (best sellers first, up to 12)
    var fp2 = $("footerPop");
    if (fp2) {
      var pops = store.products.slice().sort(function (a, b) { return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0); }).slice(0, 12);
      fp2.innerHTML = pops.length ? "<b>Popular Subscriptions:</b> " + pops.map(function (p) {
        return '<a href="#products" data-pop="' + esc(p.id) + '">' + esc(p.name) + "</a>";
      }).join(" • ") : "";
      var as2 = fp2.querySelectorAll("a[data-pop]");
      for (var pi = 0; pi < as2.length; pi++) {
        as2[pi].addEventListener("click", function () {
          var id = this.getAttribute("data-pop");
          var p = null;
          for (var k = 0; k < store.products.length; k++) if (store.products[k].id === id) p = store.products[k];
          if (p) { state.q = p.name; $("searchInput").value = p.name; state.cat = "All"; renderCats(); renderProducts(); }
        });
      }
    }
    // refund notice + policy links
    var rn = $("refundNoticeText");
    if (rn) rn.textContent = S.refundNotice || "";
    var pols = (S.policies || []).filter(function (x) { return x && x.title; });
    var fpl = $("footerPolicies");
    if (fpl) {
      fpl.innerHTML = pols.map(function (x, i) {
        return '<li><a href="#" data-policy="' + i + '">' + esc(x.title) + "</a></li>";
      }).join("");
      var pls = fpl.querySelectorAll("a[data-policy]");
      for (var qi = 0; qi < pls.length; qi++) {
        pls[qi].addEventListener("click", function (e) {
          e.preventDefault();
          openPolicy(Number(this.getAttribute("data-policy")));
        });
      }
    }
    var fpl2 = $("footerPolicyLinks");
    if (fpl2) {
      fpl2.innerHTML = pols.map(function (x, i) {
        return '<a href="#" data-policy="' + i + '">' + esc(x.title) + "</a>";
      }).join(" • ");
      var pls2 = fpl2.querySelectorAll("a[data-policy]");
      for (var qj = 0; qj < pls2.length; qj++) {
        pls2[qj].addEventListener("click", function (e) {
          e.preventDefault();
          openPolicy(Number(this.getAttribute("data-policy")));
        });
      }
    }
    var fp = $("footerPays");
    if (fp) {
      var pms = (S.paymentMethods || []).filter(function (m) { return m.visible; });
      fp.innerHTML = pms.length ? "<b>Payment Methods:</b> " + pms.map(function (m) { return esc(m.name); }).join(" • ") : "";
    }
    var links = CATS.slice(1).map(function (c) {
      return '<li><a href="#products" data-footcat="' + esc(c) + '">' + esc(c) + "</a></li>";
    }).join("");
    $("footerCats").innerHTML = links;
    var as = $("footerCats").querySelectorAll("a");
    for (var i = 0; i < as.length; i++) {
      as[i].addEventListener("click", function () {
        state.cat = this.getAttribute("data-footcat");
        state.q = ""; $("searchInput").value = "";
        renderCats(); renderProducts();
      });
    }
  }

  /* ---------- boot ---------- */
  function init() {
    renderTicker(); renderCats(); renderHero(); renderStats(); renderFeaturedDeal(); renderTrustBar();
    renderPopSearches(); renderMarquee();
    renderProducts(); renderTrial(); renderCourseCats(); renderCourses(); renderFeatures(); renderFaq(); renderCta(); renderGuidance(); renderFooter(); initCart();
    renderReviews(); initReviewForm(); renderHow();
    initWelcome(); initFloating(); initHeader();
    $("detailsClose").addEventListener("click", function () { closeOverlay("detailsOverlay"); });
    $("detailsOverlay").addEventListener("click", function (e) { if (e.target === this) closeOverlay("detailsOverlay"); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();



/* ============================================================
   REHMAT TOOLS — 1,056 COURSES VAULT SYSTEM (12 CATEGORIES)
   ============================================================ */
var ALL_COURSES = [];
var COURSE_CATEGORIES = [];
var activeCourseCat = 'All';
var activeCourseSearch = '';
var currentCoursePage = 1;
var COURSES_PER_PAGE = 16;

function initCoursesEngine() {
  fetch('all_1056_courses.json')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      ALL_COURSES = data.courses || [];
      COURSE_CATEGORIES = data.categories || [];
      renderCourseCats();
      renderCoursesGrid();
      setupCourseSearch();
    })
    .catch(function(err) {
      console.log('Courses loading notice:', err);
    });
}

function renderCourseCats() {
  var catContainer = document.getElementById('courseCats');
  if (!catContainer) return;

  var html = '<button type="button" class="course-cat-pill active" onclick="setCourseCategory(\'All\', this)">🔥 All Courses (1,056)</button>';
  for (var i = 0; i < COURSE_CATEGORIES.length; i++) {
    var c = COURSE_CATEGORIES[i];
    html += '<button type="button" class="course-cat-pill" onclick="setCourseCategory(\'' + c.id + '\', this)">' + c.icon + ' ' + c.label + ' (88)</button>';
  }
  catContainer.innerHTML = html;
}

window.setCourseCategory = function(catId, btn) {
  var pills = document.querySelectorAll('.course-cat-pill');
  pills.forEach(function(p) { p.classList.remove('active'); });
  if (btn) btn.classList.add('active');

  activeCourseCat = catId;
  currentCoursePage = 1;
  renderCoursesGrid();
};

function setupCourseSearch() {
  var searchInput = document.getElementById('courseSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      activeCourseSearch = this.value.toLowerCase().trim();
      currentCoursePage = 1;
      renderCoursesGrid();
    });
  }
}

function getFilteredCourses() {
  var list = ALL_COURSES;
  if (activeCourseCat !== 'All') {
    list = list.filter(function(c) { return c.category === activeCourseCat; });
  }
  if (activeCourseSearch) {
    list = list.filter(function(c) {
      return c.title.toLowerCase().indexOf(activeCourseSearch) !== -1 ||
             c.baseTopic.toLowerCase().indexOf(activeCourseSearch) !== -1 ||
             c.categoryLabel.toLowerCase().indexOf(activeCourseSearch) !== -1;
    });
  }
  return list;
}

function renderCoursesGrid() {
  var grid = document.getElementById('courseGrid');
  var countEl = document.getElementById('courseCount');
  if (!grid) return;

  var filtered = getFilteredCourses();
  if (countEl) {
    countEl.textContent = 'Showing ' + Math.min(currentCoursePage * COURSES_PER_PAGE, filtered.length) + ' of ' + filtered.length + ' courses';
  }

  var visible = filtered.slice(0, currentCoursePage * COURSES_PER_PAGE);
  if (!visible.length) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#8a8271;padding:30px">No courses found matching your search. Try another keyword.</p>';
    return;
  }

  var html = visible.map(function(c) {
    var imgPath = c.image.replace('public/courses/', 'assets/img/courses/');
    return '<div class="course-card-box">' +
      '<div class="course-banner-top">' +
        '<img src="' + imgPath + '" alt="' + esc(c.title) + '" onerror="this.onerror=null; this.src=\'assets/img/posters/poster-h-chatgpt.webp\';">' +
        '<span class="course-free-badge">100% Free</span>' +
      '</div>' +
      '<div style="padding: 18px; display: flex; flex-direction: column; flex: 1;">' +
        '<span style="font-size: 11px; font-weight: 800; color: #2563EB; text-transform: uppercase; margin-bottom: 4px;">' + esc(c.categoryLabel) + '</span>' +
        '<h4 style="font-size: 15px; font-weight: 800; color: #111827; margin-bottom: 8px; line-height: 1.3;">' + esc(c.title) + '</h4>' +
        '<div style="font-size: 12px; color: #6B7280; margin-bottom: 16px; display: flex; gap: 10px; flex-wrap: wrap;">' +
          '<span>⏱️ ' + esc(c.hours) + '</span>' +
          '<span>📚 ' + esc(c.lessons) + '</span>' +
          '<span>👥 ' + esc(c.enrolled) + '</span>' +
        '</div>' +
        '<div style="border-top: 1px solid #E5E7EB; padding-top: 12px; margin-top: auto; display: flex; align-items: center; justify-content: space-between;">' +
          '<div>' +
            '<span style="font-size: 11px; color: #9CA3AF; text-decoration: line-through;">' + esc(c.oldPrice) + '</span>' +
            '<div style="font-weight: 900; color: #16A34A; font-size: 14px;">FREE ACCESS</div>' +
          '</div>' +
          '<button type="button" class="btn btn-primary" onclick="openClaimCourseModal(\'' + c.id + '\')" style="padding: 8px 16px; font-size: 12px; border-radius: 999px;">' +
            'Claim Free →' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  // Add load more button if items remain
  if (visible.length < filtered.length) {
    html += '<div style="grid-column: 1 / -1; text-align: center; margin-top: 24px;">' +
      '<button type="button" class="btn btn-outline" onclick="loadMoreCoursesPage()" style="padding: 12px 30px; font-size: 13px; font-weight: 700; border-radius: 999px;">' +
        'Load More Courses (' + (filtered.length - visible.length) + ' remaining) ↓' +
      '</button>' +
    '</div>';
  }

  grid.innerHTML = html;
}

window.loadMoreCoursesPage = function() {
  currentCoursePage++;
  renderCoursesGrid();
};

window.openClaimCourseModal = function(courseId) {
  var c = ALL_COURSES.find(function(item) { return item.id === courseId; });
  if (!c) return;

  var customDrive = localStorage.getItem('rehmat_tools_custom_drive_url');
  var finalDriveUrl = customDrive || c.driveFolderUrl;

  var titleEl = document.getElementById('claimCourseTitle');
  var catEl = document.getElementById('claimCourseCategory');
  var metaEl = document.getElementById('claimCourseMeta');
  var driveBtn = document.getElementById('btnClaimDriveLink');

  if (titleEl) titleEl.innerText = c.title;
  if (catEl) catEl.innerText = c.categoryLabel;
  if (metaEl) metaEl.innerText = c.hours + ' • ' + c.lessons + ' • ' + c.enrolled;
  if (driveBtn) driveBtn.href = finalDriveUrl;

  var modal = document.getElementById('claimCourseModal');
  if (modal) modal.style.display = 'flex';
};

window.closeClaimCourseModal = function() {
  var modal = document.getElementById('claimCourseModal');
  if (modal) modal.style.display = 'none';
};

// Auto-boot courses engine on document ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCoursesEngine);
} else {
  initCoursesEngine();
}
