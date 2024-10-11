import React from "react";
import styled from "styled-components";
import { useDrag } from "react-dnd";

const DragContainer = styled.div`
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
`
const Card = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 200px;
  height: 300px;
`;

const InventoryCard = ({ imageItem, isDraggable = true }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "card",
    item: { imageItem },
    canDrag: isDraggable,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [isDraggable]);

  return (
    <DragContainer ref={isDraggable ? drag : preview} isDragging={isDragging}>
      <Card>
        <Image src={imageItem.image} alt={`Inventory item ${imageItem.id}`} />
        <p>ID: {imageItem.id}</p>
      </Card>
    </DragContainer>
  );
};

export default InventoryCard;
