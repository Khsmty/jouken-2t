import { type Application, Graphics } from "pixi.js";
import { setX } from "./main";

export function trackPointer(app: Application) {
	// Create the circle
	const circle = app.stage.addChild(
		new Graphics().circle(0, 0, 8).fill({ color: "#ffffff" }),
	);

	circle.position.set(app.screen.width / 2, app.screen.height * 0.85);

	// Enable interactivity!
	app.stage.eventMode = "static";

	// Make sure the whole canvas area is interactive, not just the circle.
	app.stage.hitArea = app.screen;

	// Follow the pointer
	app.stage.addEventListener("pointermove", (e) => {
		setX(e.global.x);

		circle.position.copyFrom({
			x: e.global.x,
			y: app.screen.height * 0.85,
		});
	});
}
