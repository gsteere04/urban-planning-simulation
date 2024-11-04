import * as THREE from 'three';

export const initScene = (canvas: HTMLCanvasElement) => {
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Return an object that contains both scene, camera, and renderer
    return { scene, camera, renderer };
};
