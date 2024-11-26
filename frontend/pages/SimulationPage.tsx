import React, { useEffect, useState } from 'react';
import '../styles/SimulationPage.css';
import { createScene, setupLighting } from '../src/functions/scene';
import { createCity } from '../src/functions/city';
import * as THREE from 'three';

const SimulationPage: React.FC = () => {
    const city = createCity(12); // Create the city with a specified size

    // State to track the current action
    const [currentAction, setCurrentAction] = useState<'addBuilding' | 'removeBuilding' | 'addRoad' | 'removeRoad' | null>(null);

    useEffect(() => {
        const canvas = document.getElementById('render-target') as HTMLCanvasElement;
        const { scene, camera, renderer, controls, initialize } = createScene(canvas, currentAction);
        initialize(city); // Initialize the scene with the city
        setupLighting(scene);

        camera.position.set(20, 20, 20);
        camera.lookAt(new THREE.Vector3(city.size / 2, 0, city.size / 2));

        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            renderer.dispose();
        };
    }, [city, currentAction]); // Reinitialize on action change

    return (
        <div className="simulation-container">
            <div className="toolbar">
                <button onClick={() => setCurrentAction(null)}>Reset Action</button>
                <button onClick={() => setCurrentAction('addBuilding')}>Add Building</button>
                <button onClick={() => setCurrentAction('removeBuilding')}>Remove Building</button>
                <button onClick={() => setCurrentAction('addRoad')}>Add Road</button>
                <button onClick={() => setCurrentAction('removeRoad')}>Remove Road</button>
            </div>
            <canvas id="render-target" style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default SimulationPage;
