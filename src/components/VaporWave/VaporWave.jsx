import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import "./VaporWave.css";
import videoSrc from "/video/digiJeff.mp4"

import Dialog from "./../Dialog/Dialog";
import VirusWarning from "./../DebugTheVirus/VirusWarning";
import TitleSection from "./TitleSection";
import VaporWaveScene from "./VaporWaveScene";
import SkullScene from "./SkullScene";

const VaporWave = () => {
  const canvasRef = useRef(null);
  const skullCanvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const dialogRef = useRef(null);

  const [modelLoaded, setModelLoaded] = useState(false);
  const [teacherLoaded, setTeacherLoaded] = useState(false);
  const [warningLoaded, setWarningLoaded] = useState(false);

  const handleGameStart = () => {
    const title = document.querySelector(".vapor-wave-bottom h1");
    const title2 = document.querySelector(".vapor-wave-bottom h2");
    const title3 = document.querySelector(".vapor-wave-bottom h3");
    const button = document.querySelector(".start-button");

    gsap.to([title, title2, title3], {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        title.style.display = "none";
        title2.style.display = "none";
        title3.style.display = "none";
      }
    });

    gsap.to(button, {
      opacity: 0,
      scale: .8,
      duration: 1,
      delay: .2,
      ease: "power2.inOut",
      onComplete: () => {
        setTimeout(() => {
          button.style.display = "none";
        }, 1000);
      }
    });
    setTimeout(() => {
      setTeacherLoaded(true);
    }, 2000);
  };

  const closeDialog1 = () => {
    setWarningLoaded(true);
  }

  const closeDialog2 = () => {
    setModelLoaded(true);
    setTeacherLoaded(false);
  }

  return (
    <div className="vapor-wave">
      <div className="vapor-wave-bottom">
        <TitleSection
          handleGameStart={() => handleGameStart(sceneRef.current)}
        />
        {teacherLoaded && (
          <Dialog
            className={"jeff-intro-dialog"}
            name={"Jeff"}
            defaultOpen={true}
            videoSrc={videoSrc}
            conversation={[
              {text: "Hey! Mijn naam is meneer van der Heijden."}, 
              {text: "Ik ben één van je docenten dit jaar."}, 
              {text: "Je eerste-..."},
              {text: "Oh nee, een bug! Versla hem snel voordat--- @#{error: #002}", method: closeDialog1},
            ]}
            dialogRef={dialogRef}
            afterClose={closeDialog2}
          />
        )}
      </div>
      <VaporWaveScene
        canvasRef={canvasRef}
        sceneRef={sceneRef}
        cameraRef={cameraRef}
        rendererRef={rendererRef}
      />
      <AnimatePresence>
        {warningLoaded && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
              <VirusWarning />
            </motion.div>
        )}
      </AnimatePresence>
      {modelLoaded && (
        <SkullScene
          canvasRef={skullCanvasRef}
          setWarningLoaded={setWarningLoaded}
        />
      )}
    </div>
  );
};

export default VaporWave;