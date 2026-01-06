import { Link, useNavigate } from "@tanstack/react-router";
import { TriangleAlertIcon } from "lucide-react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";

export const SignInCard = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState<string | null>(null);

	const onCredentialSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await authClient.signIn.email(
			{
				email: email,
				password: password,
				callbackURL: "/",
			},
			{
				onError: (ctx) => {
					setError(ctx.error.message);
				},
				onSuccess: () => {
					navigate({ to: "/" });
					setError(null);
				},
			},
		);
	};

	const onProviderSignIn = async (provider: "github" | "google") => {
		await authClient.signIn.social(
			{
				provider,
				callbackURL: "/",
			},
			{
				onError: (ctx) => {
					setError(ctx.error.message);
				},
				onSuccess: () => {
					navigate({ to: "/" });
					setError(null);
				},
			},
		);
	};

	return (
		<Card className="h-full w-full p-8">
			<CardHeader className="px-0 pt-0">
				<CardTitle>Login to continue</CardTitle>
				<CardDescription>
					Use your email or another service to continue
				</CardDescription>
			</CardHeader>
			{!!error && (
				<div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-destructive text-sm">
					<TriangleAlertIcon className="size-4" />
					<p>Invalid email or password</p>
				</div>
			)}
			<CardContent className="space-y-5 px-0 pb-0">
				<form onSubmit={onCredentialSignIn} className="space-y-2.5">
					<Input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						type="email"
						required
					/>
					<Input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						type="password"
						required
					/>
					<Button type="submit" className="w-full" size="lg">
						Continue
					</Button>
				</form>
				<Separator />
				<div className="flex flex-col gap-y-2.5">
					<Button
						onClick={() => onProviderSignIn("google")}
						variant="outline"
						size="lg"
						className="relative w-full"
					>
						<FcGoogle className="absolute top-2.5 left-2.5 mr-2 size-5" />
						Continue with Google
					</Button>
					<Button
						onClick={() => onProviderSignIn("github")}
						variant="outline"
						size="lg"
						className="relative w-full"
					>
						<FaGithub className="absolute top-2.5 left-2.5 mr-2 size-5" />
						Continue with Github
					</Button>
				</div>
				<p className="text-muted-foreground text-xs">
					Don&apos;t have an account?{" "}
					<Link to="/sign-up">
						<span className="text-sky-700 hover:underline">Sign up</span>
					</Link>
				</p>
			</CardContent>
		</Card>
	);
};
