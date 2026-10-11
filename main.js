(function () {
  "use strict";

  var C = window.COMBRAY || {};
  var ADDRESS = "3 rue de Moscou, 75008 Paris";
  var GEO = { lat: 48.87987, lng: 2.32634 };
  var DAYS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
  var SCHEMA_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  function $all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  }

  function formatTime(t) {
    var parts = t.split(":");
    return parseInt(parts[0], 10) + "h" + (parts[1] === "00" ? "" : parts[1]);
  }

  /* Statut d'ouverture : « Ouverture le … » puis « Ouvert » */
  function renderStatus() {
    if (!C.openingDate) return;
    var opening = new Date(C.openingDate + "T00:00:00");
    if (new Date() >= opening) {
      $all("[data-status]").forEach(function (n) {
        n.textContent = "Ouvert";
        n.classList.add("is-open");
      });
    }
  }

  /* Horaires : regroupe chaque jour avec son créneau */
  function renderHours() {
    var hours = C.hours || [];
    if (!hours.length) return;
    var byDay = {};
    hours.forEach(function (h) {
      h.days.forEach(function (d) { byDay[d.toLowerCase()] = h; });
    });
    var today = DAYS[(new Date().getDay() + 6) % 7];
    var dl = el("dl", "hours");
    DAYS.forEach(function (d) {
      var row = el("div", d === today ? "hours__row is-today" : "hours__row");
      row.appendChild(el("dt", null, d.charAt(0).toUpperCase() + d.slice(1)));
      var h = byDay[d];
      row.appendChild(el("dd", null, h ? formatTime(h.open) + " – " + formatTime(h.close) : "Fermé"));
      dl.appendChild(row);
    });
    var target = document.querySelector("[data-hours]");
    target.innerHTML = "";
    target.appendChild(dl);
  }

  /* Carte */
  function renderMenu() {
    var menu = C.menu || [];
    if (!menu.length) return;
    var target = document.querySelector("[data-menu]");
    target.innerHTML = "";
    var wrap = el("div", "menu");
    var cols = [el("div", "menu__col"), el("div", "menu__col")];
    menu.forEach(function (group) {
      var section = el("div", "menu__group");
      section.appendChild(el("h3", null, group.title));
      if (group.sousTitre) section.appendChild(el("p", "menu__subtitle", group.sousTitre));
      section.appendChild(el("span", "menu__rule"));
      var ul = el("ul", "menu__list");
      group.items.forEach(function (item) {
        var li = el("li", "menu__item");
        var line = el("div", "menu__line");
        line.appendChild(el("span", "menu__name", item.name));
        line.appendChild(el("span", "menu__dots"));
        line.appendChild(el("span", "menu__price", item.price + " €"));
        li.appendChild(line);
        if (item.description) li.appendChild(el("p", "menu__desc", item.description));
        ul.appendChild(li);
      });
      section.appendChild(ul);
      cols[group.colonne === 2 ? 1 : 0].appendChild(section);
    });
    cols.forEach(function (c) { if (c.children.length) wrap.appendChild(c); });
    target.appendChild(wrap);

    var notes = C.menuNotes || [];
    if (notes.length) {
      var foot = el("div", "menu__notes");
      notes.forEach(function (n, i) { foot.appendChild(el("p", i === 0 ? "menu__note--strong" : null, n)); });
      target.appendChild(foot);
    }
  }

  /* Instagram, e-mail, téléphone */
  function renderContact() {
    var contact = document.querySelector("[data-contact]");
    var list = contact.querySelector(".contact");

    if (C.instagram) {
      var url = "https://www.instagram.com/" + C.instagram.replace(/^@/, "") + "/";
      $all("[data-instagram]").forEach(function (a) { a.href = url; a.hidden = false; });
      $all("[data-instagram-item]").forEach(function (n) { n.hidden = false; });
      var li = el("li");
      var a = el("a", null, "@" + C.instagram.replace(/^@/, ""));
      a.href = url; a.target = "_blank"; a.rel = "noopener"; a.setAttribute("data-track", "Instagram");
      li.appendChild(a); list.appendChild(li);
    }
    if (C.email) {
      $all("[data-email]").forEach(function (a) {
        a.href = "mailto:" + C.email;
        if (!a.textContent.trim() && !a.getAttribute("aria-label")) a.textContent = C.email;
      });
      $all("[data-email-item], [data-footer-email]").forEach(function (n) { n.hidden = false; });
      var li2 = el("li");
      var a2 = el("a", null, C.email);
      a2.href = "mailto:" + C.email;
      li2.appendChild(a2); list.appendChild(li2);
    }
    if (C.phone) {
      var li3 = el("li");
      var a3 = el("a", null, C.phone);
      a3.href = "tel:" + C.phone.replace(/[^\d+]/g, "").replace(/^0/, "+33");
      li3.appendChild(a3); list.appendChild(li3);
    }
    if (list.children.length) contact.hidden = false;
  }

  /* Itinéraire : Plans sur les appareils Apple, Google Maps ailleurs */
  function setDirections() {
    var ua = navigator.userAgent;
    var isApple = /iPhone|iPad|iPod|Macintosh/.test(ua) && !/Android/.test(ua);
    if (!isApple) return;
    var href = "https://maps.apple.com/?daddr=" + encodeURIComponent(ADDRESS) + "&ll=" + GEO.lat + "," + GEO.lng + "&q=Caf%C3%A9%20Combray";
    $all("[data-directions]").forEach(function (a) { a.href = href; });
  }

  /* Carte Google chargée seulement à la demande (pas de cookies tiers avant le clic) */
  function setMap() {
    var btn = document.querySelector("[data-map-load]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var iframe = document.createElement("iframe");
      iframe.title = "Carte : Combray, " + ADDRESS;
      iframe.src = "https://maps.google.com/maps?q=" + encodeURIComponent(ADDRESS) + "&z=16&hl=fr&output=embed";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      var box = document.querySelector("[data-map]");
      box.innerHTML = "";
      box.appendChild(iframe);
      iframe.focus();
    });
  }

  /* Événements de mesure (Plausible, si activé) */
  function setTracking() {
    document.addEventListener("click", function (e) {
      var link = e.target.closest && e.target.closest("[data-track]");
      if (link && typeof window.plausible === "function") {
        window.plausible(link.getAttribute("data-track"));
      }
    });
  }

  /* Données structurées schema.org */
  function injectSchema() {
    var data = {
      "@context": "https://schema.org",
      "@type": "CafeOrCoffeeShop",
      name: "Café Combray",
      description: "Café librairie consacré à la littérature française.",
      url: "https://combray.paris/",
      image: "https://combray.paris/images/og-combray.jpg",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3 rue de Moscou",
        postalCode: "75008",
        addressLocality: "Paris",
        addressCountry: "FR"
      },
      geo: { "@type": "GeoCoordinates", latitude: GEO.lat, longitude: GEO.lng },
      servesCuisine: "Café",
      hasMenu: "https://combray.paris/#carte",
      foundingDate: C.openingDate
    };
    if (C.hours && C.hours.length) {
      data.openingHoursSpecification = C.hours.map(function (h) {
        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.days.map(function (d) { return SCHEMA_DAYS[DAYS.indexOf(d.toLowerCase())]; }),
          opens: h.open,
          closes: h.close
        };
      });
    }
    if (C.instagram) data.sameAs = ["https://www.instagram.com/" + C.instagram.replace(/^@/, "") + "/"];
    if (C.email) data.email = C.email;
    if (C.phone) data.telephone = C.phone;
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  renderStatus();
  renderHours();
  renderMenu();
  renderContact();
  setDirections();
  setMap();
  setTracking();
  injectSchema();
  $all("[data-year]").forEach(function (n) { n.textContent = new Date().getFullYear(); });
})();
