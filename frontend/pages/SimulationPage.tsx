import React, { useEffect } from 'react';
import '../styles/SimulationPage.css';
import { createScene } from '../src/functions/scene';
import { createCity, initialize } from '../src/functions/city';
import * as THREE from 'three';

const SimulationPage: React.FC = () => {
    const city = createCity(24); // Create the city with a specified size

    useEffect(() => {
        const canvas = document.getElementById('render-target') as HTMLCanvasElement;
        const { scene, camera, renderer, controls } = createScene(canvas);
        initialize(city); // Initialize the scene with the city

        // Initialize the scene with the city data
        const initializeScene = () => {
            scene.clear(); // Clear the previous scene
            let delay = 0; // Initialize delay

            // Create an array of all possible coordinates
            const coordinates: { x: number; y: number }[] = [];
            for (let x = 0; x < city.size; x++) {
                for (let y = 0; y < city.size; y++) {
                    coordinates.push({ x, y });
                }
            }

            // Shuffle the coordinates array
            for (let i = coordinates.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [coordinates[i], coordinates[j]] = [coordinates[j], coordinates[i]];
            }

            // Add ground and buildings based on shuffled coordinates
            coordinates.forEach(({ x, y }) => {
                // Ground geometry
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshBasicMaterial({ color: "green" });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(x, -0.5, y);
                scene.add(mesh); // Add ground tile to the scene

                // Building geometry
                if (city.data[x][y].building === 'building') {
                    // Use setTimeout to add buildings with a delay
                    setTimeout(() => {
                        const buildingGeometry = new THREE.BoxGeometry(1, 1, 1);
                        const buildingMaterial = new THREE.MeshBasicMaterial({ color: 0x777777 });
                        const buildingMesh = new THREE.Mesh(buildingGeometry, buildingMaterial);
                        buildingMesh.position.set(x, 0.5, y);
                        scene.add(buildingMesh); // Add building to the scene
                    }, delay);
                    delay += 1000; // Increase delay for the next building (100ms)
                }
            });
        };

        initializeScene(); // Call to initialize the scene with buildings

        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup function to remove event listener and dispose of the renderer
        return () => {
            cancelAnimationFrame(animationId);
            renderer.dispose();
        };
    }, [city]); // Add city as a dependency to ensure it updates correctly

    return (
        <div className="simulation-container">
            <canvas id="render-target" style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default SimulationPage;
