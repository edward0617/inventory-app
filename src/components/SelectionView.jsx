import React, { useContext } from "react";
import styled from "styled-components";
import { InventoryContext } from "../context/InventoryContext";
import InventoryCard from "./InventoryCard";

const SelectionContainer = styled.div`
  height: 25vh;
  overflow: auto;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 10px;
`;

const SelectionView = () => {
  const { selectedItems } = useContext(InventoryContext);

  return (
    <SelectionContainer>
      {selectedItems.map((item) => (
        <InventoryCard key={item.id} id={item.id} image={item.image} />
      ))}
    </SelectionContainer>
  );
};

export default SelectionView;
