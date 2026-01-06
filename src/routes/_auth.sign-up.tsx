import { createFileRoute } from "@tanstack/react-router";
import { SignUpCard } from "@/features/auth/components/sign-up-card";

export const Route = createFileRoute("/_auth/sign-up")({ component: SignUp });

function SignUp() {
	return <SignUpCard />;
}
