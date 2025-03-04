import { useEffect } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import gsap from "gsap";

const ModelLoader = ({ scene }) => {
    useEffect(() => {
        if (!scene) return;

        console.log("Loading model...");

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

        const ambientLight = new THREE.AmbientLight("#002222", 0.1);
        scene.add(ambientLight);

        // Load the OBJ model
        const loader = new OBJLoader();
        loader.load(
            "/models/skull.obj",
            (obj) => {
                obj.scale.set(0.01, 0.01, 0.01); // Start small
                obj.position.set(0, 0.3, 0); // Move it to the center

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
                gsap.to(obj.scale, {
                    x: 0.05, y: 0.05, z: 0.05,
                    duration: 1.5,
                    delay: 1.5,
                    ease: "power2.out",
                });

                // Animate opacity for each mesh's material
                obj.traverse((child) => {
                    if (child.isMesh && child.material) {
                        gsap.to(child.material, {
                            opacity: 1,
                            duration: 1.5,
                            delay: 1.5,
                            ease: "power2.out",
                        });
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

    }, [scene]); // Only runs when scene changes (after handleGameStart triggers it)

    return null;
};

export default ModelLoader;
