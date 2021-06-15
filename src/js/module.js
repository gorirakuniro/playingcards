import * as THREE from 'three';
import gsap from 'gsap';
import Mesh from './mesh';

export default class Module {
	constructor(materialImg) {
		// this.modulemesh01 = new Mesh();
		// this.modulemesh02 = new Mesh();
		// this.modulemesh03 = new Mesh();
		// this.modulemesh04 = new Mesh();

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		// レンダラーを作成
		this.renderer = new THREE.WebGLRenderer({ alpha: true });
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.width, this.height);

		this.mouse = new THREE.Vector2();

		this.rendererDOM = this.renderer.domElement;
		document.body.appendChild(this.rendererDOM);

		// シーンを作成
		this.scene = new THREE.Scene();

		// カメラを作成
		this.camera = new THREE.PerspectiveCamera(45, this.width / this.height);
		this.camera.position.set(0, 0, +150);

		this.loader = new THREE.TextureLoader();

		this.geometry = new THREE.PlaneBufferGeometry(50, 80);
		this.material = new THREE.MeshBasicMaterial({
			map: this.loader.load('./image/image.png'),
		});

		// this.geometry = new THREE.TorusGeometry(30, 10, 6, 10);
		// this.material = new THREE.MehLambertMaterial({ color: 0x6699ff });

		this.mesh = new THREE.Mesh(this.geometry, this.material);

		this.scene.add(this.mesh);

		// this.meshList = [];
		// for (let i = 1; i < 4; i++) {
		// 	this.scene.add(this.modulemesh0[i].mesh);

		// 	// 配列に保存
		// 	this.meshList.push(mesh);
		// }

		// new THREE.SpotLight(色, 光の強さ, 距離, 照射角, ボケ具合, 減衰率)
		this.light = new THREE.SpotLight(0xffffff, 4, 100, Math.PI / 4, 10, 0.5);
		this.light.position.x = 30;
		this.light.position.y = 50;
		this.light.position.z = 40;
		this.scene.add(this.light);
		this.lightHelper = new THREE.PointLightHelper(this.light);
		this.scene.add(this.lightHelper);
	}

	// 毎フレーム時に実行されるループイベントです
	mousecursor() {
		this.raycaster = new THREE.Raycaster();

		// レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成
		this.raycaster.setFromCamera(this.mouse, this.camera);

		// その光線とぶつかったオブジェクトを得る
		this.intersects = this.raycaster.intersectObjects(this.scene.children);

		// meshList.map((mesh) => {
		// 	if (this.intersects.length > 0 && mesh === this.intersects[0].object) {
		// 		// 移動する
		// 		gsap.to(this.mesh.rotation, 0.5, {
		// 			x: -this.mouse.y * 0.3,
		// 			y: this.mouse.x * (Math.PI / 6),
		// 		});
		// 	} else {
		// 		// それ以外は元の色にする
		// 		this.mesh.material.color.setHex(0xffffff);
		// 	}
		// });
		if (this.intersects.length > 0 && this.mesh === this.intersects[0].object) {
			// 移動する
			gsap.to(this.mesh.rotation, 0.5, {
				x: -this.mouse.y * 0.3,
				y: this.mouse.x * (Math.PI / 6),
			});
		} else {
			// それ以外は元の色にする
			this.mesh.material.color.setHex(0xffffff);
		}
	}
}
