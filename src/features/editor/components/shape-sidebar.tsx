import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";
import { FaDiamond } from "react-icons/fa6";
import { IoTriangle } from "react-icons/io5";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { ActiveTool } from "../types";
import { ShapeTool } from "./shape-tool";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ToolSidebarHeader } from "./tool-sidebar-header";

interface Props {
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ShapeSidebar = ({ activeTool, onChangeActiveTool }: Props) => {
	const onClose = () => {
		onChangeActiveTool("select");
	};

	return (
		<aside
			className={cn(
				"relative z-40 flex h-full w-[360px] flex-col border-r bg-white",
				activeTool === "shapes" ? "visible" : "hidden",
			)}
		>
			<ToolSidebarHeader
				title="Shapes"
				description="Create shapes and add them to your canvas"
			/>
			<ScrollArea>
				<div className="grid grid-cols-3 gap-4 p-4">
					<ShapeTool onClick={() => {}} icon={FaCircle} />
					<ShapeTool onClick={() => {}} icon={FaSquare} />
					<ShapeTool onClick={() => {}} icon={FaSquareFull} />
					<ShapeTool onClick={() => {}} icon={IoTriangle} />
					<ShapeTool
						onClick={() => {}}
						icon={IoTriangle}
						iconClassName="rotate-180"
					/>
					<ShapeTool onClick={() => {}} icon={FaDiamond} />
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={onClose} />
		</aside>
	);
};
