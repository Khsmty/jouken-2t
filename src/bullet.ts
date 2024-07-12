import { type Application, Graphics, type Ticker } from "pixi.js";

let lastTime = 0;

export function addBullets(
	app: Application,
	bullets: Graphics[],
	time: Ticker,
	x: number,
) {
	if (time.lastTime - lastTime <= 400) return;
	lastTime = time.lastTime;

	const bullet = new Graphics().circle(0, 0, 5).fill({ color: "#ff00ff" });

	bullet.x = x;
	bullet.y = app.screen.height * 0.85;

	app.stage.addChild(bullet);
	bullets.push(bullet);
}

export function animateBullets(app: Application, bullets: Graphics[]) {
	for (const bullet of bullets) {
		bullet.y -= 0.5;

		// 十分に画面外に出たら削除 (0にすると見えているうちに消滅する)
		if (bullet.y < -10) {
			app.stage.removeChild(bullet);
			bullets.splice(bullets.indexOf(bullet), 1);
		}
	}
}
