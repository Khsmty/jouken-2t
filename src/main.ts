import "./style.css";

import { Application, Assets, type Graphics } from "pixi.js";
import { addBullets, animateBullets } from "./bullet";
import { trackPointer } from "./pointer";
import { showMetrics } from "./metrics";
import { showMenu } from "./menu";
import { addEnemies, animateEnemies } from "./enemy";
import { stopWhenDeath } from "./judge";

const app = new Application();

// 自分の x 座標
export let x = window.innerWidth / 2;
export function setX(value: number) {
	x = value;
}

const bullets: Graphics[] = [];
const enemies: Graphics[] = [];

function resize() {
	const ratio = 450 / 800;

	let w = window.innerWidth;
	let h = window.innerHeight;
	const windowRatio = w / h;

	if (windowRatio > ratio) {
		w = h * ratio;
	}
	if (windowRatio < ratio) {
		h = w / ratio;
	}

	app.renderer.canvas.style.width = `${w}px`;
	app.renderer.canvas.style.height = `${h}px`;
	window.scrollTo(0, 0);

	app.renderer.resize(w, h);
}

async function init() {
	await app.init({
		background: "#000000",
		resolution: Math.max(window.devicePixelRatio, 2),
	});
	document.body.appendChild(app.canvas);

	const assets = [
		// ボタン
		{
			alias: "button-base",
			src: "/assets/ui/button.png",
		},
		{
			alias: "button-menu",
			src: "/assets/ui/menu.png",
		},
		{
			alias: "button-menu-hover",
			src: "/assets/ui/menu_hover.png",
		},
		{
			alias: "button-menu-pressed",
			src: "/assets/ui/menu_pressed.png",
		},

		// フォント
		{
			alias: "DotGothic16",
			src: "/assets/fonts/DotGothic16-Regular.woff2",
		},
	];

	await Assets.load(assets);
}

(async () => {
	await init();

	window.addEventListener("resize", resize);
	resize();

	showMetrics(app);
	showMenu(app);
	trackPointer(app);

	app.ticker.add((time) => {
		addBullets(app, bullets, time, x);
		animateBullets(app, bullets);

		addEnemies(app, enemies, time);
		animateEnemies(app, enemies);

		stopWhenDeath(app, enemies, x);
	}, 1000);
})();
