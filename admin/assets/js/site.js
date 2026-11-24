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
  // Image with graceful fallback (images are added to assets/img/posters later)
  function imgTag(src, alt, cls) {
    return '<img src="' + esc(src) + '" alt="' + esc(alt) + '" class="' + (cls || "") + '"' +
      ' onerror="this.outerHTML=\'<div class=&quot;img-fallback&quot;&gt;' + esc(alt.charAt(0).toUpperCase()) + '</div>\'">';
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
    $("heroKicker").textContent = S.heroKicker || "";
    $("heroTitle").textContent = S.heroTitle || "";
    $("heroSubtitle").textContent = S.heroSubtitle || "";
    $("heroImg").innerHTML = imgTag(S.heroImage, "Offer");
    var chips = (S.heroTrustChips || []).filter(Boolean);
    $("heroChips").innerHTML = chips.map(function (c) {
      return '<span class="hero-chip">' + esc(c) + "</span>";
    }).join("");
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
    var pct = offPct(p);
    var badges = "";
    if (p.bestSeller) badges += '<span class="best-badge">🔥 Best Seller</span>';
    if (p.sold > 0) badges += '<span class="sold-badge">' + p.sold + " Sold</span>";
    if (p.stock === 0) badges += '<span class="stock-badge">Stock End</span>';
    if (p.trial && p.stock !== 0) badges += '<span class="trial-badge">🎁 Trial</span>';
    var savePill = (pct > 0) ? '<span class="save-badge">Save ' + pct + "%</span>" : "";
    var meta = [];
    if (p.accessType) meta.push("🔒 " + esc(p.accessType));
    if (p.warranty) meta.push("🛡️ " + esc(p.warranty));
    var priceTxt = (p.price > 0) ? window.RT.money(p.price) : "💬 Price on WhatsApp";
    var orderBtn = (p.stock === 0)
      ? '<a class="btn btn-green" data-act="order" href="' + waLink("A.o.a, is " + p.name + " available?") + '" target="_blank" rel="noopener">💬 Ask on WhatsApp</a>'
      : '<a class="btn btn-green" data-act="order" href="' + waLink("A.o.a i want to discuss about " + p.name) + '" target="_blank" rel="noopener">💬 Order on WhatsApp</a>';
    return '<div class="card" data-id="' + esc(p.id) + '">' +
      '<div class="card-img"><div class="card-badges">' + badges + "</div>" + savePill + imgTag(p.img, p.name) + "</div>" +
      '<div class="card-body">' +
        '<div class="card-cat">' + esc(p.category || "") + "</div>" +
        '<div class="card-name">' + esc(p.name) + "</div>" +
        (meta.length ? '<div class="card-meta">' + meta.join(" • ") + "</div>" : "") +
        (p.about ? '<div class="card-desc">' + esc(p.about) + "</div>" : "") +
        '<div class="price-block"><span class="price-label">' + (p.startingAt ? "STARTING AT" : "PLAN PRICE") + '</span>' +
        '<div class="price-row"><span class="price">' + priceTxt + "</span>" +
        (p.originalPrice > p.price ? '<span class="price-old">' + window.RT.money(p.originalPrice) + "</span>" : "") +
        (p.validity ? '<span class="validity">🕐 ' + esc(p.validity) + "</span>" : "") +
        "</div></div>" +
        '<div class="card-actions">' +
          '<button class="btn btn-outline" data-act="details">ⓘ View Details</button>' +
          orderBtn +
        "</div>" +
        '<div class="card-quick">' +
          '<button class="btn btn-outline btn-sm" data-act="quickadd">＋ Quick Add</button>' +
          '<button class="btn btn-outline btn-sm wish-btn' + (isWished(p.id) ? " wished" : "") + '" data-act="wish">' + (isWished(p.id) ? "♥ Wishlisted" : "♡ Wishlist") + "</button>" +
        "</div>" +
      "</div></div>";
  }
  function trialCardHTML(p) {
    return '<div class="card" data-id="' + esc(p.id) + '">' +
      '<div class="card-img"><span class="trial-badge">🎁 Free Trial</span>' + imgTag(p.img, p.name) + "</div>" +
      '<div class="card-body">' +
        '<div class="card-top"><div class="card-name">' + esc(p.name) + "</div></div>" +
        '<div class="card-actions">' +
          '<a class="btn btn-green" href="' + waLink("A.o.a, I want a FREE TRIAL of " + p.name) + '" target="_blank" rel="noopener">🎁 Request Free Trial</a>' +
        "</div>" +
      "</div></div>";
  }
  function renderTrial() {
    var grid = $("trialGrid");
    if (!grid) return;
    var list = store.products.filter(function (p) { return p.trial; });
    var sec = $("trial");
    if (!list.length) { if (sec) sec.style.display = "none"; return; }
    if (sec) sec.style.display = "";
    grid.innerHTML = list.map(trialCardHTML).join("");
  }
  function renderProducts() {
    var list = filteredProducts();
    var cnt = $("prodCount");
    if (cnt) cnt.textContent = "Showing " + list.length + " of " + store.products.length + " products";
    $("couponStrip").style.display = "none";
    // coupon strip: first active coupon (scope all, or matching this category filter)
    var act = (S.coupons || []).filter(function (c) { return c.active; });
    if (act.length) {
      var c = act[0];
      if (c.scope === "all" || state.cat === "All" || c.scope === state.cat) {
        $("couponStrip").innerHTML = "🎟️ Use code <b>" + esc(c.code) + "</b> for <b>" + esc(c.percent) + "% off</b> — mention it on WhatsApp";
        $("couponStrip").style.display = "block";
      }
    }
    $("productGrid").innerHTML = list.length
      ? list.map(cardHTML).join("")
      : '<p style="grid-column:1/-1;text-align:center;color:#8a8271;padding:30px">No products found. Try another search.</p>';
    // wire buttons
    var cards = $("productGrid").querySelectorAll(".card");
    for (var i = 0; i < cards.length; i++) {
      (function (card) {
        var id = card.getAttribute("data-id");
        card.querySelector('[data-act="details"]').addEventListener("click", function () { openDetails(id); });
        var qa = card.querySelector('[data-act="quickadd"]');
        if (qa) qa.addEventListener("click", function () {
          addToCart(id);
          var p = findProduct(id);
          toastCart((p ? p.name : "Product") + " added to cart ✓");
        });
        var wb = card.querySelector('[data-act="wish"]');
        if (wb) wb.addEventListener("click", function () { toggleWish(id); renderProducts(); });
      })(cards[i]);
    }
  }

  /* ---------- 7b. courses ---------- */
  var courseState = { cat: "All", q: "" };
  function courseCardHTML(c, rank) {
    var feats = (c.features || []).map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("");
    var priceTxt = (c.price > 0) ? window.RT.money(c.price) : "Rs. 0";
    var freeBadge = (c.price <= 0) ? '<span class="free-badge">100% FREE</span>' : "";
    var rankBadge = rank ? '<span class="rank-badge">#' + rank + "</span>" : "";
    var btn = (c.price <= 0)
      ? '<a class="btn btn-green" href="' + waLink("A.o.a, I want to claim the FREE course: " + c.name) + '" target="_blank" rel="noopener">🎁 Claim Free</a>'
      : '<a class="btn btn-green" href="' + waLink("A.o.a, I want to join the course: " + c.name) + '" target="_blank" rel="noopener">💬 Enroll on WhatsApp</a>';
    return '<div class="card" data-id="' + esc(c.id || c.name) + '">' +
      '<div class="card-img">' + rankBadge + freeBadge + imgTag(c.img || "assets/img/posters/poster-chatgpt.webp", c.name) + "</div>" +
      '<div class="card-body">' +
        '<div class="card-cat">' + esc(c.category || "COURSE") + "</div>" +
        '<div class="card-name">' + esc(c.name) + "</div>" +
        '<div class="card-desc">' + esc(c.about || "") + "</div>" +
        '<ul class="course-feats">' + feats + "</ul>" +
        '<div class="price-block"><span class="price-label">PLAN PRICE</span>' +
        '<div class="price-row">' +
        (c.originalPrice > c.price ? '<span class="price-old">' + window.RT.money(c.originalPrice) + "</span>" : "") +
        '<span class="price">' + priceTxt + "</span>" +
        (c.price <= 0 ? '<span class="free-pill">FREE</span>' : "") +
        (c.validity ? '<span class="validity">🕐 ' + esc(c.validity) + "</span>" : "") +
        "</div></div>" +
        '<div class="card-actions">' + btn + "</div>" +
      "</div></div>";
  }
  function filteredCourses() {
    var q = courseState.q.trim().toLowerCase();
    return (store.courses || []).filter(function (c) {
      var okCat = courseState.cat === "All" || c.category === courseState.cat;
      var okQ = !q || (c.name + " " + (c.category || "") + " " + (c.about || "")).toLowerCase().indexOf(q) !== -1;
      return okCat && okQ;
    });
  }
  function renderCourseCats() {
    var cats = ["All"];
    (store.courses || []).forEach(function (c) {
      if (c.category && cats.indexOf(c.category) === -1) cats.push(c.category);
    });
    var el = $("courseCats");
    if (!el) return;
    el.innerHTML = cats.map(function (c) {
      var n = c === "All" ? (store.courses || []).length : (store.courses || []).filter(function (x) { return x.category === c; }).length;
      return '<button class="pill' + (courseState.cat === c ? " active" : "") + '" data-ccat="' + esc(c) + '">' + esc(c) + " (" + n + ")</button>";
    }).join("");
    var btns = el.querySelectorAll("button");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        courseState.cat = this.getAttribute("data-ccat");
        renderCourseCats(); renderCourses();
      });
    }
  }
  function renderCourses() {
    var grid = $("courseGrid");
    var sec = $("courses");
    var all = store.courses || [];
    if (!all.length) { if (sec) sec.style.display = "none"; return; }
    if (sec) sec.style.display = "";
    var list = filteredCourses();
    var cnt = $("courseCount");
    if (cnt) cnt.textContent = list.length + " of " + all.length + " Courses";
    grid.innerHTML = list.length
      ? list.map(function (c, i) { return courseCardHTML(c, i + 1); }).join("")
      : '<p style="grid-column:1/-1;text-align:center;color:#8a8271;padding:30px">No courses found. Try another search.</p>';
  }

  /* ---------- 7c. feature cards ---------- */
  function renderFeatures() {
    var list = (S.featureCards || []).filter(function (x) { return x && (x.title || x.text); });
    var sec = $("featuresSec");
    if (!list.length) { if (sec) sec.style.display = "none"; return; }
    if (sec) sec.style.display = "";
    $("featureGrid").innerHTML = list.slice(0, 6).map(function (x) {
      return '<div class="feat-card"><div class="feat-icon">' + esc(x.icon || "✦") + '</div><h3>' + esc(x.title || "") + "</h3><p>" + esc(x.text || "") + "</p></div>";
    }).join("");
  }

  /* ---------- 8b. FAQ ---------- */
  function renderFaq() {
    var list = (S.faqs || []).filter(function (x) { return x && x.q; });
    var sec = $("faqSec");
    if (!list.length) { if (sec) sec.style.display = "none"; return; }
    if (sec) sec.style.display = "";
    $("faqList").innerHTML = list.map(function (x, i) {
      return '<div class="faq-item"><button class="faq-q" data-faq="' + i + '">' + esc(x.q) + '<span class="faq-arrow">+</span></button>' +
        '<div class="faq-a">' + esc(x.a || "") + "</div></div>";
    }).join("");
    var qs = $("faqList").querySelectorAll(".faq-q");
    for (var i = 0; i < qs.length; i++) {
      qs[i].addEventListener("click", function () {
        var item = this.parentNode;
        var open = item.classList.contains("open");
        var all = $("faqList").querySelectorAll(".faq-item");
        for (var j = 0; j < all.length; j++) all[j].classList.remove("open");
        if (!open) item.classList.add("open");
      });
    }
  }

  /* ---------- 8c. final CTA ---------- */
  function renderCta() {
    $("ctaTitle").textContent = S.ctaTitle || "";
    $("ctaText").textContent = S.ctaText || "";
    $("ctaWa").href = waLink("A.o.a, I need a custom quote");
  }

  /* ---------- 8. guidance band ---------- */
  function renderGuidance() {
    $("guidanceTitle").textContent = S.guidanceTitle || "";
    $("guidanceText").textContent = S.guidanceText || "";
    $("guidanceBtn").href = waLink("A.o.a mujhe guidance chahiye");
  }

  /* ---------- 9. reviews (genuine only — approved reviews, empty by default) ---------- */
  var revTab = "all";
  var revProdFilter = "All";
  function approvedReviews() {
    return (store.reviews || []).filter(function (r) { return r.approved; });
  }
  function starsHtml(rating) {
    var n = Math.max(1, Math.min(5, Math.round(Number(rating) || 5)));
    return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
  }
  function reviewCardHTML(r) {
    return '<div class="rev-card">' +
      '<div class="rev-head"><span class="rev-avatar">👤</span>' +
        '<div><b>' + esc(r.name) + (r.city ? " <span class='rev-city'>(" + esc(r.city) + ")</span>" : "") + "</b>" +
        '<div class="rev-stars">' + starsHtml(r.rating) + ' <span class="rev-score">' + (Number(r.rating) || 5).toFixed(1) + "</span></div>" +
        (r.date ? '<div class="rev-date">📅 ' + esc(r.date) + "</div>" : "") + "</div></div>" +
      '<div class="rev-text">"' + esc(r.comment) + '"</div>' +
      (r.tool ? '<div class="rev-tool">🏷️ Product: <b>' + esc(r.tool) + "</b></div>" : "") +
      "</div>";
  }
  function renderReviews() {
    var list = approvedReviews();
    var n = list.length;
    var avg = n ? (list.reduce(function (a, r) { return a + (Number(r.rating) || 5); }, 0) / n) : 0;
    var proofs = (store.proofs || []).length;
    $("reviewsSub").textContent = n
      ? "Browse " + n + " genuine customer review" + (n > 1 ? "s" : "") + " and " + proofs + " real WhatsApp delivery proof" + (proofs === 1 ? "" : "s") + (n ? " (" + avg.toFixed(1) + "/5 average rating)." : ".")
      : "No reviews yet — every review here comes from a real customer after admin approval.";
    // tabs
    var tabs = [
      ["all", "🌟 All Testimonials & Proofs"],
      ["written", "✍️ Written Reviews (" + n + ")"],
      ["proofs", "💬 WhatsApp Proof Gallery (" + proofs + ")"],
      ["byproduct", "📦 Reviews by Product"]
    ];
    $("revTabs").innerHTML = tabs.map(function (t) {
      return '<button class="pill' + (revTab === t[0] ? " active" : "") + '" data-rtab="' + t[0] + '">' + t[1] + "</button>";
    }).join("");
    var tb = document.querySelectorAll("[data-rtab]");
    for (var i = 0; i < tb.length; i++) tb[i].addEventListener("click", function () {
      revTab = this.getAttribute("data-rtab");
      renderReviews();
    });
    // stats tiles
    $("revStats").innerHTML =
      '<div class="stat-tile"><b>' + n + '</b><span>Customer Reviews</span></div>' +
      '<div class="stat-tile"><b>' + (n ? avg.toFixed(1) : "—") + '</b><span>Average Rating</span></div>' +
      '<div class="stat-tile"><b>' + proofs + '</b><span>WhatsApp Proofs</span></div>' +
      '<div class="stat-tile"><b>30-Day</b><span>Replacement Warranty</span></div>';
    // rating breakdown (real counts only)
    var counts = [0, 0, 0, 0, 0, 0];
    list.forEach(function (r) { counts[Math.max(1, Math.min(5, Math.round(Number(r.rating) || 5)))]++; });
    $("revBreakdown").innerHTML = n ? [5, 4, 3, 2, 1].map(function (st) {
      var c = counts[st];
      var pct = Math.round(c / n * 100);
      return '<div class="break-row"><span>' + st + '★</span><div class="break-bar"><div style="width:' + pct + '%"></div></div><span>' + pct + "% (" + c + ")</span></div>";
    }).join("") : "";
    // product filter (by-product tab)
    var rf = $("revFilter");
    if (revTab === "byproduct") {
      rf.style.display = "";
      var tools = ["All"];
      list.forEach(function (r) { if (r.tool && tools.indexOf(r.tool) === -1) tools.push(r.tool); });
      $("revProduct").innerHTML = tools.map(function (t) {
        return '<option value="' + esc(t) + '"' + (t === revProdFilter ? " selected" : "") + ">" + esc(t) + "</option>";
      }).join("");
    } else rf.style.display = "none";
    // grid
    var show = list;
    if (revTab === "byproduct" && revProdFilter !== "All") show = list.filter(function (r) { return r.tool === revProdFilter; });
    var grid = $("reviewGrid");
    var pw = $("proofsWrap");
    if (revTab === "proofs") {
      grid.style.display = "none"; pw.style.display = "";
      $("revEmpty").style.display = "none";
      renderProofs();
    } else {
      grid.style.display = ""; pw.style.display = "none";
      grid.innerHTML = show.map(reviewCardHTML).join("");
      $("revEmpty").style.display = show.length ? "none" : "";
    }
  }
  function renderProofs() {
    var list = store.proofs || [];
    $("proofsGrid").innerHTML = list.length ? list.map(function (x) {
      return '<figure class="proof-card"><img src="' + esc(x.img) + '" alt="WhatsApp proof" loading="lazy">' +
        (x.caption ? "<figcaption>" + esc(x.caption) + "</figcaption>" : "") + "</figure>";
    }).join("") : '<p style="grid-column:1/-1;text-align:center;color:#8a8271;padding:30px">No delivery proofs uploaded yet.</p>';
  }
  function initReviewForm() {
    var sel = $("rvProduct");
    sel.innerHTML = store.products.map(function (p) {
      return '<option value="' + esc(p.name) + '">' + esc(p.name) + "</option>";
    }).join("");
    $("writeReviewBtn").addEventListener("click", function () { openOverlay("reviewOverlay"); });
    $("reviewClose").addEventListener("click", function () { closeOverlay("reviewOverlay"); });
    $("reviewOverlay").addEventListener("click", function (e) { if (e.target === this) closeOverlay("reviewOverlay"); });
    $("reviewForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("rvName").value.trim();
      var comment = $("rvComment").value.trim();
      if (!name || !comment) return;
      var d = new Date();
      (store.reviews = store.reviews || []).push({
        name: name, city: $("rvCity").value.trim(),
        tool: $("rvProduct").value, rating: Number($("rvRating").value) || 5,
        comment: comment, approved: false,
        date: d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
      });
      window.Store.save(store);
      $("rvMsg").style.display = "";
      $("rvName").value = ""; $("rvCity").value = ""; $("rvComment").value = "";
      setTimeout(function () { closeOverlay("reviewOverlay"); $("rvMsg").style.display = "none"; }, 2500);
    });
    $("revProduct").addEventListener("change", function () {
      revProdFilter = this.value;
      renderReviews();
    });
  }

  /* ---------- 9b. how to purchase ---------- */
  function renderHow() {
    var steps = S.howSteps || [];
    $("howSteps").innerHTML = steps.map(function (x, i) {
      return '<div class="step-card"><span class="step-num">STEP ' + (i + 1) + "</span>" +
        "<h3>" + esc(x.title || "") + "</h3><p>" + esc(x.text || "") + "</p></div>";
    }).join("");
    var pays = (S.paymentMethods || []).filter(function (m) { return m.visible !== false; });
    var el = $("payAccounts");
    if (el) el.innerHTML = pays.length ?
      '<h3>💳 Official PKR Payment Accounts</h3><p>100% advance payment verification across JazzCash, Easypaisa, Nayapay &amp; Binance.</p>' +
      '<div class="pay-pills">' + pays.map(function (m) {
        return '<span class="pay-pill"><b>' + esc(m.name) + "</b> · " + esc(m.number || "") + (m.accountTitle ? " · " + esc(m.accountTitle) : "") + "</span>";
      }).join("") + "</div>" : "";
  }

  /* ---------- 11. welcome modal ---------- */
  var WELCOME_LINES = [
    "🤝 Assalamu Alaikum & Welcome! We provide 100% trusted and verified AI tools with complete honesty and transparency.",
    "📖 Allah Ta'ala farmatay hain: 'Aur aapas mein ek doosre ka maal na-haq tareeqay se mat khao' (Surah Al-Baqarah 2:188).",
    "💳 Tamam orders ke liye advance payment lazmi hai — no payment means no order.",
    "💚 Agar hum waada ki gayi service deliver na kar saken, to hum fair refund policy par yaqeen rakhte hain.",
    "🛡️ Agar aapko koi bhi trust issue ho, to pareshan na hon — hum aapko full transparency ke sath payment-after-activation par tool dein ge."
  ];
  function initWelcome() {
    $("welcomeTitle").textContent = S.welcomeTitle || "Welcome";
    $("welcomeLines").innerHTML = WELCOME_LINES.map(function (l) { return "<p>" + esc(l) + "</p>"; }).join("");
    var seen = false;
    try { seen = localStorage.getItem("rt_welcome_seen") === "1"; } catch (e) {}
    if (!seen) setTimeout(function () { openOverlay("welcomeOverlay"); }, 1200);
    $("welcomeClose").addEventListener("click", closeWelcome);
    $("welcomeOverlay").addEventListener("click", function (e) { if (e.target === this) closeWelcome(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeOverlay("welcomeOverlay"); closeOverlay("detailsOverlay"); }
    });
  }
  function closeWelcome() {
    try {
      if ($("dontShow").checked) localStorage.setItem("rt_welcome_seen", "1");
    } catch (e) {}
    closeOverlay("welcomeOverlay");
  }

  /* ---------- 12. product details modal ---------- */
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
