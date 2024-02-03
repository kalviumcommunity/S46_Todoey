import Task from "./Task"
import AddTask from "./AddTask"
import { useState } from "react"
import AddTaskModal from "./AddTaskModal"

function Tasks() {

  const [showModal, setShowModal] = useState(false)

  const onPressed = () => {
    setShowModal(!showModal)
    console.log(11)
  }

  return (
    <div className="my-10">
        <div className="font-medium text-xl text-center">
            Tasks
        </div>
        <div className="my-10">
            <Task task={'Task1'} isChecked={true} />
            <Task task={'Task2'} isChecked={false} />
        </div>
        <div className="absolute bottom-0 w-screen flex justify-center">
            <AddTask onClick={onPressed}/>
        </div>
        {showModal && <AddTaskModal onPress={onPressed}/>}
    </div>
  )
}

export default Tasks