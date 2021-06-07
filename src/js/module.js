import * as THREE from 'three';
import gsap from 'gsap';

export default class Module {
	constructor(materialImg) {
		this.width = window.innerWidth;
		this.height = window.innerHeight;

		// レンダラーを作成
		this.renderer = new THREE.WebGLRenderer();
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

		this.mesh = new THREE.Mesh(this.geometry, this.material);

		// this.rendererDOM.addEventListener('mousemove', this.handleMouseMove);

		this.scene.add(this.mesh);
	}

	handleMouseMove(event) {
		// マウス座標管理用のベクトルを作成
		this.mouse = new THREE.Vector2();

		this.element = event.currentTarget;
		// canvas要素上のXY座標
		this.x = event.clientX - this.element.offsetLeft;
		this.y = event.clientY - this.element.offsetTop;
		// canvas要素の幅・高さ
		this.w = this.element.offsetWidth;
		this.h = this.element.offsetHeight;

		// -1〜+1の範囲で現在のマウス座標を登録する
		this.mouse.x = (this.x / this.w) * 2 - 1;
		this.mouse.y = -(this.y / this.h) * 2 + 1;
	}

	// 毎フレーム時に実行されるループイベントです
	mousecursor() {
		this.raycaster = new THREE.Raycaster();

		// レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成
		this.raycaster.setFromCamera(this.mouse, this.camera);

		// その光線とぶつかったオブジェクトを得る
		this.intersects = this.raycaster.intersectObjects(this.scene.children);

		if (
			this.intersects.length > 0 &&
			this.mesh === this.intersects[0].object
		) {
			// 移動する
			gsap.to(this.mesh.rotation, 0.5, {
				x: -this.mouse.y * 0.3,
				y: this.mouse.x * (Math.PI / 6),
			});
		} else {
			this.mesh.material.color.setHex(0xffffff);
		}
	}
}
