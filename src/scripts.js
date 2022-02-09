
let wakeLock = null;

async function requestWakeLock() {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      stopSleepActivated();
      console.log("LOG:: Wake Lock is active");
      console.log(wakeLock);
    } catch (err) {
        console.log("LOG:: Wake Lock is activation ERROR");
      console.error(`${err.name}, ${err.message}`);
    }
  }

  function wakeLockRelease() {
    wakeLock.release()
    .then(() => {
      wakeLock = null;
    });
    console.log("LOG:: Wake Lock Released");
  }

function checkWakeLockSupport() {
    if ('wakeLock' in navigator) {
        console.log("LOG:: Wake Lock Supported by Browser");
        document.getElementById("status").innerHTML = "Stop Sleep Supported!";
        isSupported = true;
        requestWakeLock();
      } else {
        stopSleepNotSupported();
        console.log("LOG:: Wake Lock NOT Supported by Browser");
      }
}

function stopSleepActivated() {
    document.getElementById("status").innerHTML = "Stop Sleep Activated!";
    document.getElementById("statusBox").classList.remove('is-warning');
    document.getElementById("statusBox").classList.add('is-success');
}

function stopSleepNotSupported() {
    document.getElementById("status").innerHTML = "Stop Sleep not Supported by this browser!";
    document.getElementById("statusBox").classList.add('is-danger');
}

window.onload = checkWakeLockSupport();
