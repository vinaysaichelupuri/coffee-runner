import { createAudioPlayer, AudioPlayer } from 'expo-audio';

let clickPlayer: AudioPlayer | null = null;
let coffeePlayer: AudioPlayer | null = null;
let crashPlayer: AudioPlayer | null = null;

// Load sounds globally once
try {
  clickPlayer = createAudioPlayer(require('../assets/sounds/click.mp3'));
  coffeePlayer = createAudioPlayer(require('../assets/sounds/coffee.mp3'));
  crashPlayer = createAudioPlayer(require('../assets/sounds/crash.mp3'));
} catch (error) {
  console.warn('Failed to load sounds globally', error);
}

export const playClick = () => {
  if (clickPlayer) {
    clickPlayer.seekTo(0);
    clickPlayer.play();
  }
};

export const playCoffee = () => {
  if (coffeePlayer) {
    coffeePlayer.seekTo(0);
    coffeePlayer.play();
  }
};

export const playCrash = () => {
  if (crashPlayer) {
    crashPlayer.seekTo(0);
    crashPlayer.play();
  }
};

export const useAudio = () => {
  return { playClick, playCoffee, playCrash };
};
