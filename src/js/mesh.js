import * as THREE from 'three';

export default class Mesh {
	constructor(imgurl) {
		this.loader = new THREE.TextureLoader();

		// ?
		console.log(imgurl);

		this.geometry = new THREE.PlaneBufferGeometry(50, 80);
		this.material = new THREE.MeshBasicMaterial({
			map: this.loader.load(`${imgurl}`),
		});

		// this.geometry = new THREE.TorusGeometry(30, 10, 6, 10);
		// this.material = new THREE.MeshBasicMaterial({ color: 0x6699ff });

		this.mesh = new THREE.Mesh(this.geometry, this.material);
	}
}
