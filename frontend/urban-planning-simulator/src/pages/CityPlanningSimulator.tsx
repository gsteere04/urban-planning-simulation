import React, { useEffect} from 'react';
import * as THREE from 'three';

const CityPlanningSimulator = () => {
    useEffect(() => {
        // Scene, camera, and renderer setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Create a cube
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.00;
            cube.rotation.y += 0.05;
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup animation
        return () => {
            document.body.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div>
            <h2>Urban Planning Simulator</h2>
            <h3>It is just a cube for now!</h3>
        </div>
        );
    };

    export default CityPlanningSimulator;