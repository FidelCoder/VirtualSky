import React, { useState, Suspense } from 'react'; // Import Suspense
import { Canvas } from '@react-three/fiber';
import { Stars, Sky as Skybox, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { getSignByDate } from 'zodiac-signs';
import "./visualization.css";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';


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
  const { scene } = useLoader(GLTFLoader, modelPath);

  return (
    <primitive object={scene} position={position} scale={scale} />
  );
};


const SkyVisualization = () => {
  const [astroReport, setAstroReport] = useState(null);

  const generateAstroReport = (birthDate) => {
    const dateArray = birthDate.split('-').map((x) => parseInt(x, 10));
    const [year, month, day] = dateArray;

    const report = getSignByDate(year, month, day);
    setAstroReport(report);
  };

  const models = [
    '/assets/models/Costellations.gltf',
    './assets/models/Clock_dial.gltf',
    './assets/models/Earth_planet.gltf',
    './assets/models/Jupiter_planet.gltf',
    './assets/models/Mars_planet.gltf',
    './assets/models/Mercury_planet.gltf',
    './assets/models/Neptune_planet.gltf',
    './assets/models/Pluto_planet.gltf',
    './assets/models/Saturn_planet.gltf',
    './assets/models/Uranus_planet.gltf',
    './assets/models/Venus_planet.gltf',
    './assets/models/Zodiac_signs.gltf',
  ];

  const modelPositions = models.map((_, index) => {
    const angle = (Math.PI * 2 * index) / models.length;
    const radius = 5;
    return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
  });

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
        <PerspectiveCamera position={[0, 0, 10]} />
        <Stars />
        <Skybox />
  
        {/* Celestial objects */}
        <Suspense fallback={<mesh />}>
          {models.map((modelPath, index) => (
            <CelestialObject key={index} modelPath={modelPath} position={modelPositions[index]} scale={[0.5, 0.5, 0.5]} />
          ))}
        </Suspense>
  
        {/* Lighting */}
        <pointLight position={[5, 5, 0]} intensity={0.5} />
        <ambientLight intensity={0.5} />
  
        {/* User Interaction */}
        <OrbitControls target={[0, 0, 0]} />
      </Canvas>
    </div>
  );
};
  


//###############################################

// import React, { useState, useRef } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { Stars, Sky as Skybox, OrbitControls, PerspectiveCamera } from '@react-three/drei';
// import { getSignByDate } from 'zodiac-signs';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import "./visualization.css";

// const BirthInfoForm = ({ onSubmit }) => {
//   const [birthDate, setBirthDate] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(birthDate);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Birthdate:
//         <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
//       </label>
//       <button type="submit">Generate Report</button>
//     </form>
//   );
// };

// const CelestialObject = ({ modelPath, position, scale }) => {
//   const gltfRef = useRef();
//   const [model, setModel] = useState(null);

//   const gltfLoader = new GLTFLoader();

//   gltfLoader.load(modelPath, (gltf) => {
//     setModel(gltf.scene);
//   });

//   return model ? (
//     <primitive object={model} position={position} scale={scale} />
//   ) : (
//     <mesh ref={gltfRef} />
//   );
// };

// const SkyVisualization = () => {
//   const cameraRef = useRef();
//   const [astroReport, setAstroReport] = useState(null);

//   const generateAstroReport = (birthDate) => {
//     const dateArray = birthDate.split('-').map((x) => parseInt(x, 10));
//     const [year, month, day] = dateArray;
  
//     const report = getSignByDate(year, month, day);
//     setAstroReport(report);
//   };
  
//   return (
//     <div>
//       <BirthInfoForm onSubmit={generateAstroReport} />
//       {astroReport && (
//         <div className="report-container">
//           <h2>Astrological Report</h2>
//           <pre>{JSON.stringify(astroReport, null, 2)}</pre>
//         </div>
//       )}
//       <Canvas height="100vh">
//         <PerspectiveCamera ref={cameraRef} position={[0, 0, 5]} />
//         <Stars />
//         <Skybox />
  
//         {/* Celestial objects */}
//         <CelestialObject modelPath="Earth_planet.gltf" position={[0, 0, -10]} scale={[1, 1, 1]} />
//         <CelestialObject modelPath="/models/moon.glb" position={[-2, 0, -15]} scale={[0.27, 0.27, 0.27]} />
//         <CelestialObject modelPath="/models/sun.glb" position={[5, 0, -20]} scale={[1.4, 1.4, 1.4]} />
  
//         {/* Lighting */}
//         <pointLight position={[5, 5, 0]} intensity={0.5} />
//         <ambientLight intensity={0.5} />
  
//         {/* User Interaction */}
//         <OrbitControls target={[0, 0, -10]} />
//       </Canvas>
//     </div>
//   );
// };

export default SkyVisualization;
