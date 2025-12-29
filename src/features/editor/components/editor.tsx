import { Canvas } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor } from "@/features/editor/hooks/use-editor";
import type { ActiveTool } from "../types";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { ShapeSidebar } from "./shape-sidebar";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";

export const Editor = () => {
	const { init } = useEditor();

	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const workspaceRef = useRef<HTMLDivElement | null>(null);

	const [activeTool, setActiveTool] = useState<ActiveTool>("select");

	const onChangeActiveTool = useCallback(
		(tool: ActiveTool) => {
			if (tool === "draw") {
				//
			}

			if (activeTool === "draw") {
				//
			}

			if (tool === activeTool) {
				return setActiveTool("select");
			}

			setActiveTool(tool);
		},
		[activeTool],
	);

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
			<Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
			<div className="absolute top-[68px] flex h-[calc(100%-68px)] w-full">
				<Sidebar
					activeTool={activeTool}
					onChangeActiveTool={onChangeActiveTool}
				/>
				<ShapeSidebar
					activeTool={activeTool}
					onChangeActiveTool={onChangeActiveTool}
				/>
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
