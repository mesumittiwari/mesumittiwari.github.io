(() => {
  const STACK_KEY = "portfolio-navigation-stack-v2";
  const RESTORE_KEY = "portfolio-restore-y";

  const readStack = () => {
    try {
      const raw = sessionStorage.getItem(STACK_KEY);
      const stack = raw ? JSON.parse(raw) : [];
      return Array.isArray(stack) ? stack : [];
    } catch (_) {
      return [];
    }
  };

  const writeStack = (stack) => {
    sessionStorage.setItem(STACK_KEY, JSON.stringify(stack.slice(-30)));
  };

  const currentState = () => ({
    url: location.href,
    y: Math.round(window.scrollY),
    title: document.title
  });

  // Push the page we are leaving. This gives dedicated pages a true return
  // path: Home -> Projects -> Case Study -> Projects -> Home.
  document.querySelectorAll("[data-page-link]").forEach(link => {
    link.addEventListener("click", () => {
      const stack = readStack();
      stack.push(currentState());
      writeStack(stack);
    });
  });

  document.querySelectorAll("[data-back-home]").forEach(button => {
    const stack = readStack();
    const previous = stack.length ? stack[stack.length - 1] : null;

    button.textContent = "Back to previous page";
    button.setAttribute(
      "aria-label",
      previous?.title ? `Back to ${previous.title}` : "Back to previous page"
    );
    if (previous?.title) button.title = `Back to ${previous.title}`;

    button.addEventListener("click", event => {
      if (!previous?.url) return;
      event.preventDefault();

      // Consume the current return frame before navigating back. The next
      // page therefore sees the page before the one we just left.
      const nextStack = readStack();
      nextStack.pop();
      writeStack(nextStack);

      sessionStorage.setItem(RESTORE_KEY, String(previous.y || 0));
      window.location.href = previous.url;
    });
  });

  const y = sessionStorage.getItem(RESTORE_KEY);
  if (y !== null) {
    sessionStorage.removeItem(RESTORE_KEY);
    window.addEventListener("load", () => {
      // Wait for layout/reveal effects to settle before restoring the exact
      // scroll position of the originating section.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: Number(y), left: 0, behavior: "auto" });
        });
      });
    }, { once: true });
  }
})();
