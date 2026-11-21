import { useEffect, useState } from 'react'
import type {ToDo, SortOrder, Priority} from './types'
import {Header} from './components/Header'
import {Counter} from './components/Counter'
import {Form} from './components/Form'
import {List} from './components/List'
import styles from './App.module.css'


function App() {
  const [todos, setTodos] = useState<ToDo[]>(() => {
    const storedTodos = localStorage.getItem('todos');
    if (!storedTodos) {
      return [];
    }
    return JSON.parse(storedTodos).map((todo: ToDo) => ({
      ...todo,
      priority: todo.priority || 'medium',
      date: todo.date || '',
    }));
  });

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

  const handleAddTodo = (text: string, priority: Priority, date: string) => {
    const newTodo: ToDo = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      date
    };
      setTodos((prev) => [...prev, newTodo]);
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
    <main className={styles.app}>
      <Header />
      <Form onAddTodo={handleAddTodo} />
      <div className={styles.controls}>
        <button className={styles.sortButton} onClick={() => setSortOrder('asc')}>
          Sort A-Z
        </button>
        <button className={styles.sortButton} onClick={() => setSortOrder('desc')}>
          Sort Z-A
        </button>
        <button className={styles.sortButton} onClick={() => setSortOrder('none')}>
          Clear Sort
        </button>
      </div>
      <Counter total={todos.length} completed={completedCount} />
      <List todos={displayedTodos} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />
    </main>
  )
}

export default App
