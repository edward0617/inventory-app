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

  const moveCard = useCallback((from, to) => {
    setSelectedItems(prevItems => {
      const newItems = [...prevItems];
      const draggedItem = newItems[from];
      newItems.splice(from, 1);
      newItems.splice(to, 0, draggedItem);
      return newItems;
    })
  }, []);

  const removeSelectedItem = useCallback(id => {
    setSelectedItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  const applyFilters = useCallback(() => {
    const { isEven, isOdd, isPrime, endsWith, range } = filters;
    let result = inventory.filter(item => {
      const id = item.id;
      const checkEven = isEven ? id % 2 === 0 : true;
      const checkOdd = isOdd ? id % 2 !== 0 : true;;
      const checkPrime = isPrime ? isPrimeCheck(id) : true;
      const endsWithCheck = endsWith ? id.toString().endsWith(endsWith) : true;
      const inRange = id >= range[0] && id <= range[1];

      return checkEven && checkOdd && checkPrime && endsWithCheck && inRange;
    });
    setFilteredInventory(result);
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
      moveCard,
      addSelectedItem,
      removeSelectedItem,
      loadInventory,
      setFilters,
    }}>
      {children}
    </InventoryContext.Provider>
  )
}
