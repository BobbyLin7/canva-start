import { ArrowDownIcon, ArrowUpIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ActiveTool, Editor } from "../types";
import { isTextType } from "../utils";

interface Props {
	editor?: Editor;
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar = ({ editor, activeTool, onChangeActiveTool }: Props) => {
	const initialFillColor = editor?.getActiveFillColor();
	const initialStrokeColor = editor?.getActiveStrokeColor();
	const initialFontFamily = editor?.getActiveFontFamily();

	const [properties, setProperties] = useState({
		fillColor: initialFillColor,
		strokeColor: initialStrokeColor,
		fontFamily: initialFontFamily,
	});

	const selectedObject = editor?.selectedObjects[0];
	const selectedObjectType = editor?.selectedObjects[0]?.type;

	const isText = isTextType(selectedObjectType);

	if (editor?.selectedObjects.length === 0) {
		return (
			<div className="z-49 flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2" />
		);
	}

	return (
		<div className="z-49 flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2">
			<div className="flex h-full items-center justify-center">
				<Hint label="Color" side="bottom" sideOffset={5}>
					<Button
						onClick={() => onChangeActiveTool("fill")}
						size="icon"
						variant="ghost"
						className={cn(activeTool === "fill" && "bg-gray-100")}
					>
						<div
							className="size-4 rounded-sm border"
							style={{ backgroundColor: properties.fillColor }}
						/>
					</Button>
				</Hint>
			</div>
			{!isText && (
				<div className="flex h-full items-center justify-center">
					<Hint label="Stroke color" side="bottom" sideOffset={5}>
						<Button
							onClick={() => onChangeActiveTool("stroke-color")}
							size="icon"
							variant="ghost"
							className={cn(activeTool === "stroke-color" && "bg-gray-100")}
						>
							<div
								className="size-4 rounded-sm border-2 bg-white"
								style={{ borderColor: properties.strokeColor }}
							/>
						</Button>
					</Hint>
				</div>
			)}
			{!isText && (
				<div className="flex h-full items-center justify-center">
					<Hint label="Stroke width" side="bottom" sideOffset={5}>
						<Button
							onClick={() => onChangeActiveTool("stroke-width")}
							size="icon"
							variant="ghost"
							className={cn(activeTool === "stroke-width" && "bg-gray-100")}
						>
							<BsBorderWidth className="size-4" />
						</Button>
					</Hint>
				</div>
			)}
			{isText && (
				<div className="flex h-full items-center justify-center">
					<Hint label="Font" side="bottom" sideOffset={5}>
						<Button
							onClick={() => onChangeActiveTool("font")}
							size="icon"
							variant="ghost"
							className={cn(
								"w-auto px-2 text-sm",
								activeTool === "font" && "bg-gray-100",
							)}
						>
							<div className="max-w-[100px] truncate">
								{properties.fontFamily}
							</div>
							<ChevronDownIcon className="ml-2 size-4 shrink-0" />
						</Button>
					</Hint>
				</div>
			)}
			<div className="flex h-full items-center justify-center">
				<Hint label="Bring forward" side="bottom" sideOffset={5}>
					<Button
						onClick={() => editor?.bringForward()}
						size="icon"
						variant="ghost"
					>
						<ArrowUpIcon className="size-4" />
					</Button>
				</Hint>
			</div>
			<div className="flex h-full items-center justify-center">
				<Hint label="Send backwards" side="bottom" sideOffset={5}>
					<Button
						onClick={() => editor?.sendBackwards()}
						size="icon"
						variant="ghost"
					>
						<ArrowDownIcon className="size-4" />
					</Button>
				</Hint>
			</div>
			<div className="flex h-full items-center justify-center">
				<Hint label="Opacity" side="bottom" sideOffset={5}>
					<Button
						onClick={() => onChangeActiveTool("opacity")}
						size="icon"
						variant="ghost"
						className={cn(activeTool === "opacity" && "bg-gray-100")}
					>
						<RxTransparencyGrid className="size-4" />
					</Button>
				</Hint>
			</div>
		</div>
	);
};
