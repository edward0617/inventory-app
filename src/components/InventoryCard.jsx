import React from 'react';
import styled from 'styled-components';

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

const InventoryCard = ({id, image}) => (
  <Card>
    <Image src={image} alt={`Inventory item ${id}`} />
    <p>ID: {id}</p>
  </Card>
)

export default InventoryCard;
