import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import RocketModel from './RocketModel';
import Stars from './Stars'; 

function RocketCanvas() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen -z-10 bg-black">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 10]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        {/* Fondo de estrellas */}
        <Stars />
        {/* Cohete */}
        <RocketModel scale={[4, 4, 4]} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

export default RocketCanvas;
