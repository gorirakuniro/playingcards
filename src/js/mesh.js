import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class Mesh {
	constructor() {
		this.loader = new THREE.TextureLoader();

		this.geometry = new THREE.PlaneBufferGeometry(50, 80);
		this.material = new THREE.MeshBasicMaterial({
			map: this.loader.load('./image/image.png'),
		});

		// this.gltfloader = new THREE.GLTFLoader();
		// this.url = './model/hurt.glb';
		// this.model = null;
		// console.log(this.gltfloader);
		// this.gltfloader.load();

		// this.geometry = new THREE.TorusGeometry(30, 10, 6, 10);
		// this.material = new THREE.MeshBasicMaterial({ color: 0x6699ff });

		this.mesh = new THREE.Mesh(this.geometry, this.material);
	}
}
