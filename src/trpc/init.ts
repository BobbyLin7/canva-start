import { initTRPC, TRPCError } from "@trpc/server";

import superjson from "superjson";
import { auth } from "@/server/auth";

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

export const createTRPCContext = async (opts: { headers: Headers }) => {
	const authSession = await auth.api.getSession({
		headers: opts.headers,
	});

	const source = opts.headers.get("x-trpc-source") ?? "unknown";
	console.log(">>> tRPC Request from", source, "by", authSession?.user.email);

	return {
		session: authSession,
	};
};

const t = initTRPC.context<Context>().create({
	transformer: superjson,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
	if (!ctx.session) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}
	return next({
		ctx: {
			session: ctx.session,
		},
	});
});
