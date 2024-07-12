import { Container, Graphics, type Application } from "pixi.js";
import { Button } from "@pixi/ui";

export function showMenu(app: Application) {
	const menuContainer = new Container();
	app.stage.addChild(menuContainer);

	const button = new Button(
		new Graphics().roundRect(0, 0, 50, 50, 10).fill({ color: "#ffffff" }),
	);
	button.view.x = app.renderer.width - 70;
	button.view.y = 20;
	menuContainer.zIndex = 100;

	button.onPress.connect(() => console.log("menu"));

	menuContainer.addChild(button.view);
}
