

function AddTask(props) {

  return (
    <div className='shadow-md bg-blue-500 m-10 py-2 px-6 font-semibold text-lg text-white cursor-pointer rounded-lg transition ease-in-out duration-200 hover:bg-indigo-500 hover:scale-110' onClick={props.onClick}>
        Add Task
    </div>
  )
}

export default AddTask