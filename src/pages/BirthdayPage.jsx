import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BirthdayPage.css';

const NUM_STARS = 300;
const EMOJI_LIST = ['❤️', '🎂', '🎁', '🎈', '🎊', '✨', '🎉', '💖', '💕', '💝', '💫', '🥳', '🤩', '👑'];
const CONFETTI_COLORS = ['#ff6b6b', '#f8a5c2', '#c3f0ca', '#adcbf8', '#f9d89c', '#c5a3ff', '#a0e7e5'];

const BirthdayPage = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const [titleAnimated, setTitleAnimated] = useState(false);
  const [emojis, setEmojis] = useState([]);
  const [confettiList, setConfettiList] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [fireworks, setFireworks] = useState([]);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate stars once
    const generatedStars = Array.from({ length: NUM_STARS }, () => ({
      size: 0.5 + Math.random() * 3,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
    }));
    setStars(generatedStars);

    // Animate title
    const timeout = setTimeout(() => setTitleAnimated(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const emojiInterval = setInterval(() => {
      const emoji = {
        id: Date.now(),
        symbol: EMOJI_LIST[Math.floor(Math.random() * EMOJI_LIST.length)],
        left: `${Math.random() * 100}%`,
        size: `${1 + Math.random() * 2}rem`,
        rotate: `${-45 + Math.random() * 90}deg`,
        duration: 6 + Math.random() * 6,
      };
      setEmojis(prev => [...prev, emoji]);
      setTimeout(() => {
        setEmojis(prev => prev.filter(e => e.id !== emoji.id));
      }, emoji.duration * 1000);
    }, 600);

    const confettiInterval = setInterval(() => {
      const confetti = {
        id: Date.now(),
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        left: `${Math.random() * 100}%`,
        size: 5 + Math.random() * 10,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 5,
        rotate: `${Math.random() * 360}deg`,
      };
      setConfettiList(prev => [...prev, confetti]);
      setTimeout(() => {
        setConfettiList(prev => prev.filter(c => c.id !== confetti.id));
      }, (confetti.duration + confetti.delay) * 1000);
    }, 300);

    const heartInterval = setInterval(() => {
      const heart = {
        id: Date.now(),
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        scale: 0.3 + Math.random() * 0.7,
        rotate: Math.random() * 90 - 45,
        opacity: 0.7 + Math.random() * 0.3,
        duration: 1.5 + Math.random() * 1,
      };
      setHearts(prev => [...prev, heart]);
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== heart.id));
      }, 8000);
    }, 800);

    const fireworkInterval = setInterval(() => {
      const firework = {
        id: Date.now(),
        left: Math.random() * window.innerWidth,
        top: Math.random() * window.innerHeight * 0.8,
        particles: Array.from({ length: 60 + Math.floor(Math.random() * 60) }, (_, i) => {
          const angle = Math.random() * Math.PI * 2;
          const distance = 30 + Math.random() * 150;
          const tx = Math.cos(angle) * distance;
          const ty = Math.sin(angle) * distance;
          const hue = Math.floor(Math.random() * 360);
          const color = i % 3 === 0 ? `hsl(${hue}, 100%, 70%)` : i % 3 === 1 ? `hsl(${hue}, 100%, 50%)` : '#fff';
          return {
            tx, ty, color, size: 1 + Math.random() * 4,
            duration: 0.8 + Math.random() * 1.2,
          };
        }),
      };
      setFireworks(prev => [...prev, firework]);
      setTimeout(() => {
        setFireworks(prev => prev.filter(f => f.id !== firework.id));
      }, 1500);
    }, 400);

    return () => {
      clearInterval(emojiInterval);
      clearInterval(confettiInterval);
      clearInterval(heartInterval);
      clearInterval(fireworkInterval);
    };
  }, []);

  return (
    <div style={{ overflowX: 'hidden', overflowY: 'auto', height: '100vh',  background: "linear-gradient(135deg, #0f0524 0%, #1a0536 50%, #300748 100%)" }} >
      <div className="stars">
        {stars.map((star, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <div id="emojis" className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {emojis.map(emoji => (
          <div
            key={emoji.id}
            className="emoji"
            style={{
              left: emoji.left,
              fontSize: emoji.size,
              animationDuration: `${emoji.duration}s`,
              transform: `rotate(${emoji.rotate})`,
            }}
          >
            {emoji.symbol}
          </div>
        ))}
      </div>

      <div id="confettiContainer" className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {confettiList.map(confetti => (
          <div
            key={confetti.id}
            className="confetti"
            style={{
              width: confetti.size,
              height: confetti.size,
              left: confetti.left,
              backgroundColor: confetti.color,
              animationDuration: `${confetti.duration}s`,
              animationDelay: `${confetti.delay}s`,
              transform: `rotate(${confetti.rotate})`,
            }}
          />
        ))}
      </div>

      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: heart.left,
            top: heart.top,
            transform: `rotate(${heart.rotate}deg) scale(${heart.scale})`,
            animationDuration: `${heart.duration}s`,
            opacity: heart.opacity,
          }}
        />
      ))}

      {fireworks.map(firework => (
        <div key={firework.id} className="firework" style={{ left: firework.left, top: firework.top }}>
          {firework.particles.map((p, i) => (
            <div
              key={i}
              className="particle"
              style={{
                '--tx': `${p.tx}px`,
                '--ty': `${p.ty}px`,
                background: p.color,
                boxShadow: `0 0 8px ${p.color}`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>
      ))}

      <div className="relative z-10 text-center birthday-container p-8 rounded-3xl">
        <h1
          ref={titleRef}
          className={`birthday-text text-6xl md:text-8xl font-bold mb-8 tracking-wider ${titleAnimated ? 'animate-title' : ''}`}
        >
          Happy Birthday Kuchupuu !!
        </h1>
        <h2 className={`birthday-subtitle text-2xl md:text-3xl mb-10 transition-all duration-1000 ${titleAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          May your day be as special as you are!
        </h2>
        <button
          onClick={() => navigate('/cake')}
          className={`mt-12 text-white font-bold py-4 px-10 rounded-full transition-all duration-[0.8s] ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] transform translate-y-8 hover:scale-110 focus:outline-none shadow-xl text-xl ${titleAnimated ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'linear-gradient(45deg, #FF3CAC, #784BA0, #2B86C5)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 3s ease infinite'
          }}
        >
          Let’s cut the Cake 🎂 →
        </button>


      </div>
    </div>
  );
  <style>
    {`
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`}
  </style>

};

export default BirthdayPage;
