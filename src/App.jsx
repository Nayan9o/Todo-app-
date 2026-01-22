
import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";



function App() {
 const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState([])

  const toggleFinished = (e)=>{
    setShowFinished(!showFinished)
  }

  useEffect(()=>{
    let todoSting =   localStorage.getItem('todos')
    if(todoSting){

      let todos = JSON.parse(localStorage.getItem('todos'))
      setTodos(todos)
    }
  },[])

  const saveToLS= (params) =>{
    localStorage.setItem('todos',JSON.stringify(todos))
  }

      const handleAdd = () =>{
      setTodos([...todos, {id : uuidv4(),todo, isCompleted: false}])
      setTodo('')
      saveToLS()
    }

    const handleEdit = (e,id) =>{
      let t = todos.filter(i=> i.id === id)
      setTodo(t[0].todo)
      let newTodos = todos.filter(items => {
        return items.id !== id;
      });
      setTodos(newTodos)
      saveToLS()
    }

    const handleDelete = (e,id) =>{
     
      let newTodos = todos.filter(items => {
        return items.id !== id;
      });
      setTodos(newTodos)
       saveToLS()

    }

    const handlechange = (e) => {
      setTodo(e.target.value)
    }

    const handleCheckbox= (e) =>{
      let id = e.target.name
      let index = todos.findIndex(items => {
        return items.id === id;
      } )
      let newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      setTodos(newTodos)
      saveToLS()
    }

  return (
    


    <>
    <Navbar/>
    <div className="mx-3 md:container md:mx-auto my-5 rounded-xl bg-violet-200 p-5 min-h-[80vh] md:w-1/2">
    <h1 className='font-bold text-center text-lx'>I-Task manage your task at one place</h1>
      <div className="addtodo my-5 flex flex-col gap-4">
        <h2 className='text-lg font-bold'>Add todo</h2>
      <input type="text" onChange={handlechange} value={todo}  className='bg-white rounded-full w-full px-5 py-1 ' />
      <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 font-bold text-sm text-white rounded-md  '>Add</button>
      </div>
      <input onChange={toggleFinished} type="checkbox"  checked={showFinished} />Show Finished
        <h2 className='text-lg font-bold'>Your todo</h2>
      <div className="todos">
        {
          todos.length === 0 && <div className='m-5 '>No todos to display</div>
        }
        {todos.map(items =>{
        
        return (showFinished || !items.isCompleted) && <div key={items.id} className="todo flex md:w-1/2 justify-between my-5">
          <div className='flex gap-6'>

          <input type="checkbox" name={items.id} onChange={handleCheckbox}  checked={items.isCompleted}/>
          <div className={items.isCompleted ? "line-through":""}>{items.todo}</div>
          </div>
          <div className="button flex h-full">
            <button onClick={ (e) => handleEdit(e,items.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 font-bold text-sm text-white rounded-md mx-1 '><FaEdit/></button>
            <button onClick={(e) => {handleDelete(e, items.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 font-bold text-sm text-white rounded-md mx-1 '><MdDelete/></button>
          </div>

        </div>
 } )}
      </div>
    </div>
    </>
  )
}

export default App
