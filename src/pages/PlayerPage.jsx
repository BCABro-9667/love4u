import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import AudioControls from '../components/AudioControls';
import ProgressBar from '../components/ProgressBar';
import SideControls from '../components/SideControls';
import VolumeSlider from '../components/VolumeSlider';
import logo from '../assets/images/logo2.png';

import song1 from '../assets/songs/chand_baliyan.m4a';
import song2 from '../assets/songs/Raanjhanaa.m4a';
import song3 from '../assets/songs/fhir_le_aya.m4a';
import song4 from '../assets/songs/kesri2.m4a';
import song5 from '../assets/songs/jo_tum_ho.m4a';
import song6 from '../assets/songs/dhdkne.m4a';
import song7 from '../assets/songs/tere_hawale.m4a';
import song8 from '../assets/songs/sajni.m4a';

import album1 from '../assets/images/album1.jpg';
import album2 from '../assets/images/album2.jpg';
import album3 from '../assets/images/album3.jpg';
import album4 from '../assets/images/kesri.jpg';
import album5 from '../assets/images/anuv.jpg';
import album6 from '../assets/images/dhadkne.jpg';
import album7 from '../assets/images/terehawale.jpg';
import album8 from '../assets/images/sajni.jpg';

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const PlayerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const songs = [
    {
      title: "Dhadkanein Meri",
      artist: "Yasser Desai & Asees Kaur",
      audioSrc: song6,
      image: album6,
      compliment: "You're the rhythm to my heartbeat—my every breath says your name. 💓"
    },
    {
      title: "Chaand Baaliyan",
      artist: "Aditya A.",
      audioSrc: song1,
      image: "https://a10.gaanacdn.com/gn_img/albums/7rVW1Rbk56/VW1aVB0RWk/size_l.webp",
      compliment: "You're my moonlit muse—soft, glowing, and perfect in every way. 🌙"
    },
    {
      title: "Raanjhanaa",
      artist: "A.R. Rahman",
      audioSrc: song2,
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgk2T00NvYcKN8aqSp_Z3bltnLilXNViR9XX7Z6A4Vgvvar9GOCgXf6_-WpMG8dNWPZDLiD2o4i2F6GH7aDWoRp2tkvFyNOsJAFWLZV3o1rXWKbcZH0DPO72WSQ2oMB02jiuYYYyNvphUPf/s1600/Raanjhanaa-1140x713.jpg",
      compliment: "You’ve painted my world with love—just like a true Raanjhanaa. 🌹"
    },
    {
      title: "Phir Le Aya Dil",
      artist: "Arjit Singh",
      audioSrc: song3,
      image: "https://www.livemint.com/rf/Image-621x414/LiveMint/Period1/2012/09/15/Photos/_D3N7033.JPG",
      compliment: "No matter where I go, my heart always finds its way back to you. 🔁❤️"
    },
    {
      title: "Tere Hawaale",
      artist: "Arijit,Shilpa",
      audioSrc: song7,
      image: album7,
      compliment: "No distance 🚶‍♂️➡️🚶‍♀️ can dim the light 🌟 you bring to my heart 💘"
    },
    {
      title: "O Shera-Teer Te Taj",
      artist: "Sangtar",
      audioSrc: song4,
      image: album4,
      compliment: "You're my queen, fierce and divine—love like yours is royalty. 👑"
    },
    {
      title: "Jo Tum Mere Ho",
      artist: "Anuv Jain",
      audioSrc: song5,
      image: album5,
      compliment: "If you're mine, I need nothing else—you're my forever peace. 💑"
    },
   
    {
      title: "Sajni",
      artist: "Arijit Singh, Ram Sampatha",
      audioSrc: song8,
      image: album8,
      compliment: "Your love is my favorite melody 🎶 that plays in my soul 🎧"
    },

  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);

  // 🎯 Update URL on song change
  useEffect(() => {
    const slug = slugify(songs[currentSongIndex].title);
    navigate(`/player/${slug}`, { replace: true });
  }, [currentSongIndex]);

  useEffect(() => {
    if (!audioRef.current || !songs[currentSongIndex]) return;

    const audio = audioRef.current;
    audio.src = songs[currentSongIndex].audioSrc;
    audio.load();

    const handleCanPlay = () => {
      if (isPlaying) {
        audio.play().catch(error => {
          console.error("Playback failed:", error);
          setIsPlaying(false);
        });
      }
      setDuration(audio.duration);
    };

    const updateProgress = () => {
      if (audio.duration) {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleNext);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleNext);
    };
  }, [currentSongIndex, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.error("Audio play error:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) =>
      isShuffled ? Math.floor(Math.random() * songs.length) : (prevIndex + 1) % songs.length
    );
  };

  const handlePrev = () => {
    setCurrentSongIndex((prevIndex) =>
      (prevIndex - 1 + songs.length) % songs.length
    );
  };

  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    if (audioRef.current && audioRef.current.duration) {
      const newTime = (newProgress / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(newProgress);
    }
  };

  return (
    <div className="container">
      <div className="Header">
        <img src={logo} alt="Love4u" height={60} />
        <h1>Love4u</h1>
      </div>
      <div className="player-container">
        <div className="album-art">
          <img src={songs[currentSongIndex].image} alt="Album Art" />
        </div>
        <div className="song-info">
          <h2>{songs[currentSongIndex].title}</h2>
          <h3>{songs[currentSongIndex].artist}</h3>
        </div>

        <SideControls
          isShuffled={isShuffled}
          setIsShuffled={setIsShuffled}
          isRepeating={isRepeating}
          setIsRepeating={setIsRepeating}
        />

        <AudioControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrev={handlePrev}
        />

        <ProgressBar
          progress={progress}
          onChange={handleProgressChange}
          currentTime={currentTime}
          duration={duration}
        />

        <p className='complimentt'>{songs[currentSongIndex].compliment}</p>
        {/* <VolumeSlider volume={volume} setVolume={setVolume} /> */}
      </div>
    </div>
  );
};

export default PlayerPage;
