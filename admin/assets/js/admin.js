/* ============================================================
   Rehmat Tools — admin panel logic (admin.html)
   Reads/writes the same localStorage key "rehmat_site_v1",
   so index.html reflects changes instantly (same browser).
   NOTE: Demo auth — client-side only, not real security.
   ============================================================ */
(function () {
  "use strict";
  var esc = window.RT.esc;
  var CATS = ["AI Tools", "AI Video & Voice", "Streaming", "SEO Tools", "Music", "Design", "Gaming", "VPN", "Productivity", "Social"];
  var PW_KEY = "rt_admin_pw";
  var SESSION_KEY = "rt_admin_session";
  var store = window.Store.load();
  var editingId = null; // product being edited (null = adding)

  function $(id) { return document.getElementById(id); }
  function toast(msg) {
    var t = $("toast");
    t.textContent = msg || "Saved ✓";
    t.classList.add("show");
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.classList.remove("show"); }, 1800);
  }
  function persist() { window.Store.save(store); }

  /* ================= LOGIN GATE ================= */
  function getPw() {
    try { return localStorage.getItem(PW_KEY) || "rehmat123"; }
    catch (e) { return "rehmat123"; }
  }
  function initLogin() {
    var logged = false;
    try { logged = sessionStorage.getItem(SESSION_KEY) === "1"; } catch (e) {}
    if (logged) { showAdmin(); return; }
    $("loginForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var v = $("loginPw").value;
      if (v === getPw()) {
        try { sessionStorage.setItem(SESSION_KEY, "1"); } catch (e2) {}
        showAdmin();
      } else {
        var err = $("loginError");
        err.style.display = "block";
        err.textContent = "Wrong password. Try again.";
      }
    });
  }
  function showAdmin() {
    $("loginWrap").style.display = "none";
    $("adminShell").classList.add("open");
    renderAll();
  }

  /* ================= TABS ================= */
  function initTabs() {
    var tabs = document.querySelectorAll(".tab");
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener("click", function () {
        for (var j = 0; j < tabs.length; j++) tabs[j].classList.remove("active");
        this.classList.add("active");
        var panes = document.querySelectorAll(".tabpane");
        for (var k = 0; k < panes.length; k++) panes[k].classList.remove("active");
        $(this.getAttribute("data-tab")).classList.add("active");
      });
    }
    $("logoutBtn").addEventListener("click", function () {
      try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
      location.reload();
    });
  }

  /* ================= DASHBOARD (demo stats) ================= */
  function renderDashboard() {
    $("statVisitors").innerHTML = '12,480<span class="demo-tag">DEMO</span>';
    $("statOnline").innerHTML = '21<span class="demo-tag">DEMO</span>';
    $("statOrders").innerHTML = '342<span class="demo-tag">DEMO</span>';
    $("statRevenue").innerHTML = 'Rs. 486,500<span class="demo-tag">DEMO</span>';
  }

  /* ================= PRODUCTS ================= */
  function renderProducts() {
    var rows = store.products.map(function (p) {
      var thumb = p.img && p.img.indexOf("data:") === 0
        ? '<img class="thumb" src="' + p.img + '" alt="">'
        : '<img class="thumb" src="' + esc(p.img) + '" alt="" onerror="this.style.visibility=\'hidden\'">';
      return "<tr><td>" + thumb + "</td><td><b>" + esc(p.name) + "</b></td>" +
        "<td>" + esc(p.category) + "</td><td>" + window.RT.money(p.price) + "</td>" +
        "<td>" + esc(p.stock) + "</td>" +
        '<td><div class="tbl-actions">' +
          '<button class="btn btn-outline btn-sm" data-edit="' + esc(p.id) + '">Edit</button>' +
          '<button class="btn btn-danger btn-sm" data-del="' + esc(p.id) + '">Delete</button>' +
        "</div></td></tr>";
    }).join("");
    $("productRows").innerHTML = rows || '<tr><td colspan="6">No products yet.</td></tr>';
    var eb = document.querySelectorAll("[data-edit]");
    for (var i = 0; i < eb.length; i++) eb[i].addEventListener("click", function () { startEdit(this.getAttribute("data-edit")); });
    var db = document.querySelectorAll("[data-del]");
    for (var j = 0; j < db.length; j++) db[j].addEventListener("click", function () {
      if (!confirm("Delete this product?")) return;
      var id = this.getAttribute("data-del");
      store.products = store.products.filter(function (p) { return p.id !== id; });
      persist(); renderProducts(); toast("Deleted ✓");
    });
  }
  function fillCategorySelect(sel, val) {
    sel.innerHTML = CATS.map(function (c) {
      return '<option value="' + esc(c) + '"' + (c === val ? " selected" : "") + ">" + esc(c) + "</option>";
    }).join("");
  }
  function resetProductForm() {
    editingId = null;
    $("pfTitle").textContent = "Add product";
    $("pfName").value = ""; $("pfPrice").value = ""; $("pfOrig").value = "";
    $("pfValidity").value = "1 Month"; $("pfStock").value = "20"; $("pfSold").value = "0"; $("pfTrial").checked = false;
    $("pfBest").checked = false; $("pfStarting").checked = false; $("pfAccess").value = ""; $("pfWarranty").value = "Warranty Included";
    $("pfFeatures").value = ""; $("pfAbout").value = "";
    $("pfImgUrl").value = ""; $("pfImgFile").value = "";
    $("pfImgPreview").innerHTML = "";
    $("pfImgPreview").removeAttribute("data-b64");
    fillCategorySelect($("pfCategory"), "AI Tools");
    $("pfSubmit").textContent = "Add product";
  }
  function startEdit(id) {
    var p = null;
    for (var i = 0; i < store.products.length; i++) if (store.products[i].id === id) p = store.products[i];
    if (!p) return;
    editingId = id;
    $("pfTitle").textContent = "Edit product";
    $("pfName").value = p.name || "";
    fillCategorySelect($("pfCategory"), p.category);
    $("pfPrice").value = p.price || "";
    $("pfOrig").value = p.originalPrice || "";
    $("pfValidity").value = p.validity || "";
    $("pfStock").value = p.stock != null ? p.stock : "";
    $("pfSold").value = p.sold != null ? p.sold : "0"; $("pfTrial").checked = !!p.trial;
    $("pfBest").checked = !!p.bestSeller; $("pfStarting").checked = !!p.startingAt; $("pfAccess").value = p.accessType || ""; $("pfWarranty").value = p.warranty || "Warranty Included";
    $("pfFeatures").value = (p.features || []).join("\n");
    $("pfAbout").value = p.about || "";
    $("pfImgUrl").value = (p.img && p.img.indexOf("data:") !== 0) ? p.img : "";
    $("pfImgPreview").innerHTML = p.img ? '<img class="img-preview" src="' + esc(p.img) + '" alt="">' : "";
    if (p.img && p.img.indexOf("data:") === 0) $("pfImgPreview").setAttribute("data-b64", p.img);
    else $("pfImgPreview").removeAttribute("data-b64");
    $("pfSubmit").textContent = "Save changes";
    window.scrollTo({ top: $("paneProducts").offsetTop - 120, behavior: "smooth" });
  }
  function initProductForm() {
    fillCategorySelect($("pfCategory"), "AI Tools");
    $("pfImgFile").addEventListener("change", function () {
      var f = this.files[0];
      if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        $("pfImgPreview").innerHTML = '<img class="img-preview" src="' + r.result + '" alt="">';
        $("pfImgPreview").setAttribute("data-b64", r.result);
        $("pfImgUrl").value = ""; // file wins over URL
      };
      r.readAsDataURL(f);
    });
    $("pfCancel").addEventListener("click", resetProductForm);
    $("productForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var b64 = $("pfImgPreview").getAttribute("data-b64") || "";
      var img = b64 || $("pfImgUrl").value.trim() || "assets/img/posters/placeholder.webp";
      var feats = $("pfFeatures").value.split("\n").map(function (s) { return s.trim(); }).filter(Boolean);
      var data = {
        name: $("pfName").value.trim(),
        category: $("pfCategory").value,
        price: Number($("pfPrice").value) || 0,
        originalPrice: Number($("pfOrig").value) || 0,
        validity: $("pfValidity").value.trim() || "1 Month",
        stock: Number($("pfStock").value) || 0,
        sold: Math.max(0, Number($("pfSold").value) || 0),
        trial: $("pfTrial").checked,
        bestSeller: $("pfBest").checked,
        startingAt: $("pfStarting").checked,
        accessType: $("pfAccess").value.trim(),
        warranty: $("pfWarranty").value.trim() || "Warranty Included",
        features: feats,
        about: $("pfAbout").value.trim(),
        img: img
      };
      if (!data.name) { alert("Product name is required."); return; }
      if (editingId) {
        for (var i = 0; i < store.products.length; i++) {
          if (store.products[i].id === editingId) {
            for (var k in data) store.products[i][k] = data[k];
          }
        }
        toast("Saved ✓");
      } else {
        data.id = "p-" + Date.now().toString(36);
        data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 24) || data.id;
        store.products.push(data);
        toast("Product added ✓");
      }
      persist(); renderProducts(); resetProductForm();
    });
  }

  /* ================= BULK IMPORT ================= */
  function parseCSV(text) {
    // minimal parser: handles quoted fields with commas and escaped quotes
    var rows = [], row = [], cur = "", inQ = false;
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (inQ) {
        if (ch === '"') {
          if (text[i + 1] === '"') { cur += '"'; i++; }
          else inQ = false;
        } else cur += ch;
      } else if (ch === '"') inQ = true;
      else if (ch === ",") { row.push(cur); cur = ""; }
      else if (ch === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; }
      else if (ch === "\r") { /* skip */ }
      else cur += ch;
    }
    if (cur !== "" || row.length) { row.push(cur); rows.push(row); }
    return rows.filter(function (r) { return r.length > 1 || (r.length === 1 && r[0].trim() !== ""); });
  }
  function initBulk() {
    $("dlTemplate").addEventListener("click", function () {
      var csv = "name,category,price,original_price,validity,stock,features,about,image_url\n" +
        '"Example Tool","AI Tools",3000,4500,"1 Month",20,"Feature one|Feature two|Delivered on WhatsApp after payment","Short 2-3 line description of the tool.",""\n';
      var blob = new Blob([csv], { type: "text/csv" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "rehmat-tools-import-template.csv";
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    });
    $("bulkImportBtn").addEventListener("click", function () {
      var f = $("bulkFile").files[0];
      if (!f) { alert("Choose a CSV file first."); return; }
      var r = new FileReader();
      r.onload = function () {
        try {
          var rows = parseCSV(String(r.result || ""));
          if (rows.length < 2) { alert("No data rows found in the CSV."); return; }
          var head = rows[0].map(function (h) { return h.trim().toLowerCase(); });
          var need = ["name", "category", "price"];
          for (var n = 0; n < need.length; n++) {
            if (head.indexOf(need[n]) === -1) { alert("Missing required column: " + need[n]); return; }
          }
          var added = 0;
          for (var i = 1; i < rows.length; i++) {
            var o = {};
            for (var j = 0; j < head.length && j < rows[i].length; j++) o[head[j]] = rows[i][j].trim();
            if (!o.name) continue;
            var feats = (o.features || "").split("|").map(function (s) { return s.trim(); }).filter(Boolean);
            store.products.push({
              id: "p-" + Date.now().toString(36) + "-" + i,
              slug: o.name.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 24),
              name: o.name,
              category: CATS.indexOf(o.category) !== -1 ? o.category : "AI Tools",
              price: Number(o.price) || 0,
              originalPrice: Number(o.original_price) || (Number(o.price) || 0) + 1500,
              validity: o.validity || "1 Month",
              stock: o.stock === "" ? 20 : Number(o.stock),
              features: feats.length ? feats : ["Delivered on WhatsApp after payment"],
              about: o.about || "",
              img: o.image_url || "assets/img/posters/placeholder.webp"
            });
            added++;
          }
          persist(); renderProducts();
          toast("Imported " + added + " products ✓");
          $("bulkFile").value = "";
        } catch (err) { alert("Import failed: " + err.message); }
      };
      r.readAsText(f);
    });
  }

  /* ================= WEBSITE TEXT ================= */
  var TEXT_FIELDS = [
    ["tickerText", "Ticker text", "text"],
    ["heroKicker", "Hero kicker", "text"],
    ["heroTitle", "Hero title", "text"],
    ["heroSubtitle", "Hero subtitle", "textarea"],
    ["whatsappNumber", "WhatsApp number (e.g. 923147505963)", "text"],
    ["channelLink", "WhatsApp channel link", "text"],
    ["guidanceTitle", "Guidance title", "text"],
    ["guidanceText", "Guidance text", "textarea"],
    ["welcomeTitle", "Welcome popup title", "text"]
  ];
  function renderWebsiteText() {
    $("textForm").innerHTML = TEXT_FIELDS.map(function (f) {
      var key = f[0], label = f[1], type = f[2];
      var val = store.settings[key] || "";
      var input = type === "textarea"
        ? '<textarea id="tf_' + key + '" rows="2">' + esc(val) + "</textarea>"
        : '<input id="tf_' + key + '" value="' + esc(val) + '">';
      return '<div class="field"><label>' + esc(label) + "</label>" + input + "</div>";
    }).join("");
  }
  function initWebsiteText() {
    $("textForm").addEventListener("submit", function (e) {
      e.preventDefault();
      TEXT_FIELDS.forEach(function (f) {
        var el = $("tf_" + f[0]);
        if (el) store.settings[f[0]] = el.value;
      });
      persist(); toast("Saved ✓");
    });
  }

  /* ================= HOMEPAGE ================= */
  var faqDraft = [];
  function hpLines(id) {
    return $(id).value.split("\n").map(function (x) { return x.trim(); }).filter(Boolean);
  }
  function renderHomepage() {
    var st = store.settings;
    $("hpChips").value = (st.heroTrustChips || []).join("\n");
    var stats = st.heroStats || [];
    $("hpStats").innerHTML = [0, 1, 2, 3].map(function (i) {
      var x = stats[i] || {};
      return '<div class="field"><label>Stat ' + (i + 1) + ' value</label><input data-stat-v="' + i + '" value="' + esc(x.value || "") + '" placeholder="27"></div>' +
        '<div class="field"><label>Stat ' + (i + 1) + ' label</label><input data-stat-l="' + i + '" value="' + esc(x.label || "") + '" placeholder="Premium Tools"></div>';
    }).join("");
    var fd = st.featuredDeal || {};
    $("hpDealOn").checked = !!fd.enabled;
    $("hpDealProduct").innerHTML = store.products.map(function (p) {
      return '<option value="' + esc(p.id) + '"' + (p.id === fd.productId ? " selected" : "") + ">" + esc(p.name) + " — " + window.RT.money(p.price) + "</option>";
    }).join("");
    $("hpDealTitle").value = fd.title || "";
    $("hpDealBadge").value = fd.badge || "";
    $("hpDealPoints").value = (fd.points || []).join("\n");
    $("hpTrustOn").checked = st.trustBarEnabled !== false;
    $("hpTrustBar").value = st.trustBar || "";
    $("hpPop").value = (st.popularSearches || []).join("\n");
    var feats = st.featureCards || [];
    $("hpFeatures").innerHTML = [0, 1, 2, 3, 4, 5].map(function (i) {
      var x = feats[i] || {};
      return '<div class="form-grid" style="margin-bottom:8px">' +
        '<div class="field"><label>Card ' + (i + 1) + ' icon</label><input data-feat-i="' + i + '" value="' + esc(x.icon || "") + '" placeholder="⚡"></div>' +
        '<div class="field"><label>Card ' + (i + 1) + ' title</label><input data-feat-t="' + i + '" value="' + esc(x.title || "") + '" placeholder="Fast Delivery"></div>' +
        '<div class="field full"><label>Card ' + (i + 1) + ' text</label><input data-feat-x="' + i + '" value="' + esc(x.text || "") + '" placeholder="Short benefit line"></div></div>';
    }).join("");
    faqDraft = JSON.parse(JSON.stringify(st.faqs || []));
    renderFaqDraft();
    $("hpCtaTitle").value = st.ctaTitle || "";
    $("hpCtaText").value = st.ctaText || "";
    $("hpFooterAbout").value = st.footerAbout || "";
    $("hpFooterTrust").value = st.footerTrust || "";
    $("hpCouponWidget").checked = st.couponWidgetEnabled !== false;
    $("hpHowSteps").value = (st.howSteps || []).map(function (x) { return (x.title || "") + " | " + (x.text || ""); }).join("\n");
    $("hpSupportEmail").value = st.supportEmail || "";
    $("hpRefundNotice").value = st.refundNotice || "";
    var pols = st.policies || [];
    $("hpPolicies").innerHTML = pols.map(function (x, i) {
      return '<div class="form-grid" style="margin-bottom:8px">' +
        '<div class="field"><label>Policy ' + (i + 1) + ' title</label><input data-pol-t="' + i + '" value="' + esc(x.title || "") + '"></div>' +
        '<div class="field full"><label>Policy ' + (i + 1) + ' text</label><textarea data-pol-x="' + i + '" rows="2">' + esc(x.text || "") + "</textarea></div></div>";
    }).join("");
  }
  function renderFaqDraft() {
    $("hpFaqs").innerHTML = faqDraft.map(function (f, i) {
      return '<div class="form-grid" style="margin-bottom:8px">' +
        '<div class="field"><label>Question ' + (i + 1) + '</label><input data-faq-q="' + i + '" value="' + esc(f.q || "") + '"></div>' +
        '<div class="field"><label>Answer ' + (i + 1) + '</label><input data-faq-a="' + i + '" value="' + esc(f.a || "") + '"></div>' +
        '<div class="field full"><button class="btn btn-danger btn-sm" type="button" data-faq-del="' + i + '">Delete</button></div></div>';
    }).join("") || '<p style="font-size:13px;color:#8a8271">No questions yet.</p>';
    var ds = document.querySelectorAll("[data-faq-del]");
    for (var i = 0; i < ds.length; i++) ds[i].addEventListener("click", function () {
      faqDraft.splice(Number(this.getAttribute("data-faq-del")), 1);
      renderFaqDraft();
    });
  }
  function initHomepage() {
    $("hpFaqAdd").addEventListener("click", function () {
      faqDraft.push({ q: "", a: "" });
      renderFaqDraft();
    });
    $("hpSave").addEventListener("click", function () {
      var st = store.settings;
      st.heroTrustChips = hpLines("hpChips");
      st.heroStats = [0, 1, 2, 3].map(function (i) {
        return {
          value: (document.querySelector('[data-stat-v="' + i + '"]') || {}).value || "",
          label: (document.querySelector('[data-stat-l="' + i + '"]') || {}).value || ""
        };
      }).filter(function (x) { return x.value || x.label; });
      st.featuredDeal = {
        enabled: $("hpDealOn").checked,
        productId: $("hpDealProduct").value,
        title: $("hpDealTitle").value.trim(),
        badge: $("hpDealBadge").value.trim(),
        points: hpLines("hpDealPoints")
      };
      st.trustBarEnabled = $("hpTrustOn").checked;
      st.trustBar = $("hpTrustBar").value.trim();
      st.popularSearches = hpLines("hpPop");
      st.featureCards = [0, 1, 2, 3, 4, 5].map(function (i) {
        return {
          icon: (document.querySelector('[data-feat-i="' + i + '"]') || {}).value || "",
          title: (document.querySelector('[data-feat-t="' + i + '"]') || {}).value || "",
          text: (document.querySelector('[data-feat-x="' + i + '"]') || {}).value || ""
        };
      }).filter(function (x) { return x.title || x.text; });
      st.faqs = faqDraft.map(function (f, i) {
        return {
          q: ((document.querySelector('[data-faq-q="' + i + '"]') || {}).value || "").trim(),
          a: ((document.querySelector('[data-faq-a="' + i + '"]') || {}).value || "").trim()
        };
      }).filter(function (x) { return x.q; });
      st.ctaTitle = $("hpCtaTitle").value.trim();
      st.ctaText = $("hpCtaText").value.trim();
      st.footerAbout = $("hpFooterAbout").value.trim();
      st.footerTrust = $("hpFooterTrust").value.trim();
      st.couponWidgetEnabled = $("hpCouponWidget").checked;
      st.howSteps = $("hpHowSteps").value.split("\n").map(function (line) {
        var parts = line.split("|");
        return { title: (parts[0] || "").trim(), text: (parts[1] || "").trim() };
      }).filter(function (x) { return x.title; }).slice(0, 3);
      st.supportEmail = $("hpSupportEmail").value.trim();
      st.refundNotice = $("hpRefundNotice").value.trim();
      st.policies = (store.settings.policies || []).map(function (x, i) {
        return {
          title: ((document.querySelector('[data-pol-t="' + i + '"]') || {}).value || "").trim(),
          text: ((document.querySelector('[data-pol-x="' + i + '"]') || {}).value || "").trim()
        };
      }).filter(function (x) { return x.title; });
      persist(); toast("Homepage saved ✓");
    });
  }

  /* ================= COURSES ================= */
  var editingCourseId = null;
  function renderCourses() {
    var list = store.courses || [];
    $("courseRows").innerHTML = list.length ? list.map(function (c) {
      return "<tr><td><b>" + esc(c.name) + "</b></td><td>" + window.RT.money(c.price) + "</td><td>" + esc(c.validity || "") + "</td>" +
        '<td><div class="tbl-actions">' +
          '<button class="btn btn-outline btn-sm" data-c-edit="' + esc(c.id) + '">Edit</button>' +
          '<button class="btn btn-danger btn-sm" data-c-del="' + esc(c.id) + '">Delete</button>' +
        "</div></td></tr>";
    }).join("") : '<tr><td colspan="4">No courses yet.</td></tr>';
    var eb = document.querySelectorAll("[data-c-edit]");
    for (var i = 0; i < eb.length; i++) eb[i].addEventListener("click", function () { startCourseEdit(this.getAttribute("data-c-edit")); });
    var db = document.querySelectorAll("[data-c-del]");
    for (var j = 0; j < db.length; j++) db[j].addEventListener("click", function () {
      if (!confirm("Delete this course?")) return;
      var id = this.getAttribute("data-c-del");
      store.courses = (store.courses || []).filter(function (c) { return c.id !== id; });
      persist(); renderCourses(); toast("Deleted ✓");
    });
  }
  function resetCourseForm() {
    editingCourseId = null;
    $("cfTitle").textContent = "Add course";
    $("cfName").value = ""; $("cfCategory").value = ""; $("cfPrice").value = ""; $("cfOrig").value = ""; $("cfValidity").value = "Lifetime Access";
    $("cfImg").value = ""; $("cfFeatures").value = ""; $("cfAbout").value = "";
    $("cfSubmit").textContent = "Add course";
  }
  function startCourseEdit(id) {
    var c = null;
    for (var i = 0; i < (store.courses || []).length; i++) if (store.courses[i].id === id) c = store.courses[i];
    if (!c) return;
    editingCourseId = id;
    $("cfTitle").textContent = "Edit course";
    $("cfName").value = c.name || "";
    $("cfCategory").value = c.category || "";
    $("cfPrice").value = c.price || "";
    $("cfOrig").value = c.originalPrice || "";
    $("cfValidity").value = c.validity || "";
    $("cfImg").value = c.img || "";
    $("cfFeatures").value = (c.features || []).join("\n");
    $("cfAbout").value = c.about || "";
    $("cfSubmit").textContent = "Save changes";
    window.scrollTo({ top: $("paneCourses").offsetTop - 120, behavior: "smooth" });
  }
  function initCourseForm() {
    $("cfCancel").addEventListener("click", resetCourseForm);
    $("courseForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var data = {
        name: $("cfName").value.trim(),
        category: $("cfCategory").value.trim() || "Course",
        price: Number($("cfPrice").value) || 0,
        originalPrice: Number($("cfOrig").value) || null,
        validity: $("cfValidity").value.trim() || "Lifetime Access",
        img: $("cfImg").value.trim() || "assets/img/posters/poster-chatgpt.webp",
        features: $("cfFeatures").value.split("\n").map(function (x) { return x.trim(); }).filter(Boolean),
        about: $("cfAbout").value.trim()
      };
      if (!data.name) { alert("Course name is required."); return; }
      if (!store.courses) store.courses = [];
      if (editingCourseId) {
        for (var i = 0; i < store.courses.length; i++) {
          if (store.courses[i].id === editingCourseId) {
            for (var k in data) store.courses[i][k] = data[k];
          }
        }
        toast("Saved ✓");
      } else {
        data.id = "c-" + Date.now().toString(36);
        store.courses.push(data);
        toast("Course added ✓");
      }
      persist(); renderCourses(); resetCourseForm();
    });
  }

  /* ================= REVIEWS ================= */
  function renderReviews() {
    var list = store.reviews || [];
    $("reviewRows").innerHTML = list.length ? list.map(function (r, i) {
      return "<tr><td><b>" + esc(r.name) + "</b>" + (r.city ? "<br><span style='font-size:12px;color:#8a8271'>" + esc(r.city) + "</span>" : "") + "</td>" +
        "<td>" + esc(r.tool || "") + "</td><td>" + "★".repeat(Math.max(1, Math.min(5, Math.round(r.rating || 5)))) + "</td>" +
        "<td style='max-width:280px'>" + esc(r.comment || "") + "</td>" +
        "<td>" + (r.approved ? "<span style='color:var(--green);font-weight:700'>Approved</span>" : "<span style='color:#b45309;font-weight:700'>Pending</span>") + "</td>" +
        '<td><div class="tbl-actions">' +
          (r.approved ? "" : '<button class="btn btn-green btn-sm" data-r-approve="' + i + '">Approve</button>') +
          '<button class="btn btn-danger btn-sm" data-r-del="' + i + '">Delete</button>' +
        "</div></td></tr>";
    }).join("") : '<tr><td colspan="6">No reviews yet.</td></tr>';
    var as = document.querySelectorAll("[data-r-approve]");
    for (var i = 0; i < as.length; i++) as[i].addEventListener("click", function () {
      store.reviews[Number(this.getAttribute("data-r-approve"))].approved = true;
      persist(); renderReviews();
    });
    var ds = document.querySelectorAll("[data-r-del]");
    for (var j = 0; j < ds.length; j++) ds[j].addEventListener("click", function () {
      if (!confirm("Delete this review?")) return;
      store.reviews.splice(Number(this.getAttribute("data-r-del")), 1);
      persist(); renderReviews();
    });
  }

  /* ================= PROOFS ================= */
  function renderProofs() {
    var list = store.proofs || [];
    $("proofRows").innerHTML = list.length ? list.map(function (x, i) {
      return '<figure class="proof-card"><img src="' + esc(x.img) + '" alt="proof">' +
        "<figcaption>" + esc(x.caption || "") + ' <button class="btn btn-danger btn-sm" data-proof-del="' + i + '">Delete</button></figcaption></figure>';
    }).join("") : '<p style="font-size:13px;color:#8a8271">No proofs uploaded yet.</p>';
    var ds = document.querySelectorAll("[data-proof-del]");
    for (var i = 0; i < ds.length; i++) ds[i].addEventListener("click", function () {
      if (!confirm("Delete this proof?")) return;
      store.proofs.splice(Number(this.getAttribute("data-proof-del")), 1);
      persist(); renderProofs();
    });
  }
  function initProofForm() {
    $("proofForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var f = $("pfProofFile").files[0];
      if (!f) { alert("Choose a screenshot first."); return; }
      var img = new Image();
      var url = URL.createObjectURL(f);
      img.onload = function () {
        var maxW = 800;
        var scale = Math.min(1, maxW / img.width);
        var cv = document.createElement("canvas");
        cv.width = Math.round(img.width * scale);
        cv.height = Math.round(img.height * scale);
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
        URL.revokeObjectURL(url);
        (store.proofs = store.proofs || []).push({
          img: cv.toDataURL("image/jpeg", 0.8),
          caption: $("pfProofCaption").value.trim()
        });
        persist(); renderProofs();
        $("pfProofFile").value = ""; $("pfProofCaption").value = "";
        toast("Proof uploaded ✓");
      };
      img.src = url;
    });
  }

  /* ================= COUPONS ================= */
  function renderCoupons() {
    var list = store.settings.coupons || [];
    $("couponList").innerHTML = list.length ? list.map(function (c, i) {
      return '<div class="coupon-row"><span class="code-chip">' + esc(c.code) + "</span>" +
        "<span>" + esc(c.percent) + "% off · " + esc(c.scope) + " · " + (c.active ? "active" : "off") + "</span>" +
        '<button class="btn btn-danger btn-sm" data-coupon-del="' + i + '">Delete</button></div>';
    }).join("") : '<p style="font-size:13px;color:#8a8271">No coupons yet.</p>';
    var ds = document.querySelectorAll("[data-coupon-del]");
    for (var i = 0; i < ds.length; i++) ds[i].addEventListener("click", function () {
      store.settings.coupons.splice(Number(this.getAttribute("data-coupon-del")), 1);
      persist(); renderCoupons(); toast("Deleted ✓");
    });
    $("cpScope").innerHTML = '<option value="all">All products</option>' +
      CATS.map(function (c) { return '<option value="' + esc(c) + '">' + esc(c) + "</option>"; }).join("");
  }
  function initCoupons() {
    $("couponForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var code = $("cpCode").value.trim().toUpperCase();
      var pct = Number($("cpPct").value);
      if (!code || !(pct > 0 && pct < 100)) { alert("Enter a code and a percent between 1–99."); return; }
      store.settings.coupons.push({ code: code, percent: pct, scope: $("cpScope").value, active: $("cpActive").checked });
      persist(); renderCoupons(); toast("Coupon added ✓");
      $("cpCode").value = ""; $("cpPct").value = "";
    });
  }

  /* ================= PAYMENTS ================= */
  function renderPayments() {
    var list = store.settings.paymentMethods || [];
    $("payList").innerHTML = list.map(function (m, i) {
      return '<div class="pay-row-admin" data-pay="' + i + '">' +
        '<input data-f="name" value="' + esc(m.name) + '" placeholder="Method name" style="max-width:140px">' +
        '<input data-f="accountTitle" value="' + esc(m.accountTitle) + '" placeholder="Account title" style="max-width:170px">' +
        '<input data-f="number" value="' + esc(m.number) + '" placeholder="Number / ID" style="max-width:170px">' +
        '<label class="toggle"><input type="checkbox" data-f="visible"' + (m.visible ? " checked" : "") + "> Show on site</label>" +
        '<button class="btn btn-danger btn-sm" data-pay-del="' + i + '">Delete</button></div>';
    }).join("");
    var ds = document.querySelectorAll("[data-pay-del]");
    for (var i = 0; i < ds.length; i++) ds[i].addEventListener("click", function () {
      store.settings.paymentMethods.splice(Number(this.getAttribute("data-pay-del")), 1);
      persist(); renderPayments(); toast("Deleted ✓");
    });
  }
  function initPayments() {
    $("paySave").addEventListener("click", function () {
      var rows = document.querySelectorAll(".pay-row-admin");
      var out = [];
      for (var i = 0; i < rows.length; i++) {
        (function (row) {
          function val(f) {
            var el = row.querySelector('[data-f="' + f + '"]');
            if (!el) return "";
            return el.type === "checkbox" ? el.checked : el.value.trim();
          }
          out.push({ name: val("name"), accountTitle: val("accountTitle"), number: val("number"), visible: !!val("visible") });
        })(rows[i]);
      }
      store.settings.paymentMethods = out;
      persist(); toast("Saved ✓");
    });
    $("payAdd").addEventListener("click", function () {
      store.settings.paymentMethods.push({ name: "", accountTitle: "", number: "", visible: true });
      persist(); renderPayments();
    });
  }

  /* ================= SETTINGS ================= */
  function initSettings() {
    $("pwForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var np = $("newPw").value;
      if (np.length < 6) { alert("Password must be at least 6 characters."); return; }
      try { localStorage.setItem(PW_KEY, np); } catch (e2) {}
      $("newPw").value = "";
      toast("Password changed ✓");
    });
    $("exportBtn").addEventListener("click", function () {
      var blob = new Blob([JSON.stringify(store, null, 2)], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "rehmat-tools-backup.json";
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    });
    $("importFile").addEventListener("change", function () {
      var f = this.files[0];
      if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        try {
          var s = JSON.parse(String(r.result || ""));
          if (s && s.products && s.settings) {
            store = s; persist(); renderAll(); toast("Imported ✓");
          } else alert("Invalid backup file.");
        } catch (err) { alert("Import failed: " + err.message); }
      };
      r.readAsText(f);
      this.value = "";
    });
    $("resetBtn").addEventListener("click", function () {
      if (!confirm("Reset ALL products and settings to defaults? This cannot be undone.")) return;
      store = window.Store.reset();
      renderAll(); toast("Reset done ✓");
    });
  }

  /* ================= boot ================= */
  function renderAll() {
    renderDashboard(); renderProducts(); renderWebsiteText(); renderHomepage(); renderCourses();
    renderReviews(); renderProofs();
    renderCoupons(); renderPayments(); resetProductForm(); resetCourseForm();
  }
  function init() {
    initLogin(); initTabs();
    initProductForm(); initBulk(); initWebsiteText(); initHomepage(); initCourseForm(); initProofForm();
    initCoupons(); initPayments(); initSettings();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();



// ============================================================
// MANUAL CUSTOMER PURCHASES & WARRANTY TRACKING
// ============================================================
window.saveManualCustomerOrder = function(e) {
  e.preventDefault();
  var name = document.getElementById('mCustName').value;
  var phone = document.getElementById('mCustPhone').value;
  var product = document.getElementById('mProduct').value;
  var duration = document.getElementById('mDuration').value;
  var amount = document.getElementById('mAmount').value;
  var method = document.getElementById('mMethod').value;
  var warranty = document.getElementById('mWarranty').value;
  var expiry = document.getElementById('mExpiry').value;
  var notes = document.getElementById('mNotes').value;

  var orderId = 'RT-' + Math.floor(1000 + Math.random() * 9000);

  var tbody = document.getElementById('adminPurchasesTableBody');
  if (tbody) {
    var tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid #E5E7EB';
    tr.innerHTML = '<td style="padding: 10px;"><strong>' + orderId + '</strong></td>' +
      '<td style="padding: 10px;"><strong>' + name + '</strong></td>' +
      '<td style="padding: 10px;">' + phone + '</td>' +
      '<td style="padding: 10px;">' + product + ' (' + duration + ')</td>' +
      '<td style="padding: 10px;">Rs. ' + parseInt(amount).toLocaleString('en-PK') + '</td>' +
      '<td style="padding: 10px;">' + method + '</td>' +
      '<td style="padding: 10px;">' + warranty + ' (Exp: ' + expiry + ')</td>' +
      '<td style="padding: 10px;"><span style="background: #DCFCE7; color: #15803D; font-weight: 800; padding: 3px 8px; border-radius: 999px; font-size: 11px;">Delivered</span></td>' +
      '<td style="padding: 10px;">' + notes + '</td>';
    tbody.prepend(tr);
  }

  // Save to localStorage
  try {
    var orders = JSON.parse(localStorage.getItem('rehmat_manual_orders') || '[]');
    orders.push({ orderId, name, phone, product, duration, amount, method, warranty, expiry, notes, date: new Date().toISOString() });
    localStorage.setItem('rehmat_manual_orders', JSON.stringify(orders));
  } catch (err) {}

  alert('✅ Purchase Saved Permanently!\n\nOrder ID: ' + orderId + '\nCustomer: ' + name + '\nTool: ' + product + ' (' + duration + ')\nExpiry: ' + expiry);
};

window.exportPurchasesCSV = function() {
  var rows = [
    ["Order ID", "Customer", "Phone", "Product", "Duration", "Amount", "Method", "Warranty", "Expiry", "Notes"]
  ];
  try {
    var orders = JSON.parse(localStorage.getItem('rehmat_manual_orders') || '[]');
    orders.forEach(function(o) {
      rows.push([o.orderId, o.name, o.phone, o.product, o.duration, o.amount, o.method, o.warranty, o.expiry, o.notes]);
    });
  } catch (err) {}

  if (rows.length === 1) {
    rows.push(["RT-8841", "Ahmed Raza", "03011234567", "ChatGPT Plus", "1 Month", "3500", "JazzCash", "30 Days", "09 Dec 2026", "Sent credentials"]);
  }

  var csvContent = "data:text/csv;charset=utf-8," + rows.map(function(e) { return e.join(","); }).join("\n");
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "rehmat_tools_customer_purchases.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
