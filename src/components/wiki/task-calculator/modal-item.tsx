"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { X } from "lucide-react";
import Link from "next/link";

import items from "@/public/kakele-data/items.js";
import monsters from "@/public/kakele-data/monsters.js";
import { Input } from "@/src/components/ui/input";

import type { KakeleTaskItem } from "@/types";

function getItemByName(name: string | undefined) {
	return items.find((item) => item.name === name);
}

function getMonsterByName(name: string | undefined) {
	return monsters.find((monster) => monster.name === name);
}

function getItemSourcesByMonsterName(
	name: string | undefined,
	defaultName: string | undefined,
) {
	return (
		monsters.filter(
			(item) => item.loot.includes(String(name)) && item.name !== defaultName,
		) ?? []
	);
}

function getTaskTotalXpAndGold(
	task: KakeleTaskItem | null,
	amount: number,
	value: number,
) {
	if (!task) return { xp: 0, gold: 0, loss: 0, completed: 0 };

	const totalTasksCount = Math.floor(amount / task.amount);

	const totalXp = totalTasksCount * task.xp;
	const totalGold = totalTasksCount * task.gold;
	const totalLoss = totalGold - amount * value;

	return {
		xp: totalXp,
		gold: totalGold,
		loss: totalLoss,
		completed: totalTasksCount,
	};
}

export const KakeleTaskItemModal = ({
	task,
	isOpen,
	setIsOpen,
	lng = "en",
	t,
}: {
	task: KakeleTaskItem | null;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	lng: string;
	t: (key: string) => string;
}) => {
	const item = getItemByName(task?.target);
	const monster = getMonsterByName(task?.name);

	const itemSources = getItemSourcesByMonsterName(task?.target, monster?.name);

	const [amount, setAmount] = useState(0);
	const [value, setValue] = useState(0);

	const [taskData, setTaskData] = useState({
		xp: 0,
		gold: 0,
		loss: 0,
		completed: 0,
	});

	useEffect(() => {
		setTaskData(getTaskTotalXpAndGold(task, amount, value));
	}, [value, amount, task]);

	return (
		<AnimatePresence>
			{isOpen && task && (
				<motion.div
					animate={{ opacity: 1 }}
					className="no-scrollbar overflow-auto fixed inset-0 h-screen z-[999] grid cursor-pointer place-items-center items-center justify-center overflow-x-hidden overflow-y-scroll bg-black/60 p-8 backdrop-blur-md"
					exit={{ opacity: 0 }}
					initial={{ opacity: 0 }}
				>
					<div className="absolute right-4 top-4">
						<X
							onClick={() => {
								setTaskData({ xp: 0, gold: 0, loss: 0, completed: 0 });
								setAmount(1);
								setValue(0);
								setIsOpen(false);
							}}
							size={24}
						/>
					</div>
					<div className="z-[60] flex flex-col items-center justify-end rounded-lg bg-transparent">
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
								<div className="relative flex flex-col items-center justify-center">
									<Image
										alt={`${task.name} Icon`}
										height={100}
										src={
											new URL(
												`https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/monsters/${task.name}.png`,
											).href
										}
										width={100}
									/>
									<Image
										alt={task.name}
										className="absolute -left-8 -top-8 rounded-full bg-zinc-800"
										height={50}
										src={
											new URL(
												`https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/items/${task.target}.png`,
											).href
										}
										width={50}
									/>
								</div>
								{monster && (
									<div>
										<h3 className="text-md font-bold text-orange-300">
											{/* 
											 // @ts-ignore		 */}
											{monster[`language.${lng}`]}
										</h3>
									</div>
								)}
								{item && (
									<div className="relative flex flex-row">
										<span className="text-xs px-1">
											{task?.amount}
										</span>
										<h3 className="text-2xl font-bold">
											{/* 
											 // @ts-ignore		 */}
											{item[`language.${lng}`]}
										</h3>
									</div>
								)}
								<div className="flex flex-row gap-4 items-center">
									<div className="flex flex-col gap-4 p-4">
										<div className="flex flex-col">
											<h3 className="text-md font-bold text-zinc-300">
												{t("taskCalculator.valueInputTitle")}
											</h3>
											<span className="text-xs">
												{t("taskCalculator.valueInputSubtitle")}
											</span>
										</div>
										<Input
											className="flex w-[8rem] items-center justify-center border-none text-center text-xl font-bold"
											onChange={(e) => setValue(e.target.valueAsNumber)}
											placeholder="0"
											type="number"
											value={value}
										/>
									</div>
									<div className="flex flex-col items-center justify-center gap-4 p-4">
										<div className="flex flex-col">
											<h3 className="text-md font-bold text-zinc-300">
												{t("taskCalculator.amountInputTitle")}
											</h3>
											<span className="text-xs">
												{t("taskCalculator.amountInputSubtitle")}
											</span>
										</div>
										<Input
											className="flex w-[8rem] items-center justify-center border-none text-center text-xl font-bold"
											maxLength={12}
											onChange={(e) => setAmount(e.target.valueAsNumber)}
											placeholder="0"
											type="number"
											value={amount}
										/>
									</div>
								</div>
								<div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
									<div className="flex flex-wrap justify-center gap-2 max-w-[16rem]">
										{itemSources?.map((source) => (
											<div key={source.name}>
												<Image
													alt={`${task.name} Icon`}
													height={46}
													src={
														new URL(
															`https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/monsters/${source.name}.png`,
														).href
													}
													width={46}
												/>
											</div>
										))}
									</div>
									{taskData && (
										<div className="lg:text-md flex flex-col items-start justify-center gap-2 text-xs">
											<span>
												<span className="rounded-md bg-blue-900 px-4 font-bold">
													{t("taskCalculator.completedTasks")}
												</span>{" "}
												<span className="rounded-md bg-blue-950 px-4">
													{new Intl.NumberFormat().format(taskData.completed)}
												</span>
											</span>
											<span>
												<span className="rounded-md bg-green-900 px-4 font-bold">
													{t("taskCalculator.xp")}
												</span>{" "}
												<span className="rounded-md bg-green-950 px-4">
													{new Intl.NumberFormat().format(taskData.xp)}
												</span>
											</span>
											<span>
												<span className="rounded-md bg-yellow-900 px-4 font-bold">
													{t("taskCalculator.gold")}
												</span>{" "}
												<span className="rounded-md bg-yellow-950 px-4">
													{new Intl.NumberFormat().format(taskData.gold)}
												</span>
											</span>
											{taskData.loss < 0 && taskData.completed >= 1 && (
												<span>
													<span className="rounded-md bg-red-900 px-4 font-bold">
														{t("taskCalculator.loss")}
													</span>{" "}
													<span className="rounded-md bg-red-950 px-4">
														{Number.isNaN(taskData.loss)
															? "0"
															: new Intl.NumberFormat().format(taskData.loss)}
													</span>{" "}
													<span className="rounded-md bg-red-950/50 px-4">
														{Number.isNaN((taskData.loss / taskData.gold) * 100)
															? "0"
															: new Intl.NumberFormat().format(
																	Math.floor(
																		(taskData.loss / taskData.gold) * 100,
																	),
																)}{" "}
														%
													</span>
												</span>
											)}
											{taskData.loss > 0 && taskData.completed >= 1 && (
												<span>
													<span className="rounded-md bg-violet-900 px-4 font-bold">
														{t("taskCalculator.profit")}
													</span>{" "}
													<span className="rounded-md bg-violet-950 px-4">
														{Number.isNaN(taskData.loss)
															? "0"
															: new Intl.NumberFormat().format(taskData.loss)}
													</span>{" "}
													<span className="rounded-md bg-violet-950/50 px-4">
														{Number.isNaN((taskData.loss / taskData.gold) * 100)
															? "0"
															: new Intl.NumberFormat().format(
																	Math.floor(
																		(taskData.loss / taskData.gold) * 100,
																	),
																)}{" "}
														%
													</span>
												</span>
											)}
										</div>
									)}
								</div>
							</div>
						</motion.div>
						<motion.div
							animate={{
								opacity: 1,
								y: 0,
							}}
							className="flex absolute top-4 flex-col items-center justify-center gap-4 p-4"
							initial={{
								opacity: 0,
								y: -100,
							}}
							transition={{
								duration: 0.3,
								ease: "easeInOut",
							}}
						>
							<Link
								className="bg-orange-800/80 md:h-6 w-[70vw] lg:w-[40rem] bg-stripe-gradient items-center justify-center flex rounded-xl"
								href="https://coinshub.com.br/affiliate/biridim/"
							>
								<h3 className="text-xs md:text-md p-1">
									<span className="text-orange-300 font-black">CoinsHub</span>{" "}
									<span className="font-sans text-orange-400">
										{t("coinsHub.ad1")}
									</span>
								</h3>
							</Link>
						</motion.div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
