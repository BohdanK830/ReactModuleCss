import React from 'react';
import type { Priority } from '../types';
import styles from './Form.module.css';

interface FormProps {
    onAddTodo: (text: string, priority: Priority, date: string) => void;
}

export const Form: React.FC<FormProps> = ({ onAddTodo }) => {
    const [inputValue, setInputValue] = React.useState('');
    const [priority, setPriority] = React.useState<Priority>('medium');
    const [date, setDate] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedValue = inputValue.trim();
        if (trimmedValue === '') {
            return;
        }
        onAddTodo(trimmedValue, priority, date);
        setInputValue('');
        setPriority('medium');
        setDate('');
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="What needs to be done?"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={styles['todo-input']}
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button type="submit" id="add-button">
                Add Todo
            </button>
        </form>
    );
}
