"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/src/components/ui/badge";
import {
	Command,
	CommandGroup,
	CommandItem,
} from "@/src/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

import { $Enums } from "@prisma/client";

export function InterestSelect() {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [open, setOpen] = React.useState(false);
	const [selected, setSelected] = React.useState<
		Array<$Enums.TypeInterest | null>
	>([]);
	const [inputValue, setInputValue] = React.useState("");

	const handleUnselect = React.useCallback((interest: $Enums.TypeInterest) => {
		console.log(interest);
		setSelected((prev) => prev.filter((s) => s !== interest));
	}, []);

	const handleKeyDown = React.useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current;
			if (input) {
				if (e.key === "Delete" || e.key === "Backspace") {
					if (input.value === "") {
						setSelected((prev) => {
							const newSelected = [...prev];
							newSelected.pop();
							return newSelected;
						});
					}
				}
				if (e.key === "Escape") {
					input.blur();
				}
			}
		},
		[],
	);

	const selectables = Object.keys($Enums.TypeInterest).map((key) => {
		return {
			label: $Enums.TypeInterest[key as keyof typeof $Enums.TypeInterest],
			value: key,
		};
	});

	return (
		<Command
			onKeyDown={handleKeyDown}
			className="overflow-visible bg-transparent"
		>
			{JSON.stringify(selected)}
			<div className="group flex h-6 items-center justify-start rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
				<div className="flex w-full flex-wrap gap-1">
					{selected?.map((interest) => {
						return (
							<Badge key={interest} variant="secondary">
								{interest}
								<button
									className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
									onClick={() => handleUnselect(interest)}
								>
									<X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
								</button>
							</Badge>
						);
					})}
					{/* Avoid having the "Search" Icon */}
					<CommandPrimitive.Input
						ref={inputRef}
						value={inputValue}
						onValueChange={setInputValue}
						onBlur={() => setOpen(false)}
						onFocus={() => setOpen(true)}
						placeholder="Select an interest"
						className="w-full flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
					/>
				</div>
			</div>
			<div className="relative mt-2">
				{open && selectables.length > 0 ? (
					<div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
						<CommandGroup className="h-full overflow-auto">
							{selectables.map((interest) => {
								return (
									<CommandItem
										key={interest}
										onSelect={(value) => {
											setInputValue("");
											setSelected((prev) => [...prev, value]);
										}}
										className={"cursor-pointer"}
									>
										{interest.label}
									</CommandItem>
								);
							})}
						</CommandGroup>
					</div>
				) : null}
			</div>
		</Command>
	);
}
