import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("low");

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortType, setSortType] = useState("none");

  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editPriority, setEditPriority] = useState("low");

  function addTask() {
    if (input.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      priority: priority,
    };

    setTasks([...tasks, newTask]);
    setInput("");
    setPriority("low");
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
    setEditPriority(taskToEdit.priority || "low");
  }

  function saveEdit() {
    if (editText.trim() === "") return;

    const updatedTasks = tasks.map((task) => {
      if (task.id === editTaskId) {
        return {
          ...task,
          text: editText.trim(),
          priority: editPriority,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    setEditTaskId(null);
    setEditText("");
    setEditPriority("low");
  }

  function cancelEdit() {
    setEditTaskId(null);
    setEditText("");
    setEditPriority("low");
  }

  let filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .filter((task) =>
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (sortType === "priority") {
    const priorityOrder = {
      high: 3,
      medium: 2,
      low: 1,
    };

    filteredTasks = [...filteredTasks].sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
    );
  }

  const totalCount = tasks.length;
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.filter((task) => !task.completed).length;
  const highCount = tasks.filter((task) => task.priority === "high").length;

  return (
    <div className="app-container">
      <div className="task-card">
        <h1 className="app-heading">Task Manager Pro</h1>

        <TaskForm
          input={input}
          setInput={setInput}
          addTask={addTask}
          priority={priority}
          setPriority={setPriority}
        />

        <div className="stats">
          <p>Total: {totalCount}</p>
          <p>Completed: {completedCount}</p>
          <p>Pending: {pendingCount}</p>
          <p>High: {highCount}</p>
        </div>

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

        <div className="filter-row">
          <button
            className={sortType === "none" ? "filter-btn active-filter" : "filter-btn"}
            onClick={() => setSortType("none")}
          >
            No Sort
          </button>

          <button
            className={
              sortType === "priority" ? "filter-btn active-filter" : "filter-btn"
            }
            onClick={() => setSortType("priority")}
          >
            Sort by Priority
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
          editPriority={editPriority}
          setEditPriority={setEditPriority}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
        />
      </div>
    </div>
  );
}

export default App;