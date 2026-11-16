import React from 'react';
import type { ToDo } from '../types';
import { Item } from './Item';

interface ListProps {
    todos: ToDo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export const List: React.FC<ListProps> = ({ todos, onToggle, onDelete }) => {
    return (
        <div className="todo-container">
            {todos.map((todo) => (
                <Item key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
            ))}
        </div>
    );
}