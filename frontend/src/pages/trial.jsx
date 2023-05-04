import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { getSignByDate } from 'zodiac-signs';
import './visualization.css';

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

const loadModel = (modelPath, position, scale, scene) => {
  const loader = new GLTFLoader();
  loader.load(modelPath, (gltf) => {
    gltf.scene.position.set(...position);
    gltf.scene.scale.set(...scale);
    scene.add(gltf.scene);
  });
};

const SkyVisualization = () => {
  const [astroReport, setAstroReport] = useState(null);
  const [theme, setTheme] = useState("light");


  const generateAstroReport = (birthDate) => {
    const dateArray = birthDate.split('-').map((x) => parseInt(x, 10));
    const [year, month, day] = dateArray;

    const report = getSignByDate(year, month, day);
    setAstroReport(report);
  };
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  useEffect(() => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    const scene = new THREE.Scene();

    // Skybox
    const loader = new THREE.CubeTextureLoader();
    const skyboxTexture = loader.load([
      'path/to/px.jpg',
      'path/to/nx.jpg',
      'path/to/py.jpg',
      'path/to/ny.jpg',
      'path/to/pz.jpg',
      'path/to/nz.jpg',
    ]);
    scene.background = skyboxTexture;

    // Adding stars
    // const starsGeometry = new THREE.Geometry();
    // for (let i = 0; i < 10000; i++) {
    //   const star = new THREE.Vector3();
    //   star.x = THREE.MathUtils.randFloatSpread(2000);
    //   star.y = THREE.MathUtils.randFloatSpread(2000);
    //   star.z = THREE.MathUtils.randFloatSpread(2000);
    //   starsGeometry.vertices.push(star);
    // }
    // const starsMaterial = new THREE.PointsMaterial({ color: 0x888888 });
    // const starField = new THREE.Points(starsGeometry, starsMaterial);
    // scene.add(starField);
    // Adding stars
const starsGeometry = new THREE.BufferGeometry();
const starsVertices = [];
for (let i = 0; i < 10000; i++) {
  const star = new THREE.Vector3();
  star.x = THREE.MathUtils.randFloatSpread(2000);
  star.y = THREE.MathUtils.randFloatSpread(2000);
  star.z = THREE.MathUtils.randFloatSpread(2000);
  starsVertices.push(star.x, star.y, star.z);
}
const starsVerticesArray = new Float32Array(starsVertices);
starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVerticesArray, 3));
const starsMaterial = new THREE.PointsMaterial({ color: 0x888888 });
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);


    // Adding celestial objects
    // const models = [
    //  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf',
    //   'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf',
    //   'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf',
    // ];

    const models = [
      'models/Costellations.gltf',
      'models/Jupiter_planet.gltf',
      'models/Mercury_planet.gltf',
      'models/Neptune_planet.gltf',
      'models/Mars_planet.gltf',
      'models/Pluto_planet.gltf',
      'models/Saturn_planet.gltf',
      'models/Uranus_planet.gltf',
      'models/Venus_planet.gltf',
      'models/Zodiac_archetypes.gltf',
      'models/Zodiac_signs.gltf',
      'models/Earth_planet.gltf',
      'models/Clock_dial.gltf',

    ];
    
    
    const modelPositions = models.map((_, index) => {
      const angle = (Math.PI * 2 * index) / models.length;
      const radius = 5;
      return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
    });
    
    models.forEach((modelPath, index) => {
      const position = modelPositions[index];
      const scale = [0.5, 0.5, 0.5];
      loadModel(modelPath, position, scale, scene);
    });
    
    // Adding lighting
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(5, 5, 0);
    scene.add(pointLight);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Adding OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    
    const animate = () => {
      requestAnimationFrame(animate);
    
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    return () => {
      document.body.removeChild(renderer.domElement);
      window.cancelAnimationFrame(animate);
    };
    }, []);
    
    // return (
    //   <div>
    //     <BirthInfoForm onSubmit={generateAstroReport} />
    //     {astroReport && (
    //       <div className="report-container">
    //         <h2>Astrological Report</h2>
    //         <pre>{JSON.stringify(astroReport, null, 2)}</pre>
    //       </div>
    //     )}
    //   </div>
    // );
    // };

    return (
      <div className={`app ${theme}`}>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </button>
        <BirthInfoForm onSubmit={generateAstroReport} />
        {astroReport && (
          <div className="report-container">
            <h2>Astrological Report</h2>
            <pre>{JSON.stringify(astroReport, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  };
    
    export default SkyVisualization;
