import { TweenMax, Power2, Linear } from 'gsap';
import CircleType from 'circletype';

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

const circletext = document.querySelector('.circleText');
const circleType = new CircleType(circletext);

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
