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
        let skull;
        loader.load(
            "/models/skull.obj",
            (obj) => {
                skull = obj;
                obj.scale.set(0.01, 0.01, 0.01);
                obj.position.set(0, 0.5, -2);

                let jaw = null;
                let skullTop = null;

                obj.traverse((child) => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            color: "#00ff99",
                            emissive: "#00aa55",
                            emissiveIntensity: 0.2,
                            roughness: 0.4,
                            metalness: 0.8,
                            transparent: true,
                            opacity: 0,
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

                gsap.to(obj.scale, { x: 0.08, y: 0.08, z: 0.08, duration: 1.2, delay: 1, ease: "power2.inOut" });
                gsap.to(obj.position, {
                    z: 0, duration: 1.2, delay: 1, ease: "power2.inOut",
                    onComplete: () => {
                        gsap.to(particles.material, { opacity: 0.6, duration: 1, ease: "power2.out", delay: 2 });
                        gsap.to(obj.scale, { x: 0.05, y: 0.05, z: 0.05, duration: 1.5, ease: "power2.out" });
                        gsap.to(obj.position, { z: -0.5, duration: 1.5, ease: "power2.out" }); // Ensure it fades in only after the scream
                        gsap.to(obj.scale, { x: 0.05, y: 0.05, z: 0.05, duration: 1.5, ease: "power2.out" });
                        gsap.to(obj.position, { z: -0.5, duration: 1.5, ease: "power2.out" });
                        gsap.to(obj.scale, { x: 0.05, y: 0.05, z: 0.05, duration: 1.5, ease: "power2.out" });
                        gsap.to(obj.position, { z: -0.5, duration: 1.5, ease: "power2.out" });
                        gsap.to(obj.scale, { x: 0.05, y: 0.05, z: 0.05, duration: 1.5, ease: "power2.out" });
                        gsap.to(obj.position, { z: -0.5, duration: 1.5, ease: "power2.out" });
                    }
                });

                obj.traverse((child) => {
                    if (child.isMesh && child.material) {
                        gsap.to(child.material, { opacity: 1, duration: 1.5, delay: 1, ease: "power2.out" });
                    }
                });

                if (jaw) {
                    gsap.to(jaw.rotation, {
                        x: 0.6, duration: 1.2, delay: 1, ease: "power2.inOut",
                        onComplete: () => {
                            gsap.to(jaw.rotation, { x: 0.1, duration: 1.5, repeat: -1, yoyo: true, ease: "power2.inOut" });
                        }
                    });
                }

                if (skullTop) {
                    gsap.to(skullTop.rotation, {
                        x: "-=0.15", duration: 1.5, repeat: -1, yoyo: true, ease: "power2.inOut"
                    });
                }
            }
        );

        // Create a pixelated effect that closely follows the skull's shape
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 1500;
        const positions = new Float32Array(particleCount * 3);
        const opacities = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 0.3 + 0.1;
            positions[i * 3] = Math.cos(angle) * distance;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
            positions[i * 3 + 2] = Math.sin(angle) * distance;
            opacities[i] = 0;
        }

        particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute("alpha", new THREE.BufferAttribute(opacities, 1));

        const particleMaterial = new THREE.PointsMaterial({
            color: "#00ff99",
            size: 0.015,
            transparent: true,
            opacity: 0.6
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);
        particles.position.y -= 0.3; // Offset to prevent initial visible particles above the skull
        particles.material.opacity = 0; // Ensure it starts invisible and doesn't appear above the model at first // Start fully invisible

        const animateParticles = () => {
            if (!skull) return; // Ensure the skull is loaded before updating particles
            
            const time = performance.now() * 0.0003; // Slower animation factor
            const skullPosition = skull.position; // Skull's position reference
            const skullRadius = 0.15; // Rough bounding sphere for collision detection
        
            for (let i = 0; i < particleCount; i++) {
                const index = i * 3;
        
                // Particle position
                const px = positions[index];
                const py = positions[index + 1];
                const pz = positions[index + 2];
        
                // Compute distance from the skull
                const dx = px - skullPosition.x;
                const dy = py - skullPosition.y;
                const dz = pz - skullPosition.z;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
                // Check for collision with the skull
                if (distance < skullRadius) {
                    if (distance < skullRadius * 0.7) {
                        // Reset if too deep inside the skull
                        positions[index + 1] = skullPosition.y + (Math.random() * 0.3 - 0.15);
                        const newAngle = Math.random() * Math.PI * 2;
                        const newRadius = Math.pow(Math.random(), 0.6) * 0.3;
                        positions[index] = skullPosition.x + Math.cos(newAngle) * newRadius;
                        positions[index + 2] = skullPosition.z + Math.sin(newAngle) * newRadius;
                        opacities[i] = Math.random() * 0.3 + 0.2; // Lower opacity range
                        continue;
                    } else {
                        // Push particle outward to flow around skull
                        const pushFactor = (skullRadius - distance) * 0.2; // Small push force
                        positions[index] += dx * pushFactor;
                        positions[index + 1] += dy * pushFactor;
                        positions[index + 2] += dz * pushFactor;
                    }
                }
        
                // Slow upward movement
                positions[index + 1] += 0.003 + Math.random() * 0.0015;
        
                // Keep the fire shape (wider at the base, narrow at top)
                const heightFactor = (positions[index + 1] - skullPosition.y + 0.7) / 1.6;
                const maxRadius = 0.3 * (1 - heightFactor);
                const angle = time * 1.5 + i * 0.1;
                
                // Swirling motion
                positions[index] += Math.sin(angle) * 0.0015 * (1 - heightFactor);
                positions[index + 2] += Math.cos(angle) * 0.0015 * (1 - heightFactor);
        
                // Lower opacity and smoother flickering effect
                opacities[i] -= 0.006 * (Math.random() * 0.5 + 0.5); // Slower fade-out
                opacities[i] = Math.max(opacities[i], 0.1); // Ensure particles don't disappear too quickly
        
                // Maintain ember-like size but slow it down
                particleMaterial.size = 0.018 + Math.sin(time * 2 + i) * 0.006;
        
                // Reset particle if it fades out or rises too high
                if (positions[index + 1] > skullPosition.y + 1.0 || opacities[i] <= 0.1) {
                    positions[index + 1] = skullPosition.y + (Math.random() * 0.3 - 0.15);
                    const newAngle = Math.random() * Math.PI * 2;
                    const newRadius = Math.pow(Math.random(), 0.6) * 0.3;
                    positions[index] = skullPosition.x + Math.cos(newAngle) * newRadius;
                    positions[index + 2] = skullPosition.z + Math.sin(newAngle) * newRadius;
                    opacities[i] = Math.random() * 0.3 + 0.2; // Lower maximum opacity
                }
            }
        
            particleGeometry.attributes.position.needsUpdate = true;
            particleGeometry.attributes.alpha.needsUpdate = true;
        };        
        
        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            animateParticles();
            renderer.render(scene, camera);
        };
        animate();
    }, [canvasRef]);

    return null;
};

export default SkullScene;
