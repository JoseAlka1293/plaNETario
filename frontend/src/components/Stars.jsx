import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Stars({ rocketY = 0, count = 5000 }) {
  const groupRef = useRef();
  const groupRef2 = useRef();
  const pointsRef = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = [];
    const sizes = [];

    for (let i = 0; i < count; i++) {
      positions.push(
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300
      );
      sizes.push(Math.random() * 1.5 + 0.5);
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    return geo;
  }, [count]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color('#ffffff') },
        uTime: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        varying float vSize;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vSize = size;
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vSize;
        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          float alpha = 1.0 - smoothstep(0.2, 0.5, d);
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false
    });
  }, []);

  useFrame((state, delta) => {
    const sizes = geometry.attributes.size.array;
    for (let i = 0; i < count; i++) {
      if (Math.random() < 0.005) {
        sizes[i] = 3 + Math.random() * 1.5;
      } else {
        sizes[i] = Math.max(0.5, sizes[i] - 0.05);
      }
    }
    geometry.attributes.size.needsUpdate = true;

    const speed = 10 + rocketY * 2;

    if (groupRef.current && groupRef2.current) {
      groupRef.current.position.y -= delta * speed;
      groupRef2.current.position.y -= delta * speed;

      if (groupRef.current.position.y < -300) {
        groupRef.current.position.y = groupRef2.current.position.y + 300;
      }
      if (groupRef2.current.position.y < -300) {
        groupRef2.current.position.y = groupRef.current.position.y + 300;
      }
    }
  });

  return (
    <>
      <group ref={groupRef} position={[0, 0, 0]}>
        <points ref={pointsRef} geometry={geometry} material={material} />
      </group>
      <group ref={groupRef2} position={[0, 300, 0]}>
        <points geometry={geometry} material={material} />
      </group>
    </>
  );
}

export default Stars;

