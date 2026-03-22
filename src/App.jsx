import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import useLocalStorage from "./hooks/useLocalStorage";



function App() {
  

  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState("");
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  

  function addTask() {
    if (input.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  }

  function deleteTask(taskId) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  }

  function toggleTask(taskId) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  function startEdit(taskId) {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (!taskToEdit) return;

    setEditTaskId(taskId);
    setEditText(taskToEdit.text);
  }

  function saveEdit() {
    if (editText.trim() === "") return;

    const updatedTasks = tasks.map((task) => {
      if (task.id === editTaskId) {
        return {
          ...task,
          text: editText.trim(),
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    setEditTaskId(null);
    setEditText("");
  }

  function cancelEdit() {
    setEditTaskId(null);
    setEditText("");
  }

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .filter((task) =>
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="app-container">
      <div className="task-card">
        <h1 className="app-heading">Task Manager Pro</h1>

        <TaskForm input={input} setInput={setInput} addTask={addTask} />

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="task-input search-input"
        />

        <div className="filter-row">
          <button
            className={filter === "all" ? "filter-btn active-filter" : "filter-btn"}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={
              filter === "completed" ? "filter-btn active-filter" : "filter-btn"
            }
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>

          <button
            className={
              filter === "pending" ? "filter-btn active-filter" : "filter-btn"
            }
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>

        <p className="task-count">Total Tasks: {tasks.length}</p>

        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          startEdit={startEdit}
          editTaskId={editTaskId}
          editText={editText}
          setEditText={setEditText}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
        />
      </div>
    </div>
  );
}

export default App;