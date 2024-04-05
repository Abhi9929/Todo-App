/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../contextApi/todoContext";

function Todo({ title, completed, _id }) {
  const { deleteTodo, updateTodo, toggleComplete } = useGlobalContext();

  let status = completed

  const [newtask, setNewTask] = useState(title);
  const [isTodoEditable, setIsTodoEditable] = useState(false);

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  useEffect(() => {
    if (isTodoEditable) {
      editFieldRef.current.focus();
    }
  }, [isTodoEditable]);

  useEffect(() => {
    if (completed) {
      editButtonRef.current.disabled = true;
      editButtonRef.current.classList.add("editBtn");
    } else {
      editButtonRef.current.disabled = false;
      editButtonRef.current.classList.remove("editBtn");
    }
  }, [completed]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputBox = editFieldRef.current;
    inputBox.focus();
    if (newtask.length == 0) {
      inputBox.classList.add("red-alert");
    } else if (newtask.length > 0) {
      inputBox.classList.remove("red-alert");
      updateTodo(_id, newtask);
      setIsTodoEditable(false);
      setNewTask(newtask);
    }
  };

  const editingTemplate = (
    <form onSubmit={handleSubmit} className="stack-small">
      <div className="form-group">
        <label className="todo-label" htmlFor={_id}>
          Set the new one
        </label>
        <input
          id={_id}
          value={newtask}
          className="todo-text"
          type="text"
          ref={editFieldRef}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setIsTodoEditable(false)}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn__secondary todo-edit">
          Save
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <li className="todo stack-small">
      <div className="c-cb">
        <input
          id={_id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleComplete(_id, status)}
        />
        <label className="todo-label" htmlFor={_id}>
          {title}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          ref={editButtonRef}
          onClick={() => {
            setIsTodoEditable(true);
          }}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTodo(_id)}
        >
          Delete
        </button>
      </div>
    </li>
  );

  return <>{isTodoEditable ? editingTemplate : viewTemplate}</>;
}

export default Todo;
