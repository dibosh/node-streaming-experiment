var canvas, ctx, source, audioCtx, analyser, freqArray, bars, barX, barW, barH;

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

  source = audioCtx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  animate();
}

function animate() {
  window.requestAnimationFrame(animate);

  freqArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(freqArray);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#A1D490';

  bars = 100;
  for (var i = 0; i < bars; i++) {
    barX = i * 3;
    barW = 2;
    barH = - (freqArray[i] / 2);

    ctx.fillRect(barX, canvas.height, barW, barH);
  }
}
