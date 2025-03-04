import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";

const Computer = () => {
    const canvastStyle = {
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <div style={canvastStyle}>
            <Canvas camera={{ position: [20, 20, 100], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 2, 2]} intensity={1} />
                <Model />
                <OrbitControls />
            </Canvas>
        </div>
    );
}

export default Computer;