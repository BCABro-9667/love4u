import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';

const AudioControls = ({ isPlaying, onPlayPause, onNext, onPrev }) => {
  return (
    <div className="audio-controls">
      <button className="control-btn" onClick={onPrev}>
        <FaBackward />
      </button>
      <button className="control-btn play-btn" onClick={onPlayPause}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <button className="control-btn" onClick={onNext}>
        <FaForward />
      </button>
    </div>
  );
};

export default AudioControls;
