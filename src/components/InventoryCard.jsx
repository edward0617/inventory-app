import React, { useState } from "react";
import styled from "styled-components";
import { useDrag } from "react-dnd";

const DragContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  width: 200px;
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
`;

const IDText = styled.p`
  color: #333;
  font-size: 16px;
  margin-top: 10px;
`;

const CarouselIndicators = styled.div`
  text-align: center;
  margin-top: 5px;
`;

const Indicator = styled.span`
  padding: 2px;
  margin: 0 2px;
  cursor: pointer;
  user-select: none;
  color: ${(props) => (props.isActive ? "#000" : "#bbb")};
`;

const InventoryCard = ({ imageItem, isDraggable = true }) => {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: "card",
      item: { id: imageItem.id, images: imageItem.images },
      canDrag: isDraggable,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [isDraggable]
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleIndicatorClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <DragContainer ref={isDraggable ? drag : preview} isDragging={isDragging}>
      <Image
        src={imageItem.images[currentImageIndex]}
        alt={`Inventory item ${imageItem.id + currentImageIndex}`}
      />
      <CarouselIndicators>
        {imageItem.images.map((_, index) => (
          <Indicator
            key={index}
            isActive={index === currentImageIndex}
            onClick={() => handleIndicatorClick(index)}
          >
            &#9679;
          </Indicator>
        ))}
      </CarouselIndicators>
      <IDText>ID: {imageItem.id + currentImageIndex}</IDText>
    </DragContainer>
  );
};

export default InventoryCard;
