import { ActiveSelection, type Canvas, type FabricObject } from "fabric";
import { useCallback, useRef } from "react";

interface UseClipboardProps {
	canvas: Canvas | null;
}

export const useClipboard = ({ canvas }: UseClipboardProps) => {
	const clipboard = useRef<FabricObject | null>(null);

	const copy = useCallback(async () => {
		const activeObject = canvas?.getActiveObject();
		if (!activeObject) return;

		const cloned = await activeObject.clone();
		clipboard.current = cloned;
	}, [canvas]);

	const paste = useCallback(async () => {
		if (!clipboard.current || !canvas) return;

		const cloned = await clipboard.current.clone();

		canvas.discardActiveObject();

		const offsetX = (cloned.left ?? 0) + 10;
		const offsetY = (cloned.top ?? 0) + 10;

		cloned.set({
			left: offsetX,
			top: offsetY,
			evented: true,
		});

		if (cloned instanceof ActiveSelection) {
			cloned.canvas = canvas;
			cloned.forEachObject((obj) => {
				canvas.add(obj);
			});
			cloned.setCoords();
		} else {
			canvas.add(cloned);
		}

		clipboard.current.set({
			left: (clipboard.current.left ?? 0) + 10,
			top: (clipboard.current.top ?? 0) + 10,
		});

		canvas.setActiveObject(cloned);
		canvas.requestRenderAll();
	}, [canvas]);

	return { copy, paste };
};
