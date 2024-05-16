"use client";

import Image from "next/image";

import { cn } from "@/src/lib/utils";

interface ComponentProps {
	value: number;
	topText: string;
	disabledValues: (number | undefined)[];
	setValue: (value: number) => void;
}

export default function BlessPicker({
	value,
	setValue,
	topText,
	disabledValues,
}: ComponentProps) {
	return (
		<div className="relative flex w-full flex-row items-center justify-center pt-6">
			<div className="absolute left-2 top-[4px] px-4 text-xs">
				<span className="rounded-full bg-yellow-700 px-2 font-bold">
					{value}
				</span>{" "}
				<span className="rounded-md bg-zinc-700 px-2 text-zinc-300">
					{topText}
				</span>
			</div>
			{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
				let filter = "";

				if (index === value) {
					filter = "";
				} else if (disabledValues.includes(index)) {
					filter =
						"brightness(0) saturate(100%) invert(11%) sepia(100%) saturate(296%) hue-rotate(306deg) brightness(87%) contrast(86%)";
				} else {
					filter = "contrast(50%)";
				}

				return (
					<div
						className={cn(
							index > value ? "grayscale" : "",
							disabledValues.includes(index) ? "grayscale" : "",
						)}
						key={index}
						onClick={() => {
							if (disabledValues.includes(index)) return;

							setValue(index);
						}}
					>
						<Image
							alt="Bless Icon"
							className={cn(
								"unselectable",
								index === value
									? "drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
									: "",
								disabledValues.includes(index) ? "" : "cursor-pointer",
							)}
							height={32}
							src="https://res.cloudinary.com/dl3asnoii/image/upload/v1709327413/kakele.com.br/icons/bless.png"
							style={{
								filter: filter,
							}}
							width={32}
						/>
					</div>
				);
			})}
		</div>
	);
}
