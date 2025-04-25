import { FaRandom, FaRedo } from 'react-icons/fa';

const SideControls = ({ isShuffled, setIsShuffled, isRepeating, setIsRepeating }) => {
  return (
    <div className="side-controls">
      <button 
        className={`control-btn ${isShuffled ? 'active' : ''}`}
        onClick={() => setIsShuffled(!isShuffled)}
        title="Shuffle"
      >
        <FaRandom />
      </button>
      <button 
        className={`control-btn ${isRepeating ? 'active' : ''}`}
        onClick={() => setIsRepeating(!isRepeating)}
        title="Repeat"
      >
        <FaRedo />
      </button>
    </div>
  );
};

export default SideControls;
