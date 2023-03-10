import React, { useState, useRef } from 'react';

const audioSources = [
  '/Howls Moving Castle - opening- merry-go-round of life.mp3',
  '/Laputa Castle in the Sky - carrying you.mp3',
  '/Totoro - tonari no totoro.mp3',
  '/PrincessMononoke - Ashitaka Kouki (Legend of Ashitaka Theme).mp3',
  '/Ponyo - Ponyo by the Cliff by the Sea [Film Version].mp3',
  '/Nausicaa - kaze no tani no nausicaa (opening).mp3',
];

function MusicPlayer() {

    const buttonStyle = {
        position: 'absolute',
        top: '10px',
        left: '10px'
      };
    
      const textStyle = {
        display: 'block',
        marginTop: '20px'
      };

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTrackTitle, setCurrentTrackTitle] = useState(audioSources[currentTrackIndex]);

  const handlePlayPause = () => {
    const audio = audioRef.current;

    if (!isPlaying) {
      audio.src = audioSources[currentTrackIndex];
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    const audio = audioRef.current;
  
    // If not last track, move to the next track
    if (currentTrackIndex < audioSources.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
      audio.src = audioSources[currentTrackIndex + 1];
      setCurrentTrackTitle(audioSources[currentTrackIndex + 1]);
      audio.play();
    } else {
      // If last track, stop playing and start from the beginning
      audio.pause();
      audio.currentTime = 0;
      setCurrentTrackIndex(0);
      setCurrentTrackTitle(audioSources[0]);
      audio.src = audioSources[0];
      audio.play();
    }
  };

  return (
   <div>
      <button style={buttonStyle} onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <span style={textStyle}>Currently playing: {currentTrackTitle}</span>
      <audio ref={audioRef} onEnded={handleEnded} />
    </div>
  );
}

export default MusicPlayer;