(function () {
  function setup(root) {
    const scope = root || document;
    const targets = Array.from(scope.querySelectorAll(".js-reveal:not([data-reveal-played='1'])"));
    if (!targets.length) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      targets.forEach((el) => {
        el.classList.add("is-visible");
        el.setAttribute("data-reveal-played", "1");
      });
      return;
    }

    targets.forEach((el, index) => {
      if (!el.style.getPropertyValue("--reveal-delay")) {
        el.style.setProperty("--reveal-delay", `${Math.min(index * 60, 360)}ms`);
      }

      const delay = parseInt(el.style.getPropertyValue("--reveal-delay"), 10);
      const safeDelay = Number.isNaN(delay) ? 0 : delay;

      window.setTimeout(() => {
        el.classList.add("is-visible");
        el.setAttribute("data-reveal-played", "1");
      }, safeDelay);
    });
  }

  window.MotionReveal = { setup };

  document.addEventListener("DOMContentLoaded", () => {
    setup(document);
  });
})();
