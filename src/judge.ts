import { type Application, Container, type Graphics, Text } from "pixi.js";
import { PrimaryButton } from "./ui/buttons/PrimaryButton";

function judgeDeath(app: Application, enemies: Graphics[], x: number) {
	// enemy が player に当たったら true を返す
	for (const enemy of enemies) {
		const distance = Math.sqrt(
			(enemy.x - x) ** 2 + (enemy.y - app.screen.height * 0.85) ** 2,
		);

		if (distance < 10) return true;
	}
	return false;
}

export function stopWhenDeath(
	app: Application,
	enemies: Graphics[],
	x: number,
) {
	if (!judgeDeath(app, enemies, x)) return;

	app.ticker.stop();

	const gameOverContainer = new Container();
	app.stage.addChild(gameOverContainer);

	const text = new Text({
		text: "Game Over",
		style: {
			fill: "#ffffff",
			fontFamily: "DotGothic16 Regular",
			fontSize: 48,
		},
	});
	text.position.set(app.screen.width / 2, app.screen.height / 2);
	text.anchor.set(0.5);
	gameOverContainer.addChild(text);

	// const restartButton = new Button(
	// 	new Graphics().roundRect(0, 0, 50, 50, 10).fill({ color: "#ffffff" }),
	// );
	// restartButton.view.x = app.screen.width / 2 - 25;
	// restartButton.view.y = app.screen.height / 2 + 50;
	// restartButton.onPress.connect(() => {
	// 	app.ticker.start();
	// 	app.stage.removeChild(gameOverContainer);
	// });
	// gameOverContainer.addChild(restartButton.view);

	const restartButton = new PrimaryButton({
		text: "Restart",
	});
	restartButton.x = app.screen.width / 2 - 25;
	restartButton.y = app.screen.height / 2 + 50;
	gameOverContainer.addChild(restartButton);
}
