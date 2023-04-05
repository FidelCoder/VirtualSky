// import React, { useRef } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { Stars, Sky as Skybox, Sphere, OrbitControls, PerspectiveCamera } from '@react-three/drei';
// import { TextureLoader } from 'three';

// const earthTextureUrl = 'https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg';
// const moonTextureUrl = 'https://threejs.org/examples/textures/moon_1024.jpg';
// const sunTextureUrl = 'https://threejs.org/examples/textures/lava.jpg';

// const textureLoader = new TextureLoader();
// const earthMap = textureLoader.load(earthTextureUrl);
// const moonMap = textureLoader.load(moonTextureUrl);
// const sunMap = textureLoader.load(sunTextureUrl);

// const SkyVisualization = () => {
//   const cameraRef = useRef();

//   return (
//     <Canvas height='100vh'>
//       <PerspectiveCamera ref={cameraRef} position={[0, 0, 5]} />
//       <Stars />
//       <Skybox />
      
//       {/* Celestial objects */}
//       <Sphere args={[1, 32, 32]} position={[0, 0, -10]}>
//         <meshStandardMaterial map={earthMap} />
//       </Sphere>
//       <Sphere args={[0.27, 32, 32]} position={[-2, 0, -15]}>
//         <meshStandardMaterial map={moonMap} />
//       </Sphere>
//       <Sphere args={[1.4, 32, 32]} position={[5, 0, -20]}>
//         <meshStandardMaterial emissiveMap={sunMap} emissiveIntensity={1} />
//       </Sphere>

//       {/* Lighting */}
//       <pointLight position={[5, 5, 0]} intensity={0.5} />
//       <ambientLight intensity={0.5} />

//       {/* User Interaction */}
//       <OrbitControls target={[0, 0, -10]} />
//     </Canvas>
//   );
// };

// export default SkyVisualization;




// // the 3D visualization within the SocialFeatures.js component has a black background, and it is displayed as a block element with a fixed height. The canvas has a margin and a border-radius to make it look more appealing.

// import React, { useState, useRef } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { Stars, Sky as Skybox, Sphere, OrbitControls, PerspectiveCamera } from '@react-three/drei';
// import { TextureLoader } from 'three';
// import { getSignByDate } from 'zodiac-signs';
// import "./visualization.css";
// //import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


// // iyoioioij
// const loader = new GLTFLoader();

// loader.load( './public/models/Earth-planet.gltf', function ( gltf ) {

// 	scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );
// //iuhoiujio

//###############################################

import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Sky as Skybox, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { getSignByDate } from 'zodiac-signs';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import "./visualization.css";

const BirthInfoForm = ({ onSubmit }) => {
  const [birthDate, setBirthDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(birthDate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Birthdate:
        <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
      </label>
      <button type="submit">Generate Report</button>
    </form>
  );
};

const CelestialObject = ({ modelPath, position, scale }) => {
  const gltfRef = useRef();
  const [model, setModel] = useState(null);

  const gltfLoader = new GLTFLoader();

  gltfLoader.load(modelPath, (gltf) => {
    setModel(gltf.scene);
  });

  return model ? (
    <primitive object={model} position={position} scale={scale} />
  ) : (
    <mesh ref={gltfRef} />
  );
};

const SkyVisualization = () => {
  const cameraRef = useRef();
  const [astroReport, setAstroReport] = useState(null);

  const generateAstroReport = (birthDate) => {
    const dateArray = birthDate.split('-').map((x) => parseInt(x, 10));
    const [year, month, day] = dateArray;
  
    const report = getSignByDate(year, month, day);
    setAstroReport(report);
  };
  
  return (
    <div>
      <BirthInfoForm onSubmit={generateAstroReport} />
      {astroReport && (
        <div className="report-container">
          <h2>Astrological Report</h2>
          <pre>{JSON.stringify(astroReport, null, 2)}</pre>
        </div>
      )}
      <Canvas height="100vh">
        <PerspectiveCamera ref={cameraRef} position={[0, 0, 5]} />
        <Stars />
        <Skybox />
  
        {/* Celestial objects */}
        <CelestialObject modelPath="/public/models/Earth_planet.gltf" position={[0, 0, -10]} scale={[1, 1, 1]} />
        <CelestialObject modelPath="/models/moon.glb" position={[-2, 0, -15]} scale={[0.27, 0.27, 0.27]} />
        <CelestialObject modelPath="/models/sun.glb" position={[5, 0, -20]} scale={[1.4, 1.4, 1.4]} />
  
        {/* Lighting */}
        <pointLight position={[5, 5, 0]} intensity={0.5} />
        <ambientLight intensity={0.5} />
  
        {/* User Interaction */}
        <OrbitControls target={[0, 0, -10]} />
      </Canvas>
    </div>
  );
};

export default SkyVisualization;
