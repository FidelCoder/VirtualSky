import React, { useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { Stars, Sphere, OrbitControls, Text } from '@react-three/drei';
import './VirtualSpace.css';

const planets = [
  { id: 1, name: 'Planet 1', position: [-2, 1, -5], color: 'red' },
  { id: 2, name: 'Planet 2', position: [1, -1, -4], color: 'green' },
  { id: 3, name: 'Planet 3', position: [3, 2, -6], color: 'blue' },
];

const users = [
  { id: 1, name: 'User 1', position: [-1, 0, -4] },
  { id: 2, name: 'User 2', position: [2, 0, -6] },
];

const Avatar = ({ name, position }) => {
  const meshRef = useRef();
  useFrame(() => (meshRef.current.rotation.y += 0.01));

  return (
    <group position={position}>
      <Sphere ref={meshRef} args={[0.1, 32, 32]}>
        <meshStandardMaterial color="yellow" />
      </Sphere>
      <Text fontSize={0.2} position={[0, -0.2, 0]} color="white">
        {name}
      </Text>
    </group>
  );
};

const VirtualSpace = () => {
  return (
    <div className="virtual-space">
      <h2>Virtual Space Exploration and Meetups</h2>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Stars />
        {planets.map((planet) => (
          <Sphere key={planet.id} args={[0.2, 32, 32]} position={planet.position}>
            <meshStandardMaterial color={planet.color} />
          </Sphere>
        ))}
        {users.map((user) => (
          <Avatar key={user.id} name={user.name} position={user.position} />
        ))}
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 0]} intensity={0.5} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default VirtualSpace;


//added simple avatars representing users in the virtual space. The Avatar component consists of a rotating sphere with the user's name displayed below it. Also added planets to the virtual space to make the environment more interesting.
