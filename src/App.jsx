import { useState,useEffect} from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinisheditems,setshowFinisheditems]=useState(true)

  const saveToLS=()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggleFinisheditems=(params) => {
    setshowFinisheditems(!showFinisheditems)
  }
  
  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){
    let todos=JSON.parse(todoString)
    setTodos(todos)
    }
  }, [])
  
  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>i.id==id)
    setTodo(t[0].todo) 
    let newtodos=todos.filter(item=>{
      return item.id!=id
    });
    setTodos(newtodos)
    saveToLS()
    
  }

  const handleDelete=(e,id)=>{
    let newtodos=todos.filter(item=>{
      return item.id!=id
    });
    setTodos(newtodos)
    saveToLS()
  }

  const handleAdd=()=>{
    setTodos([...todos, {id: uuidv4(),todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }

  const handleChange=(e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox=(e) => {
    let id=e.target.name;
    let index= todos.findIndex(items=>{
      return items.id==id;
    })
    let newtodos=[...todos];
    newtodos[index].isCompleted= !newtodos[index].isCompleted
    setTodos(newtodos)
    saveToLS()
  }
  

  return (
    <>
      <Navbar/>
      <div className='container bg-violet-100 w-[90%] mx-auto min-h-[80vh] sm:max-w-[600px] my-7 p-5 rounded-xl'>

        <h1 className='font-bold text-center text-2xl'>Taskly - Manage your todos at one place</h1>
        <div className="addTodo my-5">
          <h2 className='text-lg  font-bold'>Add a Todo</h2>

          <div className='flex'>
          <input onChange={handleChange} value={todo} type="text" className='bg-white rounded-lg w-[85%] px-3 py-1' />
          <button onClick={handleAdd} disabled={todo.length===0} className='bg-violet-800 hover:bg-violet-700 text-sm font-bold px-2 py-1 text-white rounded-md ml-6 disabled:bg-violet-700'>Save</button>
          </div>

        </div>

        <input type="checkbox" id='box' className='mb-4' onChange={toggleFinisheditems} checked={showFinisheditems} />
        <label htmlFor="box">Show Finished Items</label>

        <h2 className='text-xl font-bold'>Your Todos</h2>
        <div className='todos'>
          {todos.length===0 && <div className='my-5 text-center'>No Todos to display</div>}
          {todos.map(item=>{
            return(showFinisheditems||!item.isCompleted) && (<div key={item.id} className="todo flex justify-between my-2">
              <div className='flex gap-7'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}/>
                <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>

              <div className="buttons">
                <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-700 font-bold px-2 py-1 text-white rounded-md mx-2'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-700 font-bold px-2 py-1 text-white rounded-md mx-2'><MdDelete /></button>
              </div>

            </div>)
          })}
        </div>
      </div>
    </>
  )
}

export default App
