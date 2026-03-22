function TaskList({
  tasks,
  deleteTask,
  toggleTask,
  startEdit,
  editTaskId,
  editText,
  setEditText,
  saveEdit,
  cancelEdit,
}) {
  if (tasks.length === 0) {
    return <p className="empty-message">No tasks found.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          {editTaskId === task.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="task-input edit-input"
              />

              <div className="task-actions">
                <button onClick={saveEdit} className="save-btn">
                  Save
                </button>
                <button onClick={cancelEdit} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <span
                className={task.completed ? "task-text completed" : "task-text"}
                onClick={() => toggleTask(task.id)}
                title="Click to mark complete/incomplete"
              >
                {task.text}
              </span>

              <div className="task-actions">
                <button onClick={() => startEdit(task.id)} className="edit-btn">
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;