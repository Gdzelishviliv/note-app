"use client"
import { useState } from "react";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const generateId = () => {
  return `_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
};

const Note: React.FC<{ color: string }> = ({ color }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState("");

  const addTask = () => {
    if (inputText.trim()) {
      setTasks([
        ...tasks,
        { id: generateId(), text: inputText, completed: false },
      ]);
      setInputText("");
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const downloadNote = () => {
    const blob = new Blob([JSON.stringify(tasks)], {
      type: "text/plain;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "note.txt";
    link.click();
  };

  return (
    <div className={`relative p-4 m-4 border rounded-lg shadow-lg ${color}`}>
      <div className="absolute top-0 right-0 p-2">
        <button
          onClick={downloadNote}
          className="text-white bg-blue-500 p-1 rounded-full"
        >
          📥
        </button>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              className="form-checkbox"
            />
            <span className={task.completed ? "line-through" : ""}>
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="ml-2 text-red-500"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="mt-2 w-full p-2 border rounded"
      />
      <button
        onClick={addTask}
        className="mt-2 bg-green-500 text-white p-2 rounded"
      >
        Add Task
      </button>
    </div>
  );
};

export default Note;
