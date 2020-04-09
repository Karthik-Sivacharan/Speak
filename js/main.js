//Init SpeechSynth API
const synth = window.speechSynthesis;

//DOM Elements 
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

// Init voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    console.log(voices);

    //Loop through voices and create an option 
    voices.forEach(voice => {
        //Create option element 
        const option = document.createElement('option');
        //Fill option with voice and language 
        option.textContent = voice.name + '(' + voice.lang + ')';

        // Set needed option aatributes 
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
};

getVoices();

if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

//Speak 

const speak = () => {
    //Check if speaking 
    if (synth.speaking) {
        console.error('Already Speaking');
        return;
    }

    if (textInput.value !== '') {
        // Get speak text 
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        //Speak end 
        speakText.onend = e => {
            console.log('done speaking..');
        }

        //Speak error
        speakText.onerror = e => {
            console.log('Error');
        }

        // Selected Voice 
        const SelectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // Loop through voices 
        voices.forEach(voice => {
            if (voice.name === SelectedVoice) {
                speakText.voice = voice;
            }
        });

        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        //speak 
        synth.speak(speakText);
    }
};

// Event Listeners 

// Text form submit 

textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

// Rate value change 

rate.addEventListener('change', e => rateValue.textContent = rate.value);

// Pitch value change 

pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

// Voice Select change 

voiceSelect.addEventListener('change', e => speak());