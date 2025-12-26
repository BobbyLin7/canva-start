import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";

export const Logo = () => {
	return (
		<Link to="/">
			<div className="relative size-8 shrink-0">
				<Image
					src="/logo.svg"
					alt="CnvAI"
					layout="fullWidth"
					className="shrink-0 transition hover:opacity-75"
				/>
			</div>
		</Link>
	);
};
