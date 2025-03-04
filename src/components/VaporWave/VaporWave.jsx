import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import "./VaporWave.css";
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";

const TEXTURE_PATH = "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657168/blog/vaporwave-threejs-textures/grid.png";
const DISPLACEMENT_PATH = "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657200/blog/vaporwave-threejs-textures/displacement.png";
const METALNESS_PATH = "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657200/blog/vaporwave-threejs-textures/metalness.png";

const VaporWave = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.Fog("#000000", 1, 2.5);

    const textureLoader = new THREE.TextureLoader();
    const gridTexture = textureLoader.load(TEXTURE_PATH);
    gridTexture.flipY = false;
    const terrainTexture = textureLoader.load(DISPLACEMENT_PATH);
    terrainTexture.flipY = false;
    const metalnessTexture = textureLoader.load(METALNESS_PATH);
    metalnessTexture.flipY = false;

    const geometry = new THREE.PlaneGeometry(0.1, 2, 24, 24);
    const material = new THREE.MeshStandardMaterial({
      map: gridTexture,
      displacementMap: terrainTexture,
      displacementScale: 0,
      metalnessMap: metalnessTexture,
      metalness: 0,
      roughness: 0.5,
    });

    const plane1 = new THREE.Mesh(geometry, material);
    plane1.rotation.x = -Math.PI * 0.5;
    plane1.position.set(0, 0, 0.15);

    const plane2 = new THREE.Mesh(geometry, material);
    plane2.rotation.x = -Math.PI * 0.5;
    plane2.position.set(0, 0, -1.85);

    scene.add(plane1, plane2);

    const ambientLight = new THREE.AmbientLight("#00FF00", 1.5);
    scene.add(ambientLight);

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 20);
    camera.position.set(0, 0.56, -0.2);
    camera.rotation.x = -Math.PI / 2;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.opacity = 0; // Start with full opacity hidden

    const effectComposer = new EffectComposer(renderer);
    effectComposer.setSize(sizes.width, sizes.height);
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    effectComposer.addPass(new RenderPass(scene, camera));

    const rgbShiftPass = new ShaderPass(RGBShiftShader);
    rgbShiftPass.uniforms["amount"].value = 0.0015;
    effectComposer.addPass(rgbShiftPass);

    effectComposer.addPass(new ShaderPass(GammaCorrectionShader));

    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      effectComposer.setSize(sizes.width, sizes.height);
    });

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY - window.innerHeight;
      if (scrollY < 0) return;
      const scrollProgress = Math.min(scrollY / window.innerHeight, 2);
      const planeWidth = 0.1 + Math.min(scrollProgress, 1) * 0.9;
      plane1.geometry = new THREE.PlaneGeometry(planeWidth, 2, 24, 24);
      plane2.geometry = new THREE.PlaneGeometry(planeWidth, 2, 24, 24);
      ambientLight.intensity = 1.5 + scrollProgress * 3.5;
      material.metalness = scrollProgress * 0.96;
      material.displacementScale = scrollProgress * 0.4;
      camera.position.y = 0.56 - scrollProgress * 0.5;
      camera.rotation.x = -Math.PI / 2 + scrollProgress * (Math.PI / 2);
      camera.position.z = 0.05 + scrollProgress * 1.05;
      renderer.domElement.style.opacity = Math.min(scrollProgress, 1); // Fade in as animation starts
    });

    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      plane1.position.z = (elapsedTime * 0.15) % 2;
      plane2.position.z = ((elapsedTime * 0.15) % 2) - 2;
      effectComposer.render();
    }

    animate();
  }, []);

  useEffect(() => {
    const title = document.querySelector(".vapor-wave-bottom h1");
    const title2 = document.querySelector(".vapor-wave-bottom h2");
    const title3 = document.querySelector(".vapor-wave-bottom h3");
    const button = document.querySelector(".vapor-wave-bottom button");

    gsap.fromTo(
      [title, title2, title3, button],
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".vapor-wave-bottom",
          start: () => `${window.innerHeight * 0.4}px center`, // Start fading in at 40% viewport height
          end: () => `${window.innerHeight * 0.55}px center`, // Keep visible until 55% viewport height
          scrub: true,
          pin: false, // Ensures title remains visible when scrolling
        },
      }
    );
  }, []);

  const handleGameStart = (scene) => {
    console.log('Game started!');

    const title = document.querySelector(".vapor-wave-bottom h1");
    const title2 = document.querySelector(".vapor-wave-bottom h2");
    const title3 = document.querySelector(".vapor-wave-bottom h3");
    const button = document.querySelector(".vapor-wave-bottom button");

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

    // Ensure the scene exists before loading the model
    if (!scene) {
      console.error("Scene is not defined. Make sure it's passed correctly.");
      return;
    }

    // Add improved lighting focused on the model for better contrast
    const greenLight = new THREE.PointLight("#00ff99", 2, 10);
    greenLight.position.set(0, 2, 3);
    scene.add(greenLight);

    const rimLight = new THREE.DirectionalLight("#008866", 1.5);
    rimLight.position.set(2, 3, -2);
    rimLight.target.position.set(0, 0.5, 0);
    scene.add(rimLight);
    scene.add(rimLight.target);

    const spotLight = new THREE.SpotLight("#00ff99", 2.5, 15, Math.PI / 6, 0.3);
    spotLight.position.set(0, 5, 3);
    spotLight.target.position.set(0, 0.2, 0);
    scene.add(spotLight);
    scene.add(spotLight.target);

    // Add ambient occlusion light for better depth perception
    const ambientLight = new THREE.AmbientLight("#002222", 0.1);
    scene.add(ambientLight);

    // Load a new Three.js OBJ model with animation
    const loader = new OBJLoader();
    loader.load(
      "/models/skull.obj",
      (obj) => {
        obj.scale.set(0.01, 0.01, 0.01); // Start small
        obj.position.set(0, 0.3, 0); // Move it to the center

        // Apply a neon material with shading and ambient occlusion for depth
        obj.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
              color: "#00ff99", // Neon green color
              emissive: "#00aa55", // Soft glow effect
              emissiveIntensity: 0.5,
              roughness: 0.2,
              metalness: 0.9,
              transparent: true,
              opacity: 0, // Start fully transparent
              aoMapIntensity: 1.0, // Increase ambient occlusion effect
              shading: THREE.FlatShading, // Flat shading for better edge definition
            });
          }
        });

        scene.add(obj);
        console.log("OBJ Model loaded successfully!");

        // Animate scale and opacity with GSAP
        gsap.to(obj.scale, { x: 0.05, y: 0.05, z: 0.05, duration: 1.5, delay: 1.5, ease: "power2.out" });

        // Animate opacity for each mesh's material
        obj.traverse((child) => {
          if (child.isMesh && child.material) {
            gsap.to(child.material, { opacity: 1, duration: 1.5, delay: 1.5, ease: "power2.out" });
          }
        });
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("Error loading OBJ model", error);
      }
    );
  };

  return (
    <div className={"vapor-wave"}>
      <div className={"vapor-wave-bottom"}>
        <div className={'vapor-wave-content'}>
          <h1 className={"glitch"} data-text={"CREATIVE DEVELOPER"}>CREATIVE DEVELOPER</h1>
          <h1 className={"glow"}>CREATIVE DEVELOPER</h1>
          <h2>Jeff van der Heijden</h2>
          <h3 className={"kanji"}>狂ってるけど効果的</h3>
          <button onClick={() => handleGameStart(sceneRef.current)} className="start-button">Start</button>
        </div>
      </div>
      <canvas ref={canvasRef} className="webgl" />
    </div>
  );
};

export default VaporWave;
