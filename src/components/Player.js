import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import React, { useEffect, useRef } from "react";
import { useKeyboardControls } from "../hooks/useKeyboardControls";
import { Vector3 } from "three";
import { FPVControls } from "./FPVControls";

const SPEED = 6;

export const Player = (props) => {
    const { camera } = useThree();
    const { moveForward, moveBackward, moveLeft, moveRight, jump } =
        useKeyboardControls();

    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        // args: [1, 1, 1],
        ...props,
    }));

    const velocity = useRef([0, 0, 0]);

    useEffect(() => {
        api.velocity.subscribe((v) => (velocity.current = v));
    }, [api.velocity]);

    useFrame(() => {
        camera.position.copy(ref.current.position);

        // This needs to be added for camera movement
        ref.current.getWorldPosition(ref.current.position);

        const direction = new Vector3();
        const frontVector = new Vector3(
            0,
            0,
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
        );
        const sideVector = new Vector3(
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
            0,
            0
        );

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);

        api.velocity.set(direction.x, velocity.current[1], direction.z);
        const Jumping = Math.abs(velocity.current[1].toFixed(2)) !== 0;
        // console.log(Jumping);
        if (jump && !Jumping) {
            api.velocity.set(velocity.current[0], 3, velocity.current[2]);
        }
    });

    return (
        <>
            <FPVControls />
            <mesh ref={ref} />
        </>
    );
};
