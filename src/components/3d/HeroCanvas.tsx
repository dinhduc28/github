import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const HeroCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    containerRef.current.appendChild(renderer.domElement);

    // 2. Sculptural Metallic Torus Mesh (Luxury Spatial Ring)
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 32, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x070b14,
      metalness: 0.92,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.2,
      opacity: 0.95,
      transparent: true,
      wireframe: false,
    });

    const torusMesh = new THREE.Mesh(geometry, material);
    scene.add(torusMesh);

    // Inner Glass Core
    const coreGeo = new THREE.IcosahedronGeometry(0.8, 4);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.4,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.9,
      thickness: 0.5,
      transparent: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // 3. Orbit Particle System
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 12;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00f0ff, 4, 15);
    cyanPointLight.position.set(3, 3, 3);
    scene.add(cyanPointLight);

    const goldPointLight = new THREE.PointLight(0xd4af37, 3, 15);
    goldPointLight.position.set(-3, -3, 2);
    scene.add(goldPointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 5. Mouse Interactivity & Animation Loop
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth Rotation
      torusMesh.rotation.x = elapsedTime * 0.2 + mouseY * 0.4;
      torusMesh.rotation.y = elapsedTime * 0.3 + mouseX * 0.4;

      coreMesh.rotation.x = -elapsedTime * 0.3;
      coreMesh.rotation.y = -elapsedTime * 0.4;

      particleSystem.rotation.y = elapsedTime * 0.05;

      // Pulse Cyan Light Intensity
      cyanPointLight.intensity = 3 + Math.sin(elapsedTime * 2) * 1.5;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 6. Handle Window Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[550px] md:h-[650px] flex items-center justify-center">
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* Dynamic Lighting Halo */}
      <div className="absolute w-72 h-72 rounded-full bg-electro-cyan/15 blur-[90px] pointer-events-none animate-glow-pulse" />
      <div className="absolute w-96 h-96 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      {/* Floating 3D Interaction Hint Badge */}
      <div className="absolute bottom-6 right-6 glass-panel px-4 py-2 rounded-full text-xs text-slate-300 font-mono flex items-center gap-2 pointer-events-none shadow-2xl">
        <span className="w-2 h-2 rounded-full bg-electro-cyan animate-ping" />
        3D KINETIC REAL-TIME ENGINE • DRAG TO ROTATE
      </div>
    </div>
  );
};
