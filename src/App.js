import { useState } from "react";
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const addTask = () => {
    if (input.trim() === "") return;

    if (editId) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editId ? { ...task, text: input } : task
        )
      );
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    }

    setInput("");
  };

  const editTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    setInput(task.text);
    setEditId(id);
  };

  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    setDeletingId(id);
    setTimeout(() => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setDeletingId(null);
    }, 200);
  };

  // Handle "Enter" key press to trigger task addition
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">CI/CD Test - PinkList App</h1>

        <div className="input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown} // Add this line for key press detection
            className="input"
            placeholder="Add a new task..."
          />
          <button
            onClick={addTask}
            className="button"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`task ${deletingId === task.id ? "deleting" : ""} ${task.completed ? "completed" : ""}`}
            >
              <span className="task-text">{task.text}</span>

              <div className="actions">
                <button
                  onClick={() => toggleDone(task.id)}
                  className="action-btn done"
                  title="Mark Done"
                >
                  ✅
                </button>
                <button
                  onClick={() => editTask(task.id)}
                  className="action-btn edit"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => removeTask(task.id)}
                  className="action-btn delete"
                  title="Delete"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
