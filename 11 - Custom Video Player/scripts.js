const $video = document.querySelector('video');
const $progress = document.querySelector('.progress');
const $progressBar = document.querySelector('div.progress__filled');
const $toggle = document.querySelector('.toggle');
const $skipButtons = document.querySelectorAll('button.player__button');
const $ranges = document.querySelectorAll('input[type="range"]');

const icons = {
  play: `<i class="fa fa-play"></i>`,
  pause: `<i class="fa fa-pause"></i>`,
};

const handleProgressBar = (event) => {
  const {
    target: { currentTime, duration },
  } = event;
  const progressed = (currentTime / duration) * 100;
  $progressBar.style.flexBasis = `${progressed}%`;
};

const handleToggle = (() => {
  let isPlaying = true;
  return ({ target }) => {
    let $target = target.nodeName === 'video' ? target : $video;
    isPlaying ? $target.pause() : $target.play();
    $toggle.innerHTML = isPlaying ? icons.play : icons.pause;
    isPlaying = !isPlaying;
  };
})();

const handleSkip = ({ target }) => {
  $video.currentTime += parseFloat(target.dataset.skip);
};

const handleRange = ({ target: { name, value } }) => ($video[name] = value);

const handleVideoTime = (() => {
  let mouseDown = false;
  return ({ target, type, offsetX }) => {
    const t = (offsetX / $progress.offsetWidth) * $video.duration;
    const setVideoCurrentTime = (t) => ($video.currentTime = t);
    switch (type) {
      case 'click':
        setVideoCurrentTime(t);
        break;
      case 'mousedown':
        mouseDown = true;
        break;
      case 'mouseup':
        mouseDown = false;
        break;
      case 'mousemove':
        mouseDown && setVideoCurrentTime(t);
        break;
      default:
        return;
    }
  };
})();

const main = () => {
  $video.play();
  $progressBar.style.flexBasis = `0%`;
  $video.addEventListener('timeupdate', handleProgressBar);
  $video.addEventListener('click', handleToggle);
  $toggle.addEventListener('click', handleToggle);
  $skipButtons.forEach(($skipButton) =>
    $skipButton.addEventListener('click', handleSkip),
  );
  $ranges.forEach(($range) => {
    $range.addEventListener('change', handleRange);
    $range.addEventListener('mousemove', handleRange);
  });

  $progress.addEventListener('click', handleVideoTime);
  $progress.addEventListener('mousemove', handleVideoTime);
  $progress.addEventListener('mousedown', handleVideoTime);
  $progress.addEventListener('mouseup', handleVideoTime);
};

main();
