import items from "../items";

export function cloneObj(original) {
  if (typeof original !== "object" || original === null) {
    return original;
  }

  const copy = Array.isArray(original) ? [] : {};

  for (const key in original) {
    if (Object.prototype.hasOwnProperty.call(original, key)) {
      copy[key] = cloneObj(original[key]);
    }
  }

  return copy;
}

export function getBless(string, number, ignoredItems) {
  const itemCount = {
    warlordGold: 0,
    gold: 0,
    inventory: {},
  };

  function getBlessItems(item, value) {
    if (value <= 0 || item.bless === 0) {
      return [];
    }

    const blessItems = items.filter(
      (x) =>
        x.rarity === item.rarity &&
        x.level >= Math.floor(item.level / 2) &&
        x.slot === item.slot &&
        !ignoredItems.includes(x.id.toString()),
    );

    if (blessItems.length === 0) {
      return [item];
    }

    if (!itemCount.inventory[item.name]) {
      itemCount.inventory[item.name] = {
        count: 1,
      };
    } else {
      itemCount.inventory[item.name].count += 1;
    }

    const sortedItems = blessItems.sort(
      (a, b) => a.level - b.level || a.value - b.value,
    );

    if (item.rarity !== "Legendary") itemCount.gold += item.value * 4;

    const result = Array.from({ length: value }, (_, i) => {
      const clone = cloneObj(sortedItems[0]);
      clone.bless = i;
      clone.items = getBlessItems(sortedItems[0], i);
      return clone;
    });

    return result;
  }

  const targetItem = items.find((x) => x.name === string);

  if (targetItem.rarity === "Legendary") {
    const rarities = ["Common", "Uncommon", "Rare", "Legendary"];

    for (let index = 0; index < number; index++) {
      if (index === 0) {
        itemCount.warlordGold += 100_000_000;
      } else {
        itemCount.warlordGold += itemCount.warlordGold;
      }

      for (const rarity of rarities) {
        const item = items.find(
          (x) =>
            x.rarity === rarity &&
            x.level >= targetItem.level / 2 &&
            x.slot === targetItem.slot,
        );

        getBlessItems(item, number);
      }
    }
  } else {
    getBlessItems(targetItem, number + 1);

    if (itemCount.inventory[targetItem.name].count > 1) {
      itemCount.inventory[targetItem.name].count -= 1;
    } else {
      delete itemCount.inventory[targetItem.name];
    }
  }

  itemCount.gold += itemCount.warlordGold;

  if (targetItem.rarity === "Legendary") {
    itemCount.inventory = Object.fromEntries(
      Object.entries(itemCount.inventory).sort(
        (a, b) => b[1].count - a[1].count,
      ),
    );
  }

  return itemCount;
}
