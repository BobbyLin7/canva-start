import {
	ChevronDownIcon,
	DownloadIcon,
	LoaderIcon,
	MousePointerClickIcon,
	Redo2Icon,
	Undo2Icon,
} from "lucide-react";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export const Navbar = () => {
	return (
		<nav className="flex h-[68px] w-full items-center gap-x-8 border-b p-4 lg:pl-[34px]">
			<Logo />
			<div className="flex size-full items-center gap-x-1">
				<DropdownMenu modal={false}>
					<DropdownMenuTrigger asChild>
						<Button size="sm" variant="ghost">
							File
							<ChevronDownIcon className="ml-2 size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start" className="min-w-60">
						<DropdownMenuItem className="flex items-center gap-x-2">
							<CiFileOn className="size-8" />
							<div>
								<p>Open</p>
								<p className="text-muted-foreground text-xs">
									Open a JSON file
								</p>
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<Separator orientation="vertical" className="mx-2" />
				<Hint label="Select" side="bottom" sideOffset={10}>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => {}}
						className={cn("")}
					>
						<MousePointerClickIcon className="size-4" />
					</Button>
				</Hint>
				<Hint label="Undo" side="bottom" sideOffset={10}>
					<Button
						disabled={false}
						variant="ghost"
						size="icon"
						onClick={() => {}}
					>
						<Undo2Icon className="size-4" />
					</Button>
				</Hint>
				<Hint label="Redo" side="bottom" sideOffset={10}>
					<Button
						disabled={false}
						variant="ghost"
						size="icon"
						onClick={() => {}}
					>
						<Redo2Icon className="size-4" />
					</Button>
				</Hint>
				<Separator orientation="vertical" className="mx-2" />
				<div className="flex items-center gap-x-2">
					<LoaderIcon className="size-4 animate-spin text-muted-foreground" />
					<div className="text-muted-foreground text-xs">Saving...</div>
				</div>
				<div className="flex items-center gap-x-2">
					<BsCloudSlash className="size-[20px] text-muted-foreground" />
					<div className="text-muted-foreground text-xs">Failed to save</div>
				</div>
				<div className="flex items-center gap-x-2">
					<BsCloudCheck className="size-[20px] text-muted-foreground" />
					<div className="text-muted-foreground text-xs">Saved</div>
				</div>
				<div className="ml-auto flex items-center gap-x-4">
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger asChild>
							<Button size="sm" variant="ghost">
								Export
								<DownloadIcon className="ml-4 size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="min-w-60">
							<DropdownMenuItem
								className="flex items-center gap-x-2"
								onClick={() => {}}
							>
								<CiFileOn className="size-8" />
								<div>
									<p>JSON</p>
									<p className="text-muted-foreground text-xs">
										Save for later editing
									</p>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="flex items-center gap-x-2"
								onClick={() => {}}
							>
								<CiFileOn className="size-8" />
								<div>
									<p>PNG</p>
									<p className="text-muted-foreground text-xs">
										Best for sharing on the web
									</p>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="flex items-center gap-x-2"
								onClick={() => {}}
							>
								<CiFileOn className="size-8" />
								<div>
									<p>JPG</p>
									<p className="text-muted-foreground text-xs">
										Best for printing
									</p>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="flex items-center gap-x-2"
								onClick={() => {}}
							>
								<CiFileOn className="size-8" />
								<div>
									<p>SVG</p>
									<p className="text-muted-foreground text-xs">
										Best for editing in vector software
									</p>
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</nav>
	);
};
