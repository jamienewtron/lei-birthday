const flames = document.querySelectorAll(".flame");
const message = document.getElementById("message");

async function startMic() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true
  });

  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();

  const source = audioContext.createMediaStreamSource(stream);
  source.connect(analyser);

  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  let blown = false;

  function detectBlow() {
    analyser.getByteFrequencyData(dataArray);

    let volume = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

    if (volume > 40 && !blown) {
      blown = true;

      flames.forEach(flame => {
        flame.style.display = "none";
      });

      setTimeout(() => {
        message.classList.remove("hidden");
      }, 1000);
    }

    requestAnimationFrame(detectBlow);
  }

  detectBlow();
}

startMic().catch(() => {
  alert("Please allow microphone access.");
});
