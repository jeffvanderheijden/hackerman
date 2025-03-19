import { useState, useEffect, useRef } from "react";
import "./App.css";

import CRTScanline from "./components/CRTScanline/CRTScanline";
import VaporWave from "./components/VaporWave/VaporWave";
import MatrixOverlay from "./components/MatrixOverlay/MatrixOverlay";
import CRTPreloader from "./components/CRTPreloader/CRTPreloader";

import backgroundMusic from "/audio/background1.mp3"; 

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false); 
  const audioRef = useRef(null); 
  
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
          <MatrixOverlay />
          <VaporWave />
          {/* <audio ref={audioRef} src={backgroundMusic} loop autoPlay /> */}
        </>
      )}
      <CRTScanline />
    </>
  );
};

export default App;
