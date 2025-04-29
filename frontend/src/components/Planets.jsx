import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function Planets() {
  const planet1 = useRef();
  const planet2 = useRef();

  useFrame(() => {
    if (planet1.current) planet1.current.rotation.y += 0.002;
    if (planet2.current) planet2.current.rotation.y -= 0.0015;
  });

  return (
    <>
      {/* Planeta 1 */}
      <mesh ref={planet1} position={[-3, 10, -5]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#6495ED" />
      </mesh>

      {/* Planeta 2 */}
      <mesh ref={planet2} position={[4, 12, -4]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </>
  );
}

export default Planets;
