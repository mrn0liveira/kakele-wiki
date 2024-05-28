export interface EquipmentResources {
	copper: number;
	tin: number;
	silver: number;
	iron: number;
	gold: number;
	money: number;
}

export function getEquipmentUpgradeResources(
	value: number,
): EquipmentResources {
	let cost = 10000;
	const resources = {
		copper: 0,
		tin: 0,
		silver: 0,
		iron: 0,
		gold: 0,
		money: 0,
	};

	for (let index = 0; index < value; index += 1) {
		resources.money += cost;

		resources.gold += resources.iron >= 5 ? 5 : 0;
		resources.iron += resources.silver >= 5 ? 5 : 0;
		resources.silver += resources.tin >= 5 ? 5 : 0;
		resources.tin += resources.copper >= 5 ? 5 : 0;
		resources.copper += 5;

		if (index > 0) {
			cost += cost;
		}
	}

	return resources;
}
