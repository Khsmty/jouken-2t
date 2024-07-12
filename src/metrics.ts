import { type Application, Text } from "pixi.js";

export function showMetrics(app: Application) {
	const metrics = app.stage.addChild(
		new Text({
			text: "",
			style: {
				fill: "#ffffff",
				fontSize: 12,
			},
		}),
	);
	metrics.position.set(10, 10);

	app.ticker.add(() => {
		metrics.text = `FPS: ${app.ticker.FPS.toFixed(2)}`;
	});
}
