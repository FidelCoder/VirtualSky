import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Sky as Skybox, Sphere, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { TextureLoader } from 'three';

const earthTextureUrl = 'https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg';
const moonTextureUrl = 'https://threejs.org/examples/textures/moon_1024.jpg';
const sunTextureUrl = 'https://threejs.org/examples/textures/lava.jpg';

const textureLoader = new TextureLoader();
const earthMap = textureLoader.load(earthTextureUrl);
const moonMap = textureLoader.load(moonTextureUrl);
const sunMap = textureLoader.load(sunTextureUrl);

const SkyVisualization = () => {
  const cameraRef = useRef();

  return (
    <Canvas height='100vh'>
      <PerspectiveCamera ref={cameraRef} position={[0, 0, 5]} />
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




// the 3D visualization within the SocialFeatures.js component has a black background, and it is displayed as a block element with a fixed height. The canvas has a margin and a border-radius to make it look more appealing.

