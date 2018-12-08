import React, { useState, useEffect, useRef } from 'react';
import { Empty, Task, RemoveTaskRequest } from './proto/todo_pb';
import { TodoClient } from './proto/todo_grpc_web_pb';
import { v4 as uuid } from 'uuid';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(false);
  const taskRef = useRef();

  const client = new TodoClient(
    'http://' + window.location.hostname + ':8080',
    null,
    null,
  );

  useEffect(() => {
    taskRef.current.focus();
    getTasks();
  }, []);

  return (
    <div className="max-w-sm mx-auto">
      <div className="p-2 my-2 bg-grey rounded">
        <ul className="list-reset">
          {tasks.map(task => (
            <Tasks key={task.uuid} task={task} removeTask={removeTask} />
          ))}
        </ul>
        <TodoForm addTask={addTask} taskRef={taskRef} />
        {error && (
          <div className="mt-3 px-1">Error: Can't connect to server</div>
        )}
      </div>
    </div>
  );

  function getTasks() {
    const request = new Empty();

    client.listTasks(request, {}, (err, response) => {
      if (err) {
        setError(true);
        return console.log(err);
      }

      setTasks([...tasks, ...response.toObject().tasksList.map(task => task)]);
    });
  }

  function addTask(uuid, message) {
    if (error) {
      setError(false);
    }

    setTasks([...tasks, { uuid, message, pending: true }]);

    const request = new Task();
    request.setUuid(uuid);
    request.setMessage(message);

    client.newTask(request, {}, err => {
      if (err) {
        setError(true);
        console.log(err);

        removeTaskFromState(uuid);
      }

      removePending(uuid);
    });
  }

  function removeTask(uuid) {
    const request = new RemoveTaskRequest();
    request.setUuid(uuid);

    client.removeTask(request, {}, err => {
      if (err) {
        setError(true);
        console.log(err);
        return;
      }
      removeTaskFromState(uuid);
    });
  }

  function removeTaskFromState(uuid) {
    setTasks(currentTasks => currentTasks.filter(task => task.uuid !== uuid));
  }

  function removePending(uuid) {
    setTasks(currentTasks =>
      currentTasks.map(task => {
        if (task.uuid === uuid) {
          delete task.pending;
        }
        return task;
      }),
    );
  }
};

const Tasks = ({ task, removeTask }) => {
  let checkPending = 'flex justify-between bg-grey-light mb-2 rounded';
  if (task.pending) checkPending += ' text-grey-dark';
  return (
    <li className={checkPending}>
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

const TodoForm = ({ addTask, taskRef }) => {
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

export default Todo;
