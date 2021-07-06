import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import gsap from 'gsap';
import Mesh from './mesh';

export default class Module {
	constructor() {
		this.club = new Mesh('./image/club.png');
		this.heart = new Mesh('./image/heart.png');
		this.spade = new Mesh('./image/spade.png');
		this.diamond = new Mesh('./image/diamond.png');

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

		this.clubmesh = this.club.mesh;
		this.scene.add(this.clubmesh);
		this.meshList.push(this.clubmesh);

		this.heartmesh = this.heart.mesh;
		this.scene.add(this.heartmesh);
		this.meshList.push(this.heartmesh);

		this.spademesh = this.spade.mesh;
		this.scene.add(this.spademesh);
		this.meshList.push(this.spademesh);

		this.diamondmesh = this.diamond.mesh;
		this.scene.add(this.diamondmesh);
		this.meshList.push(this.diamondmesh);

		this.light01 = new THREE.DirectionalLight(0x708090, 1.75);
		this.light01.position.set(2, 8, 4);
		this.light02 = new THREE.DirectionalLight(0x708090, 1.75);
		this.light02.position.set(2, -8, 4);
		this.light03 = new THREE.DirectionalLight(0x708090, 1.75);
		this.light03.position.set(2, 8, -4);
		this.light04 = new THREE.DirectionalLight(0x708090, 1.75);
		this.light04.position.set(-2, 8, 4);

		this.scene.add(this.light01);
		this.scene.add(this.light02);
		this.scene.add(this.light03);
		this.scene.add(this.light04);

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
