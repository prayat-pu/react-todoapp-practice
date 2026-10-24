import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import TaskItem from './components/TaskItem'
import TaskForm from './components/TaskForm'


function App() {
  const [taskText, setTaskText] = useState('')
  const [tasks, setTasks] = useState([])
  const [editingId, setEditingId] = useState(null)
  const remainingCount = tasks.filter((task)=>!task.completed).length
  const [filter, setFilter] = useState('all')

  const visibleTasks = tasks.filter((task)=>{
    if (filter==='active') return !task.completed
    if (filter==='completed') return task.completed
    return true
  })




  function addTask(){
    if (taskText.trim() === '') return

    const newTask = {
      id: crypto.randomUUID(),
      text: taskText.trim(),
      completed: false
    }
    setTasks([...tasks, newTask])
    setTaskText('')
  }

  function handleSubmit(event){
    event.preventDefault()
    

    if (taskText.trim() === '') return

    if (editingId === null){
      addTask()
    } else{
      setTasks(tasks.map((task)=>{
        if (task.id === editingId){
          return {...task,text: taskText.trim()}
        }
        return task
      }))
      
      setTaskText('')
      setEditingId(null)

    }
  }

  function deleteTask(id){
    setTasks(tasks.filter((task)=>task.id!==id))
  }

  function toggleTask(id){
    setTasks(tasks.map((task)=>{
      if (task.id===id){
        return {...task, completed:!task.completed}
      }
      return task
    
    }))
  }

  function startEditing(task){
    setTaskText(task.text)
    setEditingId(task.id)
  }

  function cancelEditing(){
    setTaskText('')
    setEditingId(null)
  }



  return (
    <div>
      <h1> My To-Do List</h1>
      
      <TaskForm
        taskText={taskText}
        editingId={editingId}
        onTextChange={setTaskText}
        onSubmit={handleSubmit}
        onCancel={cancelEditing}
      />

      <p>{remainingCount} tasks remaining</p>
      {tasks.length === 0 && (
        <p>No tasks yet. Add your first Task above!</p>
      )}

      <div>
        <button type="button" onClick={()=> setFilter('all')}>All</button>
        <button type="button" onClick={()=> setFilter('active')}>Active</button>
        <button type="button" onClick={()=> setFilter('completed')}>Completed</button>
      </div>

      <ul>
        {visibleTasks.map((task)=>(
         <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleTask}
          onEdit={startEditing}
          onDelete={deleteTask}
         />
        ))}
      </ul>
    </div>
  )
}

export default App
