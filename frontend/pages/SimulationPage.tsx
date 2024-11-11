import React, { useEffect } from 'react';
import '../styles/SimulationPage.css';
import { createScene } from '../src/functions/scene'; // Import the createScene function
import { createCity } from '../src/functions/city'

const SimulationPage: React.FC = () => {
    useEffect(() => {
        const canvas = document.getElementById('render-target') as HTMLCanvasElement;
        const { scene, camera, renderer, controls, initialize } = createScene(canvas); // Use the createScene function
        const city = createCity(8);
        initialize(city);
        // Animation function
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
    }, []);

    return (
        <div className="simulation-container">
            <canvas id="render-target" style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default SimulationPage;
