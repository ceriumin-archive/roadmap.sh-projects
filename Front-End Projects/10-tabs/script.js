document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".panel");

  function activateTab(idx) {
    tabs.forEach((tab, i) => {
      tab.classList.toggle("active", i === idx);
      panels[i].classList.toggle("active", i === idx);
    });
  }

  tabs.forEach((tab, idx) => {
    tab.addEventListener("click", () => activateTab(idx));
  });

  activateTab(0);
});
