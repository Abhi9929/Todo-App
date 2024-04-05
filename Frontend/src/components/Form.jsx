import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../contextApi/todoContext";

function Form() {
  const [ title, setTitle ] = useState('');
  const { addTodo } = useGlobalContext(); 

  const inputRef = useRef(null); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputBox = inputRef.current;
    inputBox.focus();
    if(title.length == 0) {
      inputBox.classList.add('red-alert');
    }
    
    else {
      inputBox.classList.remove('red-alert');
      addTodo(title);
      setTitle('')
    }
  }


  return (
      <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          ref={inputRef}
          id="new-todo-input"
          className="input input__lg"
          name="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoComplete="off"
          placeholder="Go to Gym..."
        />
        <button type="submit" className="btn btn__primary btn__lg"
        >
          Add
        </button>
      </form>
  );
}

export default Form;
