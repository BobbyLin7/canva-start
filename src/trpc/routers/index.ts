import { createTRPCRouter } from "../init";
import { aiRouter } from "./ai";
import { imageRouter } from "./image";

export const trpcRouter = createTRPCRouter({
	image: imageRouter,
	ai: aiRouter,
});

export type TRPCRouter = typeof trpcRouter;
