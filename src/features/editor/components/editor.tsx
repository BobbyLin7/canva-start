import { Canvas } from "fabric";
import { useEffect, useRef } from "react";
import { useEditor } from "@/features/editor/hooks/use-editor";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";

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
		<div className="flex h-full flex-col">
			<Navbar />
			<div className="absolute top-[68px] flex h-[calc(100%-68px)] w-full">
				<Sidebar />
				<main className="relative flex flex-1 flex-col overflow-auto bg-muted">
					<Toolbar />
					<div
						ref={workspaceRef}
						className="h-[calc(100%-124px)] flex-1 bg-muted"
					>
						<canvas ref={canvasRef} />
					</div>
					<Footer />
				</main>
			</div>
		</div>
	);
};
