import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import '../styles/CelebrateWithMe.css'; // Ensure this file exists and contains necessary styles

const CelebrateWithMe = () => {
   const navigate = useNavigate();
  useEffect(() => {
    createDecorations();
   

    const messageContainer = document.getElementById('messageContainer');
    const initialMessage = document.getElementById('initialMessage');
    const secondMessage = document.getElementById('secondMessage');
    const enterButton = document.getElementById('enterButton');
    const gifContainer = document.getElementById('gifContainer');

    if (!messageContainer) return;

    const handleClick = () => {
      gsap.to(initialMessage, {
        opacity: 0,
        y: -30,
        scale: 0.8,
        duration: 0.8,
        ease: 'back.out(1.7)',
        onComplete: () => {
          initialMessage.classList.add('hidden');
          secondMessage.classList.remove('hidden');
          gsap.fromTo(
            secondMessage,
            { opacity: 0, y: 30, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.75)' }
          );

          gsap.to(enterButton, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: 'back.out(1.7)',
          });

          gsap.to(gifContainer, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.5,
            ease: 'back.out(1.7)',
          });
        },
      });

      createHearts();
      createSparkles();
    };

    const handleMouseEnter = () => {
  if (!enterButton) return;

  gsap.to(enterButton, {
    scale: 1.1,
    duration: 0.5,
    yoyo: true,
    repeat: 1,
    ease: 'elastic.out(1.2, 0.5)',
    onComplete: () => {
      createHeartBurst(enterButton);
      navigate('/gallery'); // Navigate after animation finishes
    },
  });
};


    messageContainer.addEventListener('click', handleClick);
    enterButton.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      messageContainer.removeEventListener('click', handleClick);
      enterButton.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  const createDecorations = () => {
    const container = document.getElementById('decorations');
    const colors = ['#ff3d7f', '#ff9a9e', '#fad0c4', '#fbc2eb', '#a6c1ee', '#c2e9fb', '#ffdf6b', '#64f38c'];
    const shapes = ['circle', 'square', 'triangle'];

    for (let i = 0; i < 25; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      const size = Math.random() * 80 + 30;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
      bubble.style.animationDelay = `${Math.random() * 20}s`;
      container.appendChild(bubble);
    }

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 15 + 5;
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.backgroundColor = color;
      confetti.style.animationDuration = `${Math.random() * 5 + 5}s`;
      confetti.style.animationDelay = `${Math.random() * 8}s`;

      if (shape === 'circle') {
        confetti.style.borderRadius = '50%';
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
      } else if (shape === 'square') {
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
      } else if (shape === 'triangle') {
        confetti.style.width = '0';
        confetti.style.height = '0';
        confetti.style.borderLeft = `${size / 2}px solid transparent`;
        confetti.style.borderRight = `${size / 2}px solid transparent`;
        confetti.style.borderBottom = `${size}px solid ${color}`;
        confetti.style.backgroundColor = 'transparent';
      }

      container.appendChild(confetti);
    }
  };

  const createHearts = () => {
    const emojis = ['❤️', '💖', '💕', '💓', '💗', '💘', '💝', '💞', '💌'];
    const container = document.getElementById('messageContainer');
    if (!container) return;
    const rect = container.getBoundingClientRect();

    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        heart.className = 'heart';
        heart.style.fontSize = `${Math.random() * 30 + 15}px`;
        heart.style.left = `${rect.x + Math.random() * rect.width}px`;
        heart.style.top = `${rect.y + rect.height}px`;
        document.body.appendChild(heart);

        gsap.to(heart, {
          y: -200 - Math.random() * 150,
          x: (Math.random() - 0.5) * 150,
          opacity: 0,
          rotation: Math.random() * 180 - 90,
          duration: 3 + Math.random() * 3,
          ease: 'power1.out',
          onComplete: () => heart.remove(),
        });

        gsap.to(heart, {
          scale: 0.5,
          duration: 2.5,
          ease: 'power1.in',
        });
      }, i * 100);
    }
  };

  const createSparkles = () => {
    const emojis = ['✨', '⭐', '🌟', '💫', '🔸', '🔆'];

    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        sparkle.className = 'heart';
        sparkle.style.fontSize = `${Math.random() * 25 + 10}px`;
        sparkle.style.left = `${Math.random() * window.innerWidth}px`;
        sparkle.style.top = `${Math.random() * window.innerHeight}px`;
        document.body.appendChild(sparkle);

        gsap.to(sparkle, {
          y: (Math.random() - 0.5) * 200,
          x: (Math.random() - 0.5) * 200,
          opacity: 0,
          rotation: Math.random() * 360,
          scale: 2,
          duration: 2 + Math.random() * 2,
          ease: 'power1.out',
          onComplete: () => sparkle.remove(),
        });
      }, i * 200);
    }
  };

  const createHeartBurst = (element) => {
    const emojis = ['❤️', '💖', '💕', '💓'];
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
      const heart = document.createElement('div');
      heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
      heart.className = 'heart';
      heart.style.position = 'absolute';
      heart.style.left = `${centerX}px`;
      heart.style.top = `${centerY}px`;
      heart.style.fontSize = `${Math.random() * 25 + 15}px`;
      document.body.appendChild(heart);

      gsap.to(heart, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        opacity: 0,
        scale: 0.5,
        rotation: Math.random() * 360,
        duration: 1 + Math.random(),
        ease: 'power1.out',
        onComplete: () => heart.remove(),
      });
    }
  };

 return (
    <div  style={ { paddingLeft:"1rem" }}>
      {/* Canvas for particles */}
      <div id="canvas-container" />

      {/* Top floating emojis */}
      <span className="top-emoji" style={{ left: "15%" }}>✨</span>
      <span className="top-emoji" style={{ left: "35%" }}>🎂</span>
      <span className="top-emoji" style={{ left: "65%" }}>🎀</span>
      <span className="top-emoji" style={{ left: "85%" }}>🌸</span>

      {/* Glowing spots */}
      <div className="glow" style={{ top: "15%", left: "20%" }} />
      <div className="glow" style={{ top: "75%", left: "80%" }} />
      <div className="glow" style={{ top: "60%", left: "30%" }} />

      {/* Ribbons */}
      <div className="ribbon" style={{ top: "10%", left: "70%" }} />
      <div className="ribbon" style={{ top: "70%", left: "20%" }} />

      {/* Side decorations - left */}
      <div className="side-decoration left">
        <span className="side-item" style={{ "--delay": "0.2s" }}>🌈</span>
        <span className="side-item" style={{ "--delay": "0.5s" }}>💖</span>
        <span className="side-item" style={{ "--delay": "0.8s" }}>🎁</span>
        <span className="side-item" style={{ "--delay": "1.1s" }}>✨</span>
        <span className="side-item" style={{ "--delay": "1.4s" }}>🦄</span>
      </div>

      {/* Side decorations - right */}
      <div className="side-decoration right">
        <span className="side-item" style={{ "--delay": "0.3s" }}>🌟</span>
        <span className="side-item" style={{ "--delay": "0.6s" }}>🍰</span>
        <span className="side-item" style={{ "--delay": "0.9s" }}>🎀</span>
        <span className="side-item" style={{ "--delay": "1.2s" }}>🌸</span>
        <span className="side-item" style={{ "--delay": "1.5s" }}>💝</span>
      </div>

      {/* Decorative elements */}
      <div id="decorations" />

      {/* Main container */}
      <div className="glass-container floating" id="messageContainer">
        <div className="birthday-crown">👑</div>
        <div className="message-container">
          <p className="message" id="initialMessage">
            ✨ I have something special for you ✨
          </p>
          <p className="message hidden" id="secondMessage">
            ✨ It's the most special day for You ✨
          </p>
        </div>
      </div>

      {/* Action button */}
      <button className="enter-button" id="enterButton">
        <span>✨</span>
        <span>Wanna Recall Some 
          Memories?
        </span>
        <span>💖</span>
      </button>

      {/* GIF container */}
      <div className="gif-container" id="gifContainer">
        <img
          src="./images/gif1.gif"
          alt="Birthday celebration"
          className="gif-placeholder"
          id="gifPlaceholder"
        />
      </div>
    </div>
  );
};

export default CelebrateWithMe;
