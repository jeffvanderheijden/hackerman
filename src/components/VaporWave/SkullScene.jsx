import { useEffect } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import gsap from "gsap";

const SkullScene = ({ canvasRef }) => {
    useEffect(() => {
        if (!canvasRef || !canvasRef.current) return;

        // Create scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 0.5, 1);

        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Lighting setup
        const hemiLight = new THREE.HemisphereLight("#ffffff", "#222222", 1.5);
        scene.add(hemiLight);

        const directionalLight = new THREE.DirectionalLight("#ffffff", 5);
        directionalLight.castShadow = true;
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight("#00ff99", 10, 25);
        pointLight.castShadow = true;
        pointLight.position.set(0, 3, 2);
        scene.add(pointLight);

        const ambientLight = new THREE.AmbientLight("#444444", 1.0);
        scene.add(ambientLight);

        // Load the OBJ model with animation
        const loader = new OBJLoader();
        loader.load(
            "/models/skull.obj",
            (obj) => {
                obj.scale.set(0.01, 0.01, 0.01); // Start small for animation
                obj.position.set(0, 0.5, 0); // Center it

                let jaw = null;
                let skullTop = null;

                // Apply neon-style material and prepare for animation
                obj.traverse((child) => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            color: "#00ff99", // Neon green
                            emissive: "#00aa55", // Soft glow
                            emissiveIntensity: 0.5,
                            roughness: 0.2,
                            metalness: 0.9,
                            transparent: true,
                            opacity: 0, // Start fully transparent
                            shading: THREE.FlatShading,
                        });

                        if (child.name.toLowerCase().includes("jaw")) {
                            jaw = child;
                        } else if (child.name.toLowerCase().includes("head")) {
                            skullTop = child;
                        }
                    }
                });

                scene.add(obj);
                console.log("OBJ Model loaded successfully!");

                // Animate model "entering in"
                gsap.to(obj.scale, { 
                    x: 0.05, y: 0.05, z: 0.05, 
                    duration: 1.5, 
                    delay: 1.5,
                    ease: "power2.out" 
                });

                // Animate material opacity fade-in
                obj.traverse((child) => {
                    if (child.isMesh && child.material) {
                        gsap.to(child.material, { 
                            opacity: 1, 
                            duration: 1.5, 
                            delay: 1.5,
                            ease: "power2.out" 
                        });
                    }
                });

                // Animate jaw movement
                if (jaw) {
                    gsap.to(jaw.rotation, {
                        x: 0.3,
                        duration: 1.5,
                        repeat: -1,
                        yoyo: true,
                        ease: "power2.inOut",
                    });
                }

                // Animate slight skull top movement
                if (skullTop) {
                    gsap.to(skullTop.rotation, {
                        x: "-=0.1",
                        duration: 1.5,
                        repeat: -1,
                        yoyo: true,
                        ease: "power2.inOut",
                    });
                }
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            (error) => {
                console.error("Error loading OBJ model", error);
            }
        );

        // Handle window resize
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", onResize);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            window.removeEventListener("resize", onResize);
            renderer.dispose();
            scene.traverse((child) => {
                if (child.isMesh) {
                    child.geometry.dispose();
                    if (child.material.map) child.material.map.dispose();
                    child.material.dispose();
                }
            });
        };
    }, [canvasRef]);

    return null;
};

export default SkullScene;
