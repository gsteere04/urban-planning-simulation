import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
    // Create a ref for the mount point
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Create the renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        // Set the size of the renderer
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Basic scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(4, 5, 11);
        camera.lookAt(0, 0, 0)
        // Create ground
        const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
        groundGeometry.rotateX(-Math.PI / 2);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0x555555,
            side: THREE.DoubleSide
        });
        const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
        scene.add(groundMesh);

        // Create and position the spotlight
        const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
        spotLight.position.set(0, 25, 0);
        spotLight.castShadow = true;
        spotLight.shadow.bias = -0.0001;
        scene.add(spotLight);

        // Append the renderer to the mountRef
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // Load the model
       const loader = new GLTFLoader().setPath('public/millennium_falcon/');
       loader.load('scene.gltf', (gltf) => {
        const mesh = gltf.scene;
        mesh.position.set(0, 1.05, -1);
        scene.add(mesh);
       });

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

        // Cleanup on unmount
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <h1>Urban Planning Simulator</h1>
                <p>Design your city with ease!</p>
            </header>
            <nav className="homepage-nav">
                <ul className="homepage-nav-list">
                    <li><Link to="/simulator">Simulator</Link></li>
                    <li><Link to="/buildings">Buildings</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
            {/* This is where the Three.js canvas will be mounted */}
            <div ref={mountRef} className="threejs-container"></div>
            <main className="homepage-main">
                <h2>Explore the Future of Urban Planning</h2>
                <p>Start exploring the city planning simulator or manage the types of buildings in your city.</p>
                <button className="cta-button">Start Simulator</button>
            </main>
            <footer className="homepage-footer">
                <p>Follow us on social media!</p>
                <p>Contact: info@urbanplanning.com</p>
            </footer>
        </div>
    );
};

export default HomePage;
