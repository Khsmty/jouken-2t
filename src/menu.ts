import { Container, type Application } from "pixi.js";
import { FancyButton } from "@pixi/ui";

export function showMenu(app: Application) {
	const menuContainer = new Container();
	app.stage.addChild(menuContainer);

	const button = new FancyButton({
		defaultView: "button-menu",
		hoverView: "button-menu-hover",
		pressedView: "button-menu-pressed",
		anchorX: 1,
		anchorY: 0,
		scale: 0.2,
	});
	button.x = app.renderer.width - 20;
	button.y = 20;
	menuContainer.zIndex = 100;

	button.onPress.connect(() => {});

	menuContainer.addChild(button);
}
