import { createTRPCRouter } from "../init";
import { imageRouter } from "./image";

export const trpcRouter = createTRPCRouter({
	image: imageRouter,
});
export type TRPCRouter = typeof trpcRouter;
