let isPlay = false;
const g_input = $("#group-input");
const g_stop = $("#group-play");
g_stop.hide();

// sound
const player = document.querySelector("audio");
function soundTick() {
  const src = "/backtick2.mp3";
  let urlp = "";
  if (player.src != "") {
    urlp = new URL(player.src).pathname;
  }
  if (urlp != src) {
    player.src = src;
  }
  player.currentTime = 0;
  player.play();
}

let tickStartCounter = 3;
function soundStart() {
  player.currentTime = 0;
  player.src = "/ding-hotel.mp3";
  player.play();
  setTimeout(() => {
    tickStartCounter = 3;
    $(player).on("ended", ticking).trigger("ended");
  }, 1000);
}

function ticking() {
  if (tickStartCounter > 0) {
    player.currentTime = 0;
    player.src = "/backtick.mp3";
    player.play();
  }
  tickStartCounter -= 1;
}

function soundStop() {
  $(player).off("ended", ticking);
  player.currentTime = 0;
  player.src = "/stop.mp3";
  player.play();
}

function soundAlarm() {
  $(player).off("ended", ticking);
  const src = "/alarm.mp3";
  player.src = src;
  player.play();
  player.loop = true;
}

// fn
function runTimer() {
  // recursive
  if (!isPlay) return;

  if (time_rng.value > 0) {
    setTimeout(runTimer, 1000);
    const newsec = time_rng.value - 1;
    $('#time_rng').val(newsec);
    onSecondsChanged();
  } else {
    isPlay = false;
    soundAlarm();
  }
}

function startTimer(e) {
  e.preventDefault();
  soundStart();

  isPlay = true;
  g_input.find('input').attr("disabled", true);
  g_input.find('button').hide();
  g_stop.show();
  setTimeout(runTimer, 1000);
}

function stopTimer(e) {
  if (e) e.preventDefault();
  soundStop();
  
  isPlay = false;
  player.loop = false;
  g_input.find('input').attr("disabled", false);
  g_input.find('button').show();
  g_stop.hide();
}

function toSecs(minutes = 0, seconds = 0) {
  return seconds + (minutes * 60)
}

function formatN(n = 0) {
  return n.toString().padStart(2, '0');
}

function getTimes(seconds = 0) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return {
    minutes: minutes,
    seconds: remainingSeconds,
    string: formatN(minutes) + ":" + formatN(remainingSeconds)
  }
}

function onSecondsChanged() {
  minutes.value = formatN(getTimes(time_rng.value).minutes);
  seconds.value = formatN(getTimes(time_rng.value).seconds);
}

(function cssController() {
  $("input[type=number]")
    .addClass("form-control text-center rounded-top-0 fs-1 fw-bold bg-light")
    .on("focus", e => e.target.select())
    .parent('div')
    .addClass("mb-3 input-group")

  $("button")
    .addClass("btn w-100")
    .parent("div")
    .addClass("mb-3")
})();

