import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

import { Ground } from "./components/Ground";
import { Player } from "./components/Player";
import { Cube } from "./components/Cube";

function App() {
    return (
        <Canvas shadows shadowMap sRGB gl={{ alpha: false }}>
            <Sky sunPosition={[100, 20, 100]} />
            <ambientLight intensity={0.25} />
            <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
            <Physics gravity={[0, -10, 0]}>
                <Ground position={[0, -2, 0]} />
                <Cube position={[0, 10, 0]} type="wood" />
                <Player position={[0, 5, 10]} />
            </Physics>
        </Canvas>
    );
}

export default App;
