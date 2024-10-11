import React, { createContext, useState, useEffect, useCallback } from 'react';

export const InventoryContext = createContext();

const isPrimeCheck = (num) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
}

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filters, setFilters] = useState({ isEven: false, isOdd: false, isPrime: false, endsWith: '', range: [0, 1000] });

  const addSelectedItem = useCallback(item => {
    setSelectedItems(prevItems => [...prevItems, item]);
  }, []);

  const removeSelectedItem = useCallback(id => {
    setSelectedItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  const applyFilters = useCallback(() => {
    const { isEven, isOdd, isPrime, endsWith, range } = filters;
    if ((isEven || isOdd || isPrime) === false) {
      setFilteredInventory(inventory);
    } else {
      let result = inventory.filter(item => {
        const checkEven = isEven && item.id % 2 === 0;
        const checkOdd = isOdd && item.id % 2 !== 0;
        const checkPrime = isPrime && isPrimeCheck(item.id);
        const endsWithCheck = item.id.toString().endsWith(endsWith);
        const inRange = item.id >= range[0] && item.id <= range[1];

        return inRange && ((((isEven && checkEven) ||
          (isOdd && checkOdd)) ||
          (isPrime && checkPrime)) ||
          (endsWith && endsWithCheck))
      });
      setFilteredInventory(result);
    }
  }, [filters, inventory])


  const loadInventory = useCallback(async () => {
    const ids = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
    const inventoryData = ids.map(id => ({
      id: id,
      images: [
        `https://picsum.photos/id/${id % 1000}/200/300`,
        `https://picsum.photos/id/${(id + 1) % 1000}/200/300`,
        `https://picsum.photos/id/${(id + 2) % 1000}/200/300`
      ]
    }))
    setInventory(inventoryData);
    setFilteredInventory(inventoryData);
  }, []);

  useEffect(() => {
    loadInventory();
  }, [loadInventory]);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <InventoryContext.Provider value={{
      inventory,
      selectedItems,
      filters,
      filteredInventory,
      addSelectedItem,
      removeSelectedItem,
      loadInventory,
      setFilters,
    }}>
      {children}
    </InventoryContext.Provider>
  )
}
