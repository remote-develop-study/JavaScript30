const $ = target => document.querySelector(target);
const $$ = target => document.querySelectorAll(target);

const playAudio = ({ keyCode }) => {
  const audio = $(`audio[data-key="${keyCode}"]`);
  const key = $(`div[data-key="${keyCode}"]`);

  if (!audio) return null;

  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
};

function removeTransition(event) {
  if (event.propertyName !== "transform") return null;
  event.target.classList.remove("playing");
}

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("keydown", playAudio);
  Array.from($$(".key")).forEach(key =>
    key.addEventListener("transitionend", removeTransition)
  );
});
