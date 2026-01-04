import { TRPCError, type TRPCRouterRecord } from "@trpc/server";
import { unsplash } from "@/lib/unsplash";
import { publicProcedure } from "../init";

const DEFAULT_COUNT = 50;
const DEFAULT_COLLECTION_IDS = ["317099"];

export const imageRouter = {
	get: publicProcedure.query(async () => {
		const images = await unsplash.photos.getRandom({
			collectionIds: DEFAULT_COLLECTION_IDS,
			count: DEFAULT_COUNT,
		});

		if (images.errors) {
			throw new TRPCError({
				code: "BAD_GATEWAY",
				message: images.errors[0] || "Something went wrong",
			});
		}

		let response = images.response;

		if (!Array.isArray(response)) {
			response = [response];
		}

		return response;
	}),
} satisfies TRPCRouterRecord;
