function TaskForm({ input, setInput, addTask, priority, setPriority }) {
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addTask();
    }
  }

  return (
    <div className="form-row">
      <input
        type="text"
        placeholder="Enter task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="task-input"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="task-input priority-select"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button onClick={addTask} className="add-btn">
        Add Task
      </button>
    </div>
  );
}

export default TaskForm;