function init() {
	initaudioObservers();

	var transpose = false;

	var pitch = document.querySelectorAll("input[name='pitch']");
	var pitchValue = document.getElementById("pitch-value");
	var pitchShiftTypeSelect = document.getElementById("pitch-shift-type");
	var pitchReset = document.getElementById("pitch-reset");

	var playAudio = document.getElementById("play-audio");
	var pauseAudio = document.getElementById("pause-audio");

	function setPitchValue(_pitchValue) {
		// pitch.value = _pitchValue;
		pitchValue.textContent = _pitchValue;

		getJungle().setPitchOffset(_pitchValue, transpose);
	}

	// function setPitchShiftTypeSmooth() {
	// 	pitch.max = 1;
	// 	pitch.min = -1;
	// 	pitch.step = 0.01;
	// 	pitchShiftTypeSelect.selectedIndex = 0;
	// 	transpose = false;
	// }

	// function setPitchShiftTypeSemiTone() {
	// 	pitch.max = 24;
	// 	pitch.min = -24;
	// 	pitch.step = 1;
	// 	pitchShiftTypeSelect.selectedIndex = 1;
	// 	transpose = true;
	// }

	playAudio.addEventListener("click", function () {
		audioEl = document.querySelector("audio");
		audioEl.play();
	});

	pauseAudio.addEventListener("click", function () {
		audioEl = document.querySelector("audio");
		audioEl.pause();
	});

	pitch.forEach(x => x.addEventListener("click", function (event) {
		console.log(event.target.value);
		setPitchValue(event.target.value);
	}, false));

	// pitchShiftTypeSelect.addEventListener("change", function (event) {
	// 	var opt = pitchShiftTypeSelect.options[pitchShiftTypeSelect.selectedIndex]
	// 	if (opt.value == "smooth") {
	// 		setPitchShiftTypeSmooth();
	// 		setPitchValue(0);
	// 	} else if (opt.value == "semi-tone") {
	// 		setPitchShiftTypeSemiTone();
	// 		setPitchValue(0);
	// 	}
	// }, false);

	pitchReset.addEventListener("click", function (event) {
		setPitchValue(0);
	}, false);
}

var readyStateCheckInterval = setInterval(function () {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		init();
	}
}, 10);