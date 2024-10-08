import React, { createContext, useState, useEffect, useCallback } from 'react';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filters, setFilters] = useState({ isEven: false, isOdd: false });

  const addSelectedItem = useCallback(item => {
    setSelectedItems(prevItems => [...prevItems, item]);
  }, []);

  const removeSelectedItem = useCallback(id => {
    setSelectedItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  const applyFilters = useCallback(() => {
    const { isEven, isOdd } = filters;
    const filteredInventory = inventory.filter(item => {
      if (isEven && item.id % 2 === 0) return true;
      if (isOdd && item.id % 2 !== 0) return true;
      return false;
    })

    setFilteredInventory(filteredInventory);
  }, [filters, inventory])

  const loadInventory = useCallback(async () => {
    const ids = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
    const inventoryData = ids.map(id => ({
      id,
      image: `https://picsum.photos/id/${id % 1000}/200/300`
    }))
    setInventory(inventoryData);
    setFilteredInventory(inventoryData);
  }, []);

  useEffect(() => {
    loadInventory();
  }, [loadInventory]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters])

  return (
    <InventoryContext.Provider value={{
      inventory,
      selectedItems,
      filters,
      addSelectedItem,
      removeSelectedItem,
      loadInventory,
      setFilters
    }}>
      {children}
    </InventoryContext.Provider>
  )
}
