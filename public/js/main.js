var canvas, canvas1, ctx, ctx1, source, audioCtx, analyser, freqArray, bars, barX, barW, barH;

var colors = ['#A1D490', '#90C3D4', '#D4A190', '#C390D4'];
var audio = new Audio();
audio.src = 'http://localhost:3000/song';
audio.crossorigin = 'anonymous';
audio.controls = false;
audio.loop = true;
audio.autoplay = true;

window.addEventListener("load", init, false);

function init() {
  document.getElementById('audio').appendChild(audio);

  var AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();
  analyser = audioCtx.createAnalyser();

  canvas = document.getElementById('audio_bars_render');
  ctx = canvas.getContext('2d');

  canvas1 = document.getElementById('particles_render');
  ctx1 = canvas1.getContext('2d');

  source = audioCtx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  animate();
  animateParticles();
}

function animate() {
  window.requestAnimationFrame(animate);

  freqArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(freqArray);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bars = 100;
  for (var i = 0; i < bars; i++) {
    barX = i * 3;
    barW = 2;
    barH = - (freqArray[i] / 2);

    ctx.fillStyle = _.sample(colors);
    ctx.fillRect(barX, canvas.height, barW, barH);
  }
}

function animateParticles() {
  var fps = 10;

  setTimeout(function () {
    window.requestAnimationFrame(animateParticles);

    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

    ctx1.fillStyle = _.sample(colors);
    ctx1.fillRect(_.random(0, canvas1.width), _.random(0, canvas1.height), 10, 10);
  }, 1000 / fps);
}
