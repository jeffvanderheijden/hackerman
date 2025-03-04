import { useEffect } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import gsap from "gsap";

const ModelLoader = ({ scene, camera, renderer, onModelLoaded }) => {
    useEffect(() => {
        if (!scene || !camera || !renderer) return;

        console.log("Loading model...");

        // Add enhanced lighting for better contrast and reflections
        const hemiLight = new THREE.HemisphereLight("#ffffff", "#222222", 1.5);
        scene.add(hemiLight);

        const directionalLight = new THREE.DirectionalLight("#ffffff", 5);
directionalLight.castShadow = true;
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight("#ff00ff", 10, 25);
pointLight.castShadow = true;
        pointLight.position.set(0, 3, 2);
        scene.add(pointLight);

        const ambientLight = new THREE.AmbientLight("#444444", 1.0);
        scene.add(ambientLight);

        // Load the OBJ model
        const loader = new OBJLoader();
        loader.load(
            "/models/skull.obj",
            (obj) => {
                obj.scale.set(0.01, 0.01, 0.01);
                obj.position.set(0, 0.3, 0);

                let jaw;
                let skullTop;

                obj.traverse((child) => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            shading: THREE.FlatShading,
                            specular: 0x222222,
                            shininess: 30,
                            wireframe: false,
                            flatShading: true,
                            color: "#ff00ff",
                            emissive: "#ff00ff",
                            emissiveIntensity: 0.5,
                            roughness: 0.5,
                            metalness: 0.3,
                            clearcoat: 1,
                            clearcoatRoughness: 0,
                            transmission: 0.9,
                            ior: 1.5,
                            reflectivity: 1,
                            transparent: true,
                            opacity: 0,
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

                // Animate model appearance
                gsap.to(obj.scale, { x: 0.05, y: 0.05, z: 0.05, duration: 1.5, delay: 1.5, ease: "power2.out" });
                obj.traverse((child) => {
                    if (child.isMesh && child.material) {
                        gsap.to(child.material, { opacity: 1, duration: 1.5, delay: 1.5, ease: "power2.out" });
                    }
                });

                // Animate jaw movement downward
                if (jaw) {
                    gsap.to(jaw.rotation, {
                        x: 0.3,
                        duration: 1.5,
                        repeat: -1,
                        yoyo: true,
                        ease: "power2.inOut",
                    });
                }

                // Animate slight movement of the top portion of the skull
                if (skullTop) {
                    gsap.to(skullTop.rotation, {
                        x: "-=0.1",
                        duration: 1.5,
                        repeat: -1,
                        yoyo: true,
                        ease: "power2.inOut",
                    });
                }

                if (onModelLoaded) onModelLoaded();
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            (error) => {
                console.error("Error loading OBJ model", error);
            }
        );
    }, [scene, camera, renderer]);

    return null;
};

export default ModelLoader;
