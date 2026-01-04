import { Image } from "@unpic/react";
import { AlertTriangleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRemoveBg } from "@/features/ai/api/use-remove-bg";
import { cn } from "@/lib/utils";
import type { ActiveTool, Editor } from "../types";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ToolSidebarHeader } from "./tool-sidebar-header";

interface Props {
	editor?: Editor;
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
}

export const RemoveBgSidebar = ({
	editor,
	activeTool,
	onChangeActiveTool,
}: Props) => {
	const mutation = useRemoveBg();

	const selectedObject = editor?.selectedObjects[0];

	// @ts-expect-error
	const imageSrc = selectedObject?._originalElement?.currentSrc;

	const onClose = () => {
		onChangeActiveTool("select");
	};

	const onClick = () => {
		mutation.mutate(
			{
				image: imageSrc,
			},
			{
				onSuccess: (data) => {
					editor?.addImage(data);
				},
			},
		);
	};

	return (
		<aside
			className={cn(
				"relative z-40 flex h-full w-[360px] flex-col border-r bg-white",
				activeTool === "remove-bg" ? "visible" : "hidden",
			)}
		>
			<ToolSidebarHeader
				title="Background removal"
				description="Remove background from image using AI"
			/>
			{!imageSrc && (
				<div className="flex flex-1 flex-col items-center justify-center gap-y-4">
					<AlertTriangleIcon className="size-4 text-muted-foreground" />
					<p className="text-muted-foreground text-xs">
						Feature not available for this object
					</p>
				</div>
			)}
			{imageSrc && (
				<ScrollArea>
					<div className="space-y-4 p-4">
						<div
							className={cn(
								"relative aspect-square overflow-hidden rounded-md bg-muted transition",
								mutation.isPending && "opacity-50",
							)}
						>
							<Image
								src={imageSrc}
								layout="fullWidth"
								alt="Image"
								className="object-cover"
							/>
						</div>
						<Button
							disabled={mutation.isPending}
							onClick={onClick}
							className="w-full"
						>
							Remove background
						</Button>
					</div>
				</ScrollArea>
			)}
			<ToolSidebarClose onClick={onClose} />
		</aside>
	);
};
