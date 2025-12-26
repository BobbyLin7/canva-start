import { createFileRoute } from "@tanstack/react-router";
import { Editor } from "@/features/editor/components/editor";

export const Route = createFileRoute("/editor/$projectId")({
	component: Page,
});

function Page() {
	return <Editor />;
}
