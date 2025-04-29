import { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RocketModel(props) {
  const { scene } = useGLTF('/models/rocket.glb');
  const rocketRef = useRef();

  const [targetPosition] = useState(new THREE.Vector3(0, 0, 0));

  const maxX = 5;
  const maxY = 3;

  useFrame(({ mouse }) => {
    if (rocketRef.current) {
      const rocket = rocketRef.current;

      // Definimos posición objetivo según mouse, con límites
      const desiredX = THREE.MathUtils.clamp(mouse.x * maxX, -maxX, maxX);
      const desiredY = THREE.MathUtils.clamp(mouse.y * maxY, -maxY, maxY);

      targetPosition.set(desiredX, desiredY, 0);

      // Interpolamos suavemente hacia el objetivo
      rocket.position.lerp(targetPosition, 0.05);

      // Ajustamos rotaciones
      rocket.rotation.y += 0.01; // rotación constante
      
      // 🎯 Detectar altura máxima para mostrar planetas
      if (rocket.position.y > 7 && !rocket.userData.hasReachedEnd) {
        setShowFinal(true);
        rocket.userData.hasReachedEnd = true;
      }
    }
  });

  return <primitive ref={rocketRef} object={scene} {...props} />;
}

export default RocketModel;

