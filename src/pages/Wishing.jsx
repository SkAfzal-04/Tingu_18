import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createNoise2D } from "simplex-noise";

const noise2D = createNoise2D();

function Wishing() {
  const navigate = useNavigate();
  const [showBurst, setShowBurst] = useState(false);
  const [particles, setParticles] = useState([]);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowBurst(true), 3000);
    setTimeout(() => setShowImage(true), 4000);
  }, []);

  useEffect(() => {
    if (showBurst) {
      const newParticles = Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        x: window.innerWidth / 2, 
        y: window.innerHeight - 50, 
        velocityX: (Math.random() - 0.5) * 10,
        velocityY: -Math.random() * 20 - 10,
        shape: ["circle", "heart", "square"][Math.floor(Math.random() * 3)],
        color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      }));
      setParticles(newParticles);
    }
  }, [showBurst]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((p) => ({
          ...p,
          x: p.x + p.velocityX + noise2D(p.x * 0.01, p.y * 0.01) * 3,
          y: p.y + p.velocityY + noise2D(p.y * 0.01, p.x * 0.01) * 3,
          velocityY: p.velocityY + 0.2,
          velocityX: p.velocityX * 0.99,
        }))
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-400 to-pink-700 text-white overflow-hidden">
      {!showBurst && (
        <motion.p
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 2 }}
          className="text-6xl font-bold"
        >
          I Love You ❤️
        </motion.p>
      )}

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-6 h-6"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            clipPath:
              particle.shape === "circle"
                ? "circle(50%)"
                : particle.shape === "heart"
                ? "path('M10 30C-10 10 -10 -10 10 -10C30 -10 30 10 10 30')"
                : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        ></motion.div>
      ))}

      {showImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          className="z-50 relative flex flex-col items-center"
        >
          <img
            src="images/tingu.jpg"
            alt="Recipient"
            className="w-80 h-80 object-cover rounded-full border-4 border-white shadow-2xl mt-6"
          />
          <h1 className="text-4xl font-bold text-center mt-4">
            Happy Birthday Dear Tingu! 🎉
          </h1>
        </motion.div>
      )}
    </div>
  );
}

export default Wishing;
