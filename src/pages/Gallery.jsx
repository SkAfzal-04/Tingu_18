import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./gallery.css";


const ImageGallery = () => {
  const starsContainerRef = useRef(null);
  const galleryRef = useRef(null);
  const [currentAngle, setCurrentAngle] = useState(0);
  const totalCards = 10;
  const radius = window.innerWidth < 768 ? 400 : 600;
  const imageUrls = Array.from({ length: totalCards }, (_, i) => `./images/pic${i + 1}.jpg`);
  const [stars, setStars] = useState([]);
  const navigate=useNavigate();

  // ✅ Apply and remove body styles dynamically when gallery is loaded
  useEffect(() => {
    document.body.classList.add("gallery-active");
    return () => document.body.classList.remove("gallery-active");
  }, []);
  const [showButton, setShowButton] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setShowButton(true);
  }, 3000);

  return () => clearTimeout(timer); // Cleanup on unmount
}, []);


  // ✅ Generate stars effect
  useEffect(() => {
    const newStars = Array.from({ length: 200 }, () => ({
      width: `${Math.random() * 3}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
    }));
    setStars(newStars);
  }, []);

  // ✅ Rotate the image gallery
  const rotateGallery = (direction) => {
    setCurrentAngle((prev) => prev + direction * (360 / totalCards));
  };

  useEffect(() => {
    if (!galleryRef.current) return;
    const cards = galleryRef.current.children;
  
    for (let i = 0; i < totalCards; i++) {
      const angle = ((currentAngle + i * (360 / totalCards)) * Math.PI) / 180;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const rotateY = angle * (180 / Math.PI);
      const card = cards[i];
  
      card.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg)`;
  
      const normalizedAngle = ((currentAngle + i * 36) % 360 + 360) % 360;
  
      // Make front card slightly transparent
      if (Math.abs(normalizedAngle - 0) < 10) {
        card.style.opacity = 0.05; // Adjust for front card visibility
      } else {
        card.style.opacity = Math.max(0.2, 1 - Math.abs(normalizedAngle - 180) / 180);
      }
  
      // Apply active effect to only one card at the back
      const isActive = Math.abs(normalizedAngle - 180) < 10;
      card.classList.toggle("active", isActive);
    }
  }, [currentAngle]);
  
  

  return (
    <div className="gallery-wrapper" >
      <div className="ambient-light"></div>
      <div className="spotlight"></div>
      <div className="stars" ref={starsContainerRef}>
        {stars.map((star, i) => (
          <div key={i} className="star" style={star}></div>
        ))}
      </div>

      <button className="nav-button prev" aria-label="Previous" onClick={() => rotateGallery(1)}>
      
      </button>
      <button className="nav-button next" aria-label="Next" onClick={() => rotateGallery(-1)}>
       
      </button>

      <div className="gallery-container">
        <div className="gallery" ref={galleryRef}>
          {imageUrls.map((url, index) => (
            <div key={index} className="card">
              <img src={url} alt={`Romantic photo ${index + 1}`} />
              <div className="number">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
      {showButton && (
  <button 
    className="navigate-button" 
    onClick={() => navigate("/birthdaypage")}
  >
    Let's Go →
  </button>
)}

    </div>
  );
};

export default ImageGallery;
