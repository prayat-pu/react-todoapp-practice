function TaskItem({task, onToggle, onEdit, onDelete}){
   return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span
          style={{
            textDecoration: task.completed ? 'line-through' : 'none'
          }}
        >
          {task.text}
        </span>
      </label>
    
    <div className="task-actions">
        <button type="button" onClick={() => onEdit(task)}>
        Edit
      </button>
      <button type="button" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
    </li>
  )
}

export default TaskItem