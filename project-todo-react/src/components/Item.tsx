import React from 'react';
import type { ToDo } from '../types';
import clsx from 'clsx';
import styles from './Item.module.css';

interface ItemProps {
    todo: ToDo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const formatDate = (date: string) => {
    const [year, month, day] = date.slice(0, 10).split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString();
};

export const Item: React.FC<ItemProps> = ({ todo, onToggle, onDelete }) => {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const dueDate = todo.date.slice(0, 10);
    const isOverdue = Boolean(dueDate && dueDate < today && !todo.completed);

    return (
        <div className={clsx(
            styles.item,
            todo.priority === 'high' && styles.priorityHigh,
            todo.priority === 'medium' && styles.priorityNormal,
            todo.priority === 'low' && styles.priorityLow,
            todo.completed && styles.completed,
            isOverdue && styles.overdue
        )}>
        <div className={styles.leftPart}>
            <input type="checkbox" className={styles.checkbox} checked={todo.completed} onChange={() => onToggle(todo.id)} />
            <div className={styles.textWrapper}>
                <span className={styles.text}>{todo.text}</span>
                <div className={styles.meta}>
                    <span className={clsx(
                        styles.priorityBadge,
                        todo.priority === 'high' && styles.bgHigh,
                        todo.priority === 'medium' && styles.bgNormal,
                        todo.priority === 'low' && styles.bgLow
                        )}>
                        {todo.priority}
                    </span>
                    {todo.date && <span className={styles.dateText}>{formatDate(todo.date)}</span>}
                    {isOverdue && <span className={styles.overdueBadge}>Overdue</span>}
                </div>
            </div>
        </div>
        <button className={styles.deleteButton} onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
    );
}