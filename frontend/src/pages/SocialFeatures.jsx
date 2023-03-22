import React, { useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { Sphere, Line, OrbitControls } from '@react-three/drei';
import './SocialFeatures.css';

const users = [
  { id: 1, name: 'User 1', position: [-2, 1, -5] },
  { id: 2, name: 'User 2', position: [1, -1, -4] },
  { id: 3, name: 'User 3', position: [3, 2, -6] },
];

const connections = [
  { from: users[0].position, to: users[1].position },
  { from: users[0].position, to: users[2].position },
  { from: users[1].position, to: users[2].position },
];

const SocialFeatures = () => {
  const cameraRef = useRef();

  return (
    <div className="social-features">
      <h2>Social Features</h2>
      <Canvas>
        <perspectiveCamera ref={cameraRef} position={[0, 0, 5]} />
        {users.map((user) => (
          <Sphere
            key={user.id}
            args={[0.2, 32, 32]}
            position={user.position}
            onClick={() => console.log(`Clicked on ${user.name}`)}
          >
            <meshStandardMaterial color="blue" />
          </Sphere>
        ))}
        {connections.map((connection, index) => (
          <Line
            key={index}
            points={[connection.from, connection.to]}
            color="white"
            lineWidth={1}
          />
        ))}
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 0]} intensity={0.5} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default SocialFeatures;
