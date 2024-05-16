import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useEffect, useState } from "react";
import { FiCheckSquare, FiX } from "react-icons/fi";

const NOTIFICATION_TTL = 5000;

export const Notification = ({
	text,
	id,
	removeNotif,
	children,
}: NotificationType & { removeNotif: Function } & {
	children?: React.ReactNode;
}) => {
	useEffect(() => {
		const timeoutRef = setTimeout(() => {
			removeNotif(id);
		}, NOTIFICATION_TTL);

		return () => clearTimeout(timeoutRef);
	}, []);

	return (
		<motion.div
			animate={{ y: 0, scale: 1 }}
			className={
				"pointer-events-auto z-[999] flex items-start gap-2 rounded bg-indigo-500 p-2 text-xs font-medium text-white shadow-lg"
			}
			exit={{ x: "100%", opacity: 0 }}
			initial={{ y: -15, scale: 0.95 }}
			layout
			transition={{ duration: 0.35, ease: "easeOut" }}
		>
			{children}
		</motion.div>
	);
};

export type NotificationType = {
	id: number;
	text: string;
	color?: string;
};
