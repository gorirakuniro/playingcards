import { TweenMax, Power2, Linear } from 'gsap';
import CircleType from 'circletype';

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
