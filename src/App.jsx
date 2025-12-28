import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import icon1 from './assets/icon1.png'
import { FaCheckCircle, FaCheckSquare, FaClipboardList, FaEdit, FaPen, FaRegCheckCircle, FaRegCircle, FaRegEdit, FaRegSquare, FaTrash, FaUserEdit } from 'react-icons/fa'
import { CheckSquare, Sparkles, Square, TrendingUp } from "lucide-react";
import addSound from './assets/soundEffects/add.mp3'
import deleteSound from './assets/soundEffects/delete.mp3'
import completeSound from './assets/soundEffects/complete.mp3'
import updateSound from './assets/soundEffects/update.mp3'
import {ToastContainer, toast} from 'react-toastify'


function App() {

  const [todoList, setTodoList] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || []
  })
  const activeTodo = todoList.filter(todo => !todo.done).length || 0
  const doneTodo = todoList.filter(todo => todo.done).length || 0
  const progress = Math.round(doneTodo / todoList.length * 100)
  const [animateAdd, setAnimate] = useState(false)
  const [deletingIndex, setDeletingIndex] = useState(null)
  const [editIndex, setEditIndex] = useState(null)
  const [editValue, setEditValue] = useState("")
  const addMusic = useRef(new Audio(addSound))
  const deleteMusic = useRef(new Audio(deleteSound))
  const completeMusic = useRef(new Audio(completeSound))
  const updateMusic = useRef(new Audio(updateSound))

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList))
  }, [todoList])

  const [todo, setTodo] = useState({
    title: "",
    done: false,
  })

  const handleTodoBox = (e) => {
    const value = e.target.value
    setTodo((prev) => ({
      ...prev, title: value
    }))
  }

  const handleToogleTodoStatus = (index) => {
    completeMusic.current.currentTime = 0
    completeMusic.current.play()
    setTodoList(prev =>
      prev.map((todo, i) =>
        i === index ? { ...todo, done: !todo.done } : todo)
    )
  }

  const handleAddTodo = () => {
    addMusic.current.currentTime = 0
    addMusic.current.play()
    toast.success("Task added successfully.")
    const updatedTodoList = [...todoList, todo]
    setTodoList(updatedTodoList)
    setTodo({
      title: "",
      done: false,
    })
    setAnimate(true)
    setTimeout(() => setAnimate(false), 300)
  }

  const handleEdit = (index, value) => {
    setEditIndex(index)
    setEditValue(value)
  }

  const handleUpdateBoxChange = (e) => {
    const value = e.target.value
    setEditValue(value)
  }

  const handleUpdateButton = () => {
    updateMusic.current.currentTime = 0
    updateMusic.current.play()
    toast("Task updated")
    setTodoList(prev =>
      prev.map((todo, i) =>
        i === editIndex ? { ...todo, title: editValue } : todo)
    )
    setEditIndex(null)
    setEditValue("")
  }


  const handleDeleteTodo = (index) => {
    toast.error("Task deleted from list.")
    deleteMusic.current.currentTime = 0
    deleteMusic.current.play()
    
    setDeletingIndex(index)

    setTimeout(() => {
      setTodoList(prev => prev.filter((_, i) => i !== index))
      setDeletingIndex(null)
    }, 300)
  }

  return (
    <div className='w-full min-h-screen bg-linear-to-br from-indigo-950 via-purple-950 to-pink-950 flex justify-center'>
      <ToastContainer/>
      <div className='mt-6'>
        <div className="w-200 h-30 flex flex-col items-center justify-between mb-4 bg-purple-700 rounded-2xl p-3 border border-purple-900">
          {/* Icon + Text */}
          <div className='w-full flex items-center justify-between'>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="text-white" size={24} />
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-none">
                  TaskFlow
                  <br />
                  <span className="text-white text-sm font-normal opacity-80">
                    Productivity Reimagined
                  </span>
                </p>
              </div>
            </div>

            {/* right */}
            <div className="flex items-center gap-2 px-4 py-2 bg-linear-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full border border-violet-400/30">
              <TrendingUp size={16} className="text-emerald-400" />
              <span className="text-white font-bold text-sm transition-all duration-500">{activeTodo} Active</span>
            </div>
          </div>

          {/*Progress Bar*/}
          {todoList.length > 0 && (
            <div className='w-full flex flex-col justify-between'>
              <div className='w-full flex justify-between'>
                <p className='text-white text-sm font-semibold'>Progress</p>
                <p className='text-white text-sm font-semibold transition-all duration-500'>{progress}%</p>
              </div>
              <div className='w-full h-2 bg-white mt-2 rounded-xl'>
                <div className=' h-2 bg-lime-400 rounded-xl transition-all duration-800'
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

        </div>

        <div className='mt-4 flex justify-between'>

          <div className='w-50 h-20 bg-purple-700 rounded-2xl px-4 py-3 border border-purple-900 hover:scale-105 transition-all duration-500'>
            <div className='flex items-center gap-2'>
              <FaClipboardList className='w-4 h-4 text-white' />
              <span className='text-white font-semibold text-sm'>Total</span>
            </div>
            <div className='text-white font-bold text-2xl transition-all duration-500'>{todoList.length}</div>
          </div>

          <div className='w-50 h-20 bg-purple-700 rounded-2xl px-4 py-3 border border-purple-900 hover:scale-105 transition-all duration-500'>
            <div className='flex items-center gap-2'>
              <FaRegCircle className='w-4 h-4 text-sky-200' />
              <span className='text-sky-200 font-semibold text-sm'>Active</span>
            </div>
            <div className='text-white font-bold text-2xl transition-all duration-500'>
              {activeTodo}
            </div>
          </div>

          <div className='w-50 h-20 bg-purple-700 rounded-2xl px-4 py-3 border border-purple-900 hover:scale-105 transition-all duration-500'>
            <div className='flex items-center gap-2'>
              <FaRegCheckCircle className='w-4 h-4 text-green-200' />
              <span className='text-green-200 font-semibold text-sm'>Done</span>
            </div>
            <div className='text-white font-bold text-2xl transition-all duration-500'>{doneTodo}</div>
          </div>
        </div>


        <div className='w-200 h-15 bg-purple-700 rounded-2xl my-4 flex gap-2 items-center justify-center'>
          <input placeholder="What's on your mind?"
            className='w-170 h-10 bg-purple-300 border-none rounded-xl p-3 outline-none'
            value={todo.title}
            onChange={handleTodoBox}
          />
          <button className="flex items-center gap-2 h-10 px-5 bg-linear-to-tl from-purple-600 to-pink-600 rounded-xl text-white font-bold hover:cursor-pointer
          hover:from-purple-700 hover:to-pink-700 hover:scale-105 transform transition-all duration-200"
            onClick={handleAddTodo}
          >
            <span className="text-xl">+</span>
            Add
          </button>
        </div>



        {todoList.length > 0 ? (
          <div className='flex flex-col gap-2'>
            {todoList.map((todoValue, index) => {
              return ( 
                editIndex === index ? 
                   <div className='w-full h-10 bg-purple-700 rounded-xl px-4 py-3 flex gap-4 justify-between items-center hover:scale-105  
                   transition-all duration-500'>
                    <input value={editValue} 
                    onChange={handleUpdateBoxChange}
                    className='w-170 h-8 bg-purple-300 border-none rounded-lg p-3 outline-none'
                    />
                    <button onClick={handleUpdateButton}
                    className='px-4 bg-blue-600 text-white text-sm font-semibold py-1 rounded-lg hover:bg-blue-800 hover:cursor-pointer transition-all duration-500'
                    >Update</button>
                   </div>
                 :  
                <div className={`w-full h-10 bg-purple-700 rounded-xl px-4 py-3 flex justify-between items-center hover:scale-105  transition-all duration-500
                        ${deletingIndex === index ? "opacity-0 scale-90" : "opacity-100"}
                        ${animateAdd ? "scale-105" : "scale-100"}`}
                  key={index}>
                  <div className='flex gap-2 items-center'>
                    <div onClick={() => handleToogleTodoStatus(index)} >
                      {todoValue.done ? <CheckSquare className='text-white transition-all duration-500 hover:cursor-pointer' size={20} />
                        :
                        <Square className='text-white transition-all duration-500 hover:cursor-pointer' size={20} />}
                    </div>
                    <p className='text-white text-xl font-normal'>{todoValue.title}</p></div>
                  <div className='flex gap-1'>
                    <div className='w-7 h-7 bg-purple-500 text-blue-600 flex items-center justify-center rounded-sm transition-all duration-500 
                    hover:cursor-pointer hover:text-blue-800'
                    onClick={()=>handleEdit(index, todoValue.title)}
                    ><FaPen /></div>
                    <div className='w-7 h-7 bg-purple-500 text-pink-600 flex items-center justify-center rounded-sm transition-all duration-500 
                    hover:cursor-pointer hover:text-pink-800'
                      onClick={() => handleDeleteTodo(index)}
                    ><FaTrash /></div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className='w-200 h-70 bg-purple-700 rounded-2xl my-4 flex flex-col items-center justify-center transition-all duration-300
                          animate-fadeIn'>
            <div className="w-12 h-12 bg-linear-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="text-white" size={24} />
            </div>
            <div className=''>
              <p className="text-white font-bold text-lg leading-none flex flex-col items-center justify-center">
                No tasks yet
                <br />
                <span className="text-white text-sm font-normal opacity-80">
                  Create your first task to get started
                </span>
              </p>
            </div>
          </div>
        )}


      </div>


    </div>
  )
}

export default App
