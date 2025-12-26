import { type Canvas, FabricObject, Rect, Shadow } from "fabric";
import { useCallback } from "react";

export function useEditor() {
	const init = useCallback(
		({
			initialCanvas,
			initialContainer,
		}: {
			initialCanvas: Canvas;
			initialContainer: HTMLDivElement;
		}) => {
			FabricObject.prototype.set({
				cornerStyle: "circle",
				cornerColor: "#FFF",
				borderColor: "#3b82f6",
				borderScaleFactor: 1.5,
				transparentCorners: false,
				borderOpacityWhenMoving: 1,
				cornerStrokerColor: "#3b82f6",
			});

			const initialWorkspace = new Rect({
				width: 900,
				height: 1200,
				fill: "white",
				selectable: false,
				hasControls: false,
				shadow: new Shadow({
					color: "rgba(0,0,0,0.8)",
					blur: 5,
				}),
			});

			initialCanvas.setDimensions({
				width: initialContainer.offsetWidth,
				height: initialContainer.offsetHeight,
			});

			initialCanvas.add(initialWorkspace);
			initialCanvas.centerObject(initialWorkspace);
			initialCanvas.clipPath = initialWorkspace;
		},
		[],
	);

	return {
		init,
	};
}
