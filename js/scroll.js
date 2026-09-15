(() => {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      if (entry.target.matches("[data-counter]")) animateCounter(entry.target);
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .12 });

  document.querySelectorAll(".reveal, [data-counter]").forEach(el => revealObserver.observe(el));

  function animateCounter(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = "true";

    const target = Number(el.dataset.counter);
    const suffix = target === 3 ? "×" : target === 86 ? "" : "+";
    const prefix = target === 86 ? "#" : "";
    const duration = target >= 500 ? 1700 : 1250;
    const start = performance.now();
    let lastValue = -1;

    el.classList.add("counter-running");

    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      // Smooth ease-out: quick initial movement, then a gentle settle.
      const eased = 1 - Math.pow(1 - progress, 4);
      const value = Math.round(target * eased);

      // Only touch the DOM when the displayed integer changes.
      if (value !== lastValue) {
        lastValue = value;
        el.textContent = `${prefix}${value}${suffix}`;
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = `${prefix}${target}${suffix}`;
        el.classList.remove("counter-running");
        el.classList.add("counter-complete");
      }
    };

    requestAnimationFrame(tick);
  }
})();
