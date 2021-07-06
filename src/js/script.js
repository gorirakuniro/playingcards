import Module from './module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './main';

// ページの読み込みを待つ
window.addEventListener('load', raf);

const navItem = document.querySelectorAll('.nav-item');

let module = new Module();

let speed = 0;
let position = 0;
let rounded = 0;

const gltfloader = new GLTFLoader();

const cluburl = './model/club.glb';
const hearturl = './model/heart.glb';
const spadeurl = './model/spade.glb';
const diamondurl = './model/diamond.glb';

let club = null;
let club_RotateY = 0;

let heart = null;
let heart_RotateY = 0;

let spade = null;
let spade_RotateY = 0;

let diamond = null;
let diamond_RotateY = 0;

gltfloader.load(
	cluburl,
	function (gltf) {
		club = gltf.scene;
		club.scale.set(15, 15, 15);
		club.position.set(0, 0, 20);
		club.rotation.set(0, 0, 0);
		module.scene.add(club);
	},
	function (error) {
		console.log('An error happened');
	}
);

gltfloader.load(
	hearturl,
	function (gltf) {
		heart = gltf.scene;
		heart.scale.set(15, 15, 15);
		heart.position.set(0, 0, 20);
		heart.rotation.set(0, 0, 0);
		module.scene.add(heart);
	},
	function (error) {
		console.log('An error happened');
	}
);

gltfloader.load(
	spadeurl,
	function (gltf) {
		spade = gltf.scene;
		spade.scale.set(15, 15, 15);
		spade.position.set(0, 0, 20);
		spade.rotation.set(0, 0, 0);
		module.scene.add(spade);
	},
	function (error) {
		console.log('An error happened');
	}
);

gltfloader.load(
	diamondurl,
	function (gltf) {
		diamond = gltf.scene;
		diamond.scale.set(15, 15, 15);
		diamond.position.set(0, 0, 20);
		diamond.rotation.set(0, 0, 0);
		module.scene.add(diamond);
	},
	function (error) {
		console.log('An error happened');
	}
);

window.addEventListener('wheel', (e) => {
	speed += e.deltaY * 0.0003;
});

navItem[0].addEventListener('mousemove', handleMouseMove);
navItem[0].addEventListener('mouseover', () => {
	club_RotateY = 0.04;
});
navItem[0].addEventListener('mouseleave', () => {
	club_RotateY = 0;
});

navItem[1].addEventListener('mousemove', handleMouseMove);
navItem[1].addEventListener('mouseover', () => {
	heart_RotateY = 0.04;
});
navItem[1].addEventListener('mouseleave', () => {
	heart_RotateY = 0;
});

navItem[2].addEventListener('mousemove', handleMouseMove);
navItem[2].addEventListener('mouseover', () => {
	spade_RotateY = 0.04;
});
navItem[2].addEventListener('mouseleave', () => {
	spade_RotateY = 0;
});

navItem[3].addEventListener('mousemove', handleMouseMove);
navItem[3].addEventListener('mouseover', () => {
	diamond_RotateY = 0.04;
});
navItem[3].addEventListener('mouseleave', () => {
	diamond_RotateY = 0;
});

let progress = document.createElement('div');
let progressBar = document.createElement('div');

let manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
	progressBar.style.width = (loaded / total) * 100 + '%';
};

function raf() {
	position += speed;
	speed *= 0.8;
	rounded = Math.round(position);
	let diff = rounded - position;
	position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.015;

	if (position > 0) {
		position = 0;
	}
	if (position < -3) {
		position = -3;
	}

	module.meshList[0].position.x = -position * 100;
	navItem[0].style.transform = `translate(${module.meshList[0].position.x * 2}%,-50%)`;
	club.position.x = module.meshList[0].position.x;
	club.rotation.y += -club_RotateY;

	module.meshList[1].position.x = -position * 100 - 100;
	navItem[1].style.transform = `translate(${module.meshList[1].position.x * 2}%,-150%)`;
	heart.position.x = module.meshList[1].position.x;
	heart.rotation.y += -heart_RotateY;

	module.meshList[2].position.x = -position * 100 - 200;
	navItem[2].style.transform = `translate(${module.meshList[2].position.x * 2}%,-250%)`;
	spade.position.x = module.meshList[2].position.x;
	spade.rotation.y += -spade_RotateY;

	module.meshList[3].position.x = -position * 100 - 300;
	navItem[3].style.transform = `translate(${module.meshList[3].position.x * 2}%,-350%)`;
	diamond.position.x = module.meshList[3].position.x;
	diamond.rotation.y += -diamond_RotateY;

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
