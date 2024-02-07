import { useState } from "react";

function AddTaskModal({ onPress, addTask }) {
  const [text, setText] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const handleSubmit = () => {
    if (text == "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      addTask(text);
      onPress();
    }
  };

  return (
    <div className="absolute top-0 h-full w-full flex content-center flex-wrap justify-center backdrop-blur-sm z-10">
      <div className="w-full shadow-md sm:w-1/4">
        <div className="flex content-center justify-between bg-blue-500 p-4 text-2xl text-white">
          <div>Add Task</div>
          <div className="cursor-pointer" onClick={onPress}>
            &times;
          </div>
        </div>
        <div className="p-4 flex flex-col justify-center content-center flex-wrap bg-white">
          <div className=" my-4">
            <input
              type="text"
              className="border-b-2 hover:border-blue-500 text-center focus:outline-none focus:border-blue-500"
              placeholder="Task"
              onChange={(e) => setText(e.target.value)}
              autoFocus
            />
          </div>
          {isEmpty && (
            <div className="bg-red-300 border-2 border-red-700 p-2 text-red-700 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="mx-4">Enter Task</div>
            </div>
          )}
          <div
            className="bg-blue-500 text-white px-4 py-1 my-4 mx-2 text-center text-lg font-semibold cursor-pointer"
            onClick={handleSubmit}
          >
            Add
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;
