export function parseCoordinatesToFloatArray(
	coordinates: string | [string, string],
): [number, number] | null {
	if (!coordinates) return null;

	if (typeof coordinates === "string") {
		const [x, y] = coordinates.split(",");

		//@ts-ignore
		if (isNaN(x) || isNaN(y)) return null;

		return [Number.parseFloat(x), Number.parseFloat(y)];
	}

	if (Array.isArray(coordinates)) {
		const [x, y] = coordinates;

		//@ts-ignore
		if (isNaN(x) || isNaN(y)) return null;

		return [Number.parseFloat(x), Number.parseFloat(y)];
	}

	return null;
}

export function convertToLatitudeLongitude({
	x,
	y,
}: { x: number; y: number }): [number, number] {
	// Fatores de escala
	const fatorEscalaX = 0.082;
	const fatorEscalaY = -0.084;

	// Deslocamento
	const deslocamentoX = -66.2;
	const deslocamentoY = 35.0;

	// Convertendo coordenadas
	const latitude = x * fatorEscalaX + deslocamentoX;
	const longitude = y * fatorEscalaY + deslocamentoY;

	return [Number(latitude.toFixed(2)), Number(longitude.toFixed(2))];
}
