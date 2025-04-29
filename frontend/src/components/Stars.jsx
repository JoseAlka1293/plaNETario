import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Stars() {
  const starCount = 15000;

  // Creamos las posiciones de las estrellas sólo una vez
  const starsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i < starCount; i++) {
      const x = (Math.random() - 0.5) * 200;
      const y = Math.random() * 300; // más alto para simular "viaje largo"
      const z = (Math.random() - 0.5) * 200;
      positions.push(x, y, z);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geometry;
  }, []);

  const material = useMemo(() => new THREE.PointsMaterial({
    color: '#ffffff',
    size: 0.5,
    sizeAttenuation: true,
    transparent: true,
    opacity: 1,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }), []);

  useFrame((state, delta) => {
    // Movimiento de estrellas hacia abajo
    const positions = starsGeometry.attributes.position.array;
    for (let i = 1; i < positions.length; i += 3) {
      positions[i] -= delta * 10; // Velocidad de bajada de las estrellas

      // Si la estrella baja demasiado, la volvemos a poner arriba
      if (positions[i] < -50) {
        positions[i] = 300;
      }
    }
    starsGeometry.attributes.position.needsUpdate = true;
    // 🎇 Twinkle / brillo suave (oscila entre 0.5 y 1)
    const opacity = 0.75 + Math.sin(state.clock.elapsedTime * 2) * 0.25;
    material.opacity = opacity;
  });

  return <points geometry={starsGeometry} material={material} />;
}

export default Stars;
