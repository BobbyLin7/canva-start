import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/react";

export function useRemoveBg() {
	const trpc = useTRPC();

	const mutation = useMutation(trpc.ai.removeBg.mutationOptions());

	return mutation;
}
