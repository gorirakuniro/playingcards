import { TweenMax, Power2, Linear } from 'gsap';
import CircleType from 'circletype';
import './script';

const circletext = document.querySelector('.circleText');
const circleType = new CircleType(circletext);

const js_loading = document.getElementById('js_loading');

window.addEventListener('DOMContentLoaded', () => {
	setTimeout(() => {
		js_loading.style.opacity = 0;
		js_loading.style.transform = 'translate(0,-100%)';
	}, 3000);
});

TweenMax.staggerFrom(
	'.header_navlist > .header_navlist-li',
	1,
	{
		y: '30',
		opacity: 0,
		ease: Power2.easeOut,
		delay: 1.2,
	},
	0.2
);

TweenMax.from(
	circletext,
	40,
	{
		rotation: 360,
		transformOrigin: '50% 50%',
		ease: Linear.easeNone,
		repeat: -1,
	},
	0.4
);

TweenMax.from(
	'.loading > .loading__img',
	4,
	{
		rotationY: 360,
		transformOrigin: '50% 50%',
		ease: Power2.easeOut,
		repeat: -1,
	},
	0.4
);

// スマホスクロールバー
const scrollbar = document.getElementById('js_scrollbar');
const scrollbar__track = document.querySelector('.scrollbar__track');

scrollbar__track.addEventListener('touchstart', (event) => {
	event.preventDefault();

	let shiftY = event.touches[0].clientY - scrollbar__track.getBoundingClientRect().top;

	document.addEventListener('touchmove', onMouseMove);
	document.addEventListener('touchend', onMouseUp);

	function onMouseMove(event) {
		touchanime();

		let newTop = event.touches[0].clientY - shiftY - scrollbar.getBoundingClientRect().top;

		if (newTop < 0) {
			newTop = 0;
		}
		let topEdge = scrollbar.offsetHeight - scrollbar__track.offsetHeight;
		if (newTop > topEdge) {
			newTop = topEdge;
		}

		scrollbar__track.style.top = newTop + 'px';
	}

	function onMouseUp() {
		touchremoveanime();
		document.removeEventListener('touchend', onMouseUp);
		document.removeEventListener('touchmove', onMouseMove);
	}
});

scrollbar__track.ondragstart = function () {
	return false;
};

function touchanime() {
	TweenMax.from(
		scrollbar__track,
		1,
		{
			width: '10px',
			height: '10px',
			ease: Power2.easeOut,
		},
		0.4
	);
}

function touchremoveanime() {
	TweenMax.to(
		scrollbar__track,
		1,
		{
			width: '20px',
			height: '20px',
			ease: Power2.easeOut,
		},
		0.4
	);
}
