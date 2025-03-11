import { Howl } from 'howler';

const ELEVEN_LABS_API_KEY = import.meta.env.VITE_ELEVEN_LABS_API_KEY;
const KRAVEN_VOICE_ID = 'TxGEqnHWrfWFTfGW9XjX';
const API_URL = 'https://api.elevenlabs.io/v1/text-to-speech';

// Sound effects using Howler.js
const sounds = {
  hit: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2580/2580-preview.mp3'],
    volume: 0.5
  }),
  miss: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3'],
    volume: 0.3
  }),
  victory: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3'],
    volume: 0.6
  }),
  defeat: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3'],
    volume: 0.6
  }),
  buttonClick: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'],
    volume: 0.2
  }),
  levelUp: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2575/2575-preview.mp3'],
    volume: 0.5
  }),
  multiHit: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'],
    volume: 0.7
  }),
  targeting: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3'],
    volume: 0.3,
    loop: true
  }),
  explosion: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2577/2577-preview.mp3'],
    volume: 0.6
  })
};

let audioContext: AudioContext | null = null;
let audioSource: AudioBufferSourceNode | null = null;

export const initAudio = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

export const playSound = (soundName: keyof typeof sounds) => {
  sounds[soundName].play();
};

export const stopSound = (soundName: keyof typeof sounds) => {
  sounds[soundName].stop();
};

export const playKravenVoice = async (text: string) => {
  if (!ELEVEN_LABS_API_KEY) {
    console.warn('Eleven Labs API key not found. Speech synthesis disabled.');
    return;
  }

  try {
    const context = initAudio();
    if (!context) {
      throw new Error('Failed to initialize audio context');
    }

    if (context.state === 'suspended') {
      await context.resume();
    }

    const response = await fetch(`${API_URL}/${KRAVEN_VOICE_ID}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVEN_LABS_API_KEY
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`);
    }

    const audioBlob = await response.blob();
    const arrayBuffer = await audioBlob.arrayBuffer();

    if (audioSource) {
      try {
        audioSource.stop();
      } catch (e) {
        console.warn('Error stopping previous audio:', e);
      }
    }

    const audioData = await context.decodeAudioData(arrayBuffer);
    
    audioSource = context.createBufferSource();
    audioSource.buffer = audioData;
    audioSource.connect(context.destination);
    audioSource.start();

    return new Promise((resolve) => {
      audioSource!.onended = () => resolve(true);
    });
  } catch (error) {
    console.error('Error playing Kraven voice:', error);
    throw error;
  }
};