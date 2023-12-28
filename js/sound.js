const accentedSound = new Audio('sounds/accented_beep.mp3');
const notAccentedSound = new Audio('sounds/unaccented_beep.mp3');
const mutedSound = new Audio('sounds/muted_beep.mp3');

const playSound = (beatType) => {
  switch (beatType) {
    case 'accented':
      accentedSound.currentTime = 0;
      accentedSound.play();
      break;
    case 'notAccented':
      notAccentedSound.currentTime = 0;
      notAccentedSound.play();
      break;
    case 'muted':
      mutedSound.currentTime = 0;
      mutedSound.play();
      break;
    default:
      console.error('Invalid beat type');
  }
};

const updateDefaultSound = (soundSettings) => {
  if (soundSettings.accented) {
    accentedSound.src = soundSettings.accented;
  }
  if (soundSettings.notAccented) {
    notAccentedSound.src = soundSettings.notAccented;
  }
  if (soundSettings.muted) {
    mutedSound.src = soundSettings.muted;
  }
};