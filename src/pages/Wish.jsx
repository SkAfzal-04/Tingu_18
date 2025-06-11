import { useEffect, useState } from "react";
import "../styles/Wish.css";
import { div } from "framer-motion/client";

const Wish = () => {
  const [showLetterBox, setShowLetterBox] = useState(false);
  const [showLetterBorder, setShowLetterBorder] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [letterText, setLetterText] = useState("");
  const [showHeartGif, setShowHeartGif] = useState(false);
  const [showLoveImg, setShowLoveImg] = useState(false);
  const [showMewMew, setShowMewMew] = useState(false);
  const [dateString, setDateString] = useState("");

  const datetxt = "199 September 2025";
  const datatxtletter =
    "My love. You are a very special girl. I always silently thank you for coming into my life. Today, I wish you all the best, lots of health, and lots of joy. I always hope we will celebrate many more birthdays like this together. Happy birthday to you.💗";
  const titleLetter = "To you";

  useEffect(() => {
    const charArrDate = datetxt.split("");
    let currentIndex = 0;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < charArrDate.length -1) {
          setDateString((prev) => prev + charArrDate[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 100);
    }, 12000);

    return () => clearTimeout(timeout);
  }, []);

  const handleLetterClick = () => {
    setShowLetterBox(true);

    setTimeout(() => {
      setShowLetterBorder(true);
    }, 500);

    setTimeout(() => {
      let titleIndex = -1;
      const intervalTitle = setInterval(() => {
        if (titleIndex < titleLetter.length -1) {
          setTitleText((prev) => prev + titleLetter[titleIndex]);
          titleIndex++;
        } else {
          clearInterval(intervalTitle);
        }
      }, 100);
    }, 1000);

    setTimeout(() => {
      setShowHeartGif(true);
      setShowLoveImg(true);
      setShowMewMew(true);
    }, 1800);

    setTimeout(() => {
      let letterIndex = 0;
      const intervalLetter = setInterval(() => {
        if (letterIndex < datatxtletter.length - 1) {
          setLetterText((prev) => prev + datatxtletter[letterIndex]);
          letterIndex++;
        } else {
          clearInterval(intervalLetter);
        }
      }, 40);
    }, 2000);
  };

  const closePopup = () => {
    setShowLetterBox(false);
    setShowLetterBorder(false);
    setTitleText("");
    setLetterText("");
    setShowHeartGif(false);
    setShowLoveImg(false);
    setShowMewMew(false);
  };

  return (
<div style={{ 
    position: "relative", 
    zIndex: 1, 
    fontSize: "16px", 
    margin: "0", 
    padding: "0", 
    height: "100vh", 
    backgroundImage: "linear-gradient(var(--color-pink), var(--color-pink))" 
}}>

    <div id="wrapper">
      <div className="flag__birthday">
        <img src="./images/1.png" alt="" width="350" className="flag__left" />
        <img src="./images/1.png" alt="" width="350" className="flag__right" />
      </div>

      <div className="content">
        <div className="left">
          <div className="title">
            <h1 className="happy">
              {"Happy".split("").map((ch, i) => (
                <span key={i} style={{ "--t": `${4 + i * 0.2}s` }}>{ch}</span>
              ))}
            </h1>
            <h1 className="birthday">
              {"Birthday".split("").map((ch, i) => (
                <span key={i} style={{ "--t": `${5 + i * 0.2}s` }}>{ch}</span>
              ))}
            </h1>
            <div className="hat">
              <img src="./images/hat.png" alt="" width="130" />
            </div>
          </div>
          <div className="date__of__birth">
            <i className="fa-solid fa-star"></i>
            <span>{dateString}</span>
            {dateString.length === datetxt.length && (
              <i className="fa-solid fa-star"></i>
            )}
          </div>
         
          <div className="btn">
                    <button id="btn__letter" onClick={handleLetterClick}>
                        Click here Puchke 💌
                        <i className="fa-regular fa-envelope"></i>
                    </button>
                </div>
        </div>

        <div className="right">
          <div className="box__account">
            <div className="image">
              <img src="./images/tingu.jpg" alt="" />
            </div>
            <div className="name">
              <i className="fa-solid fa-heart"></i>
              <span>Safina</span>
              <i className="fa-solid fa-heart"></i>
            </div>
            <div className="balloon_one">
              <img width="100" src="./images/balloon1.png" alt="" />
            </div>
            <div className="balloon_two">
              <img width="100" src="./images/balloon2.png" alt="" />
            </div>
          </div>
          <div className="cricle">
            <div className="text__cricle">
              {"happy-birthday-".split("").map((ch, i) => (
                <span key={i} style={{ "--i": i + 1 }}>{ch}</span>
              ))}
            </div>
            <i className="fa-solid fa-heart"></i>
          </div>
        </div>
      </div>

      {[1, 2, 3, 4, 5].map((n, i) => (
        <div key={n} className={`decorate_star star${n}`} style={{ "--t": `${15 + i * 0.2}s` }}></div>
      ))}

      {["one", "two", "three"].map((id, i) => (
        <div key={id} className={`decorate_flower--${id}`} style={{ "--t": `${15 + i * 0.3}s` }}>
          <img width="20" src="./images/decorate_flower.png" alt="" />
        </div>
      ))}

      <div className="decorate_bottom">
        <img src="./images/decorate.png" alt="" width="100" />
      </div>

      <div className="smiley__icon">
        <img src="./images/smiley_icon.png" alt="" width="100" />
      </div>

{showLetterBox && (
  <div className="box__letter">
    {showLetterBorder ? (
      <div className="letter__border">
          <div className="letter">
                <div className="title__letter">
                  {titleText.split("").map((ch, i) => (
                    <span key={i}>
                      {ch}
                      <i className="fa-solid fa-heart"></i>
                    </span>
                  ))}
                </div>
                <div className="content__letter">
                  <div className="left">
                    {showHeartGif && (
                      <img
                        id="heart__letter"
                        className="animationOp"
                        src="https://media.giphy.com/media/YKUvclrGYmDKXwtphf/giphy.gif"
                        alt=""
                      />
                    )}
                    {[1, 2, 3, 4].map((n) => (
                      <img
                        key={n}
                        className={`heart heart_${n}`}
                        style={{ "--t": `${n * 0.2}s` }}
                        width="20"
                        src="./images/heart.png"
                        alt=""
                      />
                    ))}
                  </div>
                  <div className="right">
                    {showLoveImg && (
                      <div className="love__img animationOp">
                        <img
                          src="https://media.giphy.com/media/m85llaN7ZkFIHtURiC/giphy.gif"
                          alt=""
                          width="220"
                        />
                      </div>
                    )}
                    <div className="text__letter">
                      <p>{letterText}</p>
                    </div>
                    {showMewMew && (
                      <img
                        id="mewmew"
                        className="animationOp"
                        width="80"
                        src="./images/mewmew.gif"
                        alt=""
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="close" onClick={closePopup}>
                <i className="fa-solid fa-xmark"></i>
              </div>
            
      </div>
    ) : (
      <div style={{ width: "55vw", height: "450px" }}></div>  // empty placeholder during delay
    )}
  </div>
)}
     

      <div id="copy">
        <p className="text-center text-white text-sm">
          Your Hubby <a href="https://www.instagram.com/iam__afzal__">@afzal</a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Wish;
