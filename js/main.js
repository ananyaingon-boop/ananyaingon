/* ============================================
   Portfolio · Ananya Jitthipakorn — interactions
   (IT / Cyber theme)
   ============================================ */
(function () {
  "use strict";

  var nav = document.getElementById("nav");
  var navLinks = document.getElementById("navLinks");
  var navToggle = document.getElementById("navToggle");
  var yearEl = document.getElementById("year");

  /* ---------- ปีใน footer ---------- */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar จางเมื่อ scroll ---------- */
  function onScroll() {
    if (window.scrollY > 30) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- เมนูมือถือ ---------- */
  function closeMenu() {
    navLinks.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
  }

  navLinks.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeMenu();
  });

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- Animation เผยเมื่อ scroll (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    revealEls.forEach(function (el) {
      el.classList.contains("is-visible") || revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- แถบทักษะ: เก็บค่า width แล้วค่อย ๆ เติมเมื่อเห็น ---------- */
  var bars = document.querySelectorAll(".bar__track i");
  bars.forEach(function (bar) {
    var w = bar.style.width || "0%";
    bar.dataset.w = w;
    bar.style.width = "0%";
  });

  if ("IntersectionObserver" in window) {
    var skillObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            entry.target
              .querySelectorAll(".bar__track i")
              .forEach(function (bar) {
                bar.style.width = bar.dataset.w;
              });
            skillObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    document.querySelectorAll(".skill").forEach(function (s) {
      skillObserver.observe(s);
    });
  } else {
    document.querySelectorAll(".bar__track i").forEach(function (bar) {
      bar.style.width = bar.dataset.w;
    });
  }

  /* ---------- Highlight เมนูตาม section ที่เห็น ---------- */
  var sections = document.querySelectorAll("section[id]");
  var menuLinks = document.querySelectorAll(".nav__link[href^='#']");
  var sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          menuLinks.forEach(function (link) {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach(function (s) {
    sectionObserver.observe(s);
  });

  /* ---------- กล่อง Terminal: พิมพ์คำสั่งวนซ้ำ ---------- */
  var terminalBody = document.getElementById("terminalBody");
  if (terminalBody) {
    var tLines = Array.prototype.slice.call(
      terminalBody.querySelectorAll(".t-out")
    );
    var tOutput = {
      whoami: "> ananya.jitthipakorn",
      status: "> ปวส.2 · เทคโนโลยีสารสนเทศ · open to work",
      deploy: "> ✓ build complete — deployed."
    };
    var tIdx = 0;

    function typeLine() {
      if (tIdx >= tLines.length) {
        setTimeout(resetTerminal, 7000);
        return;
      }
      var el = tLines[tIdx];
      var text = tOutput[el.getAttribute("data-line")] || "";
      el.textContent = "";
      var i = 0;
      (function step() {
        i++;
        el.textContent = text.slice(0, i);
        if (i < text.length) {
          setTimeout(step, 16);
        } else {
          tIdx++;
          setTimeout(typeLine, 380);
        }
      })();
    }

    function resetTerminal() {
      tLines.forEach(function (l) {
        l.textContent = "";
      });
      tIdx = 0;
      typeLine();
    }

    /* เริ่มพิมพ์หลังโหลดเล็กน้อย (พิมพ์วนซ้ำตลอด) */
    setTimeout(resetTerminal, 1000);
  }

  /* ---------- แบบฟอร์มติดต่อ (ตัวอย่าง — ไม่ส่ง backend) ---------- */
  var form = document.getElementById("contactForm");
  var hint = document.getElementById("formHint");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var name = document.getElementById("name").value.trim();
      hint.textContent =
        "✓ ขอบคุณ " + (name || "คุณ") + " — ข้อความถูกบันทึกแล้ว (ต้องต่อ backend เพื่อส่งอีเมลจริง)";
      hint.style.color = "#67E8F9";
      form.reset();
    });
  }
})();
