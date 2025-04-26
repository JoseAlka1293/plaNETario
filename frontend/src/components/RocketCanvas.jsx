import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function RocketModel(props) {
    const { scene } = useGLTF('/models/rocket.glb');
    console.log(scene); // 👈 Añadimos esta línea
    return <primitive object={scene} {...props} />;
  }

function RocketCanvas() {
  return (
    <div className="rocket-canvas-container">
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 5, 2]} intensity={5} />   
        <RocketModel position={[0, 0, 0]} scale={[10,10,10]} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

export default RocketCanvas;
