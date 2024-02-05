import Task from "./Task"
import AddTask from "./AddTask"
import { useEffect, useState } from "react"
import AddTaskModal from "./AddTaskModal"
import axios from 'axios'

function Tasks() {

  const [showModal, setShowModal] = useState(false)
  const [taskData, setTaskData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/api/todo')
    .then(res => setTaskData(res.data))
  }, [])

  const onPressed = () => {
    setShowModal(!showModal)
  }

  return (
    <div className="my-10">
        <div className="font-medium text-xl text-center">
            Tasks
        </div>
        <div className="my-10">
            {taskData.map(task => <Task key={task._id} task={task.task} isChecked={task.isChecked} />)}
        </div>
        <div className="absolute bottom-0 w-screen flex justify-center">
            <AddTask onClick={onPressed}/>
        </div>
        {showModal && <AddTaskModal onPress={onPressed}/>}
    </div>
  )
}

export default Tasks