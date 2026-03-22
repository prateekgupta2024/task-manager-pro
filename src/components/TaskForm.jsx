function TaskForm({ input, setInput, addTask }) {
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

      <button onClick={addTask} className="add-btn">
        Add Task
      </button>
    </div>
  );
}

export default TaskForm;