
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";

import { cn } from "@/src/lib/utils";

import type { KakeleEquipmentItems, KakeleWeaponItems } from "@/types";

function getRarityTextColor(rarity: string) {
	switch (rarity) {
		case "Common":
			return "text-[#adaaaa]";
		case "Uncommon":
			return "text-[#378eb0]";
		case "Rare":
			return "text-[#b09437]";
		case "Legendary":
			return "text-[#b03f37]";
		default:
			return "text-[#adaaaa]";
	}
}

function getEnergyTextColor(energy: string) {
	switch (energy) {
		case "Dark":
			return "text-[#bf6152]";
		case "Light":
			return "text-[#bfad52]";
		case "Nature":
			return "text-[#68bf52]";
		default:
			return "text-[#adaaaa]";
	}
}

export const KakeleItemModal = ({
	item,
	isOpen,
	setIsOpen,
	lng = "en",
	t,
}: {
	item: KakeleEquipmentItems | KakeleWeaponItems | null;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	lng: string;
	t: (key: string) => string;
}) => {
	return (
		<AnimatePresence>
			{isOpen && item && (
				<motion.div
					animate={{ opacity: 1 }}
					className="no-scrollbar fixed inset-0 z-[999] grid cursor-pointer place-items-center overflow-y-scroll bg-black/60 p-8 backdrop-blur-md"
					exit={{ opacity: 0 }}
					initial={{ opacity: 0 }}
					onClick={() => setIsOpen(false)}
				>
					<div className="z-[60] flex flex-col justify-end rounded-lg bg-transparent">
						<motion.div
							animate={{
								opacity: 1,
								y: 0,
							}}
							className="z-[70] flex items-center justify-center px-8 pb-4"
							initial={{
								opacity: 0,
								y: 100,
							}}
							transition={{
								duration: 0.3,
								ease: "easeInOut",
							}}
						>
							<div className="relative flex h-full w-full flex-col items-center justify-center rounded-md p-2 px-8">
								<div className="absolute -top-48 w-fit text-nowrap text-center text-3xl font-bold">
									<span className="text-xs font-bold">
										<span className={cn(getEnergyTextColor(item.energy))}>
											{item.energy}
										</span>{" "}
										<span className={cn(getRarityTextColor(item.rarity))}>
											{item.rarity}
										</span>{" "}
										<span>{item.type}</span>
									</span>
									<h3 className="text-md text-center font-bold lg:text-lg">
										{item.name}
									</h3>
								</div>
								<Image
									alt={item.name}
									className="absolute -top-32 h-32 w-32 rounded-full bg-black"
									height={256}
									src={
										new URL(
											`https://res.cloudinary.com/dl3asnoii/image/upload/v1701261342/sprites/items/${item.name.replaceAll(
												"'",
												"",
											)}.png`,
										).href
									}
									width={256}
								/>
								<div className="absolute -top-12 flex items-center justify-center gap-8">
									<div className="flex flex-col items-center justify-center">
										<Image
											alt="Magic Icon"
											className="h-12 w-12 rounded-full bg-zinc-800/40"
											height={64}
											src={
												"https://res.cloudinary.com/dl3asnoii/image/upload/v1709322199/kakele.com.br/icons/attack.png"
											}
											width={64}
										/>
										<span className="text-start text-sm">Attack</span>
										<span
											className={cn(
												item.stats.attack < 0 ? "text-red-500" : "text-white",
												"font-black",
											)}
										>
											{item.stats.attack}
										</span>
									</div>
									<div className="mt-8 flex flex-col items-center justify-center">
										<Image
											alt="Magic Icon"
											className="h-12 w-12 rounded-full bg-zinc-800/40"
											height={64}
											src={
												"https://res.cloudinary.com/dl3asnoii/image/upload/v1709322199/kakele.com.br/icons/magic.png"
											}
											width={64}
										/>
										<span className="text-start text-sm">Magic</span>
										<span
											className={cn(
												item.stats.magic < 0 ? "text-red-500" : "text-white",
												"font-black",
											)}
										>
											{item.stats.magic}
										</span>
									</div>
									<div className="flex flex-col items-center justify-center">
										<Image
											alt="Magic Icon"
											className="h-12 w-12 rounded-full bg-zinc-800/40"
											height={64}
											src={
												"https://res.cloudinary.com/dl3asnoii/image/upload/v1709322199/kakele.com.br/icons/armor.png"
											}
											width={64}
										/>
										<span className="text-start text-sm">Armor</span>
										<span
											className={cn(
												item.stats.armor < 0 ? "text-red-500" : "text-white",
												"font-black",
											)}
										>
											{item.stats.armor}
										</span>
									</div>
								</div>
								<div className="mt-28 flex flex-col items-center justify-center gap-4">
									<div className="relative flex items-center justify-center rounded-md bg-blue-900/50 p-2 px-4">
										{Intl.NumberFormat().format(item.level)}
										<span className="absolute -top-2 text-xs">
											{t("level")}
										</span>
									</div>
									<div className="relative flex items-center justify-center rounded-md bg-yellow-900/50 p-2 px-4">
										{Intl.NumberFormat().format(item.value)}
										<span className="absolute -top-2 text-xs">
											{t("value")}
										</span>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
