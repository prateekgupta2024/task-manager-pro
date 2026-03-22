function TaskList({
  tasks,
  deleteTask,
  toggleTask,
  startEdit,
  editTaskId,
  editText,
  setEditText,
  editPriority,
  setEditPriority,
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
              <div className="task-main">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="task-input edit-input"
                />

                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  className="task-input edit-select"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

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
              <div className="task-main">
                <span
                  className={task.completed ? "task-text completed" : "task-text"}
                  onClick={() => toggleTask(task.id)}
                  title="Click to mark complete/incomplete"
                >
                  {task.text}
                </span>

                <span className={`priority-badge ${task.priority}`}>
                  {task.priority}
                </span>
              </div>

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