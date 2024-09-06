import React, { useState, useEffect} from "react";
import axiosInstance from "../axiosInstance";

const TodoApp = () => {
    const [todos, setTodos] = useState([])
    const [newTodo, SetNewTodo] = useState("")

    useEffect(() => {
        axiosInstance.get('todo/')
            .then(response => setTodos(response.data))
            .catch(error => console.log("Error fetching Todos", error));
    }, []);

    const handleAddTodo = () => {
        axiosInstance.post('todo/', {title: newTodo})
            .then(response => setTodos(...todos, response.data))
            .catch(error => console.log('Error creating new Todo', error));
        SetNewTodo("")
    };

    return (
        <div>
            <h1>Todo list</h1>

            <input
                type="text"
                value={newTodo}
                onChange={(e) => SetNewTodo(e.target.value)}
                placeholder="New Todo"
            />
            <button onClick={handleAddTodo}>Add</button>

            <hr></hr>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id}> {todo.title} </li>
                ))}
            </ul>
        </div>
    )


}


export default TodoApp