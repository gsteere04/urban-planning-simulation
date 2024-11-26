import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createCamera } from './camera'; 
import { createAssetInstance } from '../assets/assets';

export const createScene = (canvas: HTMLCanvasElement, currentAction: string | null) => {
    const renderer = new THREE.WebGLRenderer({ canvas });
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('lightgray');

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let selectedObject: THREE.Mesh | undefined = undefined;

    let meshes: THREE.Mesh[][] = [];

    // Corrected City Type
    interface City {
        size: number;
        data: {
            building: string;
            info?: any;
        }[][];
    }

    const initialize = (city: City) => {
        scene.clear();
        meshes = [];

        for (let x = 0; x < city.size; x++) {
            const column: THREE.Mesh[] = [];
            for (let y = 0; y < city.size; y++) {
                const groundMesh = createAssetInstance('grass', x, y);
                if (groundMesh) {
                    const material = new THREE.MeshStandardMaterial({ color: 'darkgreen' });
                    groundMesh.material = material;
                    groundMesh.userData = {
                        type: 'ground',
                        position: { x, y }, // Store position of ground tile
                        info: city.data[x][y].info,
                        originalColor: material.color.getHex(),
                    };
                    scene.add(groundMesh);
                    column.push(groundMesh);
                }
            }
            meshes.push(column);
        }
    };

    const onMouseMove = (event: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onClick = () => {
        raycaster.setFromCamera(mouse, camera);

        const flatMeshes = meshes.flat();
        const intersects = raycaster.intersectObjects(flatMeshes);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;

            if (!(clickedObject instanceof THREE.Mesh)) return;

            // Update selectedObject
            selectedObject = clickedObject;

            // Check action and apply changes accordingly
            if (currentAction === 'addBuilding') {
                const buildingMesh = createAssetInstance('residential', clickedObject.userData.position.x, clickedObject.userData.position.y);
                if (buildingMesh) {
                    buildingMesh.material = new THREE.MeshStandardMaterial({ color: 0x777777 });
                    buildingMesh.userData = { type: 'building', position: clickedObject.userData.position };
                    scene.add(buildingMesh);
                }
            } else if (currentAction === 'removeBuilding') {
                if (clickedObject.userData.type === 'building') {
                    scene.remove(clickedObject);
                }
            } else if (currentAction === 'addRoad') {
                const roadMesh = createAssetInstance('road', clickedObject.userData.position.x, clickedObject.userData.position.y);
                if (roadMesh) {
                    roadMesh.material = new THREE.MeshStandardMaterial({ color: 'black'});
                    roadMesh.userData = { type: 'road', position: clickedObject.userData.position };
                    scene.add(roadMesh);
                }
                
            } else if (currentAction === 'removeRoad') {
                if (clickedObject.userData.type === 'road') {
                    clickedObject.material.color.set('darkgreen');
                    clickedObject.userData.type = 'ground';
                }
            }
        }
    };

    // Add event listeners for mouse move and click
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onClick);

    const camera = createCamera(window.innerWidth / window.innerHeight);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Initialize OrbitControls for the camera
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    return { scene, camera, renderer, controls, initialize };
};

// Lighting setup
export const setupLighting = (scene: THREE.Scene) => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10,10,10);
    directionalLight.castShadow = true;
    scene.add(directionalLight)
}
