import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stars, PartyPopper, Music } from "lucide-react";
import useSound from "use-sound";

function BirthdayMessage() {
    const navigate = useNavigate();
    const [showMagicSequence, setShowMagicSequence] = useState(false);
    const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [fadeOut, setFadeOut] = useState(false);
    const [showILoveYou, setShowILoveYou] = useState(false);
    const [showFinalPhoto, setShowFinalPhoto] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    if (currentTypingIndex === 8) {
        navigate("/celebratewithme");
    }

    const [play, { stop }] = useSound("/music/song.mp3");
    const recipientName = "Tasnim";
    const recipientPhoto = "/images/tingu.jpg";
    const typingMessages = [
        "",
        "Dear Safina...",
        "On this special day...",
        "I want to tell you something...",
        "Your presence in my life...",
        "Makes everything beautiful...",
        "Your smile brightens my darkest days...",
        "And your love makes life worth living...",
        "My Puchke..."
    ];

    useEffect(() => {
        if (showMagicSequence && currentTypingIndex < typingMessages.length) {
            let charIndex = 0;
            setTypedText("");
            setFadeOut(false);

            const typeInterval = setInterval(() => {
                if (charIndex < typingMessages[currentTypingIndex].length) {
                    setTypedText((prev) => prev + typingMessages[currentTypingIndex][charIndex - 1]);
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => setFadeOut(true), 2000);
                }
            }, 80);

            return () => clearInterval(typeInterval);
        }
    }, [currentTypingIndex, showMagicSequence]);

    useEffect(() => {
        if (fadeOut) {
            setTimeout(() => {
                if (currentTypingIndex < typingMessages.length - 1) {
                    setCurrentTypingIndex((prev) => prev + 1);
                } else {
                    setTimeout(() => setShowILoveYou(true), 1500);
                    setTimeout(() => setShowFinalPhoto(true), 3000);
                }
            }, 1000);
        }
    }, [fadeOut]);

    const startMagicSequence = () => {
        setShowMagicSequence(true);
        setCurrentTypingIndex(0);
        setTypedText("");
    };

    const toggleMusic = () => {
        if (isPlaying) stop();
        else play();
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="min-h-screen fixed top-0 left-0 right-0 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center overflow-hidden  mx-w-96">
            {/* Floating stars animation */}
            {[...Array(30)].map((_, i) => (
                <Stars
                    key={i}
                    className="absolute text-yellow-300 animate-twinkle"
                    size={24}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                />
            ))}

            <div className="relative w-full max-w-4xl">
                <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl mx-4 text-center">
                    {showMagicSequence ? (
                        <div className="min-h-[400px] flex flex-col items-center justify-center gap-8">
                            {/* Typing messages with fade-out effect */}
                            {typedText && !showFinalPhoto && (
                                <p
                                    className={`w-{100px} text-3xl md:text-5xl text-white font-bold text-center transition-all duration-700 ease-out ${fadeOut ? "opacity-0 translate-y-6 blur-sm scale-90" : "opacity-100"
                                        }`}
                                >
                                    {typedText}
                                </p>
                            )}

                            {/* "I Love You" message */}
                            {showILoveYou && !showFinalPhoto && (
                                <p className="text-5xl md:text-7xl text-pink-500 font-bold animate-rotate-scale">
                                    I Love You ❤️
                                </p>
                            )}

                            {/* Final photo reveal */}
                            {showFinalPhoto && (
                                <div className="flex flex-col items-center gap-4 animate-fade-in">
                                    <img
                                        src={recipientPhoto}
                                        alt={recipientName}
                                        className="w-80 h-80 object-cover rounded-full border-4 border-pink-500 shadow-2xl opacity-0 scale-75 transition-all duration-1000 ease-out animate-photo-entrance"
                                    />
                                    <h1 className="text-4xl md:text-6xl text-white font-bold text-center animate-bounce-in">
                                        Happy Birthday Dear {recipientName}! 🎉
                                    </h1>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="min-h-[400px]">
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-pulse">
                                Happy Birthday!
                            </h1>

                            <div className="flex justify-center mb-8">
                                <PartyPopper className="text-yellow-300 animate-wiggle" size={48} />
                            </div>

                            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed animate-fadeIn">
                                Dearest {recipientName}, as the clock struck midnight and ushered in your special day, my heart filled with joy knowing I get to celebrate you! 🌟
                            </p>

                            <div className="flex justify-center gap-6 mb-8">
                                <button
                                    className={`bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 ${isPlaying ? "bg-white/30" : ""
                                        }`}
                                    onClick={toggleMusic}
                                >
                                    <Music className={isPlaying ? "animate-spin-slow" : ""} size={24} />
                                    {isPlaying ? "Pause Music" : "Play Music"} 🎵
                                </button>

                                <button
                                    className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                    onClick={startMagicSequence}
                                >
                                    Start Magic ✨
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BirthdayMessage;
