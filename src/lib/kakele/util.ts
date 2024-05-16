export function getRarityTextColor(rarity: string) {
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

export function getEnergyTextColor(energy: string) {
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
