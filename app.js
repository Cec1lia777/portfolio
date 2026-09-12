/* ============================================================
   Shuao (Cecilia) Wu — Portfolio interactions
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Language toggle (EN default / 中文) ---------- */
  var toggle = document.getElementById("langToggle");
  var currentLang = "en";

  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-en]").forEach(function (el) {
      var text = lang === "zh" ? el.getAttribute("data-zh") : el.getAttribute("data-en");
      if (text !== null) el.innerHTML = text;
    });
    toggle.textContent = lang === "zh" ? "EN" : "中";
    try { localStorage.setItem("sw-lang", lang); } catch (e) {}
  }

  toggle.addEventListener("click", function () {
    applyLang(currentLang === "en" ? "zh" : "en");
  });

  var saved = null;
  try { saved = localStorage.getItem("sw-lang"); } catch (e) {}
  var urlLang = new URLSearchParams(location.search).get("lang");
  if (urlLang === "zh" || urlLang === "en") saved = urlLang;
  if (saved === "zh") applyLang("zh");

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Lightbox for project boards ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = lightbox.querySelector(".lightbox-img");
  var lightboxClose = lightbox.querySelector(".lightbox-close");

  document.querySelectorAll(".board img").forEach(function (img) {
    img.parentElement.addEventListener("click", function () {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
  });
})();
