import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import InventoryCard from "./InventoryCard";
import { InventoryContext } from "../context/InventoryContext";
import InventoryFilter from "./InventoryFilter";

const InventoryViewContainer = styled.div`
  flex: 3;
  display: flex;
  border: 10px solid #eee;
`
  
  const Grid = styled.div`
  border-bottom: 10px solid #ccc;
  flex: 5;
  display: grid;
  background-color: #ccc;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  padding: 10px;
  justify-content: center;
  max-height: 780px;
  overflow-y: auto;

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
  const { filteredInventory, loadInventory, inventory} = useContext(InventoryContext);

  useEffect(() => {
    loadInventory();
  }, [loadInventory]);

  return (
    <InventoryViewContainer>
      <Grid>
        {Array.isArray(filteredInventory) && filteredInventory.length > 0 ?
          filteredInventory.map((item, key) => (
            <InventoryCard key={`${key}${item.id}`} imageItem={item} />
          )) : inventory.map((item, key) => (
            <InventoryCard key={`${key}${item.id}`} imageItem={item} />
          ))}
      </Grid>
      <InventoryFilter />
    </InventoryViewContainer>
  );
};

export default InventoryView;
