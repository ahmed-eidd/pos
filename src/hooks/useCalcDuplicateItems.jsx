import { useMemo } from 'react';

export const useCalcDuplicateItems = (items) => {
  const noDupsItems = useMemo(() => {
    if (items?.length <= 1 || !items) return items;
    const foundItems = {};

    for (let i of items) {
      const itemId = i?.itemId;
      const quantity = parseFloat(i?.quantity) || 0;

      if (itemId) {
        if (foundItems[itemId]) {
          foundItems[itemId].quantity += quantity;
        } else {
          foundItems[itemId] = { ...i, quantity }; // Create a copy of the item
        }
      }
    }
    return Object.values(foundItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);
  return noDupsItems;
};
