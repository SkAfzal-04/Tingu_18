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
    const [selectedSong, setSelectedSong] = useState(null);
    const [showMusicOptions, setShowMusicOptions] = useState(false);

    const [playSong1, { stop: stopSong1 }] = useSound("/music/song1.mp3");
    const [playSong2, { stop: stopSong2 }] = useSound("/music/song2.mp3");

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
        if (currentTypingIndex === 8) {
            navigate("/celebratewithme");
        }
    }, [currentTypingIndex, navigate]);

    useEffect(() => {
        if (showMagicSequence && currentTypingIndex < typingMessages.length) {
            let charIndex = 0;
            setTypedText("");
            setFadeOut(false);

            const typeInterval = setInterval(() => {
                if (charIndex < typingMessages[currentTypingIndex].length) {
                    setTypedText((prev) => prev + typingMessages[currentTypingIndex][charIndex]);
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

    const handleMusicSelect = (song) => {
        stopSong1();
        stopSong2();
        setSelectedSong(song);

        if (song === 1) playSong1();
        if (song === 2) playSong2();

        setIsPlaying(true);
        setShowMusicOptions(false);
    };

    const toggleMusic = () => {
        if (isPlaying) {
            stopSong1();
            stopSong2();
            setIsPlaying(false);
            setSelectedSong(null);
        } else {
            setShowMusicOptions(true);
        }
    };

    return (
        <div className="min-h-screen fixed top-0 left-0 right-0 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center overflow-hidden">
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
                            {typedText && !showFinalPhoto && (
                                <p
                                    className={`text-3xl md:text-5xl text-white font-bold text-center transition-all duration-700 ease-out ${fadeOut
                                        ? "opacity-0 translate-y-6 blur-sm scale-90"
                                        : "opacity-100"
                                        }`}
                                >
                                    {typedText}
                                </p>
                            )}

                            {showILoveYou && !showFinalPhoto && (
                                <p className="text-5xl md:text-7xl text-pink-500 font-bold animate-rotate-scale">
                                    I Love You ❤️
                                </p>
                            )}

                            {showFinalPhoto && (
                                <div className="flex flex-col items-center gap-4 animate-fade-in">
                                    <img
                                        src={recipientPhoto}
                                        alt={recipientName}
                                        className="w-80 h-80 object-cover rounded-full border-4 border-pink-500 shadow-2xl"
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

                            <div className="flex justify-center gap-6 mb-8 relative">
                                <div className="relative">
                                    <button
                                        className={`bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2`}
                                        onClick={toggleMusic}
                                    >
                                        <Music className={isPlaying ? "animate-spin-slow" : ""} size={24} />
                                        {isPlaying ? "Pause Music" : "Select Music"} 🎵
                                    </button>

                                    {showMusicOptions && (
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-10 w-40 bg-white/30 backdrop-blur-lg text-white rounded-lg p-4 shadow-xl space-y-2 z-50 animate-fadeIn">
                                            <p className="text-center font-semibold">Choose a track 🎶</p>
                                            <button
                                                className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-full w-full"
                                                onClick={() => handleMusicSelect(1)}
                                            >
                                                Music 1 🎧
                                            </button>
                                            <button
                                                className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-full w-full"
                                                onClick={() => handleMusicSelect(2)}
                                            >
                                                Music 2 🎼
                                            </button>
                                        </div>
                                    )}

                                </div>

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
