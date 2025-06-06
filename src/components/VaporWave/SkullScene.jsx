import { useEffect, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import gsap from "gsap";

import Dialog from "./../Dialog/Dialog";
import DebugTheVirus from "./../DebugTheVirus/DebugTheVirus";
import imageSrc from "/images/skull.png";

const SkullScene = ({ canvasRef, setWarningLoaded, setModelLoaded, setSideScroller }) => {
    const [currentDialog, setCurrentDialog] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        if (!canvasRef || !canvasRef.current) return;

        const idleRotation = { x: 0, y: 0 };
        const mouseOffsetRotation = { x: 0, y: 0 };

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 0.5, 1);

        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const lights = [
            new THREE.HemisphereLight("#ffffff", "#222222", 1.5),
            new THREE.DirectionalLight("#ffffff", 5),
            new THREE.PointLight("#00ff99", 10, 25),
            new THREE.AmbientLight("#444444", 1.0),
        ];
        lights[1].castShadow = true;
        lights[1].position.set(5, 5, 5);
        lights[2].castShadow = true;
        lights[2].position.set(0, 3, 2);
        lights.forEach((light) => scene.add(light));

        const fresnelShader = {
            uniforms: {
                color: { value: new THREE.Color(0x008F11) },
                fresnelPower: { value: 2.5 },
                fresnelScale: { value: 1.5 },
                opacity: { value: 0 },
            },
            vertexShader: `
                varying vec3 vNormal;
                varying vec3 vViewDir;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
                    vViewDir = normalize(-viewPosition.xyz);
                    gl_Position = projectionMatrix * viewPosition;
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                uniform float fresnelPower;
                uniform float fresnelScale;
                uniform float opacity;
                varying vec3 vNormal;
                varying vec3 vViewDir;
                void main() {
                    float fresnel = pow(1.0 - dot(vNormal, vViewDir), fresnelPower) * fresnelScale;
                    gl_FragColor = vec4(color * fresnel, opacity);
                }
            `,
            transparent: true,
        };

        const loader = new OBJLoader();
        let skull, jaw, skullTop;

        const shakeCamera = (intensity, duration, repeat = 5) => {
            gsap.to(camera.position, {
                x: `+=${intensity}`,
                y: `+=${intensity * 0.66}`,
                duration,
                repeat,
                yoyo: true,
                ease: "power1.inOut",
            });
        };

        const animateShaderOpacity = (object, delay = 1, duration = 1.5) => {
            object.traverse((child) => {
                if (child.isMesh && child.material?.uniforms?.opacity) {
                    gsap.to(child.material.uniforms.opacity, {
                        value: 1,
                        duration,
                        delay,
                        ease: "power2.out",
                    });
                }
            });
        };

        loader.load("/models/skull.obj", (obj) => {
            skull = obj;
            obj.scale.set(0.01, 0.01, 0.01);
            obj.position.set(0, 0.5, -2);

            obj.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.ShaderMaterial(fresnelShader);
                    if (child.name.toLowerCase().includes("jaw")) jaw = child;
                    if (child.name.toLowerCase().includes("head")) skullTop = child;
                }
            });

            scene.add(obj);

            gsap.to(obj.scale, { x: 0.08, y: 0.08, z: 0.08, duration: 1.2, delay: 1, ease: "power4.out" });
            gsap.to(obj.position, { z: -0.5, duration: 1.2, delay: 1, ease: "power4.out" });

            if (jaw) {
                gsap.to(jaw.rotation, {
                    x: 0.65,
                    duration: 1.0,
                    delay: 0.8,
                    ease: "back.out(3)",
                    onComplete: () => {
                        gsap.to(jaw.rotation, {
                            x: 0.1,
                            duration: 1.5,
                            repeat: -1,
                            yoyo: true,
                            ease: "power2.inOut",
                        });
                    },
                });
            }

            gsap.delayedCall(0.3, () => shakeCamera(0.005, 0.05, 5));
            gsap.delayedCall(1, () => shakeCamera(0.015, 0.05, 5));
            gsap.delayedCall(1.6, () => shakeCamera(0.03, 0.05, 6));

            animateShaderOpacity(obj);

            gsap.delayedCall(2.4, () => {
                gsap.to(obj.position, {
                    z: -2,
                    duration: 2,
                    ease: "power2.inOut",
                    onComplete: startIdleAnimation,
                });
            });

            if (skullTop) {
                gsap.to(skullTop.rotation, {
                    x: "-=0.15",
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "power2.inOut",
                });
            }
        });

        const startIdleAnimation = () => {
            gsap.to(skull.position, {
                y: "+=0.05",
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(idleRotation, {
                x: 0.05,
                y: 0.1,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(skull.scale, {
                x: "+=0.005",
                y: "+=0.005",
                z: "+=0.005",
                duration: 3.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            if (jaw) {
                gsap.to(jaw.rotation, {
                    x: "+=0.15",
                    duration: 3.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "power2.inOut",
                });
            }
        };

        const onMouseMove = (event) => {
            if (!skull) return;

            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;

            gsap.to(mouseOffsetRotation, {
                x: -y * 0.2,
                y: x * 0.5,
                duration: 0.5,
                ease: "power2.out",
            });
        };

        window.addEventListener("mousemove", onMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);

            if (skull) {
                skull.rotation.x = idleRotation.x + mouseOffsetRotation.x;
                skull.rotation.y = idleRotation.y + mouseOffsetRotation.y;
            }

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, [canvasRef]);

    useEffect(() => {
        if (currentDialog === 0) {
            const timeout = setTimeout(() => setCurrentDialog(1), 3000);
            return () => clearTimeout(timeout);
        }
    }, [currentDialog]);

    const startGame = () => {
        setGameStarted(true);
        setCurrentDialog(0);
    };

    const hideGame = () => {
        setCurrentDialog(null);
        setModelLoaded(false);
        setSideScroller(true);
    };

    return (
        <div className="skull-scene">
            <div className="skull-scene-overlay" />
            <div className="skull-scene-inner">
                <canvas ref={canvasRef} className="skull-webgl" />
                {currentDialog === 1 && !gameStarted && (
                    <Dialog
                        name="Bug"
                        defaultOpen={true}
                        imageSrc={imageSrc}
                        conversation={[
                            { text: "Blargh! Ik ben een 'bug'! Ik ben hier om je systeem te verstoren!" },
                        ]}
                        afterClose={startGame}
                    />
                )}
                {currentDialog === 2 && (
                    <Dialog
                        name="Bug"
                        defaultOpen={true}
                        imageSrc={imageSrc}
                        conversation={[
                            { text: "Je wint deze keer! Maar dit is nog niet voorbij! Ik kom terug!" },
                        ]}
                        afterClose={hideGame}
                    />
                )}
                {gameStarted && (
                    <DebugTheVirus
                        setWarningLoaded={setWarningLoaded}
                        setGameStarted={setGameStarted}
                        setCurrentDialog={setCurrentDialog}
                    />
                )}
            </div>
        </div>
    );
};

export default SkullScene;