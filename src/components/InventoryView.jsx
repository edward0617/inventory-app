import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InventoryCard from "./InventoryCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
  padding: 20px;
`;

const InventoryView = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const ids = Array.from({ length: 1000 }, () =>
        Math.floor(Math.random() * 100000)
      );
      const inventoryData = ids.map((id) => ({
        id,
        image: `https://picsum.photos/id/${id % 1000}/200/300`,
      }));
      setInventory(inventoryData);
    };

    fetchInventory();
  }, []);

  return (
    <Grid>
      {inventory.map((item) => (
        <InventoryCard key={item.id} id={item.id} image={item.image} />
      ))}
    </Grid>
  );
};

export default InventoryView;