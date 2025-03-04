import { useState, useEffect, useRef } from "react";
import "./App.css";

import DigiJeff from "./components/DigiJeff/DigiJeff";
import CRTScanline from "./components/CRTScanline/CRTScanline";
import VaporWaveNew from "./components/VaporWave/VaporWaveNew";
import MatrixOverlayNew from "./components/MatrixOverlay/MatrixOverlayNew";
import CRTPreloader from "./components/CRTPreloader/CRTPreloader";

import backgroundMusic from "./assets/background1.mp3"; // Add your MP3 file in assets folder

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false); // Tracks if preloader has completed
  const audioRef = useRef(null); // Reference for the audio element

  useEffect(() => {
    // Check if the preloader has been completed before
    const isPreloaded = sessionStorage.getItem("isPreloaded");

    if (isPreloaded) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && audioRef.current) {
      audioRef.current.play().catch((error) => console.log("Audio autoplay prevented:", error));
    }
  }, [isLoaded]);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem("isPreloaded", "true"); // Save state so preloader doesn't show again
    setIsLoaded(true);
  };

  return (
    <>
      {!isLoaded ? (
        <CRTPreloader onComplete={handlePreloaderComplete} />
      ) : (
        <>
          <MatrixOverlayNew />
          <VaporWaveNew />
          <DigiJeff 
            entryMessage={"YO!"}
            conversation={[
              "Welcome to the digital superhighway, dude! Name's Jeff.",
              "I'll be your rad navigator through this gnarly cyber world.",
              "Smash that close button and let's blaze through this bodacious adventure!"
            ]}
          />
          {/* Audio Element */}
          <audio ref={audioRef} src={backgroundMusic} loop autoPlay />
        </>
      )}
      <CRTScanline />
    </>
  );
};

export default App;
