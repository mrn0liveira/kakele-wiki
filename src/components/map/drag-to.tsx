"use client";

import { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
	convertToLatitudeLongitude,
	parseCoordinatesToFloatArray,
} from "./map";

export default function MapDragToCoordinates({
	navigateToCoorinates,
}: { navigateToCoorinates: (coordinates: [number, number]) => void }) {
	const [coordinates, setCoordinates] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const onSubmit = () => {
		if (!coordinates || coordinates.length === 0) {
			setError("Coordinates are required");
			return;
		}

		const coords = parseCoordinatesToFloatArray(coordinates);

		if (!coords) {
			setError("Coordinates are invalid");
			return;
		}

		navigateToCoorinates(coords);

		setError(null);
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-col">
				<span>Drag the map</span>
				<span className="text-xs">Enter your coordinates</span>
			</div>
			<Input
				className="h-6 text-center"
				onChange={(e) => setCoordinates(e.target.value)}
				placeholder="0, 0"
				value={coordinates || ""}
			/>
			<Button className="h-6" onClick={onSubmit} type="submit">
				{" "}
				Submit{" "}
			</Button>
			{error && (
				<span className="w-full max-w-full text-center text-xs text-red-500">
					{error}
				</span>
			)}
		</div>
	);
}
