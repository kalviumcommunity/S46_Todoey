import { useState } from "react"
import Add from "../buttons/Edit"
import Trash from "../buttons/Trash"
import EditTaskModal from "../modals/EditTaskModal"
import Edit from "../buttons/Edit"

function Task(props) {

  const [showModal, setShowModal] = useState(false)

  const onPressed = () => {
    setShowModal(!showModal)
  }

  return (
    <div className='m-6 flex justify-center'>
      <div className="grid grid-cols-5 ">
        <div className='text-lg text-left col-span-4'>
            {props.task}
        </div>
        <div className="flex">
            <div className="mx-4">
                <input type="checkbox" checked={props.isChecked}/>
            </div>
            <div className="mx-4 cursor-pointer"><Trash /></div>
            <div className="mx-4 cursor-pointer" onClick={
              onPressed
            }><Edit /></div>
        </div>
      </div>
      {showModal && <EditTaskModal onPress={onPressed} task={props.task}/>}
    </div>
  )
}

export default Task