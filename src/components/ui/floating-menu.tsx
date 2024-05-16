import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const FlyoutLink = ({
	children,
	href,
	FlyoutContent,
}: {
	children: React.ReactNode;
	href: string;
	FlyoutContent?: React.ElementType;
}) => {
	const [open, setOpen] = useState(false);

	const showFlyout = FlyoutContent && open;

	return (
		<div
			className="relative flex items-center justify-center"
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			<a className="relative text-white" href={href}>
				{children}
				<span
					className="absolute -bottom-2 -left-2 -right-2 h-[2px] origin-left scale-x-0 rounded-full bg-orange-300 transition-transform duration-300 ease-out"
					style={{
						transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
					}}
				/>
			</a>
			<AnimatePresence>
				{showFlyout && (
					<motion.div
						animate={{ opacity: 1, y: 0 }}
						className="absolute left-1/2 top-12 bg-orange-500"
						exit={{ opacity: 0, y: 15 }}
						initial={{ opacity: 0, y: 15 }}
						style={{ translateX: "-50%" }}
						transition={{ duration: 0.3, ease: "easeOut" }}
					>
						<div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
						<div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-orange-500" />
						<FlyoutContent />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
