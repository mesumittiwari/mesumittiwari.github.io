(() => {
  const nav=document.querySelector(".site-nav");
  const menu=document.querySelector(".menu-toggle");
  const links=[...document.querySelectorAll(".desktop-nav a")];
  const panel=document.querySelector(".mobile-nav-panel");
  const mobileLinks=[...document.querySelectorAll("[data-mobile-nav]")];

  const onScroll=()=>nav?.classList.toggle("scrolled",scrollY>30);
  addEventListener("scroll",onScroll,{passive:true}); onScroll();

  const sections=[...document.querySelectorAll("[data-section]")];
  if(sections.length){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        const current=document.querySelector(".section-index-current");
        if(current)current.textContent=entry.target.dataset.section;
        links.forEach(link=>link.classList.toggle("active",link.dataset.navTarget===entry.target.id));
      });
    },{rootMargin:"-42% 0px -42% 0px",threshold:0});
    sections.forEach(s=>observer.observe(s));
  }

  const close=()=>{
    document.body.classList.remove("menu-open");
    menu?.setAttribute("aria-expanded","false");
    panel?.setAttribute("aria-hidden","true");
  };

  menu?.addEventListener("click",e=>{
    e.stopPropagation();
    const open=!document.body.classList.contains("menu-open");
    document.body.classList.toggle("menu-open",open);
    menu.setAttribute("aria-expanded",String(open));
    panel?.setAttribute("aria-hidden",String(!open));
  });
  mobileLinks.forEach(link=>link.addEventListener("click",close));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
  document.addEventListener("click",e=>{
    if(!document.body.classList.contains("menu-open"))return;
    if(panel?.contains(e.target)||menu?.contains(e.target))return;
    close();
  });
})();
