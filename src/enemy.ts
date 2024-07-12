import { type Application, Graphics, type Ticker } from "pixi.js";

let lastTime = 0;

export function addEnemies(
	app: Application,
	enemies: Graphics[],
	time: Ticker,
) {
	if (time.lastTime - lastTime <= 1000) return;
	lastTime = time.lastTime;

	const enemy = new Graphics().circle(0, 0, 5).fill({ color: "#ffff00" });

	enemy.x = Math.random() * app.screen.width;
	enemy.y = -10;

	app.stage.addChild(enemy);
	enemies.push(enemy);
}

export function animateEnemies(app: Application, enemies: Graphics[]) {
	for (const enemy of enemies) {
		enemy.y += 0.5;

		// 十分に画面外に出たら削除 (0にすると見えているうちに消滅する)
		if (enemy.y > app.screen.height + 10) {
			app.stage.removeChild(enemy);
			enemies.splice(enemies.indexOf(enemy), 1);
		}
	}
}
