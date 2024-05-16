import type { KakeleEquipmentItems, KakeleWeaponItems } from "@/types/index";
import items from "../items.js";

type KakeleSetItem = KakeleEquipmentItems | KakeleWeaponItems;

export function getBestItemsForLevel({
	level,
	vocation,
	energy,
	includeExpensiveItems = false,
	attribute,
	ignore = [],
}: {
	level: number;
	vocation: string;
	energy?: string;
	includeExpensiveItems: boolean;
	attribute: "attack" | "magic" | "armor";
	ignore?: number[];
}) {
	const filteredItems =
		(items.filter(
			(item) =>
				Number(item.level ?? 0) <= level &&
				(includeExpensiveItems ? !item.expensive : true) &&
				item.stats &&
				[vocation, "All"].includes(item.vocation) &&
				!ignore.includes(item.id),
		) as KakeleEquipmentItems[]) || [];

	const result: Record<string, KakeleSetItem> = {};

	const equipmentSlots = [
		"Necklace",
		"Helmet",
		"Ring",
		"Primary Hand",
		"Armor",
		"Legs",
		"Boots",
		"Tool",
	];

	if (!["Hunter", "Berserker"].includes(vocation)) {
		equipmentSlots.push("Secondary Hand");
	}

	const desirableItems = filteredItems.sort(
		(a, b) =>
			b.stats?.[attribute] - a.stats?.[attribute] ||
			b.stats.attack - a.stats.attack ||
			b.stats.armor - a.stats.armor ||
			b.level - a.level,
	);

	const energyItems = desirableItems.filter((item) => {
		if (equipmentSlots.includes(item.slot) && item.energy === energy) {
			return true;
		}

		return false;
	});

	let energyCount = 0;

	for (const item of energyItems) {
		if (!result[item.slot.toLowerCase().replace(" ", "_")]) {
			result[item.slot.toLowerCase().replace(" ", "_")] = item;
			energyCount += 1;
		}
	}

	if (energyCount > 5) {
		const newEnergyItems: { difference: number; item: KakeleSetItem }[] = [];

		for (const key of Object.keys(result)) {
			const currentItem = result[key];

			const bestItem = desirableItems.find(
				(item) =>
					item.slot === currentItem.slot &&
					item.name !== currentItem.name &&
					item.energy === energy,
			);

			if (
				bestItem &&
				bestItem.stats[attribute] > currentItem.stats[attribute]
			) {
				newEnergyItems.push({
					difference: bestItem.stats[attribute] - currentItem.stats[attribute],
					item: bestItem,
				});
			}
		}

		newEnergyItems.sort((a, b) => b.difference - a.difference);

		let count = energyCount - 5;

		for (let index = 0; index < newEnergyItems.length; index++) {
			if (count <= 0) {
				break;
			}
			result[newEnergyItems[index].item.slot.toLowerCase().replace(" ", "_")] =
				newEnergyItems[index].item;
			count -= 1;
		}
	}

	for (const slot of equipmentSlots) {
		if (!result[slot.toLowerCase().replace(" ", "_")]) {
			const anyItem = desirableItems
				.filter(
					(item) => equipmentSlots.includes(item.slot) && item.slot === slot,
				)
				.find((item) => !energyItems.includes(item));
			if (anyItem) {
				result[slot.toLowerCase().replace(" ", "_")] = anyItem;
			}
		}
	}

	return result;
}
