let currentBeat = 0;
let beatInterval = null;

const metronomeState = {
  isPlaying: false,
  tempo: 120, // Default tempo
  beats: []
};

function initializeApp() {
  loadSettings();
  renderBeats();
  attachEventListeners();
}

function renderBeats() {
  const beatContainer = document.getElementById('beat-container');
  beatContainer.innerHTML = ''; // Clear existing beats

  metronomeState.beats.forEach((beat, index) => {
    const beatElement = document.createElement('div');
    beatElement.id = `beat-${index}`;
    beatElement.className = `beat ${beat.type}`;
    beatElement.dataset.sound = beat.sound;
    beatContainer.appendChild(beatElement);
  });
}

function updateBeat(beatId, type, sound) {
  const beat = metronomeState.beats[beatId];
  if (type) beat.type = type;
  if (sound) beat.sound = sound;
  saveSettings();
  renderBeats();
}

function playMetronome() {
  if (metronomeState.isPlaying) return;

  metronomeState.isPlaying = true;
  const tempoInterval = 60000 / metronomeState.tempo;
  beatInterval = setInterval(() => {
    highlightBeat(currentBeat);
    playSound(metronomeState.beats[currentBeat].sound);
    currentBeat = (currentBeat + 1) % metronomeState.beats.length;
  }, tempoInterval);
}

function stopMetronome() {
  if (!metronomeState.isPlaying) return;

  metronomeState.isPlaying = false;
  clearInterval(beatInterval);
  beatInterval = null;
  currentBeat = 0;
  renderBeats(); // Remove highlights
}

function togglePlay() {
  if (metronomeState.isPlaying) {
    stopMetronome();
  } else {
    playMetronome();
  }
}

function changeTempo(newTempo) {
  metronomeState.tempo = newTempo;
  saveSettings();
  if (metronomeState.isPlaying) {
    stopMetronome();
    playMetronome();
  }
}

function highlightBeat(beatId) {
  const previousBeat = document.querySelector('.beat.active');
  if (previousBeat) previousBeat.classList.remove('active');

  const currentBeatElement = document.getElementById(`beat-${beatId}`);
  if (currentBeatElement) currentBeatElement.classList.add('active');
}

function saveSettings() {
  localStorage.setItem('metronomeState', JSON.stringify(metronomeState));
}

function loadSettings() {
  const savedState = localStorage.getItem('metronomeState');
  if (savedState) {
    Object.assign(metronomeState, JSON.parse(savedState));
  }
}

function attachEventListeners() {
  document.getElementById('start-stop-button').addEventListener('click', togglePlay);
  document.getElementById('tempo-selector').addEventListener('input', (event) => {
    changeTempo(event.target.value);
  });

  document.getElementById('beat-container').addEventListener('click', (event) => {
    if (event.target.classList.contains('beat')) {
      const beatId = parseInt(event.target.id.replace('beat-', ''), 10);
      const beat = metronomeState.beats[beatId];
      const nextType = beat.type === 'accented' ? 'notAccented' : beat.type === 'notAccented' ? 'muted' : 'accented';
      updateBeat(beatId, nextType, beat.sound);
    }
  });
}

// Initialize the app when the script loads
initializeApp();