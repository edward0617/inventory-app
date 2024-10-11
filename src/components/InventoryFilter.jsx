import React, { useContext, useState } from "react";
import styled from "styled-components";
import { InventoryContext } from "../context/InventoryContext";

const FilterContainer = styled.div`
  flex: 1;
  padding: 20px;
  border-right: 1px solid #ccc;
  height: 100%;
  background: #f7f7f7;
`;

const FilterTitle = styled.h3`
  margin-top: 0;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  margin-right: 10px;
`;

const Filter = () => {
  const { setFilters } = useContext(InventoryContext);
  const [filterState, setFilterState] = useState({
    isEven: false,
    isOdd: false,
    isPrime: false,
    endsWith: "",
    rangeStart: "",
    rangeEnd: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFilters = {
      ...filterState,
      [name]: type === "checkbox" ? checked : value,
    };
    setFilterState(newFilters);

    const { rangeStart, rangeEnd, ...restFilters } = newFilters;
    setFilters({
      ...restFilters,
      range: [parseInt(rangeStart) || 0, parseInt(rangeEnd) || 1000],
    });
  };

  return (
    <FilterContainer>
      <FilterTitle>Filters</FilterTitle>
      <FilterLabel>
        <Input
          type="checkbox"
          name="isEven"
          disabled={filterState.isOdd}
          checked={filterState.isEven}
          onChange={handleInputChange}
        />
        Even ID
      </FilterLabel>
      <FilterLabel>
        <Input
          type="checkbox"
          name="isOdd"
          disabled={filterState.isEven}
          checked={filterState.isOdd}
          onChange={handleInputChange}
        />
        Odd ID
      </FilterLabel>
      <FilterLabel>
        <Input
          type="checkbox"
          name="isPrime"
          checked={filterState.isPrime}
          onChange={handleInputChange}
        />
        Prime ID
      </FilterLabel>
      <FilterLabel>
        Ends With:
        <Input
          type="text"
          name="endsWith"
          value={filterState.endsWith}
          onChange={handleInputChange}
        />
      </FilterLabel>
      <FilterLabel>
        Range Start:
        <Input
          type="number"
          name="rangeStart"
          value={filterState.rangeStart}
          onChange={handleInputChange}
        />
      </FilterLabel>
      <FilterLabel>
        Range End:
        <Input
          type="number"
          name="rangeEnd"
          value={filterState.rangeEnd}
          onChange={handleInputChange}
        />
      </FilterLabel>
    </FilterContainer>
  );
};

export default Filter;
