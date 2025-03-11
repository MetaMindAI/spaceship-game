import { Howl } from 'howler';

const ELEVEN_LABS_API_KEY = import.meta.env.VITE_ELEVEN_LABS_API_KEY;
const KRAVEN_VOICE_ID = 'TxGEqnHWrfWFTfGW9XjX'; // Deep villain voice
const NOVA_VOICE_ID = '21m00Tcm4TlvDq8ikWAM';   // Friendly sidekick voice

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

// Background music handling
let currentMusic: Howl | null = null;

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

// Updated to support different voice IDs
export const playVoice = async (text: string, voiceType: 'villain' | 'sidekick' = 'villain') => {
  if (!ELEVEN_LABS_API_KEY) {
    console.warn('Eleven Labs API key not found. Speech synthesis disabled.');
    return;
  }

  // Select the appropriate voice ID based on the character type
  const voiceId = voiceType === 'villain' ? KRAVEN_VOICE_ID : NOVA_VOICE_ID;

  try {
    const context = initAudio();
    if (!context) {
      throw new Error('Failed to initialize audio context');
    }

    if (context.state === 'suspended') {
      await context.resume();
    }

    const response = await fetch(`${API_URL}/${voiceId}`, {
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
    console.error('Error playing voice:', error);
    throw error;
  }
};

// Keep the old function for backward compatibility
export const playKravenVoice = (text: string) => playVoice(text, 'villain');

// Add a new function for the sidekick voice
export const playSidekickVoice = (text: string) => playVoice(text, 'sidekick');

export const playBackgroundMusic = (url: string, volume: number = 0.3) => {
  // Initialize audio context if needed
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }

  // Stop current music if playing
  if (currentMusic) {
    currentMusic.stop();
  }
  
  // Create and play new music with proper error handling
  try {
    currentMusic = new Howl({
      src: [url],
      loop: true,
      volume: volume,
      html5: true,
      onload: () => {
        console.log('Music loaded successfully');
      },
      onplay: () => {
        console.log('Music started playing');
      },
      onloaderror: (id, err) => {
        console.error('Error loading music:', err);
      },
      onplayerror: (id, err) => {
        console.error('Error playing music:', err);
        
        // Try to recover by forcing HTML5 Audio
        const sound = currentMusic as any;
        sound._html5 = true;
        sound.load();
        sound.play();
      }
    });
    
    currentMusic.play();
  } catch (error) {
    console.error('Failed to play background music:', error);
  }
};

export const stopBackgroundMusic = () => {
  if (currentMusic) {
    currentMusic.stop();
    currentMusic = null;
  }
};

export const setMusicVolume = (volume: number) => {
  if (currentMusic) {
    currentMusic.volume(volume);
  }
};

// Add this function to initialize audio context after user interaction
export const initAudioContext = () => {
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
};