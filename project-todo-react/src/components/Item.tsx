import React from 'react';
import type { ToDo } from '../types';

interface ItemProps {
    todo: ToDo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export const Item: React.FC<ItemProps> = ({ todo, onToggle, onDelete }) => {
    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            <span>{todo.text}</span>
            <button className="delete-button" onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
    );
}