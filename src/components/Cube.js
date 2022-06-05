import { useBox } from "@react-three/cannon";
import { Box } from "@react-three/drei";
import React, { useEffect } from "react";
import * as texture from "../textures";

export const Cube = ({ position, type, ...props }) => {
    const [ref] = useBox(() => ({
        mass: 1,
        position,
        ...props,
    }));

    return (
        <>
            <Box castShadow ref={ref}>
                {[...Array(6)].map((_, index) => (
                    <meshStandardMaterial
                        attach={"material"}
                        map={texture[type]}
                        key={index}
                    />
                ))}
                <boxBufferGeometry attach="geometry" />
            </Box>
        </>
    );
};
