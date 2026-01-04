import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/react";

export const useGenerateImage = () => {
	const trpc = useTRPC();

	const mutation = useMutation(trpc.ai.generateImage.mutationOptions());

	return mutation;
};
