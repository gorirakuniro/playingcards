import * as THREE from 'three';
import gsap from 'gsap';

import Module from './module';

// ページの読み込みを待つ
window.addEventListener('load', init);

const module = new Module();

function init() {
	let speed = 0;
	let position = 0;
	let rounded = 0;

	window.addEventListener('wheel', (e) => {
		speed += e.deltaY * 0.0003;
		// console.log(e.deltaY);
	});

	raf();
	tick();

	function raf() {
		position += speed;
		speed *= 0.8;
		rounded = Math.round(position);
		let diff = rounded - position;
		position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.015;

		module.rendererDOM.addEventListener(
			'mousemove',
			module.handleMouseMove
		);

		// module.rendererDOM.addEventListener('mousemove', MouseMove);

		module.mesh.position.x = -position * 100;
		window.requestAnimationFrame(raf);
	}

	// function MouseMove(event) {
	// 	const element = event.currentTarget;
	// 	// canvas要素上のXY座標
	// 	const x = event.clientX - element.offsetLeft;
	// 	const y = event.clientY - element.offsetTop;
	// 	// canvas要素の幅・高さ
	// 	const w = element.offsetWidth;
	// 	const h = element.offsetHeight;

	// 	// -1〜+1の範囲で現在のマウス座標を登録する
	// 	module.mouse.x = (x / w) * 2 - 1;
	// 	module.mouse.y = -(y / h) * 2 + 1;

	// 	console.log(module.mouse.x, module.mouse.y);
	// }

	// 毎フレーム時に実行されるループイベントです
	function tick() {
		module.mousecursor();

		// レンダリング
		module.renderer.render(module.scene, module.camera);
		requestAnimationFrame(tick);
	}
}