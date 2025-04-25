const VolumeSlider = ({ volume, setVolume }) => {
    return (
      <div className="volume-slider">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="volume-bar"
        />
      </div>
    );
  };
  
  export default VolumeSlider;