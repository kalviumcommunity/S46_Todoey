import { useState } from "react";
import Add from "../buttons/Edit";
import Trash from "../buttons/Trash";
import EditTaskModal from "../modals/EditTaskModal";
import Edit from "../buttons/Edit";

function Task({ task, deleteTask, updateTask }) {
  const [showModal, setShowModal] = useState(false);

  const onPressed = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="m-6 flex justify-center">
      <div className="grid grid-cols-3 md:grid-cols-4">
        <div className="text-lg text-left col-span-2 md:col-span-3">
          {task.task}
        </div>
        <div className="flex">
          <div className="mx-2">
            <input
              type="checkbox"
              checked={task.isChecked}
              onChange={() =>
                updateTask({ ...task, isChecked: !task.isChecked })
              }
            />
          </div>
          <div
            className="mx-4 cursor-pointer"
            onClick={() => deleteTask(task._id)}
          >
            <Trash />
          </div>
          <div className="mx-4 cursor-pointer" onClick={onPressed}>
            <Edit />
          </div>
        </div>
      </div>
      {showModal && (
        <EditTaskModal
          onPress={onPressed}
          oldTask={task}
          updateTask={updateTask}
        />
      )}
    </div>
  );
}

export default Task;
