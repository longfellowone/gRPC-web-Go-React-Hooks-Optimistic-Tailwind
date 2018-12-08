import React from 'react';
import { v4 as uuid } from 'uuid';

export const TodoForm = ({ addTask, taskRef }) => {
  const handleSumbit = e => {
    e.preventDefault();
    const message = taskRef.current.value;
    if (!message) return;
    addTask(uuid(), message);
    taskRef.current.value = null;
  };

  return (
    <form onSubmit={handleSumbit}>
      <input
        className="w-full bg-grey-light rounded p-2"
        placeholder="Add new task..."
        ref={taskRef}
      />
    </form>
  );
};
