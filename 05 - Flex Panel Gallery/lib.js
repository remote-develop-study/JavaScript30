const panels = document.querySelectorAll(".panel");

const toggleOpen = ({ target }) => target.classList.toggle("open");

const toggleActive = ({ propertyName, target }) => {
  if (propertyName.includes("flex")) {
    target.classList.toggle("open-active");
  }
};

for (const panel of panels) {
  panel.addEventListener("click", toggleOpen);
  panel.addEventListener("transitionend", toggleActive);
}
