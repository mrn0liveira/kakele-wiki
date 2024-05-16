"use client";

import type { Blog } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/src/lib/utils";
import { BentoGrid, BlogPostSkeleton } from "@/src/components/home/grid";
import HeroTrailer from "@/src/components/home/hero-trailer";

import "@/src/styles/Text-Animation.scss";
import "@/src/styles/Home-card.css";
import Card from "../components/ui/bordered-card";

interface CardProps {
	title: string;
	description: string;
	image: string;
	href: string;
	bgColor?: string;
}

export const revalidate = 60 * 20;

async function getBlogs() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/api/blog?amount=4`,
	);

	return await res.json();
}

export default function Home() {
	const [blogs, setBlogs] = useState<
		Omit<Blog, "content" | "published" | "createdAt">[]
	>([]);

	const { t } = useTranslation();

	const cards: CardProps[] = [
		{
			title: t("home.cards.coinshub.title"),
			description: t("home.cards.coinshub.description"),
			image:
				"https://res.cloudinary.com/dl3asnoii/image/upload/v1709235385/kakele.com.br/home/shop.png",
			href: "https://coinshub.com.br/affiliate/biridim/",
		},
		{
			title: t("home.cards.blessCalculator.title"),
			description: t("home.cards.blessCalculator.description"),
			image:
				"https://res.cloudinary.com/dl3asnoii/image/upload/v1709235685/kakele.com.br/home/bless.png",
			href: "/tools/bless-calculator",
		},
		{
			title: t("home.cards.setCalculator.title"),
			description: t("home.cards.setCalculator.description"),
			image:
				"https://res.cloudinary.com/dl3asnoii/image/upload/v1709076530/kakele.com.br/home/set-calculator.png",
			href: "/tools/set-calculator",
		},
		{
			title: t("home.cards.tasks.title"),
			description: t("home.cards.tasks.description"),
			image:
				"https://res.cloudinary.com/dl3asnoii/image/upload/v1709076480/kakele.com.br/home/monsters.png",
			href: "/tools/task-calculator",
		},
	];
	useEffect(() => {
		getBlogs().then((data) => setBlogs(data));
	}, []);

	return (
		<div className="flex h-full flex-col items-center justify-center min-w-full">
			<HeroTrailer
				ad={t("home.ad")}
				mobileAd={t("home.mobileAd")}
				subhead={t("home.subhead")}
			/>
			<div className="relative flex flex-row items-center justify-center gap-4">
				<motion.img
					alt=""
					className="unselectable pointer-events-none hidden opacity-30 lg:flex"
					initial={{ opacity: 0, x: -100, rotate: -10 }}
					src="/svg/text-decoration.svg"
					transition={{ duration: 0.5, delay: 0.2 }}
					viewport={{ once: true }}
					whileInView={{ opacity: 1, x: 0, rotate: 0 }}
					width={256}
				/>
				<motion.h2
					className="__className_d6dd13 text-animation text-3xl mb-8 md:mb-0 sm:text-5xl text-center"
					initial={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					viewport={{ once: true }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					{t("home.quickAcess")}
				</motion.h2>
				<motion.img
					alt=""
					className="unselectable pointer-events-none hidden opacity-30 lg:flex"
					initial={{ opacity: 0, x: 100, rotate: 10 }}
					src="/svg/text-decoration.svg"
					transition={{ duration: 0.5, delay: 0.2 }}
					viewport={{ once: true }}
					whileInView={{ opacity: 1, x: 0, rotate: 0 }}
					width={256}
				/>
			</div>
			<motion.div
				className="flex h-auto w-full flex-col gap-2"
				initial={{ opacity: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				viewport={{ once: true }}
				whileInView={{ opacity: 1 }}
			>
				<BentoGrid className="mx-auto text-lg w-full md:auto-rows-auto md:grid-cols-4">
					{cards.map((card) => (
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							key={card.title}
							transition={{ duration: 0.5, delay: 0.2 }}
							viewport={{ once: true }}
							whileInView={{ opacity: 1, y: 0 }}
						>
							<Link href={card.href}>
								<Card
									className={cn(
										card.title === "CoinsHub"
											? "outline outline-offset-2 outline-1 outline-orange-900 hover:outline-orange-500 transition-all delay-75"
											: "",
									)}
								>
									<div className="flex flex-col">
										<span className="line-clamp-1 font-black text-lg">
											{card.title}
										</span>
										<span className="line-clamp-2 text-xs">
											{card.description}
										</span>
									</div>
								</Card>
							</Link>
						</motion.div>
					))}
				</BentoGrid>
			</motion.div>
			<motion.div
				className="mb-20 mt-8 flex h-auto w-full flex-col gap-2 rounded-md border-[1px] border-stone-900 bg-stone-950/50 p-2 transition-all"
				initial={{ opacity: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				viewport={{ once: true }}
				whileInView={{ opacity: 1 }}
			>
				{blogs.length === 0 ? (
					<>
						{Array(2)
							.fill(0)
							.map((_, index) => (
								<motion.div
									initial={{ opacity: 0, y: 30 }}
									key={`skeleton-${index}`}
									transition={{ duration: 0.5, delay: 0.2 }}
									viewport={{ once: true }}
									whileInView={{ opacity: 1, y: 0 }}
								>
									<BlogPostSkeleton className="bg-stone-900/50 p-4 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:shadow-none" />
								</motion.div>
							))}
					</>
				) : (
					<div className="relative flex flex-col gap-2">
						<div className="m-2 gap-2 flex items-center md:items-start justify-center flex-col">
							<span className="text-3xl md:text-xl ml-2">
								{t("blog.title")}
							</span>
							{blogs.map((blog) => (
								<motion.div
									initial={{ opacity: 0 }}
									key={blog.id}
									transition={{ duration: 0.5, delay: 0.2 }}
									viewport={{ once: true }}
									whileInView={{ opacity: 1 }}
								>
									<Link href={`/blog?id=${blog.id}`}>
										<Card
											noPadding
											className="group/effect max-w-max flex flex-col md:flex-row hover:shadow-xl lg:max-h-[18rem]"
										>
											<div className="min-h-full min-w-fit flex flex-row rounded-xl overflow-hidden">
												{blog.imageUrl && (
													<Image
														alt={blog.title}
														className="transition-all w-full min-h-full group-hover/effect:scale-110 md:static"
														height={256}
														src={blog.imageUrl}
														width={256}
													/>
												)}
											</div>
											<div className="relative flex flex-col justify-start overflow-hidden sm:flex-row">
												<div className="flex flex-col text-start lg:ml-12 p-4">
													<span className="text-md line-clamp-1 font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
														{blog.title}
													</span>
													<span className="line-clamp-4 text-xs">
														{blog.description}
													</span>
												</div>
											</div>
										</Card>
									</Link>
								</motion.div>
							))}
						</div>
						<a className="absolute -bottom-4 right-4 p-2 text-xs" href="/blog">
							{t("home.viewAll")}
						</a>
					</div>
				)}
			</motion.div>
		</div>
	);
}
