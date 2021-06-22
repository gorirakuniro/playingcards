import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import gsap from 'gsap';
import Mesh from './mesh';

export default class Module {
	constructor() {
		this.modulemesh = new Mesh();

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.renderer = new THREE.WebGLRenderer({ alpha: true });
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.width, this.height);
		this.rendererDOM = this.renderer.domElement;
		document.body.appendChild(this.rendererDOM);

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(45, this.width / this.height);
		this.camera.position.set(0, 0, +150);

		this.meshList = [];

		this.mesh = this.modulemesh.mesh;
		this.scene.add(this.mesh);
		this.meshList.push(this.mesh);

		this.light = new THREE.SpotLight(0xffffff, 4, 30, Math.PI / 4, 10, 0.5);
		this.light.position.set(10, 15, 30);
		this.scene.add(this.light);

		this.mouse = new THREE.Vector3();
	}

	mousecursor() {
		this.raycaster = new THREE.Raycaster();

		this.raycaster.setFromCamera(this.mouse, this.camera);

		this.intersects = this.raycaster.intersectObjects(this.scene.children);

		if (this.intersects.length > 0 && this.mesh === this.intersects[0].object) {
			gsap.to(this.mesh.rotation, 0.5, {
				x: -this.mouse.y * 0.3,
				y: this.mouse.x * (Math.PI / 6),
			});
		} else {
		}
	}
}
