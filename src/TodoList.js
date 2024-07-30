import React, { useState } from 'react';
import { Button, Form, ListGroup, Container, Row, Col } from 'react-bootstrap';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h1 className="text-center my-4">To-Do List</h1>
          <Form.Group className="mb-3" controlId="formNewTask">
            <Form.Control 
              type="text" 
              placeholder="Enter new task" 
              value={newTask} 
              onChange={(e) => setNewTask(e.target.value)} 
            />
          </Form.Group>
          <Button variant="primary" onClick={addTask} className="mb-3">
            Add Task
          </Button>
          <ListGroup>
            {tasks.map((task, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                {task}
                <Button variant="danger" size="sm" onClick={() => deleteTask(index)}>Delete</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, task: 'Learn React' },
    { id: 2, task: 'Build a todo list' },
  ]);
  const [error, setError] = useState(null);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      // Simulate a delete action that may fail
      if (id === 1) { // Example condition to trigger an error
        throw new Error('Failed to delete the task');
      }

      setTodos(todos.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      {error && <div className="error-popup">{error}</div>}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.task}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};


const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, task: 'Learn React' },
    { id: 2, task: 'Build a todo list' },
  ]);
  const [error, setError] = useState(null);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      // Simulate a delete action that may fail
      if (id === 1) { // Example condition to trigger an error
        throw new Error('Failed to delete the task');
      }

      setTodos(todos.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      {error && <div className="error-popup">{error}</div>}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.task}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
