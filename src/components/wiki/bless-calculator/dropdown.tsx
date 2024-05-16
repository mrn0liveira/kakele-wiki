"use client";

import { Command as CommandPrimitive } from "cmdk";
import { type KeyboardEvent, useCallback, useRef, useState } from "react";
import { Check } from "lucide-react";

import { cn } from "@/src/lib/utils";
import {
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/src/components/ui/command";

export type Option = Record<"value" | "label" | "id", string> &
	Record<string, string>;

type AutoCompleteProps = {
	options: Option[];
	emptyMessage: string;
	value?: Option;
	onValueChange?: (value: Option) => void;
	isLoading?: boolean;
	disabled?: boolean;
	placeholder?: string;
};

export const AutoComplete = ({
	options,
	placeholder,
	emptyMessage,
	value,
	onValueChange,
	disabled,
	isLoading = false,
}: AutoCompleteProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [isOpen, setOpen] = useState(false);
	const [selected, setSelected] = useState<Option>(value as Option);
	const [inputValue, setInputValue] = useState<string>(value?.label || "");

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current;
			if (!input) {
				return;
			}

			// Keep the options displayed when the user is typing
			if (!isOpen) {
				setOpen(true);
			}

			// This is not a default behaviour of the <input /> field
			if (event.key === "Enter" && input.value !== "") {
				const optionToSelect = options.find(
					(option) => option.label === input.value,
				);
				if (optionToSelect) {
					setSelected(optionToSelect);
					onValueChange?.(optionToSelect);
				}
			}

			if (event.key === "Escape") {
				input.blur();
			}
		},
		[isOpen, options, onValueChange],
	);

	const handleBlur = useCallback(() => {
		setOpen(false);
		setInputValue(selected?.label);
	}, [selected]);

	const handleSelectOption = useCallback(
		(selectedOption: Option) => {
			setInputValue(selectedOption.label);

			setSelected(selectedOption);
			onValueChange?.(selectedOption);

			// This is a hack to prevent the input from being focused after the user selects an option
			// We can call this hack: "The next tick"
			setTimeout(() => {
				inputRef?.current?.blur();
			}, 0);
		},
		[onValueChange],
	);

	return (
		<CommandPrimitive onKeyDown={handleKeyDown}>
			<div className="mx-16">
				<CommandInput
					className="flex flex-col items-center justify-center text-center text-base"
					disabled={disabled}
					onBlur={handleBlur}
					onFocus={() => setOpen(true)}
					onValueChange={isLoading ? undefined : setInputValue}
					placeholder={placeholder}
					ref={inputRef}
					value={inputValue}
				/>
			</div>
			<div className="relative mt-1 w-screen max-w-[90vw] md:max-w-[30rem]">
				{isOpen ? (
					<div className="absolute top-0 z-50 w-full max-w-[90vw] rounded-xl bg-zinc-900 outline-none animate-in fade-in-0 zoom-in-95">
						<CommandList className="no-scrollbar z-50 overflow-y-scroll rounded-lg ring-1 ring-orange-800">
							{options.length > 0 ? (
								<CommandGroup>
									{options.map((option) => {
										const isSelected = selected?.value === option.value;
										return (
											<CommandItem
												className={cn(
													"flex w-full items-center gap-2",
													!isSelected ? "pl-8" : null,
												)}
												key={option.value}
												onMouseDown={(event: any) => {
													event.preventDefault();
													event.stopPropagation();
												}}
												onSelect={() => handleSelectOption(option)}
												value={option.label}
											>
												{isSelected ? <Check className="w-4" /> : null}
												{option.label}
											</CommandItem>
										);
									})}
								</CommandGroup>
							) : null}
							{!isLoading ? (
								<CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
									{emptyMessage}
								</CommandPrimitive.Empty>
							) : null}
						</CommandList>
					</div>
				) : null}
			</div>
		</CommandPrimitive>
	);
};
