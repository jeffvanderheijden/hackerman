import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export default function Model() {
    const modelRef = useRef();
    const { scene, animations } = useGLTF("/models/computer.glb");

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.002; // Rotate animation
        }
    });

    return <primitive ref={modelRef} object={scene} scale={0.1} position={[0, -20, 0]} />;
}
