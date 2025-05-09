import { useState, useEffect } from "react";
import "./App.css";

import CRTScanline from "./components/CRTScanline/CRTScanline";
import VaporWave from "./components/VaporWave/VaporWave";
import MatrixOverlay from "./components/MatrixOverlay/MatrixOverlay";
import CRTPreloader from "./components/CRTPreloader/CRTPreloader";
import SideScroller from "./components/SideScroller/SideScroller";

const App = () => {
  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, []);

  const [isLoaded, setIsLoaded] = useState(false); 
  const [sideScroller, setSideScroller] = useState(false);

  const handlePreloaderComplete = () => {
    setIsLoaded(true);
  };

  return (
    // <>
    //   {!isLoaded ? (
    //     <CRTPreloader onComplete={handlePreloaderComplete} />
    //   ) : (
    //     <>
    //       <MatrixOverlay />
    //       <VaporWave setSideScroller={setSideScroller} />
    //       {sideScroller && <SideScroller />}
    //     </>
    //   )}
    //   <CRTScanline />
    // </>
    <>
      <SideScroller />
      <CRTScanline />
    </>
  );
};

export default App;
