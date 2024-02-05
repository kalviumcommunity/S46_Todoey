import Add from "./Add"
import Trash from "./Trash"

function Task(props) {
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
            <div className="mx-4 cursor-pointer"><Add /></div>
        </div>
      </div>
    </div>
  )
}

export default Task