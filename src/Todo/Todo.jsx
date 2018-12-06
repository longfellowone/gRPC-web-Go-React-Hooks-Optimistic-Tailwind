import React, { useState, useEffect } from 'react';
import { Empty, Task } from './helloworld_pb';
import { GreeterClient } from './helloworld_grpc_web_pb';
import { v4 as uuid } from 'uuid';

const Tasks = ({ index, task, removeTask }) => {
  return (
    <li
      className={
        task.error
          ? 'flex justify-between bg-grey-light mb-2 rounded text-grey-dark'
          : 'flex justify-between bg-grey-light mb-2 rounded'
      }
    >
      <div className="p-2">{task.message}</div>
      <div>
        <button
          className="bg-red text-white p-2 rounded-tr rounded-br"
          onClick={() => removeTask(index)}
        >
          Delete
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

  const client = new GreeterClient(
    'http://' + window.location.hostname + ':8080',
    null,
    null,
  );

  useEffect(() => {
    const request = new Empty();

    client.listTasks(request, {}, (err, response) => {
      if (err) {
        return console.log(err);
      }
      const test = response.toObject();
      const testing = test.tasksList.map(value => value);

      const newTasks = [...tasks, ...testing];
      setTasks(newTasks);
    });
  }, []);

  const addTask = (uuid, message) => {
    const request2 = new Task();
    request2.setUuid(uuid);
    request2.setMessage(message);

    client.newTask(request2, {}, (err, response) => {
      if (err) {
        const newTask = [
          ...tasks.filter(task => task.uuid !== uuid),
          { error: true, message: message, uuid: uuid },
        ];
        setTasks(newTask);
        return;
      }
    });

    const newTask = [...tasks, { uuid, message }];
    setTasks(newTask);
  };

  const removeTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  //console.log(tasks);

  return (
    <div className="max-w-sm mx-auto">
      <div className="p-2 my-2 bg-grey rounded">
        <ul className="list-reset">
          {tasks.map((task, index) => (
            <Tasks
              key={task.uuid}
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

// const [tasks, setTasks] = useState([
// {
//   id: 3,
//   message: "another one"
// },
// {
//   id:4,
//   message: "another 4"
// }
// ]);

//const tested = response.map(value => value.message);
//console.log(tested)
// let hello = response.getTaskList();
// const testing = hello.map(temp => temp.array);

// const data = [
//   {
//     name: "John Doe",
//     position: "developer",
//     experiences: [
//       {
//         id: 0,
//         job: "developer 1",
//         period: "2016-2017",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium nesciunt recusandae unde. Qui consequatur beatae, aspernatur placeat sapiente non est!"
//       },
//       {
//         id: 1,
//         job: "developer 2",
//         period: "2015-2016",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium nesciunt recusandae unde. Qui consequatur beatae, aspernatur placeat sapiente non est!"
//       },
//       {
//         id: 2,
//         job: "developer 3",
//         period: "2014-2015",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium nesciunt recusandae unde. Qui consequatur beatae, aspernatur placeat sapiente non est!"
//       }

//     ]

//   }
// ]

// class App extends React.Component {
//   render() {
//     const { data } = this.props;
//     const resume = data.map(info => {
//       //browser render
//       return (
//         <div>
//           {info.name}
//           <ul>
//           {
//             info.experiences.map(experience => <li key={experience.id}>{experience.job}</li>)
//           }
//           </ul>
//           {info.position}
//         </div>
//       );
//     });

//     return <div>{<p>{resume}</p>}</div>;
//   }
// }
