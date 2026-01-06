import { createFileRoute } from "@tanstack/react-router";

import { Editor } from "@/features/editor/components/editor";
import { authMiddleware } from "@/middleware/auth";

export const Route = createFileRoute("/editor/$projectId")({
	component: Page,
	server: {
		middleware: [authMiddleware],
	},
});

function Page() {
	return <Editor />;
}
