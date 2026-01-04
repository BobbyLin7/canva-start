import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { AlertTriangleIcon, LoaderIcon } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import type { ActiveTool, Editor } from "@/features/editor/types";
import { useGetImages } from "@/features/images/api/use-get-images";
import { UploadButton } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";

interface Props {
	editor?: Editor;
	activeTool: ActiveTool;
	onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ImageSidebar = ({
	editor,
	activeTool,
	onChangeActiveTool,
}: Props) => {
	const { data, isLoading, isError } = useGetImages();

	const onClose = () => {
		onChangeActiveTool("select");
	};

	return (
		<aside
			className={cn(
				"relative z-40 flex h-full w-[360px] flex-col border-r bg-white",
				activeTool === "images" ? "visible" : "hidden",
			)}
		>
			<ToolSidebarHeader
				title="Images"
				description="Add images to your canvas"
			/>
			<div className="border-b p-4">
				<UploadButton
					appearance={{
						button: "w-full text-sm font-medium",
						allowedContent: "hidden",
					}}
					content={{
						button: "Upload Image",
					}}
					endpoint="imageUploader"
					onClientUploadComplete={(res) => {
						editor?.addImage(res[0].ufsUrl);
					}}
				/>
			</div>
			{isLoading && (
				<div className="flex flex-1 items-center justify-center">
					<LoaderIcon className="size-4 animate-spin text-muted-foreground" />
				</div>
			)}
			{isError && (
				<div className="flex flex-1 flex-col items-center justify-center gap-y-4">
					<AlertTriangleIcon className="size-4 text-muted-foreground" />
					<p className="text-muted-foreground text-xs">
						Failed to fetch images
					</p>
				</div>
			)}
			{!isLoading && !isError && (
				<ScrollArea className="min-h-0 flex-1">
					<div className="p-4">
						<div className="grid grid-cols-2 gap-4">
							{data?.map((image) => {
								return (
									<button
										type="button"
										onClick={() => editor?.addImage(image.urls.regular)}
										key={image.id}
										className="group relative h-[100px] w-full overflow-hidden rounded-sm border bg-muted transition hover:opacity-75"
									>
										<Image
											layout="fullWidth"
											src={image.urls.small}
											alt={image.alt_description || "Image"}
											className="object-cover"
										/>
										<Link
											target="_blank"
											to={image.links.html}
											className="absolute bottom-0 left-0 w-full truncate bg-black/50 p-1 text-left text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100"
										>
											{image.user.name}
										</Link>
									</button>
								);
							})}
						</div>
					</div>
				</ScrollArea>
			)}
			<ToolSidebarClose onClick={onClose} />
		</aside>
	);
};
