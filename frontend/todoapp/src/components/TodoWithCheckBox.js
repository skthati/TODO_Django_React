import React, { useState, useEffect } from 'react'
import axios from 'axios'

const TodoWithCheckBox = () => {
    const [allTodo, SetAllTodo] = useState([]);
    const [newTodo, SetNewTodo] = useState("");
    const userID = 2

    useEffect(() => {
        axios.get('http://localhost:8000/api/todo/')
        .then(response => SetAllTodo(response.data))
        .catch(error => console.error('Error fetching All todo', error));
    }, []);

    const handleAddTodo = () => {
        axios.post('http://localhost:8000/api/todo/', {title: newTodo, user: userID})
        .then(response => SetAllTodo([...allTodo, response.data]))
        .catch(error => console.error('Error adding todo', error));
        SetNewTodo("");
    }

    // const handleToggle = () => {
    //     setToggleCompleted(prevState => !prevState)
    // }

    const handleCompleteTodo = (id, toggleStatus) => {
        console.log(`ID: ${id}, Completed/toggleState: ${toggleStatus}`)
        toggleStatus = !toggleStatus
        console.log(`After toggling the status ${toggleStatus}`)
        axios.patch(`http://localhost:8000/api/todo/${id}/`, {completed: toggleStatus})
        .then(response => {
            SetAllTodo(allTodo.map(e => (e.id === id ? response.data : e)));
        })
        .catch(error => console.error('Error marking the item to complete', error));
    };

    return (
        <div>

        <div class="container">
        <div class="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
            <div class="list-group list-group-checkable d-grid gap-2 border-0">


                <div class="input-group mb-3">
                    <input
                        type="text"
                        class="form-control"
                        value={newTodo}
                        onChange={(e) => SetNewTodo(e.target.value)}
                        placeholder='New Todo'
                    />
                    <button class="btn btn-primary" type="button" onClick={handleAddTodo}>Add ToDo</button>
                    
                </div>

                <hr></hr>

                <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <img src="..." class="rounded me-2" alt="..."></img>
                        <strong class="me-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        Hello, world! This is a toast message.
                    </div>
                </div>

                <hr></hr>
                {allTodo.map(todo => (
                    <div key={todo.id}>
                        <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                            {todo.title }

                            <label class="form-check-label">
                            <input 
                                type="checkbox"
                                class="form-check-input" 
                                checked={todo.completed} 
                                onChange={() => handleCompleteTodo(todo.id, todo.completed)} 
                                />
                                {/* {todo.completed ? 'Completed' : 'Not Completed'} */}
                            </label>                  
                            </li>
                        </ul>



                    </div>
                ))}
                
                <hr></hr>  
            </div>

        </div>
 
        </div>

        </div>    
    );
} ;

export default TodoWithCheckBox;