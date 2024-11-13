import * as THREE from 'three';
import   { OrbitControls }   from 'three/examples/jsm/controls/OrbitControls.js';
import { createCamera } from './camera'; // Import the createCamera function

export const createScene = (canvas: HTMLCanvasElement) => {
    const renderer = new THREE.WebGLRenderer({ canvas });
    const scene = new THREE.Scene();
    
    scene.background = new THREE.Color('lightgray')

    interface City {
        size: number
    };

    let meshes = []

    const initialize = (city: City) => {
        scene.clear();
        meshes = [];
        for (let x = 0; x < city.size; x++) {
            const column: THREE.Mesh[] = []; // specifies type for array column 
            for (let y = 0; y < city.size; y++){
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Use a basic material for testing
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(x, 0, y);
                mesh.castShadow = true; // Enable shadows for the object
                scene.add(mesh);
                column.push(mesh);
            }
            meshes.push(column);
        }
    }
    

    // Function to add lights to the scene
   const setupLighting = () => {
    const lights = [
       new THREE.AmbientLight(0xffffff, 0.2),
       new THREE.DirectionalLight(0xffffff, 0.3),
       new THREE.DirectionalLight(0xffffff, 0.3),
       new THREE.DirectionalLight(0xffffff, 0.3)
    ];

    lights[1].position.set(0, 1, 0);
    lights[1].position.set(1, 1, 0);
    lights[1].position.set(0, 1, 1);

    scene.add(...lights);
   }

    // Function to initialize controls
    const initializeControls = (camera: THREE.PerspectiveCamera) => {
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;
        controls.minDistance = 5;
        controls.maxDistance = 10;
        controls.maxPolarAngle = Math.PI / 2;
        controls.minPolarAngle = 0;
        return controls;
    };

    // Use the createCamera function to create the camera
    const camera = createCamera(window.innerWidth / window.innerHeight);

    // Set the renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.shadowMap.enabled = true; // Enable shadow maps if needed

    // Initialize controls
    const controls = initializeControls(camera);

    return { scene, camera, renderer, controls, initialize };

};