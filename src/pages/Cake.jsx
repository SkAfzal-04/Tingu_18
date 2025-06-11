import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cake.css'; // Assume this CSS includes required styles

const Cake = () => {
  const navigate = useNavigate();
  const confettiContainerRef = useRef(null);
  const floatingElementsRef = useRef(null);
  const backgroundMusicRef = useRef(null);
  const blowSoundRef = useRef(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [candles, setCandles] = useState(Array(6).fill(true));

  useEffect(() => {
    createFloatingElements();
    createConfetti();
  }, []);

  const toggleAudio = () => {
    const music = backgroundMusicRef.current;
    if (music.paused) {
      music.play();
      setAudioPlaying(true);
    } else {
      music.pause();
      setAudioPlaying(false);
    }
  };

  const handleCandleClick = (index) => {
  const newCandles = [...candles];
  newCandles[index] = false;
  setCandles(newCandles);
  console.log(`Candle ${index + 1} blown out`);
  blowSoundRef.current.play();

  // Check if all candles are blown out
  if (newCandles.every(candle => candle === false)) {
    setTimeout(() => {
      const birthdayMessage = document.querySelector('.birthday-message');
      const confettiContainer = confettiContainerRef.current;
      const nextButton = document.querySelector('.next-button');

      if (birthdayMessage && confettiContainer && nextButton) {
        birthdayMessage.classList.add('visible');
        confettiContainer.classList.add('active');
        createConfetti();

        setTimeout(() => {
          nextButton.classList.add('visible');
        }, 2000);
      }
    }, 500);
  }
};


  const createFloatingElements = () => {
    const container = floatingElementsRef.current;

    for (let i = 0; i < 15; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart';
      Object.assign(heart.style, {
        left: `${Math.random() * 100}%`,
        animationDuration: `${15 + Math.random() * 10}s`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: `${0.4 + Math.random() * 0.5}`,
        transform: `scale(${0.7 + Math.random()})`,
      });
      container.appendChild(heart);
    }

    for (let i = 0; i < 6; i++) {
      const balloon = document.createElement('div');
      balloon.className = 'balloon';
      const colors = [
        'linear-gradient(to right, #b980ff, #7a36ff)',
        'linear-gradient(to right, #9966ff, #5e22cc)',
        'linear-gradient(to right, #c39aff, #9966ff)',
        'linear-gradient(to right, #dfc5ff, #b980ff)',
        'linear-gradient(to right, #a673ff, #7a36ff)'
      ];
      Object.assign(balloon.style, {
        left: `${Math.random() * 100}%`,
        animationDuration: `${20 + Math.random() * 15}s`,
        animationDelay: `${Math.random() * 10}s`,
        background: colors[Math.floor(Math.random() * colors.length)],
        opacity: `${0.7 + Math.random() * 0.3}`,
        transform: `scale(${0.8 + Math.random() * 0.5})`,
      });
      container.appendChild(balloon);
    }

    for (let i = 0; i < 20; i++) {
      const star = document.createElement('div');
      star.className = 'stars';
      Object.assign(star.style, {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${3 + Math.random() * 5}s`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: `${0.3 + Math.random() * 0.7}`,
        transform: `scale(${0.5 + Math.random() * 1.5})`,
      });
      container.appendChild(star);
    }
  };

  const createConfetti = () => {
    const confettiColors = ['#7a36ff', '#b980ff', '#dfc5ff', '#FFD700', '#ffffff'];
    const shapes = ['circle', 'triangle', 'square', 'rectangle'];

    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];

        if (shape === 'circle') {
          confetti.style.borderRadius = '50%';
        } else if (shape === 'triangle') {
          Object.assign(confetti.style, {
            width: '0',
            height: '0',
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderBottom: `10px solid ${color}`,
            backgroundColor: 'transparent',
          });
        } else if (shape === 'square') {
          confetti.style.borderRadius = '0';
        } else if (shape === 'rectangle') {
          Object.assign(confetti.style, {
            height: '5px',
            width: '15px'
          });
        }

        Object.assign(confetti.style, {
          left: `${Math.random() * 100}%`,
          backgroundColor: color,
          animationDuration: `${3 + Math.random() * 4}s`,
          animationDelay: `${Math.random() * 2}s`,
          opacity: `${0.6 + Math.random() * 0.4}`,
          transform: `scale(${0.7 + Math.random()})`,
        });

        confettiContainerRef.current.appendChild(confetti);
        setTimeout(() => confetti.remove(), 7000);
      }, i * 30);
    }
  };

  return (
    <div>
      <div className="floating-elements" ref={floatingElementsRef}></div>

      <div className="audio-control" onClick={toggleAudio}>
        <i className={`fas ${audioPlaying ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
      </div>

      <audio ref={backgroundMusicRef} loop>
        <source
          src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_217c0a26f9.mp3?filename=easy-lifestyle-137766.mp3"
          type="audio/mpeg"
        />
      </audio>

      <audio ref={blowSoundRef}>
        <source
          src="https://cdn.pixabay.com/download/audio/2021/12/16/audio_87d5d78348.mp3?filename=blow-25-185007.mp3"
          type="audio/mpeg"
        />
      </audio>

      <div className="cake-container">
        <div className="cake">
          <div className="candles-container">
            {candles.map((lit, i) => (
              <div
                key={i}
                className={`candle ${!lit ? 'blown' : ''}`}
                onClick={() => handleCandleClick(i)}
              ></div>
            ))}
          </div>
          <div className="cake-layer layer-3"></div>
          <div className="cake-layer layer-2"></div>
          <div className="cake-layer layer-1"></div>
          <div className="cake-plate"></div>
        </div>
      </div>

      <div className="birthday-message">
        <div className="message-text">
          ✨ Happy Birthday, Madam Ji! ✨<br />
          You make my world beautiful and bright!<br />
          ❤️ I cherish every moment with you ❤️
        </div>
        <button className="next-button" onClick={()=>navigate('/wish')}>
          Continue to Your Surprise <i className="fas fa-arrow-right"></i>
        </button>
      </div>

      <div className="confetti-container" ref={confettiContainerRef}></div>
    </div>
  );
};

export default Cake;