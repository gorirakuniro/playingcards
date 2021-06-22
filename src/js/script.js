import Module from './module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './main';

// ページの読み込みを待つ
window.addEventListener('load', raf);

const navItem = document.querySelector('.nav-item');

let module = new Module();

let speed = 0;
let position = 0;
let rounded = 0;

const gltfloader = new GLTFLoader();
const url = './model/hurt.glb';
let model = null;
let model_RotateY = 0;

gltfloader.load(
	url,
	function (gltf) {
		model = gltf.scene;
		model.scale.set(8, 8, 8);
		model.position.set(0, -15, 10);
		model.rotation.set(0, 0, 0);
		module.scene.add(model);
	},
	function (error) {
		console.log('An error happened');
	}
);

window.addEventListener('wheel', (e) => {
	speed += e.deltaY * 0.0003;
});

navItem.addEventListener('mousemove', handleMouseMove);
navItem.addEventListener('mouseover', () => {
	model_RotateY = 0.04;
});
navItem.addEventListener('mouseleave', () => {
	model_RotateY = 0;
});

function raf() {
	position += speed;
	speed *= 0.8;
	rounded = Math.round(position);
	let diff = rounded - position;
	position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.015;

	if (position > 1) {
		position = 1;
	}
	if (position < -1) {
		position = -1;
	}

	module.meshList[0].position.x = -position * 100;
	navItem.style.transform = `translate(${module.meshList[0].position.x * 2}%,-50%)`;
	model.position.x = module.meshList[0].position.x;
	model.rotation.y += -model_RotateY;

	module.mousecursor();

	module.renderer.render(module.scene, module.camera);
	window.requestAnimationFrame(raf);
}

function handleMouseMove(event) {
	let element = event.currentTarget;

	// canvas要素上のXY座標
	let x = event.clientX - element.offsetLeft;
	let y = event.clientY - element.offsetTop;

	// canvas要素の幅・高さ
	let w = element.offsetWidth;
	let h = element.offsetHeight;

	// -1〜+1の範囲で現在のマウス座標を登録する
	module.mouse.x = (x / w) * 2 - 1;
	module.mouse.y = -(y / h) * 2 + 1;
}
