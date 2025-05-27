import { useRef, useState, useEffect } from 'react';
import { useGLTF, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RocketModel({ setRocketY, isMouseOverUI, ...props }) {
  const { scene } = useGLTF('/models/rocket.glb');
  const rocketRef = useRef();
  const sparklesRef = useRef();
  const [targetPosition] = useState(new THREE.Vector3(0, 0, 0));

  const [maxX, setMaxX] = useState(5);
  const [maxY, setMaxY] = useState(4);

  useEffect(() => {
    const updateMaxBounds = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (width > 1600) setMaxX(10);
      else if (width > 1200) setMaxX(9);
      else setMaxX(5);

      if (height > 1000) setMaxY(6);
      else if (height > 800) setMaxY(5);
      else setMaxY(4);
    };

    updateMaxBounds();
    window.addEventListener('resize', updateMaxBounds);
    return () => window.removeEventListener('resize', updateMaxBounds);
  }, []);

  useFrame(({ mouse, clock }) => {
    if (!rocketRef.current) return;

    const rocket = rocketRef.current;

    rocket.rotation.y += 0.01;

    if (!isMouseOverUI) {
      const desiredX = THREE.MathUtils.clamp(mouse.x * maxX, -maxX, maxX);
      const desiredY = THREE.MathUtils.clamp(mouse.y * maxY, -maxY, maxY);
      targetPosition.set(desiredX, desiredY, 0);
      rocket.position.lerp(targetPosition, 0.05);
    }

    if (setRocketY) setRocketY(rocket.position.y);

    if (sparklesRef.current) {
      const scaleY = 0.5 + Math.sin(clock.elapsedTime * 10) * 0.1;
      const opacity = isMouseOverUI ? 0.5 : 0.8;
      sparklesRef.current.scale.y = scaleY;
      sparklesRef.current.material.opacity = opacity;
    }
  });

  return (
    <group ref={rocketRef} {...props}>
      <primitive object={scene} scale={[1.5, 1.5, 1.5]} />
      <Sparkles
        ref={sparklesRef}
        count={180}
        scale={[0.1, 0.9, 0.3]}
        size={150}
        speed={5}
        color="#ff6600"
        opacity={0.7}
        position={[0, -0.6, 0]}
      />
    </group>
  );
}

export default RocketModel;
