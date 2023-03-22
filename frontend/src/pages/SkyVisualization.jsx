import React, { useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { Stars, Skybox, Sphere, OrbitControls } from '@react-three/drei';
import { TextureLoader } from 'three';

// Import custom planet textures
import earthTexture from './textures/earth.jpg';
import moonTexture from './textures/moon.jpg';
import sunTexture from './textures/sun.jpg';

const SkyVisualization = () => {
  const cameraRef = useRef();

  // Load textures
  const earthMap = new TextureLoader().load(earthTexture);
  const moonMap = new TextureLoader().load(moonTexture);
  const sunMap = new TextureLoader().load(sunTexture);

  return (
    <Canvas>
      <perspectiveCamera ref={cameraRef} position={[0, 0, 5]} />
      <Stars />
      <Skybox />
      
      {/* Celestial objects */}
      <Sphere args={[1, 32, 32]} position={[0, 0, -10]}>
        <meshStandardMaterial map={earthMap} />
      </Sphere>
      <Sphere args={[0.27, 32, 32]} position={[-2, 0, -15]}>
        <meshStandardMaterial map={moonMap} />
      </Sphere>
      <Sphere args={[1.4, 32, 32]} position={[5, 0, -20]}>
        <meshStandardMaterial emissiveMap={sunMap} emissiveIntensity={1} />
      </Sphere>

      {/* Lighting */}
      <pointLight position={[5, 5, 0]} intensity={0.5} />
      <ambientLight intensity={0.5} />

      {/* User Interaction */}
      <OrbitControls target={[0, 0, -10]} />
    </Canvas>
  );
};

export default SkyVisualization;
