import { useBox } from "@react-three/cannon";
import { Box } from "@react-three/drei";
import React, { useEffect } from "react";
import * as texture from "../textures";

export const Cube = ({ position, type, ...props }) => {
    const [ref] = useBox(() => ({
        // type: "Static",
        // args: [1, 1, 1],
        mass: 1,
        position,
        ...props,
        // onCollideEnd: (e) => console.log(e),
        // isTrigger: true,
    }));

    useEffect(() => {
        console.log("ref.current", ref.current);
    }, [ref]);

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
