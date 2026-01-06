import {
	type Canvas,
	Circle,
	FabricImage,
	FabricObject,
	Point,
	Polygon,
	Rect,
	Shadow,
	Textbox,
	type TextboxProps,
	Triangle,
} from "fabric";
import { useCallback, useMemo, useState } from "react";
import { JSON_KEYS } from "../constants";
import {
	type BuildEditorProps,
	CIRCLE_OPTIONS,
	DIAMOND_OPTIONS,
	type Editor,
	FILL_COLOR,
	FONT_FAMILY,
	FONT_SIZE,
	FONT_WEIGHT,
	RECTANGLE_OPTIONS,
	STROKE_COLOR,
	STROKE_DASH_ARRAY,
	STROKE_WIDTH,
	TEXT_OPTIONS,
	TRIANGLE_OPTIONS,
} from "../types";
import { createFilter, isTextType } from "../utils";
import { useAutoSize } from "./use-auto-resize";
import { useCanvasEvents } from "./use-canvas-events";
import { useClipboard } from "./use-clipboard";
import { useHistory } from "./use-history";

const buildEditor = ({
	undo,
	redo,
	save,
	canUndo,
	canRedo,
	canvas,
	fillColor,
	strokeColor,
	strokeWidth,
	strokeDashArray,
	selectedObjects,
	setFillColor,
	setStrokeColor,
	setStrokeWidth,
	setStrokeDashArray,
	fontFamily,
	setFontFamily,
	// setSelectedObjects,
	copy,
	paste,
	autoZoom,
}: BuildEditorProps): Editor => {
	const getWorkspace = () => {
		return canvas.getObjects().find((object) => object.name === "clip");
	};

	const center = (object: FabricObject) => {
		const workspace = getWorkspace();
		const center = workspace?.getCenterPoint();

		if (!center) return;

		canvas._centerObject(object, center);
	};

	const addToCanvas = (object: FabricObject) => {
		center(object);
		canvas.add(object);
		canvas.setActiveObject(object);
	};

	return {
		addCircle: () => {
			const object = new Circle({
				...CIRCLE_OPTIONS,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth: strokeWidth,
				strokeDashArray: strokeDashArray,
			});

			addToCanvas(object);
		},
		addRectangle: () => {
			const object = new Rect({
				...RECTANGLE_OPTIONS,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth: strokeWidth,
				strokeDashArray: strokeDashArray,
			});

			addToCanvas(object);
		},
		addSoftRectangle: () => {
			const object = new Rect({
				...RECTANGLE_OPTIONS,
				rx: 50,
				ry: 50,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth: strokeWidth,
				strokeDashArray: strokeDashArray,
			});

			addToCanvas(object);
		},
		addTriangle: () => {
			const object = new Triangle({
				...TRIANGLE_OPTIONS,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth: strokeWidth,
				strokeDashArray: strokeDashArray,
			});

			addToCanvas(object);
		},
		addInverseTriangle: () => {
			const HEIGHT = TRIANGLE_OPTIONS.height;
			const WIDTH = TRIANGLE_OPTIONS.width;

			const object = new Polygon(
				[
					{ x: 0, y: 0 },
					{ x: WIDTH, y: 0 },
					{ x: WIDTH / 2, y: HEIGHT },
				],
				{
					...TRIANGLE_OPTIONS,
					fill: fillColor,
					stroke: strokeColor,
					strokeWidth: strokeWidth,
					strokeDashArray: strokeDashArray,
				},
			);

			addToCanvas(object);
		},
		addDiamond: () => {
			const HEIGHT = DIAMOND_OPTIONS.height;
			const WIDTH = DIAMOND_OPTIONS.width;

			const object = new Polygon(
				[
					{ x: WIDTH / 2, y: 0 },
					{ x: WIDTH, y: HEIGHT / 2 },
					{ x: WIDTH / 2, y: HEIGHT },
					{ x: 0, y: HEIGHT / 2 },
				],
				{
					...DIAMOND_OPTIONS,
					fill: fillColor,
					stroke: strokeColor,
					strokeWidth: strokeWidth,
					strokeDashArray: strokeDashArray,
				},
			);
			addToCanvas(object);
		},
		addText: (text: string, options: Partial<TextboxProps>) => {
			const object = new Textbox(text, {
				...TEXT_OPTIONS,
				fill: fillColor,
				...options,
			});

			addToCanvas(object);
		},
		changeFillColor: (value: string) => {
			setFillColor(value);
			canvas.getActiveObjects().forEach((object) => {
				object.set({ fill: value });
			});
			canvas.renderAll();
		},
		changeOpacity: (value: number) => {
			canvas.getActiveObjects().forEach((object) => {
				object.set({ opacity: value });
			});
			canvas.renderAll();
		},
		changeTextAlign: (value: string) => {
			canvas.getActiveObjects().forEach((object) => {
				if (isTextType(object.type)) {
					object.set({ textAlign: value });
				}
			});
			canvas.renderAll();
		},
		changeFontWeight: (value: number) => {
			canvas.getActiveObjects().forEach((object) => {
				if (isTextType(object.type)) {
					object.set({ fontWeight: value });
				}
			});
			canvas.renderAll();
		},
		changeFontStyle: (value: string) => {
			canvas.getActiveObjects().forEach((object) => {
				if (isTextType(object.type)) {
					object.set({ fontStyle: value });
				}
			});
			canvas.renderAll();
		},
		changeFontLinethrough: (value: boolean) => {
			canvas.getActiveObjects().forEach((object) => {
				if (isTextType(object.type)) {
					object.set({ linethrough: value });
				}
			});
			canvas.renderAll();
		},
		changeFontUnderline: (value: boolean) => {
			canvas.getActiveObjects().forEach((object) => {
				if (isTextType(object.type)) {
					object.set({ underline: value });
				}
			});
			canvas.renderAll();
		},
		changeFontSize: (value: number) => {
			canvas.getActiveObjects().forEach((object) => {
				if (isTextType(object.type)) {
					object.set({ fontSize: value });
				}
			});
			canvas.renderAll();
		},
		changeFontFamily: (value: string) => {
			setFontFamily(value);
			canvas.getActiveObjects().forEach((object) => {
				if (isTextType(object.type)) {
					object.set({ fontFamily: value });
				}
			});
			canvas.renderAll();
		},
		changeStrokeColor: (value: string) => {
			setStrokeColor(value);
			canvas.getActiveObjects().forEach((object) => {
				if (isTextType(object.type)) {
					object.set({ fill: value });
					return;
				}

				object.set({ stroke: value });
			});
			if (canvas.freeDrawingBrush) {
				canvas.freeDrawingBrush.color = value;
			}
			canvas.renderAll();
		},
		changeStrokeWidth: (value: number) => {
			setStrokeWidth(value);
			canvas.getActiveObjects().forEach((object) => {
				object.set({ strokeWidth: value });
			});
			if (canvas.freeDrawingBrush) {
				canvas.freeDrawingBrush.width = value;
			}
			canvas.renderAll();
		},
		changeStrokeDashArray: (array: number[]) => {
			setStrokeDashArray(array);
			canvas.getActiveObjects().forEach((object) => {
				object.set({ strokeDashArray: array });
			});
			canvas.renderAll();
		},
		getActiveStrokeColor: () => {
			const selectedObject = selectedObjects[0];

			if (!selectedObject) {
				return strokeColor;
			}

			const value = selectedObject.get("stroke") || strokeColor;

			return value;
		},
		getActiveFillColor: () => {
			const selectedObject = selectedObjects[0];

			if (!selectedObject) {
				return fillColor;
			}

			const value = selectedObject.get("fill") || fillColor;

			return value as string;
		},
		getActiveStrokeWidth: () => {
			const selectedObject = selectedObjects[0];

			if (!selectedObject) {
				return strokeWidth;
			}

			const value = selectedObject.get("strokeWidth") || strokeWidth;

			return value;
		},
		getActiveStrokeDashArray: () => {
			const selectedObject = selectedObjects[0];

			if (!selectedObject) {
				return strokeDashArray;
			}

			const value = selectedObject.get("strokeDashArray") || strokeDashArray;

			return value;
		},
		getActiveOpacity: () => {
			const selectedObject = selectedObjects[0];

			if (!selectedObject) {
				return 1;
			}

			const value = selectedObject.get("opacity") || 1;

			return value;
		},
		getActiveFontWeight: () => {
			const selectedObject = selectedObjects[0];

			if (!selectedObject) {
				return FONT_WEIGHT;
			}

			const value = selectedObject.get("fontWeight") || FONT_WEIGHT;

			return value;
		},
		getActiveFontFamily: () => {
			const selectedObject = selectedObjects[0];

			if (!selectedObject) {
				return fontFamily;
			}

			const value = selectedObject.get("fontFamily") || fontFamily;

			return value;
		},
		getActiveFontStyle: () => {
			const selectedObject = selectedObjects[0];

			if (!selectedObject) {
				return "normal";
			}

			const value = selectedObject.get("fontStyle") || "normal";

			return value;
		},
		getActiveFontLinethrough: () => {
			const selectedObject = selectedObjects[0];

			if (!selectedObject) {
				return false;
			}

			const value = selectedObject.get("linethrough") || false;

			return value;
		},
		getActiveFontUnderline: () => {
			const selectedObject = selectedObjects[0];

			if (!selectedObject) {
				return false;
			}

			const value = selectedObject.get("underline") || false;

			return value;
		},
		getActiveTextAlign: () => {
			const selectedObject = selectedObjects[0];

			if (!selectedObject) {
				return "left";
			}

			const value = selectedObject.get("textAlign") || "left";

			return value;
		},
		getActiveFontSize: () => {
			const selectedObject = selectedObjects[0];

			if (!selectedObject) {
				return FONT_SIZE;
			}

			const value = selectedObject.get("fontSize") || FONT_SIZE;

			return value;
		},
		bringForward: () => {
			canvas.getActiveObjects().forEach((object) => {
				canvas.bringObjectForward(object);
			});

			canvas.renderAll();
		},
		sendBackwards: () => {
			canvas.getActiveObjects().forEach((object) => {
				canvas.sendObjectBackwards(object);
			});
			canvas.discardActiveObject();
			canvas.renderAll();
		},
		delete: () => {
			canvas.getActiveObjects().forEach((object) => {
				canvas.remove(object);
			});
			canvas.renderAll();
		},
		addImage: async (value: string) => {
			const workspace = getWorkspace();

			const image = await FabricImage.fromURL(
				value,
				{
					crossOrigin: "anonymous",
				},
				{
					width: workspace?.width || 0,
					height: workspace?.height || 0,
				},
			);

			addToCanvas(image);
		},
		changeImageFilter: (value: string) => {
			const objects = canvas.getActiveObjects();
			objects.forEach((object) => {
				if (object.type === "image") {
					const imageObject = object as FabricImage;

					const effect = createFilter(value);

					imageObject.filters = effect ? [effect] : [];
					imageObject.applyFilters();
					canvas.renderAll();
				}
			});
		},
		onCopy: () => {
			copy();
		},
		onPaste: () => {
			paste();
		},
		disableDrawingMode: () => {
			canvas.isDrawingMode = false;
		},
		enableDrawingMode: () => {
			canvas.discardActiveObject();
			canvas.renderAll();
			canvas.isDrawingMode = true;
			if (!canvas.freeDrawingBrush) return;
			canvas.freeDrawingBrush.width = strokeWidth;
			canvas.freeDrawingBrush.color = strokeColor;
		},
		getWorkspace,
		changeSize: (value: { width: number; height: number }) => {
			const workspace = getWorkspace();

			workspace?.set(value);
			autoZoom();
			save();
		},
		changeBackground: (value: string) => {
			const workspace = getWorkspace();
			workspace?.set({ fill: value });
			canvas.renderAll();
			save();
		},
		autoZoom,
		zoomIn: () => {
			let zoomRatio = canvas.getZoom();
			zoomRatio += 0.05;
			const center = canvas.getCenterPoint();
			canvas.zoomToPoint(
				new Point(center.x, center.y),
				zoomRatio > 1 ? 1 : zoomRatio,
			);
		},
		zoomOut: () => {
			let zoomRatio = canvas.getZoom();
			zoomRatio -= 0.05;
			const center = canvas.getCenterPoint();
			canvas.zoomToPoint(
				new Point(center.x, center.y),
				zoomRatio < 0.2 ? 0.2 : zoomRatio,
			);
		},
		canUndo,
		canRedo,
		onUndo: () => undo(),
		onRedo: () => redo(),
		selectedObjects,
	};
};

interface Props {
	defaultState?: string;
	defaultWidth?: number;
	defaultHeight?: number;
	clearSelectionCallback?: () => void;
	saveCallback?: (values: {
		json: string;
		height: number;
		width: number;
	}) => void;
}

export function useEditor({ clearSelectionCallback, saveCallback }: Props) {
	const [canvas, setCanvas] = useState<Canvas | null>(null);
	const [container, setContainer] = useState<HTMLDivElement | null>(null);

	const [fontFamily, setFontFamily] = useState(FONT_FAMILY);
	const [fillColor, setFillColor] = useState(FILL_COLOR);
	const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
	const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
	const [strokeDashArray, setStrokeDashArray] =
		useState<number[]>(STROKE_DASH_ARRAY);

	const [selectedObjects, setSelectedObjects] = useState<FabricObject[]>([]);

	const { copy, paste } = useClipboard({ canvas });

	const { autoZoom } = useAutoSize({ canvas, container });

	const { save, canRedo, canUndo, undo, redo, canvasHistory, setHistoryIndex } =
		useHistory({
			canvas,
			saveCallback,
		});

	useCanvasEvents({
		save,
		canvas,
		setSelectedObjects,
		clearSelectionCallback,
	});

	const editor = useMemo(() => {
		if (canvas) {
			return buildEditor({
				undo,
				redo,
				save,
				canUndo,
				canRedo,
				autoZoom,
				canvas,
				fillColor,
				strokeColor,
				strokeWidth,
				strokeDashArray,
				selectedObjects,
				setFillColor,
				setStrokeColor,
				setStrokeWidth,
				setStrokeDashArray,
				setSelectedObjects,
				fontFamily,
				setFontFamily,
				copy,
				paste,
			});
		}

		return undefined;
	}, [
		canvas,
		fillColor,
		strokeColor,
		strokeWidth,
		strokeDashArray,
		selectedObjects,
		fontFamily,
		copy,
		paste,
		autoZoom,
		undo,
		redo,
		save,
		canUndo,
		canRedo,
	]);

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
				name: "clip",
			});

			initialCanvas.setDimensions({
				width: initialContainer.offsetWidth,
				height: initialContainer.offsetHeight,
			});

			initialCanvas.add(initialWorkspace);
			initialCanvas.centerObject(initialWorkspace);
			initialCanvas.clipPath = initialWorkspace;

			setCanvas(initialCanvas);
			setContainer(initialContainer);

			const currentState = JSON.stringify(
				initialCanvas.toDatalessObject(JSON_KEYS),
			);
			canvasHistory.current = [currentState];
			setHistoryIndex(0);
		},
		[canvasHistory, setHistoryIndex],
	);

	return {
		init,
		editor,
	};
}
