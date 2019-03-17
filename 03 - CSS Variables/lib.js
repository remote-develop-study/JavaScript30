const $ = target => document.querySelector(target);
const $$ = target => document.querySelectorAll(target);

const handleUpdate = ({ dataset, name, value }) => {
  document.documentElement.style.setProperty(
    `--${name}`,
    value + (dataset.sizing || "")
  );
};

const eventHandler = ({ target }) => {
  if (target.tagName !== "INPUT") return null;
  console.dir(target);
  handleUpdate(target);
};

$(".controls").addEventListener("change", eventHandler);
$(".controls").addEventListener("mousemove", eventHandler);
