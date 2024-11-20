import * as THREE from 'three';
import   { OrbitControls }   from 'three/examples/jsm/controls/OrbitControls.js';
import { createCamera } from './camera'; // Import the createCamera function

export const createScene = (canvas: HTMLCanvasElement) => {
    const renderer = new THREE.WebGLRenderer({ canvas });
    const scene = new THREE.Scene();
    
    scene.background = new THREE.Color('lightgray')

    //
    interface City {
        size: number;
        data: { building: string }[][];
    };

    let meshes = []

    const initialize = (city: City) => {
        scene.clear();
        meshes = [];
        
        for (let x = 0; x < city.size; x++) {
            const column: THREE.Mesh[] = []; // specifies type for array column 
            for (let y = 0; y < city.size; y++){
                // Ground geometry
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshStandardMaterial({ color: "green" }); // Use MeshStandardMaterial
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(x, -0.5, y);
                mesh.castShadow = true; // Enable shadows for the object
                scene.add(mesh);
                column.push(mesh);

                // Building geometry
                const tile = city.data[x][y];

                if (tile.building === "building") {
                const buildingGeometry = new THREE.BoxGeometry(1, 1, 1);
                const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0x777777 }); // Use MeshStandardMaterial
                const buildingMesh = new THREE.Mesh(buildingGeometry, buildingMaterial);
                buildingMesh.position.set(x, 0.5, y);
                buildingMesh.castShadow = true; // Enable shadows for the object
                scene.add(buildingMesh);
                column.push(buildingMesh);
                }
                
            }
            meshes.push(column);
        }
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

    // Call the setUpLighting
    setupLighting(scene)

    // Set the renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.shadowMap.enabled = true; // Enable shadow maps if needed

    // Initialize controls
    const controls = initializeControls(camera);

    return { 
        scene, 
        camera, 
        renderer, 
        controls, 
        initialize, 
        setupLighting
    };

};

export const setupLighting = (scene: THREE.Scene) => {
    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 8);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true; // Enable shadows
    scene.add(directionalLight);
};


