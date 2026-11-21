import React from "react";
import styles from "./Counter.module.css";

interface CounterProps {
  total: number;
  completed: number;
}

export const Counter: React.FC<CounterProps> = ({ total, completed }) => {
  return (
    <div className={styles.counter}>
        <span className={styles.counterLabel}>{completed} completed out of</span>
        <span id="todo-count">{total}</span>
    </div>
  );
}