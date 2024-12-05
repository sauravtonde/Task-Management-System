import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Load tasks and theme from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const savedTheme = localStorage.getItem("theme");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  // Save tasks and theme to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [tasks, darkMode]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((_, index) => index !== id));
  };

  const editTask = (id, updatedTask) => {
    const updatedTasks = tasks.map((task, index) =>
      index === id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task, index) =>
        index === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleFavorite = (id) => {
    setTasks(
      tasks.map((task, index) =>
        index === id ? { ...task, favorite: !task.favorite } : task
      )
    );
  };

  const filteredTasks = tasks
    .filter((task) =>
      filter === "All" ? true : task.category === filter
    )
    .filter((task) =>
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      } flex flex-col items-center p-4`}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <h1 className="text-3xl font-bold my-4">Task Manager</h1>
      <TaskForm addTask={addTask} darkMode={darkMode} />

      <div className="flex flex-col items-center my-4 space-y-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full px-4 py-2 border rounded-md ${
            darkMode
              ? "bg-gray-800 text-gray-100 border-gray-600"
              : "bg-white border-gray-300"
          }`}
        />
        <div className="flex space-x-4">
          {["All", "Work", "Personal", "Urgent"].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-md ${
                filter === category
                  ? "bg-blue-500 text-white"
                  : darkMode
                  ? "bg-gray-800 text-gray-100 hover:bg-gray-700"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        editTask={editTask}
        toggleCompletion={toggleCompletion}
        toggleFavorite={toggleFavorite}
        darkMode={darkMode}
      />
    </div>
  );
};

export default App;
