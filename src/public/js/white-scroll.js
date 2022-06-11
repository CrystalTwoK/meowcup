let isActive = false;
const span = document.getElementById("scroll-span");
const anchor = document.getElementById("scroll-a");
const hamburger = document.getElementById("hamburger");

$(hamburger).on("click", () => {
  if (hamburger.ariaExpanded == "false") {
    span.classList.add("white");
    anchor.classList.add("white");
  } else {
    span.classList.remove("white");
    anchor.classList.remove("white");
  }
});
