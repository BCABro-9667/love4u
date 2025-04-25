// Updated ProgressBar.jsx
const ProgressBar = ({ progress, onChange, currentTime, duration }) => {
    const formatTime = (time) => {
      if (isNaN(time)) return "0:00";
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
  
    return (
      <div className="progress-container">
        <span className="time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max="100"
          value={isNaN(progress) ? 0 : progress}
          onChange={onChange}
          className="progress-bar"
        />
        <span className="time">{formatTime(duration)}</span>
      </div>
    );
  };
  
  export default ProgressBar;