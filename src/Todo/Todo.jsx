import React, { useState, useEffect } from 'react';
import { Empty, Task } from './helloworld_pb';
import { GreeterClient } from './helloworld_grpc_web_pb';
import { v4 as uuid } from 'uuid';

const Tasks = ({ task, removeTask }) => {
  return (
    <li
      className={
        task.pending
          ? 'flex justify-between bg-grey-light mb-2 rounded text-grey-dark'
          : 'flex justify-between bg-grey-light mb-2 rounded'
      }
    >
      <div className="p-2">{task.message}</div>
      <div>
        <button
          className="bg-red text-white p-2 px-3 rounded-tr rounded-br"
          onClick={() => removeTask(task.uuid)}
        >
          X
        </button>
      </div>
    </li>
  );
};

const TodoForm = ({ addTask }) => {
  const [input, setInput] = useState('');

  const handleSumbit = e => {
    e.preventDefault();
    if (!input) return;
    addTask(uuid(), input);
    setInput('');
    return;
  };

  return (
    <form onSubmit={handleSumbit}>
      <input
        className="w-full bg-grey-light rounded p-2"
        placeholder="Add new task..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
    </form>
  );
};

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(false);

  const client = new GreeterClient(
    'http://' + window.location.hostname + ':8080',
    null,
    null,
  );

  useEffect(() => {
    const request = new Empty();

    client.listTasks(request, {}, (err, response) => {
      if (err) {
        setError(true);
        return console.log(err);
      }

      response = response.toObject().tasksList.map(task => task);
      const savedTasks = [...tasks, ...response];
      setTasks(savedTasks);
    });
  }, []);

  const addTask = (uuid, message) => {
    if (error) {
      setError(false);
    }

    const newTasks = [...tasks, { uuid, message, pending: true }];
    setTasks(newTasks);

    const request = new Task();
    request.setUuid(uuid);
    request.setMessage(message);

    client.newTask(request, {}, err => {
      setTasks(currentTasks =>
        currentTasks.map(task => {
          if (task.uuid === uuid) {
            delete task.pending;
          }
          return task;
        }),
      );

      if (err) {
        setError(true);
        console.log(err);

        setTasks(currentTasks =>
          currentTasks.filter(task => task.uuid !== uuid),
        );
      }
    });
  };

  const removeTask = uuid => {
    setTasks(currentTasks => currentTasks.filter(task => task.uuid !== uuid));
  };

  console.log(tasks);

  return (
    <div className="max-w-sm mx-auto">
      <div className="p-2 my-2 bg-grey rounded">
        <ul className="list-reset">
          {tasks.map(task => (
            <Tasks key={task.uuid} task={task} removeTask={removeTask} />
          ))}
        </ul>
        <TodoForm addTask={addTask} />
        {error && (
          <div className="mt-3 px-1">Error: Can't connect to database</div>
        )}
      </div>
    </div>
  );
};

export default Todo;
