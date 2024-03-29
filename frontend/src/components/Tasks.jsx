import Task from './Task';
import AddTask from '../buttons/AddTask';
import { useEffect, useState } from 'react';
import AddTaskModal from '../modals/AddTaskModal';
import axios from 'axios';
import ReactLoading from 'react-loading';

function Tasks(props) {
  const [showModal, setShowModal] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/todo', {
        headers: {
          token: props.user,
          'content-type': 'application/json',
        },
      })
      .then((res) => {
        setTaskData(res.data);
        setIsLoading(false);
      });
  }, [props]);

  const onPressed = () => {
    setShowModal(!showModal);
  };

  const addTask = (newTask, token) => {
    axios
      .post('http://localhost:3001/api/todo', { task: newTask, token })
      .then((res) =>
        setTaskData((prevState) => prevState.concat(res.data.POST))
      );
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`http://localhost:3001/api/todo/${taskId}`)
      .then((res) =>
        setTaskData((prevState) =>
          prevState.filter((task) => task._id !== taskId)
        )
      );
  };

  const taskScreen = () => {
    return (
      <div className="my-10">
        <div className="font-medium text-xl text-center">Tasks</div>
        <div className="my-10">
          {taskData.map((task) => (
            <Task
              key={task._id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </div>
        <div className="sticky bottom-0 flex justify-center">
          <AddTask onClick={onPressed} />
        </div>
        {showModal && (
          <AddTaskModal
            onPress={onPressed}
            addTask={addTask}
            token={props.user}
          />
        )}
      </div>
    );
  };

  const loadingScreen = () => {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <ReactLoading type="balls" color="#3b82f6" height={150} width={150} />
      </div>
    );
  };

  const updateTask = (updatedTask) => {
    axios
      .put(`http://localhost:3001/api/todo/${updatedTask._id}`, { updatedTask })
      .then((res) =>
        setTaskData((prevState) =>
          prevState.map((task) => {
            if (task._id === updatedTask._id) {
              return updatedTask;
            } else {
              return task;
            }
          })
        )
      );
  };

  return isLoading ? loadingScreen() : taskScreen();
}

export default Tasks;
