import React, { useRef, useState, useEffect } from "react";

const AudioPlayer = ({
  src,
  type = "audio/mpeg",
  controls = true,
  autoPlay = false,
  loop = false,
  preload = "metadata",
  className = "",
  onError,
  onEnded,
}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSliderChange = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    audioRef.current.currentTime = time;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`audio-player ${className}`}>
      <audio
        ref={audioRef}
        src={src}
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        preload={preload}
        onError={onError}
        onEnded={onEnded}
      >
        <source src={src} type={type} />
        Your browser does not support the audio element.
      </audio>
      {!controls && (
        <div className="custom-controls">
          <button onClick={togglePlay} className="play-pause-btn">
            {isPlaying ? "Pause" : "Play"}
          </button>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSliderChange}
            className="time-slider"
          />
          <span className="time-display">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
