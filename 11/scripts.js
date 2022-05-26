const playSymbol = "►";
const pauseSymbol = "⏸";

// Get elements
const videoPlayer = document.querySelector(".viewer");
const playButton = document.querySelector(".player__button.toggle");
const rewindButton = document.querySelector(".player__button.rewind");
const skipButton = document.querySelector(".player__button.skip");
const volumeRange = document.querySelector(".player__slider[name=volume]")
const playbackRateRange = document.querySelector(".player__slider[name=playbackRate]");
const progressBar = document.querySelector(".progress");
const progressBarFilled = document.querySelector(".progress__filled");

let mouseDown = false;

// change pitch when speed changes
videoPlayer.preservesPitch = false;

// Build out functions
// logic
function togglePlay() {
    if (videoPlayer.paused) {
        videoPlayer.play();
        playButton.innerText = pauseSymbol;
    } else {
        videoPlayer.pause();
        playButton.innerText = playSymbol;
    }
}

function skipVideoSeconds(seconds) {
    // when used with negative seconds, video gets rewind
    const currentTimeVideo = videoPlayer.currentTime;
    videoPlayer.currentTime = currentTimeVideo + seconds;
}

function changeVolume(volume) {
    videoPlayer.volume = volume;
}

function changePlaybackRate(rate) {
    if (Number.isInteger(rate)) {
        console.debug("You must use a Double for changing playback rate");
        return;
    }
    videoPlayer.playbackRate = rate;
}

function updateProgressBar() {
    let currentSeconds = parseInt(videoPlayer.currentTime);
    let maxSeconds = parseInt(videoPlayer.duration);
    let watchedPercentage = currentSeconds/maxSeconds*100;
    progressBarFilled.style.setProperty("flex-basis", watchedPercentage + "%");
}

function scrub(e) {
    videoPlayer.currentTime = (e.offsetX / progressBar.offsetWidth) * videoPlayer.duration;
}

// handlers
// e.currentTarget is element that is listening to the event, e.target is element that triggered it
function playerButtonHandler(e) {
    let skipSeconds = parseInt(e.currentTarget.dataset["skip"]);
    skipVideoSeconds(skipSeconds);
}

function toggleButtonHandler(e) {
    togglePlay();
}

function volumeRangeHandler(e) {
    let element = e.currentTarget;
    let newValue = parseFloat(element.value);
    changeVolume(newValue);
}

function playbackRateRangeHandler(e) {
    let element = e.currentTarget;
    let newValue = parseFloat(element.value);
    changePlaybackRate(newValue);
}

// Hook up the event handlers
// inputs
playButton.addEventListener("click", toggleButtonHandler);
rewindButton.addEventListener("click", playerButtonHandler);
skipButton.addEventListener("click", playerButtonHandler);
volumeRange.addEventListener("input", volumeRangeHandler);
playbackRateRange.addEventListener("input", playbackRateRangeHandler);

progressBar.addEventListener("click", scrub);
progressBar.addEventListener("mousemove", (e) => mouseDown && scrub(e));
progressBar.addEventListener("mousedown", () => mouseDown = true);
progressBar.addEventListener("mouseup", () => mouseDown = false);

// video player
videoPlayer.addEventListener("click", (e) => {
    // only toggle play if video itself was clicked, not inputs
    if (e.target === videoPlayer) {
        togglePlay();
    }
})
videoPlayer.addEventListener("timeupdate", updateProgressBar);
videoPlayer.addEventListener("loadeddata", updateProgressBar);