import { cn } from "@/src/lib/utils";

interface HeaderProps {
	title: string;
	description: string;
}

export function Header({ title, description }: HeaderProps) {
	return (
		<div className="flex w-full flex-col items-center gap-y-4">
			<h1 className={cn("text-center text-xl font-semibold md:text-2xl")}>
				{title}
			</h1>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	);
}
