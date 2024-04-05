import React, { createContext, useContext } from 'react'

const TodoContext = createContext({
    todos: [{
        id: 1,
        title: 'first todo',
        completed: false
    }],
    addTodo: (title) => {},
    updateTodo: (id, title) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {},
})

const TodoProvider = TodoContext.Provider;

const useGlobalContext = () => {
    return useContext(TodoContext);
}

export { TodoProvider, useGlobalContext }