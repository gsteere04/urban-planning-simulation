import * as THREE from 'three';

// Define reusable geometries
const defaultGeometry = new THREE.BoxGeometry(1, 1, 1);
const buildingGeometry = new THREE.BoxGeometry(1, 1, 1);

// Define reusable materials
const grassMaterial = new THREE.MeshStandardMaterial({ color: "green" });
const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0x777777 });

// Define assets as a mapping of asset creation functions
const assets: Record<string, (x: number, y: number) => THREE.Mesh> = { 
    'grass': (x: number, y: number) => {
        const mesh = new THREE.Mesh(defaultGeometry, grassMaterial);
        mesh.position.set(x, -0.5, y);
        mesh.castShadow = true;
        mesh.receiveShadow = true; // Allow grass to receive shadows
        return mesh;
    },
    'building-1': (x: number, y: number) => {
        const mesh = new THREE.Mesh(buildingGeometry, buildingMaterial);
        mesh.position.set(x, 0.5, y);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        return mesh;
    },
    'building-2': (x: number, y: number) => {
        const mesh = new THREE.Mesh(buildingGeometry, buildingMaterial);
        mesh.position.set(x, 1, y);
        mesh.scale.set(1, 2, 1); // Scale height to 2
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        return mesh;
    },
    'building-3': (x: number, y: number) => {
        const mesh = new THREE.Mesh(buildingGeometry, buildingMaterial);
        mesh.position.set(x, 1.5, y);
        mesh.scale.set(1, 2, 1); // Scale height to 2
        mesh.castShadow = true;
        mesh.receiveShadow = true;
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
