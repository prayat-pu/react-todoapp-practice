function TaskForm({
  taskText,
  editingId,
  onTextChange,
  onSubmit,
  onCancel
}) {
  return (
    <form className="task-form" onSubmit={onSubmit}>
      <input
        type="text"
        aria-label="Task text"
        placeholder="Enter a task"
        value={taskText}
        onChange={(event) => onTextChange(event.target.value)}
      />

      <button type="submit">
        {editingId === null ? 'Add' : 'Save'}
      </button>

      {editingId !== null && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  )
}

export default TaskForm