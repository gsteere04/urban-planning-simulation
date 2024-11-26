import * as THREE from 'three';

// Define reusable geometries
const defaultGeometry = new THREE.BoxGeometry(1, 1, 1);
const buildingGeometry = new THREE.BoxGeometry(1, 1, 1);
const roadGeometry = new THREE.BoxGeometry(1, 1, 1);

// Define reusable materials
const grassMaterial = new THREE.MeshStandardMaterial({ color: 'green' });
const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0x777777 });
const roadMaterial = new THREE.MeshStandardMaterial({ color: 'black' });

// Define assets as a mapping of asset creation functions
const assets: Record<string, (x: number, y: number) => THREE.Mesh> = { 
    'grass': (x: number, y: number) => {
        const mesh = new THREE.Mesh(defaultGeometry, grassMaterial);
        mesh.position.set(x, -0.5, y);
        mesh.userData = { id: 'grass', x, y };
        return mesh;
    },
    'residential': (x: number, y: number) => {
        const mesh = new THREE.Mesh(buildingGeometry, buildingMaterial);
        mesh.position.set(x, 0.5, y);
        mesh.userData = { id: 'residential', x, y };
        return mesh;
    },
    'comercial': (x: number, y: number) => {
        const mesh = new THREE.Mesh(buildingGeometry, buildingMaterial);
        mesh.position.set(x, 1, y);
        mesh.userData = { id: 'comercial', x, y };
        return mesh;
    },
    'industrial': (x: number, y: number) => {
        const mesh = new THREE.Mesh(buildingGeometry, buildingMaterial);
        mesh.position.set(x, 0.5, y);
        mesh.userData = { id: 'industrial', x, y };
        return mesh;
    },

    'road': (x: number, y: number) => {
        const mesh = new THREE.Mesh(roadGeometry, roadMaterial);
        mesh.scale.set(1, 0.1, 1);
        mesh.position.set(x, 0.05, y);
        mesh.userData = { id: 'road', x, y };
        return mesh;
    }

};

// Function to create an asset instance
export function createAssetInstance(assetId: string, x: number, y: number): THREE.Mesh | undefined {
    const asset = assets[assetId];
    if (asset) {
        return asset(x, y);
    } else {
        console.error(`Asset ID "${assetId}" not found in assets!`);
        return undefined;
    }
}
