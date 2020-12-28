var _audioCtx = null;
var _jungle = null;
var _outputNode = null;

var audioConnected = false;
var _previousPlaybackRate = 1;
var _previousPitch = 0;

var transpose = false;

function getAudioContext() {
	if (!_audioCtx) {
		_audioCtx = new AudioContext();
	}
	return _audioCtx;
}

function getJungle() {
	if (!_jungle) {
		_jungle = new Jungle(getAudioContext());
	}
	return _jungle;
}

function getOutputNode(audio) {
	if (!_outputNode) {
		audioCtx = getAudioContext();
		_outputNode = audioCtx.createMediaElementSource(audio);
	}
	console.log(_outputNode);
	return _outputNode;
}

function connectAudio(audio) {

	var audioCtx = getAudioContext();
	if (_outputNode !== undefined && _outputNode !== null) {
		_outputNode.disconnect(audioCtx.destination);
	}
	var outputNode = getOutputNode(audio);
	var jungle = getJungle();

	outputNode.connect(jungle.input);
	jungle.output.connect(audioCtx.destination);

	jungle.setPitchOffset(_previousPitch, transpose);
	audio.playbackRate = _previousPlaybackRate;

	console.log("connectAudio");
}

function disconnectAudio(audio) {
	var audioCtx = getAudioContext();
	var outputNode = getOutputNode(audio);
	var jungle = getJungle();

	outputNode.disconnect(jungle.input);
	jungle.output.disconnect(audioCtx.destination);
	outputNode.connect(audioCtx.destination);
	audio.playbackRate = 1;

	console.log("disconnectAudio");
}

_observer = null;
audioEl = null;

function initaudioObservers() {
	console.log("initaudioObservers");

	_observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			if (mutation.addedNodes !== undefined && mutation.addedNodes !== null) {
				for (var i = 0; i < mutation.addedNodes.length; ++i) {
					var node = mutation.addedNodes[i];
					// Dom has changed so try and get the audio element again.
					newAudioEl = document.querySelector("audio");
					if (audioEl !== newAudioEl) {
						if (audioConnected) {
							disconnectAudio(audioEl);
						}
						audioConnected = true;
						audioEl = newAudioEl;
						connectAudio(newAudioEl);
					}
				}
			}
			if (audioEl) {
				// XXX: Don"t do this on every mutation.
				//
				//      We set the playbackRate as otherwise it is forgotten when
				//      a audio changes in youtube.
				audioEl.playbackRate = _previousPlaybackRate;
			}
		});
	});

	var observerConfig = {
		attributes: true,
		childList: true,
		characterData: true
	};

	var targetNode = document.body;
	_observer.observe(targetNode, observerConfig);

	// Try get the audio element.
	audioEl = document.querySelector("audio");
	// audioEl.volume = 0.5;
	audioEl.load();
	connectAudio(audioEl);
}
