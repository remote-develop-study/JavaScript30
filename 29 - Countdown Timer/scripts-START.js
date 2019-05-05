let interval;
const TICK = 1000;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const form = document.querySelector('#custom');
const quotes = [
  `"Yesterday is gone. Tomorrow has not yet come. We have only today. Let us begin." ― Mother Teresa`,
  `"Don’t spend time beating on a wall, hoping to transform it into a door. " ― Coco Chanel`,
  `"Time is the longest distance between two places." ― Tennessee Williams`,
  `"A man who dares to waste one hour of time has not discovered the value of life." ― Charles Darwin`,
  `"Don’t waste your time in anger, regrets, worries, and grudges. Life is too short to be unhappy." ― Roy T. Bennett`,
  `"Time is more value than money. You can get more money, but you cannot get more time." – Jim Rohn`,
  `"Time will pass and seasons will come and go." – Roy Bean`,
  `"Time flies over us, but leaves its shadow behind." – Nathaniel Hawthorne`,
  `"Time is what we want most, but… what we use worst." – William Penn`,
  `"Time is the most valuable thing a man can spend." – Theophrastus`,
  `"Time takes it all, whether you want it to or not." – Stephen King`,
  `"Better three hours too soon, than one minute too late." – William Shakespeare`,
];

const secondsToMinutesAndSeconds = (seconds) => {
  const SECONDS_PER_ONE_MINUTE = 60;
  const minutes = Math.floor(seconds / SECONDS_PER_ONE_MINUTE);
  return [minutes, seconds % SECONDS_PER_ONE_MINUTE];
};

const formatTimes = (minutes, seconds) => {
  const minString = String(minutes);
  const secondString = String(seconds);
  return `${minString}:${
    seconds < 10 ? secondString.padStart(2, '0') : secondString
  }`;
};

const ticktock = (seconds, end) => {
  const now = dayjs(new Date());
  const diff = end.diff(now, 'second');
  showTimesLeft(diff + 1 || 0);
  if (diff < 0) {
    notify();
    return clearInterval(interval);
  }
};

const timer = (seconds) => {
  interval && clearInterval(interval);
  const now = dayjs(new Date());
  const end = now.add(seconds, 'second');
  showTimesLeft(seconds);
  showFinishTime(end.format('HH:mm'));
  interval = setInterval(ticktock.bind(null, seconds, end), TICK);
};

const showTimesLeft = (seconds) => {
  const [minutes, sec] = secondsToMinutesAndSeconds(seconds);
  timerDisplay.textContent = formatTimes(minutes, sec);
};

const showFinishTime = (end) => {
  const MESSAGE_PREFIX = 'Be Back At';
  endTime.textContent = `${MESSAGE_PREFIX} ${end}`;
};

const handleInput = (event) => {
  event.preventDefault();
  const {
    target: {
      minutes: { value },
    },
  } = event;
  timer(parseInt(value));
};

const getSeconds = (button) => {
  return button.dataset && parseInt(button.dataset.time);
};

const startTimer = (event) => {
  const seconds = getSeconds(event.target);
  timer(seconds);
};

const notify = () => {
  if (window.Notification.permission === 'granted') {
    new window.Notification(`Time's up!`, {
      icon:
        'http://cdn.creamheroes.com/communityImages/profile/20181007163954178.jpg',
      body: _.shuffle(quotes).pop(),
    });
  }
};

buttons.forEach((button) => button.addEventListener('click', startTimer));
form.addEventListener('submit', handleInput);

window.onload = function() {
  window.Notification && window.Notification.requestPermission();
};
