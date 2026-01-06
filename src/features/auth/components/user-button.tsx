import { useNavigate } from "@tanstack/react-router";
import { CreditCardIcon, LoaderIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

export const UserButton = () => {
	const { isPending, data: session } = authClient.useSession();

	const navigate = useNavigate();

	const handleSignOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					navigate({
						to: "/sign-in",
					});
				},
			},
		});
	};

	if (isPending) {
		return <LoaderIcon className="size-4 animate-spin text-muted-foreground" />;
	}

	if (!session) {
		return null;
	}

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger className="relative outline-none">
				{/* {!shouldBlock && !isLoading && (
          <div className="absolute -left-1 -top-1 z-10 flex items-center justify-center">
            <div className="flex items-center justify-center rounded-full bg-white p-1 drop-shadow-sm">
              <Crown className="size-3 fill-yellow-500 text-yellow-500" />
            </div>
          </div>
        )} */}
				<Avatar className="hover:opcaity-75 size-10 transition">
					<AvatarImage alt={session.user.name} src={session.user.image || ""} />
					<AvatarFallback className="flex items-center justify-center bg-blue-500 font-medium text-white">
						{session.user.name.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-60">
				<DropdownMenuItem
					// disabled={mutation.isPending}
					// onClick={onClick}
					className="h-10"
				>
					<CreditCardIcon className="mr-2 size-4" />
					Billing
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="h-10" onClick={handleSignOut}>
					<LogOutIcon className="mr-2 size-4" />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
