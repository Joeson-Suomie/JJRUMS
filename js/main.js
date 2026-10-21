document.addEventListener("DOMContentLoaded", function () {
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
