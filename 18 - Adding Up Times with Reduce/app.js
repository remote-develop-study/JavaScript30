const extractTimeString = node => node.dataset.time;

const convertTimeStringToSeconds = time => {
  const [one, two, three] = time.split(":").map(Number);

  if (three) {
    return one * 60 * 60 + two * 60 + three;
  } else if (two) {
    return one * 60 + two;
  } else {
    return one;
  }
};

const add = (a, b) => a + b;

const formatSeconds = seconds => {
  let hour = 0;
  let minutes = 0;

  if (seconds > 60 * 60) {
    hour = Math.floor(seconds / (60 * 60));
    seconds %= 3600;
  }

  if (seconds > 60) {
    minutes = Math.floor(seconds / 60);
    seconds %= 60;
  }

  return { hour, minutes, seconds };
};

const totalRunningTime = go(
  document.querySelectorAll("[data-time]"),
  map(extractTimeString),
  map(convertTimeStringToSeconds),
  reduce(add),
  formatSeconds
);

for (const [k, v] of Object.entries(totalRunningTime)) console.log(v, k);
