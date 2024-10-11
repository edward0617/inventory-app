import React, { useContext } from "react";
import styled from "styled-components";
import { InventoryContext } from "../context/InventoryContext";
import InventoryCard from "./InventoryCard";
import { useDrop } from "react-dnd";
import TimerBox from "./TimerBox";

const DropContainer = styled.div`
  flex: 1;
  background-color: #ccc;
  border: 10px solid #eee;
`;
const SelectionContainer = styled.div`
  display: flex;
`;

const Grid = styled.div`
flex: 5;
display: grid;
background-color: #ccc;
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
padding: 10px;
justify-content: center;
max-height: 280px;
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

const SelectionView = () => {
  const { selectedItems, addSelectedItem } = useContext(InventoryContext);

  const [, drop] = useDrop(() => ({
    accept: "card",
    drop: (item, monitor) => {
      if (item.selectedItemsIndex === -1) {
        addSelectedItem(item);
      }
    },
  }));

  return (
    <DropContainer ref={drop}>
      <SelectionContainer>
        <Grid>
          {selectedItems.map((item, index) => (
            <InventoryCard
              key={`${item.id}${index}`}
              imageItem={item}
              isDraggable={true}
              selectedItemsIndex={index}
            />
          ))}
        </Grid>
        <TimerBox />
      </SelectionContainer>
    </DropContainer>
  );
};

export default SelectionView;
