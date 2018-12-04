import React, { useState, useEffect } from 'react';
import { TaskRequest } from './helloworld_pb';
import { GreeterClient } from './helloworld_grpc_web_pb';

const Tasks = ({ index, task, removeTask }) => {
  return (
    <>
      <li className="flex justify-between bg-grey-light mb-2 rounded">
        <div className="p-2">{task}</div>
        <div>
          <button
            className="bg-red text-white p-2 rounded-tr rounded-br"
            onClick={() => removeTask(index)}
          >
            Delete
          </button>
        </div>
      </li>
    </>
  );
};

const TodoForm = ({ addTask }) => {
  const [input, setInput] = useState('');

  const handleSumbit = e => {
    e.preventDefault();
    if (!input) return;
    addTask(input);
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

  const client = new GreeterClient(
    'http://' + window.location.hostname + ':8080',
    null,
    null,
  );

  useEffect(() => {
    const request = new TaskRequest();

    client.getTasks(request, {}, (err, response) => {
      if (err) {
        return console.log(err);
      }
      let hello = response.getTaskList();
      const testing = hello.map(temp => temp.array);
      const newTasks = [...tasks, ...testing];
      setTasks(newTasks);
    });
  }, []);

  const addTask = input => {
    const newTasks = [...tasks, input];
    setTasks(newTasks);
    return;
  };

  const removeTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="p-2 m-2 bg-grey rounded">
        <ul className="list-reset">
          {tasks.map((task, index) => (
            <Tasks
              key={index}
              index={index}
              task={task}
              removeTask={removeTask}
            />
          ))}
        </ul>
        <TodoForm addTask={addTask} />
      </div>
    </div>
  );
};

export default Todo;
