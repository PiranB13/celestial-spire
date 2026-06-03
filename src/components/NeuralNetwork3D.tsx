import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function NeuralNode({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() + delay;
      ref.current.position.x = position[0] + Math.sin(t * 0.3) * 0.3;
      ref.current.position.y = position[1] + Math.cos(t * 0.4) * 0.2;
      ref.current.position.z = position[2] + Math.sin(t * 0.2) * 0.3;
      const scale = 0.8 + Math.sin(t * 2) * 0.2;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.08, 10, 10]} />
      <meshBasicMaterial color="#0088ff" transparent opacity={0.85} />
    </mesh>
  );
}

function Connections({ nodes }: { nodes: [number, number, number][] }) {
  const ref = useRef<THREE.LineSegments>(null);

  const connections = useMemo(() => {
    const conns: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.sqrt(
          (nodes[i][0] - nodes[j][0]) ** 2 +
          (nodes[i][1] - nodes[j][1]) ** 2 +
          (nodes[i][2] - nodes[j][2]) ** 2
        );
        if (dist < 3) {
          conns.push(
            nodes[i][0], nodes[i][1], nodes[i][2],
            nodes[j][0], nodes[j][1], nodes[j][2]
          );
        }
      }
    }
    return new Float32Array(conns);
  }, [nodes]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={connections.length / 3}
          array={connections}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#0066ff" transparent opacity={0.18} />
    </lineSegments>
  );
}

function DataPulse({ start, end, speed = 1 }: { start: [number, number, number]; end: [number, number, number]; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = (clock.getElapsedTime() * speed * 0.3) % 1;
      ref.current.position.x = start[0] + (end[0] - start[0]) * t;
      ref.current.position.y = start[1] + (end[1] - start[1]) * t;
      ref.current.position.z = start[2] + (end[2] - start[2]) * t;
      (ref.current.material as THREE.MeshBasicMaterial).opacity = Math.sin(t * Math.PI) * 0.7;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 6, 6]} />
      <meshBasicMaterial color="#00a8ff" transparent opacity={0.5} />
    </mesh>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo<[number, number, number][]>(() => {
    const n: [number, number, number][] = [];
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      n.push([Math.cos(angle) * 2, Math.sin(angle) * 2, -1]);
    }
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      n.push([Math.cos(angle) * 3, Math.sin(angle) * 1.5, 0]);
    }
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      n.push([Math.cos(angle) * 2.5, Math.sin(angle) * 2.5, 1]);
    }
    for (let i = 0; i < 4; i++) {
      n.push([
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4,
      ]);
    }
    return n;
  }, []);

  const pulses = useMemo(() => {
    const p: { start: [number, number, number]; end: [number, number, number]; speed: number }[] = [];
    for (let i = 0; i < 5; i++) {
      const a = Math.floor(Math.random() * nodes.length);
      let b = Math.floor(Math.random() * nodes.length);
      while (b === a) b = Math.floor(Math.random() * nodes.length);
      p.push({ start: nodes[a], end: nodes[b], speed: 0.5 + Math.random() * 1.5 });
    }
    return p;
  }, [nodes]);

  useFrame(({ mouse }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouse.x * 0.1 - groupRef.current.rotation.y) * 0.02;
      groupRef.current.rotation.x += (-mouse.y * 0.05 - groupRef.current.rotation.x) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <Connections nodes={nodes} />
      {nodes.map((pos, i) => (
        <Float key={i} speed={0.5} rotationIntensity={0} floatIntensity={0.3}>
          <NeuralNode position={pos} delay={i * 0.5} />
        </Float>
      ))}
      {pulses.map((p, i) => (
        <DataPulse key={i} start={p.start} end={p.end} speed={p.speed} />
      ))}
    </group>
  );
}

export default function NeuralNetwork3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        frameloop={visible ? 'always' : 'never'}
      >
        <ambientLight intensity={0.5} />
        <Scene />
      </Canvas>
    </div>
  );
}
