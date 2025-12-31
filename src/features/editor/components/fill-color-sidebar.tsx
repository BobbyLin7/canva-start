import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { type ActiveTool, type Editor, FILL_COLOR } from "../types";
import { ColorPicker } from "./color-picker";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ToolSidebarHeader } from "./tool-sidebar-header";

interface Props {
	editor?: Editor;
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FillColorSidebar = ({
	editor,
	activeTool,
	onChangeActiveTool,
}: Props) => {
	const value = editor?.getActiveFillColor() || FILL_COLOR;

	const onClose = () => {
		onChangeActiveTool("select");
	};

	const onChange = (value: string) => {
		editor?.changeFillColor(value);
	};

	return (
		<aside
			className={cn(
				"relative z-40 flex h-full w-[360px] flex-col border-r bg-white",
				activeTool === "fill" ? "visible" : "hidden",
			)}
		>
			<ToolSidebarHeader
				title="Fill color"
				description="Add fill color to your element"
			/>
			<ScrollArea>
				<div className="space-y-6 p-4">
					<ColorPicker value={value} onChange={onChange} />
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={onClose} />
		</aside>
	);
};
