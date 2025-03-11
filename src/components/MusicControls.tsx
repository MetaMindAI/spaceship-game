import React, { useState, useEffect } from 'react';
import { MusicTrack } from '../types';
import { playBackgroundMusic, stopBackgroundMusic, initAudioContext, initAudio } from '../utils/audio';
import { Play, Pause, Music2, Music3, Music4 } from 'lucide-react';

// Import local music files
// Note: You may need to add a declaration file for these imports to work
import music1 from './music1.mp3';
import music2 from './music2.mp3';
import music3 from './music3.mp3';

interface MusicControlsProps {
  tracks: MusicTrack[];
}

export const MusicControls: React.FC<MusicControlsProps> = ({ tracks }) => {
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);

  // Map of local music files
  const localMusicFiles = {
    "space-adventure": music1,
    "battle-theme": music2,
    "cosmic-journey": music3
  };

  // Initialize audio context on component mount
  useEffect(() => {
    // Create the audio context but don't start it yet
    initAudio();
  }, []);

  const handleTrackSelect = (trackId: string) => {
    try {
      // Initialize audio context on user interaction
      if (!audioInitialized) {
        initAudioContext();
        setAudioInitialized(true);
      }

      const track = tracks.find(t => t.id === trackId);
      if (track) {
        setCurrentTrackId(trackId);
        
        // Use local file path instead of URL from config
        const musicFile = localMusicFiles[trackId as keyof typeof localMusicFiles];
        
        // Start playing immediately when a track is selected
        playBackgroundMusic(musicFile);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error selecting track:', error);
    }
  };

  const togglePlayStop = () => {
    try {
      // Initialize audio context on user interaction
      if (!audioInitialized) {
        initAudioContext();
        setAudioInitialized(true);
      }

      if (isPlaying) {
        stopBackgroundMusic();
        setIsPlaying(false);
      } else if (currentTrackId) {
        // Use local file path instead of URL from config
        const musicFile = localMusicFiles[currentTrackId as keyof typeof localMusicFiles];
        
        playBackgroundMusic(musicFile);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error toggling play/stop:', error);
    }
  };

  // Array of music icons to use for each track
  const musicIcons = [
    <Music2 size={24} key="music-icon-1" />,
    <Music3 size={24} key="music-icon-2" />,
    <Music4 size={24} key="music-icon-3" />
  ];

  return (
    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 backdrop-blur-sm p-4 rounded-xl z-10 text-white flex flex-col gap-2">
      {tracks.map((track, index) => (
        <button
          key={track.id}
          onClick={() => handleTrackSelect(track.id)}
          className={`p-3 rounded-full transition-all ${
            currentTrackId === track.id 
              ? 'bg-white/30 text-white' 
              : 'bg-black/50 text-gray-300 hover:bg-black/70'
          }`}
        >
          {musicIcons[index]}
        </button>
      ))}

      <button
        onClick={togglePlayStop}
        className="p-3 rounded-full bg-black/50 text-gray-300 hover:bg-black/70 transition-all"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
    </div>
  );
}; 