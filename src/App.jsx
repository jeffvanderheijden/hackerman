import { useState, useEffect } from "react";
import "./App.css";

import CRTScanline from "./components/CRTScanline/CRTScanline";
import VaporWave from "./components/VaporWave/VaporWave";
import MatrixOverlay from "./components/MatrixOverlay/MatrixOverlay";
import CRTPreloader from "./components/CRTPreloader/CRTPreloader";
import SideScroller from "./components/SideScroller/SideScroller";

const App = () => {
  useEffect(() => {
    // This runs after the DOM is fully rendered
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, []);

  const [isLoaded, setIsLoaded] = useState(false); 
  
  useEffect(() => {
    // Check if the preloader has been completed before
    const isPreloaded = sessionStorage.getItem("isPreloaded");

    if (isPreloaded) {
      setIsLoaded(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem("isPreloaded", "true"); // Save state so preloader doesn't show again
    setIsLoaded(true);
  };

  return (
    // <>
    //   {!isLoaded ? (
    //     <CRTPreloader onComplete={handlePreloaderComplete} />
    //   ) : (
    //     <>
    //       <MatrixOverlay />
    //       <VaporWave />
    //       <SideScroller />
    //     </>
    //   )}
    //   <CRTScanline />
    // </>

    <>
      <>
        {/* <MatrixOverlay />
        <VaporWave /> */}
        <SideScroller />
      </>
      <CRTScanline />
    </>
  );
};

export default App;
