import { createFileRoute } from "@tanstack/react-router";
import { SignInCard } from "@/features/auth/components/sign-in-card";

export const Route = createFileRoute("/_auth/sign-in")({ component: SignIn });

function SignIn() {
	return <SignInCard />;
}
