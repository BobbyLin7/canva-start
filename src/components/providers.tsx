import { Providers as QueryProvider } from "@/components/providers";

export function Providers({ children }: { children: React.ReactNode }) {
	return <QueryProvider>{children}</QueryProvider>;
}
