import * as THREE from 'three';

export function createCamera(aspectRatio: number) {
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.set(0, 5, 10); // Set initial camera position
    return camera;
};