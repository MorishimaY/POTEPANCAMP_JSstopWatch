const timeElement = document.getElementById('time');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

let elapsedTime = 0;

let intervalId = null;

function updateTime() {
  const ms = Math.floor(elapsedTime /100)  % 10;
  const s =  Math.floor(elapsedTime / 1000) % 60;
  const m =  Math.floor(elapsedTime / (1000*60)) % 60;
  const h =  Math.floor(elapsedTime / (1000*3600));
  
  const msStr = ms.toString();
  const sStr  =  s.toString();
  const mStr  =  m.toString();
  const hStr  =  h.toString();
  
  timeElement.innerHTML = `${hStr}:${mStr}:${sStr}:${msStr}`;
}

start.addEventListener('click', function(e) {
  if(intervalId !== null) {return;}
  let pre = new Date();
  intervalId = setInterval(function() {
    const now = new Date();
    elapsedTime += now - pre;
    pre = now;
    updateTime();
  }, 10);
  
  document.getElementById("start").setAttribute("disabled", true);
  document.getElementById("stop").removeAttribute("disabled");
  document.getElementById("reset").setAttribute("disabled", true);
});


stop.addEventListener('click', function(e) {
  clearInterval(intervalId);
  intervalId = null;
  
  document.getElementById("start").removeAttribute("disabled");
  document.getElementById("stop").setAttribute("disabled", true);
  document.getElementById("reset").removeAttribute("disabled");
});


reset.addEventListener('click', function(e) {
  elapsedTime = 0;
  updateTime();
  
  document.getElementById("reset").setAttribute("disabled", true);
  document.getElementById("stop").setAttribute("disabled", true);
  document.getElementById("start").removeAttribute("disabled");
});