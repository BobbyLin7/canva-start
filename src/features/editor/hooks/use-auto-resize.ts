import { type Canvas, iMatrix, util } from "fabric";
import { useCallback, useEffect } from "react";

interface Props {
	canvas: Canvas | null;
	container: HTMLDivElement | null;
}

export function useAutoSize({ canvas, container }: Props) {
	const autoZoom = useCallback(async () => {
		if (!canvas || !container) return;

		const width = container.offsetWidth;
		const height = container.offsetHeight;

		canvas.setDimensions({ width, height });

		const localWorkspace = canvas
			.getObjects()
			.find((obj) => (obj as unknown as { name?: string }).name === "clip");

		if (!localWorkspace) return;

		const scale = util.findScaleToFit(localWorkspace, { width, height });
		const zoom = 0.85 * scale;

		canvas.setViewportTransform([...iMatrix]);
		canvas.zoomToPoint(canvas.getCenterPoint(), zoom);

		const workspaceCenter = localWorkspace.getCenterPoint();
		const viewportTransform = canvas.viewportTransform;

		if (
			canvas.width === undefined ||
			canvas.height === undefined ||
			!viewportTransform
		) {
			return;
		}

		viewportTransform[4] =
			canvas.width / 2 - workspaceCenter.x * viewportTransform[0];

		viewportTransform[5] =
			canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

		canvas.setViewportTransform(viewportTransform);

		const cloned = await localWorkspace.clone();
		canvas.clipPath = cloned;
		canvas.requestRenderAll();
	}, [canvas, container]);

	useEffect(() => {
		let resizeObserver: ResizeObserver | null = null;

		if (canvas && container) {
			resizeObserver = new ResizeObserver(() => {
				autoZoom();
			});

			resizeObserver.observe(container);
		}

		return () => {
			if (resizeObserver) {
				resizeObserver.disconnect();
			}
		};
	}, [canvas, container, autoZoom]);
}
