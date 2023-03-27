import React, { useRef, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { Stars, Sky as Skybox, Sphere, OrbitControls } from '@react-three/drei';
import { TextureLoader } from 'three';

// Import online planet textures
const earthTexture = 'https://images.unsplash.com/photo-1502691876148-5a9f2ff2f88e';
const moonTexture = 'https://images.unsplash.com/photo-1500816079931-88a148e0fb3a';
const sunTexture = 'https://images.unsplash.com/photo-1475787003832-fc89532c2e2b';
const saturnTexture = 'https://images.unsplash.com/photo-1569233327943-28a982c386bb';
const marsTexture = 'https://images.unsplash.com/photo-1529473817277-5a810fda9668';

const ObjectInfoModal = (props) => {
  const cameraRef = useRef();
  const [objects, setObjects] = useState([
    {
      name: 'Earth',
      description: 'The third planet from the sun and the only known planet to support life.',
      imageUrl: '/images/earth.jpg',
      videoUrl: 'https://www.youtube.com/embed/_a3VNU_R4q4',
      tags: ['planet', 'habitable'],
      courses: ['Astronomy', 'Astrophysics']
    },
    {
      name: 'Moon',
      description: 'The Earth\'s only natural satellite.',
      imageUrl: '/images/moon.jpg',
      videoUrl: 'https://www.youtube.com/embed/63bT1z0KpN8',
      tags: ['moon', 'natural satellite'],
      courses: ['Lunar Science']
    },
    {
      name: 'Sun',
      description: 'The star at the center of the solar system.',
      imageUrl: '/images/sun.jpg',
      videoUrl: 'https://www.youtube.com/embed/NHrwfJ_v8NE',
      tags: ['star', 'solar system'],
      courses: ['Astrophysics']
    },
    {
      name: 'Saturn',
      description: 'The sixth planet from the sun and known for its rings.',
      imageUrl: '/images/saturn.jpg',
      videoUrl: 'https://www.youtube.com/embed/AHt81Lb_wJ0',
      tags: ['planet', 'rings'],
      courses: ['Planetary Science']
    },
    {
      name: 'Mars',
      description: 'The fourth planet from the sun and the second smallest planet in the solar system.',
      imageUrl: '/images/mars.jpg',
      videoUrl: 'https://www.youtube.com/embed/63bT1z0KpN8',
      tags: ['planet', 'red planet'],
      courses: ['Astrobiology']
    }
  ]);

  const [activeObject, setActiveObject] = useState(null);

  const handleClick = (object) => {
    setActiveObject(object);
  };

  const handleModalClose = () => {
    setActiveObject(null);
  };

  // Load textures
  const earthMap = new TextureLoader().load(earthTexture);
  const moonMap = new TextureLoader().load(moonTexture);
  const sunMap = new TextureLoader().load(sunTexture);
  const saturnMap = new TextureLoader().load(saturnTexture);
  const marsMap = new TextureLoader().load(marsTexture);

  return (
    <div className="object-info-modal">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight intensity={0.2} />
        <pointLight intensity={0.5} position={[10, 10, 10]} />
        <OrbitControls ref={cameraRef} />
        <Skybox distance={450000} sunPosition={[0, 1, 0]}>
          <Stars />
        </Skybox>
  
        <Sphere position={[0, 0, 0]}>
          <meshPhongMaterial map={props.object.imageUrl} />
        </Sphere>
      </Canvas>
  
      <div className="object-info-text">
        <h3>{props.object.name}</h3>
        <p>{props.object.description}</p>
        <div className="tags">
          {props.object.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="courses">
          <strong>Courses:</strong>{' '}
          {props.object.courses.map((course) => (
            <span key={course}>{course}</span>
          ))}
        </div>
        <div className="video-container">
          <iframe
            src={props.object.videoUrl}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
          />
        </div>
        <button className="close-button" onClick={props.handleClose}>
          Close
        </button>
      </div>
    </div>
  );
  

export default ObjectInfoModal;