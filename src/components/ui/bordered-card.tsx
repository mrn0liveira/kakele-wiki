import clsx from "clsx";
import Halo from "@/src/components/ui/halo";

export default function Card({
	children,
	className,
	disableHalo,
	noPadding,
}: {
	children: React.ReactNode;
	className: string;
	disableHalo?: boolean;
	noPadding?: boolean;
}) {
	return (
		<Halo
			strength={disableHalo ? 0 : 5}
			className={clsx(
				"h-full w-full overflow-clip rounded-xl border border-stone-800 bg-stone-900 text-sm",
				className,
				noPadding ? "p-0" : "p-4 md:p-6",
			)}
		>
			{children}
		</Halo>
	);
}
