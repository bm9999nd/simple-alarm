const g_input = $("#group-input");
const g_stop = $("#group-play");
g_stop.hide();
let isRunning = false;

const formatter = {
  getTimes: function (seconds = 0) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  
    return {
      minutes: minutes,
      seconds: remainingSeconds,
      string: this.numToStr(minutes) + ":" + this.numToStr(remainingSeconds)
    }
  },

  // formatN
  numToStr: function (n = 0) {
    return n.toString().padStart(2, '0');
  },

  // toSecs
  getSeconds: function (minutes = 0, seconds = 0) {
    return seconds + (minutes * 60)
  }
};

function timer() {
  const aud = audio();

  function setMinSec() {
    minutes.value = formatter.numToStr(formatter.getTimes(time_rng.value).minutes);
    seconds.value = formatter.numToStr(formatter.getTimes(time_rng.value).seconds);
  }

  function start(e) {
    e.preventDefault();
    aud.playDing();

    g_input.find('input').attr("disabled", true);
    g_input.find('button').hide();
    g_stop.show();
    isRunning = true;
    setTimeout(runTimer, 1000);
  }

  function runTimer() {
    if (time_rng.value > 0) {
      // recursive
      if (isRunning) {
        setTimeout(() => {
          const newsec = time_rng.value - 1;
          $('#time_rng').val(newsec);
          
          // set changed values
          setMinSec();
    
          // recursive
          runTimer();
        }, 1000);
      }
    }
    else {
      aud.playAlarm();
    }
  }

  function stop(e) {
    if (e) e.preventDefault();
    aud.stopAlarm();
    setTimeout(aud.playStop, 1000);
    
    g_input.find('input').attr("disabled", false);
    g_input.find('button').show();
    g_stop.hide();
    isRunning = false;
  }

  return {
    start,
    stop,
    setMinSec,
  }
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