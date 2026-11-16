import React, { useEffect, useState } from 'react'
import type {ToDo, SortOrder} from './types'
import {List} from './components/List'

function App() {
  const [todos, setTodos] = useState<ToDo[]>(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const completedCount = todos.filter((t) => t.completed).length
  const displayedTodos = [...todos].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.text.localeCompare(b.text);
    }
    if (sortOrder === 'desc') {
      return b.text.localeCompare(a.text);
    }
    return 0;
  });
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue === '') {
      return;
    }
    const newTodo: ToDo = {
      id: Date.now(),
      text: trimmedValue,
      completed: false,
    };
      setTodos((prev) => [...prev, newTodo]);
      setInputValue('');
    }
  const handleToggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  
  return (
    <main className="todo-app">
      <header className="app-header">
        <h1>To-Do List</h1>
      </header>
      <form className="controls" onSubmit={handleAddTodo}>
        <input
          id="todo-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task"
        />
        <button id="add-button" type="submit">Add</button>
      </form>
      <div className="controls">
        <button className="sort-button" onClick={() => setSortOrder('asc')}>Sort A-Z</button>
        <button className="sort-button" onClick={() => setSortOrder('desc')}>Sort Z-A</button>
        <button className="sort-button" onClick={() => setSortOrder('none')}>Clear Sort</button>
      </div>
      <div className="counter">
        <span className="counter-label">{completedCount} completed out of</span>
        <span id="todo-count">{todos.length}</span>
      </div>
      <List
        todos={displayedTodos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />
    </main>
  )
}

export default App
