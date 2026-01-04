import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useGenerateImage } from "@/features/ai/api/use-generate-image";
import { cn } from "@/lib/utils";
import type { ActiveTool, Editor } from "../types";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ToolSidebarHeader } from "./tool-sidebar-header";

interface Props {
	editor?: Editor;
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
}

export const AiSidebar = ({
	editor,
	activeTool,
	onChangeActiveTool,
}: Props) => {
	const [value, setValue] = useState("");

	const mutation = useGenerateImage();

	const onClose = () => {
		onChangeActiveTool("select");
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		mutation.mutate(
			{ prompt: value },
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
				activeTool === "ai" ? "visible" : "hidden",
			)}
		>
			<ToolSidebarHeader title="AI" description="Generate an image using AI" />
			<ScrollArea>
				<form onSubmit={onSubmit} className="space-y-6 p-4">
					<Textarea
						disabled={mutation.isPending}
						placeholder="An astronaut riding a horse on mars, hd, dramatic lighting"
						cols={30}
						rows={10}
						required
						minLength={3}
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
					<Button
						disabled={mutation.isPending}
						type="submit"
						className="w-full"
					>
						Generate
					</Button>
				</form>
			</ScrollArea>
			<ToolSidebarClose onClick={onClose} />
		</aside>
	);
};
