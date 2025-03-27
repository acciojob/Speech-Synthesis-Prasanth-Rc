// Your script here.
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
}

function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
}

function setOption() {
    msg[this.name] = this.value;
}

function speak() {
    speechSynthesis.cancel();
    speechSynthesis.speak(msg);
}

function stop() {
    speechSynthesis.cancel();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('input', setOption));
speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', stop);

// Set default text for speech
msg.text = document.querySelector('[name="text"]').value;