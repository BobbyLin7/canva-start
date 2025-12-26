import { Canvas } from "fabric";
import { useEffect, useRef } from "react";
import { useEditor } from "@/features/editor/hooks/use-editor";

export const Editor = () => {
	const { init } = useEditor();

	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const workspaceRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!canvasRef.current || !workspaceRef.current) {
			return;
		}

		const canvas = new Canvas(canvasRef.current, {
			controlsAboveOverlay: true,
			preserveObjectStacking: true,
		});

		init({
			initialCanvas: canvas,
			initialContainer: workspaceRef.current,
		});
	}, [init]);

	return (
		<div className="flex h-full">
			<div ref={workspaceRef} className="h-full flex-1 bg-muted">
				<canvas ref={canvasRef} />
			</div>
		</div>
	);
};
