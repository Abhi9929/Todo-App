/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Todo from "../components/Todo.jsx";
import Form from "../components/Form.jsx";
import FilterButton from "../components/FilterButton.jsx";
import { TodoProvider } from "../contextApi/todoContext.js";
import AccountInfo from "../components/UserAccount.jsx";
import "../index.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function TodoPage() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  const location = useLocation();
  let token = location.state?.token;

  // to prevent to open TodoPage directly
  useEffect(() => {
    if (!(token && location.state?.user)) {
      navigate("/", { replace: true });
    }
  }, [])

  let first_name;
  if(location.state?.user) {
    const { firstName } = location.state?.user;
    first_name = firstName
  }

  useEffect(() => {
    async function getuserTodos() {
      try {
        const response = axios.get("/api/user/todos", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        });

        const { data } = (await response).data;
        setTodos(data);
      } catch (error) {
        console.error("Error:", error.response.data);
      }
    }

    getuserTodos();
  }, []);

  const addTodo = async (task) => {
    try {
      const response = axios.post(
        "/api/user/todos/create",
        {
          title: task,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = (await response).data;
      const { _id, title, completed } = data;
      const newTodo = {
        _id: _id,
        title: title,
        completed: completed,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const updateTodo = async (id, newTask) => {
    try {
      const response = axios.put(
        "/api/user/todos/update",
        {
          _id: id,
          title: newTask,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = (await response).data;
      console.log(data);
      const { title } = data;
      setTodos((prevTodos) => {
        return prevTodos.map((todo) =>
          todo._id === id ? { ...todo, title } : todo
        );
      });
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = axios.post(
        "/api/user/todos/delete",
        {
          _id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = (await response).data;
      setTodos(data);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const toggleComplete = async (id, status) => {
    try {
      const response = axios.put(
        "/api/user/todos/update",
        {
          _id: id,
          completed: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = (await response).data;
      const { completed } = data;
      setTodos((prevTodos) => {
        return prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed } : todo
        );
      });
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };
  // default filter to be All
  const [filter, setFilter] = useState("All");
  // Each filter should have a unique name.
  // Each filter should have a unique behavior.
  const FILTER_MAP = {
    All: () => true,
    Active: (task) => task.completed === false,
    Completed: (task) => task.completed === true,
  };
  // A JavaScript object would be a great way to relate names to behaviors: each key is the name of a filter; each property is the behavior associated with that name.
  const FilterBtns = Object.keys(FILTER_MAP);

  // number of tasks heading
  const taskNoun = todos.length !== 1 ? "tasks" : "task";
  let suffixText = "";
  if (filter === "Completed") {
    suffixText = "completed";
  } else suffixText = "remaining";
  const headingText = `${
    todos.filter(FILTER_MAP[filter]).length
  } ${taskNoun} ${suffixText}`;

  return (
    <TodoProvider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
      }}
    >
      <div className="todoapp stack-large">
        <AccountInfo firstName={first_name} token={token} />
        <Form />
        <div className="filters btn-group stack-exception">
          {FilterBtns.map((name) => (
            <FilterButton
              key={name}
              name={name}
              isPressed={name === filter}
              filterTodos={setFilter}
            />
          ))}
        </div>
        <div className="todoBox">
          <h2 id="list-heading">{headingText}</h2>
          <ul
            role="list"
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-heading"
          >
            {todos.filter(FILTER_MAP[filter]).map((todo) => {
              return <Todo key={todo._id} {...todo} />;
            })}
          </ul>
        </div>
      </div>
    </TodoProvider>
  );
}

export default TodoPage;
