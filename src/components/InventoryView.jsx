import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import InventoryCard from "./InventoryCard";
import { InventoryContext } from "../context/InventoryContext";
import InventoryFilter from "./InventoryFilter";

const InventoryViewContainer = styled.div`
  display: flex;
  height: 70vh;
`;
const Grid = styled.div`
  flex: 5;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
  padding: 20px;
  justify-content: center;
  max-height: 70vh;
  overflow-y: auto;
  margin-bottom: 20px;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;

    &:hover {
      background: #555;
    }
  }
`;

const InventoryView = () => {
  const { filteredInventory, loadInventory } = useContext(InventoryContext);

  useEffect(() => {
    loadInventory();
  }, [loadInventory]);

  return (
    <InventoryViewContainer>
      <Grid>
        {Array.isArray(filteredInventory) &&
          filteredInventory.map((item, key) => (
            <InventoryCard
              key={`${key}${item.id}`}
              imageItem={item}
            />
          ))}
      </Grid>
      <InventoryFilter />
    </InventoryViewContainer>
  );
};

export default InventoryView;
