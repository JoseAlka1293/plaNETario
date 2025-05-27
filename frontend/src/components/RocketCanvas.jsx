import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import RocketModel from './RocketModel';
import Stars from './Stars'; 

function RocketCanvas() {
  const [rocketY, setRocketY] = useState(0);
  const [isMouseOverUI, setIsMouseOverUI] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen -z-10 bg-black">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 20]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={2} />

        <Stars rocketY={rocketY} />

        <RocketModel scale={[4, 4, 4]} setRocketY={setRocketY} isMouseOverUI={isMouseOverUI} />

        <OrbitControls enableZoom={false} />

        <Html center position={[0, -5, 0]} zIndexRange={[1, 0]}>
          <div
            onMouseEnter={() => setIsMouseOverUI(true)}
            onMouseLeave={() => setIsMouseOverUI(false)}
            className="text-center bg-black/70 backdrop-blur-md text-white p-6 rounded-xl max-w-md w-full mx-auto shadow-lg transition-all duration-300 space-y-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              ¡Bienvenido a <span className="text-cyan-400">plaNETario</span>!
            </h1>
            <p className="text-sm sm:text-base text-gray-300">
              Navega con el ratón y descubre el espacio
            </p>

            <div className="flex justify-center gap-4 flex-wrap pt-2">
              <a
                href="/map"
                className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-2 px-5 rounded-full shadow-md hover:scale-105 transition-all"
              >
                Ver Mapa 3D
              </a>
              <a
                href="/demo"
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-5 rounded-full shadow-md hover:scale-105 transition-all"
              >
                Probar Demo
              </a>
            </div>
          </div>
        </Html>
      </Canvas>
    </div>
  );
}

export default RocketCanvas;
