import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Home from './Home'

function Hero() {
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Create the three.js scene
    const container = containerRef.current;
    const scene = new THREE.Scene();

    // Create the camera and set its position
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Create the renderer and add it to the container
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create a sphere geometry for the background
    const bgGeometry = new THREE.SphereGeometry(100, 32, 32);

    // Create a material for the background
    const bgMaterial = new THREE.MeshBasicMaterial({
      color: 0x111111,
    });

    // Create a mesh for the background and add it to the scene
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    scene.add(bgMesh);

    // Create 3D models for each slide
    const loader = new GLTFLoader();

    const modelPaths = [
      'https://sketchfab.com/models/983b2f50c7d1440f8a51c04517413632/scene.gltf',
      'https://sketchfab.com/models/1c983526d01b40119d907f4e8f1dbfe4/scene.gltf',
      'https://sketchfab.com/models/fe680c7d008a4a1a8fbf18eac9d7d1e3/scene.gltf',
    ];

    const modelMeshes = [];
    const modelGroup = new THREE.Group();

    loader.load(modelPaths[0], (gltf) => {
      modelMeshes[0] = gltf.scene.children[0].clone();
      modelMeshes[0].position.set(0, -1, -5);
      modelMeshes[0].scale.set(0.1, 0.1, 0.1);
      modelGroup.add(modelMeshes[0]);
    });

    loader.load(modelPaths[1], (gltf) => {
      modelMeshes[1] = gltf.scene.children[0].clone();
      modelMeshes[1].position.set(0, -1, -5);
      modelMeshes[1].scale.set(0.1, 0.1, 0.1);
      modelGroup.add(modelMeshes[1]);
    });

    loader.load(modelPaths[2], (gltf) => {
      modelMeshes[2] = gltf.scene.children[0].clone();
      modelMeshes[2].position.set(0, -1, -5);
      modelMeshes[2].scale.set(0.1, 0.1, 0.1);
      modelGroup.add(modelMeshes[2]);
    });

    scene.add(modelGroup);

    // Add a directional light to the scene
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    // Render the scene
    function render() {
      requestAnimationFrame(render);
      bgMesh.rotation.y += 0.001;
      modelGroup.children.forEach((child, i) => {
        child.visible = i === currentSlide;
      });
      renderer.render(scene, camera);
    }
    render();

    // Handle window resize
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
    };
  }, [currentSlide]);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          bottom: '64px',
          left: '50%',
          transform: 'translate(-50%)',
        }}
      >
        <button
          style={{
            padding: '16px 32px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '32px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            marginRight: '16px',
            cursor: 'pointer',
            fontWeight: currentSlide === 0 ? 'bold' : 'normal',
          }}
          onClick={() => setCurrentSlide(0)}
        >
          Explore 1
        </button>
        <button
          style={{
            padding: '16px 32px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '32px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            marginRight: '16px',
            cursor: 'pointer',
            fontWeight: currentSlide === 1 ? 'bold' : 'normal',
          }}
          onClick={() => setCurrentSlide(1)}
        >
          Explore 2
        </button>
        <button
          style={{
            padding: '16px 32px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '32px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
            fontWeight: currentSlide === 2 ? 'bold' : 'normal',
          }}
          onClick={() => setCurrentSlide(2)}
        >
          Explore 3
        </button>
      </div>
      <button
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '16px 32px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '32px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Get Started
      </button>
    </div>
  );
  
}

export default Hero;
