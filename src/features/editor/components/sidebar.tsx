import {
	ImageIcon,
	LayoutTemplateIcon,
	PencilIcon,
	SettingsIcon,
	ShapesIcon,
	SparklesIcon,
	TypeIcon,
} from "lucide-react";
import type { ActiveTool } from "../types";
import { SidebarItem } from "./sidebar-item";

interface Props {
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Sidebar = ({ activeTool, onChangeActiveTool }: Props) => {
	return (
		<aside className="flex h-full w-[100px] flex-col overflow-y-auto border-r bg-white">
			<ul className="flex flex-col">
				<SidebarItem
					icon={LayoutTemplateIcon}
					label="Design"
					isActive={activeTool === "templates"}
					onClick={() => onChangeActiveTool("templates")}
				/>
				<SidebarItem
					icon={ImageIcon}
					label="Images"
					isActive={activeTool === "images"}
					onClick={() => onChangeActiveTool("images")}
				/>
				<SidebarItem
					icon={TypeIcon}
					label="Text"
					isActive={activeTool === "text"}
					onClick={() => onChangeActiveTool("text")}
				/>
				<SidebarItem
					icon={ShapesIcon}
					label="Shapes"
					isActive={activeTool === "shapes"}
					onClick={() => onChangeActiveTool("shapes")}
				/>
				<SidebarItem
					icon={PencilIcon}
					label="Draw"
					isActive={activeTool === "draw"}
					onClick={() => onChangeActiveTool("draw")}
				/>
				<SidebarItem
					icon={SparklesIcon}
					label="AI"
					isActive={activeTool === "ai"}
					onClick={() => onChangeActiveTool("ai")}
				/>
				<SidebarItem
					icon={SettingsIcon}
					label="Settings"
					isActive={activeTool === "settings"}
					onClick={() => onChangeActiveTool("settings")}
				/>
			</ul>
		</aside>
	);
};
