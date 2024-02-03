import Trash from "./Trash"

function Task(props) {
  return (
    <div className='m-6 flex items-center justify-evenly'>
        <div className='text-lg'>
            {props.task}
        </div>
        <div className="flex">
            <div className="mx-4">
                <input type="checkbox" checked={props.isChecked}/>
            </div>
            <div className="mx-4 cursor-pointer"><Trash /></div>
        </div>
    </div>
  )
}

export default Task