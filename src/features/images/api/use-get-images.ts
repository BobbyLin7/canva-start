import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/react";

export const useGetImages = () => {
	const trpc = useTRPC();

	const query = useQuery(trpc.image.get.queryOptions());

	return query;
};
