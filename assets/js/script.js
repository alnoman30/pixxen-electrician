// ============================================
// MOBILE MENU & NAVBAR
// ============================================
// Desktop dropdown: + / − icon toggle
document.addEventListener("DOMContentLoaded", function () {
  const desktopDropdown = document.querySelector(".desktop-dropdown");
  const dropdownIcon = document.querySelector(".desktop-dropdown-icon");

  if (desktopDropdown && dropdownIcon) {
    desktopDropdown.addEventListener("mouseenter", function () {
      dropdownIcon.textContent = "−";
    });
    desktopDropdown.addEventListener("mouseleave", function () {
      dropdownIcon.textContent = "+";
    });
  }
});

// ── Mobile 2-panel menu ──
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("mobile-overlay");
  const wrapper = document.getElementById("mobile-menu-wrapper");
  const mmMain = document.getElementById("mm-main");
  const mmServices = document.getElementById("mm-services");
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const closeBtn = document.getElementById("mm-close");
  const servicesTrig = document.getElementById("mm-services-trigger");
  const backBtn = document.getElementById("mm-back");
  const servicesClose = document.getElementById("mm-services-close");

  function openMenu() {
    wrapper.classList.add("active");
    overlay.classList.add("active");
    wrapper.classList.remove("services-open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    wrapper.classList.remove("active", "services-open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openServices() {
    wrapper.classList.add("services-open");
  }

  function closeServices() {
    wrapper.classList.remove("services-open");
  }

  // Open via hamburger
  toggleBtn && toggleBtn.addEventListener("click", openMenu);

  // Close buttons
  closeBtn && closeBtn.addEventListener("click", closeMenu);
  servicesClose && servicesClose.addEventListener("click", closeMenu);

  // Overlay click → close
  overlay && overlay.addEventListener("click", closeMenu);

  // SERVICES → slide to panel 2
  servicesTrig && servicesTrig.addEventListener("click", openServices);

  // BACK → slide back to panel 1
  backBtn && backBtn.addEventListener("click", closeServices);

  // Close nav links (non-services) also close menu
  document.querySelectorAll(".mm-nav-link:not(button)").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Service cards close menu
  document.querySelectorAll(".mm-service-card").forEach((card) => {
    card.addEventListener("click", closeMenu);
  });

  // Resize: close on desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) closeMenu();
  });
});

//full width and height menu -

(function () {
  const overlay = document.getElementById("pixxen-menu");
  const topPanel = document.getElementById("menu-top");
  const botPanel = document.getElementById("menu-bottom");
  const closeBtn = document.getElementById("menu-close");
  const openBtn = document.getElementById("desktop-sidebar");
  const cols = document.querySelectorAll(".nav-col");
  const logoWrap = document.getElementById("bottom-logo");

  const DESKTOP_MIN = 1024;
  function isDesktop() {
    return window.innerWidth >= DESKTOP_MIN;
  }

  // ─── Pre-set initial states ───────────────────────────────────
  gsap.set(topPanel, { y: "-100%" });
  gsap.set(botPanel, { y: "100%" });
  gsap.set(cols, { y: 40, opacity: 0 });
  gsap.set(logoWrap, { y: 30, opacity: 0 });

  let isOpen = false;
  let isAnimating = false;

  // ─── OPEN ─
  function openMenu() {
    if (!isDesktop() || isOpen || isAnimating) return;
    isAnimating = true;

    document.body.classList.add("menu-open");
    overlay.classList.add("is-open");

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = true;
        isAnimating = false;
      },
    });

    tl.to(topPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(botPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(
      cols,
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
      0.45,
    );
    tl.to(
      logoWrap,
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      0.5,
    );
  }

  // ─── CLOSE ───
  function closeMenu() {
    if (!isOpen || isAnimating) return;
    isAnimating = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = false;
        isAnimating = false;
        overlay.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        gsap.set(cols, { y: 40, opacity: 0 });
        gsap.set(logoWrap, { y: 30, opacity: 0 });
      },
    });

    tl.to(
      [...cols].reverse(),
      { y: -20, opacity: 0, duration: 0.3, stagger: 0.04, ease: "power2.in" },
      0,
    );
    tl.to(
      logoWrap,
      { y: 20, opacity: 0, duration: 0.25, ease: "power2.in" },
      0,
    );
    tl.to(topPanel, { y: "-100%", duration: 0.65, ease: "power4.in" }, 0.2);
    tl.to(botPanel, { y: "100%", duration: 0.65, ease: "power4.in" }, 0.2);
  }

  // Resize: viewport
  window.addEventListener("resize", () => {
    if (!isDesktop() && isOpen) {
      gsap.killTweensOf([topPanel, botPanel, cols, logoWrap]);
      gsap.set(topPanel, { y: "-100%" });
      gsap.set(botPanel, { y: "100%" });
      gsap.set(cols, { y: 40, opacity: 0 });
      gsap.set(logoWrap, { y: 30, opacity: 0 });
      overlay.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      isOpen = false;
      isAnimating = false;
    }
  });

  // ─── Events
  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Prevent background scroll when menu open
  const style = document.createElement("style");
  style.textContent = `body.menu-open { overflow: hidden; }`;
  document.head.appendChild(style);
})();

//smooth scroll

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1.3,
  infinite: false,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);



// Pixxen Electrician js start

// NAVBAR SCROLL BACKGROUND EFFECT
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("electrician-main-nav");

  // Function to update navbar background based on scroll position
  function updateNavbar() {
    if (window.scrollY > 20) {
      navbar.classList.remove("bg-transparent");
      navbar.classList.add("bg-[#523323]");
    } else {
      navbar.classList.remove("bg-[#523323]");
      navbar.classList.add("bg-transparent");
    }
  }

  // Run immediately on page load to catch reloads further down the page
  updateNavbar();

  // Run on scroll
  window.addEventListener("scroll", updateNavbar);
});


// 
// ============ Heading reveal (all .electrician-heading-reveal) ============
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const headings = document.querySelectorAll('.electrician-heading-reveal');
  if (!headings.length) return;

  // ---- tweak these ----
  const FROM_Y = 170;      // % of the line height each letter starts below its line
                           // (keep it high enough that the blur halo starts fully hidden)
  const BLUR = 10;         // starting blur in px
  const DURATION = 1;      // seconds per letter
  const STAGGER = 0.03;    // gap between letters
  const START = 'top 100%'; // a heading already on screen plays right away on load
  // ---------------------

  const mm = gsap.matchMedia();

  document.fonts.ready.then(() => {
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      headings.forEach((heading) => {
        ScrollTrigger.create({
          trigger: heading,
          start: START,
          once: true,
          onEnter: () => {
            // keep "capitalize" looking right while letters are wrapped
            let original;
            const needsCap =
              getComputedStyle(heading).textTransform === 'capitalize' &&
              heading.children.length === 0;

            if (needsCap) {
              original = heading.innerHTML;
              heading.textContent = heading.textContent.replace(/(^|\s)\S/g, (m) =>
                m.toUpperCase()
              );
              heading.style.textTransform = 'none';
            }

            // each line becomes a clipping mask; letters rise up into view from behind it
            const split = SplitText.create(heading, {
              type: 'lines,words,chars',
              mask: 'lines',
            });

            gsap.set(split.chars, {
              yPercent: FROM_Y,
              filter: `blur(${BLUR}px)`,
            });
            gsap.set(heading, { visibility: 'visible' });

            gsap.to(split.chars, {
              yPercent: 0,
              filter: 'blur(0px)',
              duration: DURATION,
              ease: 'power4.out',
              stagger: STAGGER,
              onComplete: () => {
                // put your exact original markup back
                split.revert();
                if (needsCap) {
                  heading.innerHTML = original;
                  heading.style.removeProperty('text-transform');
                }
              },
            });
          },
        });
      });
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(headings, { visibility: 'visible' });
    });
  });
});

// ============ electrician Hero section animation ============
document.addEventListener('DOMContentLoaded', () => {
  const q = (s) => document.querySelector(s);

  const desc = q('.electrician-hero-desc');
  const cta = q('.electrician-hero-cta');
  const pricebox = q('.electrician-hero-pricebox');
  const divider = q('.electrician-hero-divider');
  const img = q('.electrician-hero-img');
  // the first <li> has the class; the others are its following siblings
  const checks = gsap.utils.toArray('.electrician-hero-checkbox, .electrician-hero-checkbox ~ li');
  if (!img) return;

  // ---- tweak these ----
  const TEXT_START = 1.0;  // seconds before the description begins (heading takes ~2s)
  const RISE = 30;         // px the text elements rise from
  const IMG_DELAY = 0.2;   // when the image starts (use 0.6 to follow the heading)
  const IMG_DURATION = 1.4;
  // ---------------------

  const items = [desc, cta, pricebox, divider, img, ...checks].filter(Boolean);
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // starting states
    gsap.set([desc, cta, pricebox].filter(Boolean), { y: RISE, autoAlpha: 0 });
    // the CTA has a CSS "transition-all", which would fight GSAP while it animates
    if (cta) gsap.set(cta, { transition: 'none' });
    if (divider) gsap.set(divider, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(checks, { x: -30, autoAlpha: 0 });
    // image: simple fade + small rise, no clip-path
    gsap.set(img, { yPercent: 6, autoAlpha: 0 });

    document.fonts.ready.then(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.1,
        // remove everything GSAP added so your hover effects work normally
        onComplete: () => gsap.set(items, { clearProps: 'all' }),
      });

      tl.to(img, { yPercent: 0, autoAlpha: 1, duration: IMG_DURATION }, IMG_DELAY)
        .to(desc, { y: 0, autoAlpha: 1, duration: 0.9 }, TEXT_START)
        .to(cta, { y: 0, autoAlpha: 1, duration: 0.9 }, TEXT_START + 0.2)
        .to(pricebox, { y: 0, autoAlpha: 1, duration: 0.9 }, TEXT_START + 0.4)
        .to(divider, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, TEXT_START + 0.55)
        .to(checks, { x: 0, autoAlpha: 1, duration: 0.7, stagger: 0.12 }, TEXT_START + 0.7);
    });
  });
});


  // electrician Cards reveal JS
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.electrician-card-reveal');
  if (!cards.length) return;

  // ---- tweak these ----
  const STAGGER = 220;   // ms between cards revealed together
  const DURATION = 1300; // ms for each card's reveal
  // ---------------------

  // arm the cards (so they stay visible if JS fails)
  cards.forEach((card) => {
    card.style.setProperty('--duration', `${DURATION}ms`);
    card.classList.add('is-ready');
  });
  void document.body.offsetHeight; // force reflow so the first transition plays

  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        // reveal in DOM order (left to right, top to bottom)
        .sort(
          (a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top ||
            a.boundingClientRect.left - b.boundingClientRect.left
        )
        .forEach((entry, i) => {
          const card = entry.target;
          card.style.setProperty('--delay', `${i * STAGGER}ms`);
          card.classList.add('is-revealed');

          card.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'transform') card.classList.add('is-done');
          });

          observer.unobserve(card);
        });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  cards.forEach((card) => observer.observe(card));
});

// electrician FAQ 
document.querySelectorAll('.electrician-faq-item').forEach((item) => {
  const btn = item.querySelector('.electrician-faq-question-btn');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');

    // Close all other items (accordion behavior)
    document.querySelectorAll('.electrician-faq-item.is-open').forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove('is-open');
        openItem.querySelector('.electrician-faq-question-btn').setAttribute('aria-expanded', 'false');
      }
    });

    item.classList.toggle('is-open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

// 
