import React from "react";
import { usePlane } from "@react-three/cannon";
import { TextureLoader, RepeatWrapping } from "three";
import grass from "../images/grass.jpg";

import { useStore } from "../hooks/useStore";
import { Plane } from "@react-three/drei";

export const Ground = (props) => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        ...props,
    }));
    const [addCube, type] = useStore((state) => [state.addCube, state.type]);
    const texture = new TextureLoader().load(grass);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(100, 100);

    return (
        <Plane
            ref={ref}
            receiveShadow
//             onClick={(e) => {
//                 e.stopPropagation();
//                 const { x, y, z } = e.point;
//                 addCube(Math.ceil(x), Math.ceil(y), Math.ceil(z), type);
//             }}
        >
            <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
            <meshStandardMaterial map={texture} attach="material" />
        </Plane>
    );
};
