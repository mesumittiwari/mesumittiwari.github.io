(() => {
  const glow = document.querySelector(".cursor-glow");
  const canHover = matchMedia("(hover:hover)").matches;

  if (canHover && glow) {
    window.addEventListener("pointermove", e => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
      document.body.classList.add("cursor-active");
    }, {passive:true});
  }

  document.querySelectorAll(".interactive").forEach(el => {
    el.addEventListener("pointerenter", () => el.classList.add("is-hovered"));
    el.addEventListener("pointerleave", () => el.classList.remove("is-hovered"));
  });
})();
