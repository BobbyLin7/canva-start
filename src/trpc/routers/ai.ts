import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";
import { replicate } from "@/server/replicate";
import { publicProcedure } from "../init";

export const aiRouter = {
	generateImage: publicProcedure
		.input(
			z.object({
				prompt: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const { prompt } = input;

			const params = {
				cfg: 3.5,
				steps: 28,
				prompt: prompt,
				aspect_ratio: "3:2",
				output_format: "webp",
				output_quality: 90,
				negative_prompt: "",
				prompt_strength: 0.85,
			};

			const output = await replicate.run("black-forest-labs/flux-kontext-pro", {
				input: params,
			});

			const res = output as Array<string>;

			return res[0];
		}),
} satisfies TRPCRouterRecord;
