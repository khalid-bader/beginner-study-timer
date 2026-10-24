const minutes = document.querySelector('#minutes');
const clock = document.querySelector('#clock');
const start = document.querySelector('#start');
const pause = document.querySelector('#pause');
const message = document.querySelector('#message');
let remaining = 25 * 60 * 1000;
let deadline = 0;
let interval = null;
function display() {
  const seconds = Math.ceil(remaining / 1000);
  clock.textContent = String(Math.floor(seconds / 60)).padStart(2, '0') + ':' + String(seconds % 60).padStart(2, '0');
}
function stop() {
  clearInterval(interval); interval = null;
  start.disabled = false; pause.disabled = true; minutes.disabled = false;
}
function reset() {
  stop(); const value = minutes.valueAsNumber;
  if (!Number.isInteger(value) || value < 1 || value > 120) { start.disabled = true; message.textContent = 'اختر عددًا صحيحًا من 1 إلى 120.'; return; }
  remaining = value * 60000; display(); message.textContent = 'جاهز لجلسة جديدة.';
}
start.addEventListener('click', () => {
  if (interval !== null) return;
  if (remaining <= 0) reset();
  if (start.disabled) return;
  deadline = Date.now() + remaining;
  start.disabled = true; pause.disabled = false; minutes.disabled = true;
  message.textContent = 'جلسة التركيز تعمل الآن.';
  // نحسب الوقت من موعد النهاية، فلا تعتمد الدقة على انتظام الاستدعاءات.
  interval = setInterval(() => {
    remaining = Math.max(0, deadline - Date.now()); display();
    if (remaining === 0) { stop(); message.textContent = 'أحسنت! انتهت الجلسة. خذ استراحة قصيرة.'; }
  }, 200);
});
pause.addEventListener('click', () => {
  remaining = Math.max(0, deadline - Date.now()); stop(); display(); message.textContent = 'متوقف مؤقتًا. اضغط ابدأ للمتابعة.';
});
document.querySelector('#reset').addEventListener('click', reset);
minutes.addEventListener('input', reset);
display();
