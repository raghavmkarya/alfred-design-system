(() => {
  const data = window.ALFRED_MOTION_TIMELINES;
  const params = new URLSearchParams(location.search);
  const poster = params.get("poster") === "1";
  const ratioParam = params.get("ratio") || "horizontal";
  const durationParam = Number(params.get("duration")) || 15;
  const playbackSpeed = Number(params.get("speed")) || 1;
  const stage = document.querySelector("#motion-stage");
  const scrubber = document.querySelector("#motion-scrubber");
  const durationSelect = document.querySelector("#motion-duration");
  const ratioSelect = document.querySelector("#motion-ratio");
  const playButton = document.querySelector("#motion-play");
  const timeLabel = document.querySelector("#motion-time");
  const sequenceLabel = document.querySelector("#motion-sequence");
  let duration = durationParam;
  let ratio = ratioParam;
  let currentTime = poster ? duration : 0;
  let playing = false;
  let previousFrame = 0;
  let animationFrame = 0;

  function timeline() {
    return data.timelines.find((item) => item.duration === duration);
  }

  function currentSequence() {
    const cues = timeline().cues;
    return [...cues].reverse().find((cue) => cue.at <= currentTime)?.sequence || cues[0].sequence;
  }

  function setRatio(nextRatio) {
    ratio = nextRatio;
    const dimensions = data.ratios.find((item) => item.id === ratio);
    stage.style.setProperty("--motion-width", dimensions.width);
    stage.style.setProperty("--motion-height", dimensions.height);
    stage.dataset.ratio = ratio;
  }

  function render() {
    const progress = Math.min(1, currentTime / duration);
    const sequence = poster ? "poster-frame" : currentSequence();
    stage.dataset.sequence = sequence;
    stage.style.setProperty("--progress", progress);
    stage.style.setProperty("--cue-progress", Math.min(1, (currentTime % 4) / 1.2));
    timeLabel.textContent = `${currentTime.toFixed(1)} / ${duration}s`;
    sequenceLabel.textContent = sequence.replaceAll("-", " ");
    scrubber.value = String(currentTime);
  }

  function tick(timestamp) {
    if (!playing) return;
    const delta = previousFrame ? ((timestamp - previousFrame) / 1000) * playbackSpeed : 0;
    previousFrame = timestamp;
    currentTime = Math.min(duration, currentTime + delta);
    render();
    if (currentTime >= duration) {
      playing = false;
      playButton.textContent = "Play again";
      return;
    }
    animationFrame = requestAnimationFrame(tick);
  }

  function stop() {
    playing = false;
    cancelAnimationFrame(animationFrame);
    previousFrame = 0;
    playButton.textContent = "Play";
  }

  playButton.addEventListener("pointerdown", () => {
    playButton.dataset.pressed = "1";
  });
  playButton.addEventListener("pointerup", () => {
    delete playButton.dataset.pressed;
  });
  playButton.addEventListener("click", () => {
    if (playing) {
      stop();
      return;
    }
    if (currentTime >= duration) currentTime = 0;
    playing = true;
    playButton.textContent = "Pause";
    animationFrame = requestAnimationFrame(tick);
  });
  scrubber.addEventListener("input", () => {
    stop();
    currentTime = Number(scrubber.value);
    render();
  });
  durationSelect.addEventListener("change", () => {
    stop();
    duration = Number(durationSelect.value);
    currentTime = Math.min(currentTime, duration);
    scrubber.max = String(duration);
    render();
  });
  ratioSelect.addEventListener("change", () => setRatio(ratioSelect.value));

  durationSelect.value = String(duration);
  ratioSelect.value = ratio;
  scrubber.max = String(duration);
  setRatio(ratio);
  if (poster) document.body.dataset.poster = "1";
  render();
  document.body.dataset.ready = "1";
})();
