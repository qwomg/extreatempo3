document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  loadSettings();
  renderBeats();
  attachEventListeners();
}

function renderBeats() {
  const beatContainer = document.getElementById('beat-container');
  beatContainer.innerHTML = ''; // Clear existing beats

  beatSettings.forEach((beat, index) => {
    const beatElement = document.createElement('div');
    beatElement.id = `beat-${index}`;
    beatElement.classList.add('beat', beat.type);
    beatElement.dataset.sound = beat.sound;
    beatContainer.appendChild(beatElement);

    if ((index + 1) % 10 === 0) {
      beatContainer.appendChild(document.createElement('br'));
    }
  });
}

function attachEventListeners() {
  const startStopButton = document.getElementById('start-stop-button');
  startStopButton.addEventListener('click', togglePlay);

  const tempoSelector = document.getElementById('tempo-selector');
  tempoSelector.addEventListener('input', changeTempo);

  const defaultSoundSelector = document.getElementById('default-sound-selector');
  defaultSoundSelector.addEventListener('change', updateDefaultSound);

  document.querySelectorAll('.beat').forEach(beat => {
    beat.addEventListener('click', () => updateBeat(beat.id));
    beat.addEventListener('contextmenu', (e) => {
      e.preventDefault(); // Prevent the context menu from opening
      // Placeholder for future implementation of sound selection on long press
    });
  });
}

function updateBeat(beatId) {
  const beatIndex = parseInt(beatId.split('-')[1]);
  const beat = beatSettings[beatIndex];
  const beatElement = document.getElementById(beatId);

  switch (beat.type) {
    case 'accented':
      beat.type = 'notAccented';
      beat.sound = defaultSoundSettings.notAccented;
      break;
    case 'notAccented':
      beat.type = 'muted';
      beat.sound = defaultSoundSettings.muted;
      break;
    case 'muted':
      beat.type = 'accented';
      beat.sound = defaultSoundSettings.accented;
      break;
    default:
      break;
  }

  beatElement.className = `beat ${beat.type}`;
  beatElement.dataset.sound = beat.sound;
  saveSettings();
}

function updateDefaultSound() {
  const defaultSoundSelector = document.getElementById('default-sound-selector');
  const selectedSound = defaultSoundSelector.value;

  defaultSoundSettings.accented = selectedSound;
  defaultSoundSettings.notAccented = selectedSound;
  defaultSoundSettings.muted = selectedSound;

  beatSettings.forEach(beat => {
    if (beat.type === 'accented') {
      beat.sound = defaultSoundSettings.accented;
    } else if (beat.type === 'notAccented') {
      beat.sound = defaultSoundSettings.notAccented;
    } else if (beat.type === 'muted') {
      beat.sound = defaultSoundSettings.muted;
    }
    const beatElement = document.getElementById(`beat-${beat.id}`);
    beatElement.dataset.sound = beat.sound;
  });

  saveSettings();
}

function changeTempo() {
  const tempoSelector = document.getElementById('tempo-selector');
  metronomeState.tempo = parseInt(tempoSelector.value);
  saveSettings();
}

function togglePlay() {
  metronomeState.isPlaying = !metronomeState.isPlaying;
  if (metronomeState.isPlaying) {
    playMetronome();
  } else {
    stopMetronome();
  }
  saveSettings();
}

function highlightBeat(beatId) {
  document.querySelectorAll('.beat').forEach(beat => {
    beat.classList.remove('highlight');
  });
  const beatElement = document.getElementById(beatId);
  beatElement.classList.add('highlight');
}