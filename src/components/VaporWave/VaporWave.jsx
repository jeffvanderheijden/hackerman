import { useRef, useState } from "react";
import gsap from "gsap";
import "./VaporWave.css";
import Dialog from "./../Dialog/Dialog";
import videoSrc from "/video/digiJeff.mp4"

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

  const closeDialog = () => {
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
            conversation={["Hey! Mijn naam is meneer van der Heijden.", "Ik ben één van je docenten dit jaar.", "Je eerste-...", "Oh nee! Een virus! Probeer het te stoppen voordat...---#458${}#458#-"]}
            dialogRef={dialogRef}
            afterClose={closeDialog}
          />
        )}
      </div>
      <VaporWaveScene
        canvasRef={canvasRef}
        sceneRef={sceneRef}
        cameraRef={cameraRef}
        rendererRef={rendererRef}
      />
      {modelLoaded && (
        <SkullScene
          canvasRef={skullCanvasRef}
        />
      )}
    </div>
  );
};

export default VaporWave;