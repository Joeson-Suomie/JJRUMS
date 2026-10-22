document.addEventListener("DOMContentLoaded", function () {
  // Hero image slider
  var slides = Array.from(document.querySelectorAll(".hero-slide"));
  var dots = Array.from(document.querySelectorAll(".slider-dot"));
  var hero = document.querySelector(".hero");
  if (slides.length) {
    var currentSlide = 0;
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var timer;
    function showSlide(index) {
      currentSlide = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        var active = i === currentSlide;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
      });
      dots.forEach(function (dot, i) {
        var active = i === currentSlide;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-pressed", String(active));
      });
    }
    function startSlider() {
      stopSlider();
      if (!reducedMotion) timer = window.setInterval(function () { showSlide(currentSlide + 1); }, 4000);
    }
    function stopSlider() { window.clearInterval(timer); }
    document.querySelectorAll("[data-slide-step]").forEach(function (button) {
      button.addEventListener("click", function () { showSlide(currentSlide + Number(button.dataset.slideStep)); });
    });
    dots.forEach(function (dot) {
      dot.addEventListener("click", function () { showSlide(Number(dot.dataset.slide)); });
    });
    if (hero) {
      hero.addEventListener("mouseenter", stopSlider);
      hero.addEventListener("mouseleave", startSlider);
      hero.addEventListener("focusin", stopSlider);
      hero.addEventListener("focusout", startSlider);
    }
    showSlide(0);
    startSlider();
  }

  // Mobile menu
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.querySelector(".mobile-menu");
  toggle.addEventListener("click", function () {
    var open = menu.hidden;
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.innerHTML = open ? "&#10005;" : "&#9776;";
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      menu.hidden = true;
      toggle.innerHTML = "&#9776;";
    });
  });

  // News
  var news = [
    { tag: "Admissions", t: "Enrollment open for the new academic term", d: "Applications are being received for Nursery through Grade 12." },
    { tag: "Sports", t: "Jaguars roar at inter-school championship", d: "Our athletes brought home top honors in football and track." },
    { tag: "Alumni", t: "Alumni homecoming & mentorship day", d: "Graduates return to inspire the next generation of leaders." }
  ];
  var ticker = document.getElementById("ticker");
  news.concat(news).forEach(function (n) {
    var s = document.createElement("span");
    s.textContent = "★ " + n.t;
    ticker.appendChild(s);
  });
  var grid = document.getElementById("news-grid");
  news.forEach(function (n) {
    var a = document.createElement("article");
    a.className = "news-card reveal";
    a.innerHTML = '<span class="tag"></span><h3></h3><p></p>';
    a.querySelector(".tag").textContent = n.tag;
    a.querySelector("h3").textContent = n.t;
    a.querySelector("p").textContent = n.d;
    grid.appendChild(a);
  });

  // Year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Reveal on scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add("is-visible"); });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
});
