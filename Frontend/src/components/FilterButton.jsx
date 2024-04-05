/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useGlobalContext } from "../contextApi/todoContext";

function FilterButton({name, isPressed, filterTodos}) {

  return (
    <button type="button" className="btn toggle-btn" aria-pressed={isPressed} onClick={() => filterTodos(name)}>
      <span>{name}</span>
    </button>
  );
}

export default FilterButton;
