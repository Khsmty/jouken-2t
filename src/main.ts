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

	app.renderer.resize(w, h);
}

async function init() {
	await app.init({
		background: "#000000",
	});
	document.body.appendChild(app.canvas);

	const assets = [
		{
			alias: "menu",
			src: "/assets/ui/menu.png",
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
