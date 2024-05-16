import { AnimatePresence, motion } from "framer-motion";
import React, { type ReactNode, useEffect, useState } from "react";

interface ComponentProps {
	children: ReactNode;
	trigger: ReactNode;
}

export const NewHoverTabs = ({ children, trigger }: ComponentProps) => {
	const [selected, setSelected] = useState<boolean>(false);

	return (
		<div
			className="relative flex h-fit w-fit gap-2"
			onClick={() => setSelected(!selected)}
			onKeyDown={() => setSelected(!selected)}
			onMouseEnter={() => setSelected(true)}
			onMouseLeave={() => setSelected(false)}
		>
			<div
				onClick={() => setSelected(true)}
				onKeyDown={() => setSelected(true)}
			>
				{trigger}
			</div>
			<AnimatePresence>{selected && children}</AnimatePresence>
		</div>
	);
};
