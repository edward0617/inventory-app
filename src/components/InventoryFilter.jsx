import React, { useContext } from "react";
import styled from "styled-components";
import { InventoryContext } from "../context/InventoryContext";

const FilterContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 200px;
  height: 100vh;
  background: #f7f7f7;
  border-right: 1px solid #ccc;
  padding: 20px;
  input {
    margin: 10px 0;
  }
`;

const FilterTitle = styled.h3`
  margin-top: 0;
`;

const Filter = () => {
  const { filters, setFilters } = useContext(InventoryContext);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFilters({ ...filters, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <FilterContainer>
      <FilterTitle>Filters</FilterTitle>
      <div>
        <label>
          <input
            type="checkbox"
            name="isEven"
            checked={filters.isEven}
            onChange={handleChange}
          />
          Even ID
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="isOdd"
            checked={filters.isOdd}
            onChange={handleChange}
          />
          Odd ID
        </label>
      </div>
    </FilterContainer>
  );
};

export default Filter;
