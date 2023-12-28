const STORAGE_KEY = 'metronomeSettings';

const saveSettings = () => {
  const data = {
    beatSettings: beatSettings,
    defaultSoundSettings: defaultSoundSettings,
    metronomeState: metronomeState
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const loadSettings = () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (data) {
    beatSettings = data.beatSettings;
    defaultSoundSettings = data.defaultSoundSettings;
    metronomeState = data.metronomeState;
  }
};

// Exporting functions to be used in other modules
export { saveSettings, loadSettings };