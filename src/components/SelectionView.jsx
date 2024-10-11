import React, { useContext } from "react";
import styled from "styled-components";
import { InventoryContext } from "../context/InventoryContext";
import InventoryCard from "./InventoryCard";
import { useDrop } from "react-dnd";
import TimerBox from "./TimerBox";


const DropContainer = styled.div`
  height: "30vh";
  backgroundColor: "#f0f0f0";
  padding: "10px";
`
const SelectionContainer = styled.div`
  display: flex;
  height: 30vh;
`;

const Grid = styled.div`
  flex: 5;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
  padding: 20px;
  justify-content: center;
  max-height: 30vh;
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

const SelectionView = () => {
  const { selectedItems, addSelectedItem } =
    useContext(InventoryContext);

  const [, drop] = useDrop(() => ({
    accept: "card",
    drop: (item, monitor) => {
      addSelectedItem(item);
    },
  }));

  return (
    <DropContainer
      ref={drop}
    >
      <SelectionContainer>
        <Grid>
          {selectedItems.map((item) => (
            <InventoryCard
              key={item.id}
              imageItem={item}
              isDraggable={false}
            />
          ))}
        </Grid>
        <TimerBox />
      </SelectionContainer>
    </DropContainer>
  );
};

export default SelectionView;
