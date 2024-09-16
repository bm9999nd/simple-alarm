let alarmOn = false;
const mediaAlarm = new Audio();
const mediaTick = new Audio("./audio/backtick.mp3");
const mediaSetup = new Audio("./audio/backtick2.mp3");
const mediaDing = new Audio("./audio/ding-hotel.mp3");
const mediaStop = new Audio("./audio/stop.mp3");

function audio() {
  function playTick() {
    mediaTick.currentTime = 0;
    mediaTick.play();
  }
  function playSetup() {
    mediaSetup.currentTime = 0;
    mediaSetup.play();
  }
  function playDing() {
    mediaDing.currentTime = 0;
    mediaDing.play();
  }
  function playStop() {
    mediaStop.currentTime = 0;
    mediaStop.play();
  }

  function playAlarm() {
    alarmOn = true;
    mediaAlarm.src = "./audio/alarm.mp3";
    mediaAlarm.currentTime = 0;
    mediaAlarm.loop = true;
    mediaAlarm.play();
  }
  function stopAlarm() {
    alarmOn = false;
    mediaAlarm.loop = false;
    mediaAlarm.pause();
    mediaAlarm.currentTime = 0;
    mediaAlarm.src = "";
    $(mediaAlarm).off("timeupdate");
  }


  return {
    playTick,
    playSetup,
    playDing,
    playStop,
    playAlarm,
    stopAlarm,
  }
}


