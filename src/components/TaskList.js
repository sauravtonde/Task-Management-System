import React, { useState } from "react";

const TaskList = ({
  tasks,
  deleteTask,
  editTask,
  toggleCompletion,
  toggleFavorite,
  darkMode,
}) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (index, task) => {
    setEditIndex(index);
    setEditText(task.text);
  };

  const saveEdit = (index) => {
    editTask(index, { ...tasks[index], text: editText });
    setEditIndex(null);
    setEditText("");
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-300 shadow-md rounded-md p-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center dark:text-gray-400">
          No tasks found!
        </p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`flex justify-between items-center px-4 py-2 border rounded-md ${
                task.completed ? "bg-green-100 line-through dark:bg-green-900" : ""
              } ${task.favorite ? "border-yellow-500" : ""}`}
            >
              {editIndex === index ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className={`flex-grow px-2 py-1 border rounded-md ${
                    darkMode
                      ? "bg-gray-700 text-gray-100 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                />
              ) : (
                <div>
                  <p
                    className={`font-medium ${
                      task.category === "Personal" && darkMode
                        ? "text-blue-700"
                        : ""
                    }`}
                  >
                    {task.text}
                  </p>
                  <p
                    className={`text-sm ${
                      task.priority === "Low" && darkMode
                        ? "text-gray-300"
                        : "text-gray-500"
                    }`}
                  >
                    {task.category} - {task.priority} Priority
                  </p>
                </div>
              )}
              <div className="space-x-2">
                {editIndex === index ? (
                  <button
                    onClick={() => saveEdit(index)}
                    className="text-green-500 hover:text-green-700"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(index, task)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => toggleCompletion(index)}
                  className={`${
                    task.completed
                      ? "text-green-600 hover:text-green-800"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => toggleFavorite(index)}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  {task.favorite ? "★" : "☆"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
