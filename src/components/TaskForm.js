import React, { useState } from "react";

const TaskForm = ({ addTask, darkMode }) => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    addTask({
      text: task.trim(),
      category,
      priority,
      completed: false,
    });
    setTask("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md flex flex-col space-y-2 mb-4"
    >
      <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          darkMode
            ? "bg-gray-800 text-gray-100 border-gray-600"
            : "bg-white border-gray-300"
        }`}
      />
      <div className="flex space-x-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`flex-grow px-4 py-2 border rounded-md ${
            darkMode
              ? "bg-gray-800 text-gray-100 border-gray-600"
              : "bg-white border-gray-300"
          }`}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={`flex-grow px-4 py-2 border rounded-md ${
            darkMode
              ? "bg-gray-800 text-gray-100 border-gray-600"
              : "bg-white border-gray-300"
          }`}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
