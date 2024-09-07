"use client";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const generateId = () => {
  return `_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
};

const Note: React.FC<{ color: string; noteId: string; index: number }> = ({
  color,
  noteId,
  index,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem(noteId);
    if (storedTasks) {
      try {
        const parsedTasks: Task[] = JSON.parse(storedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
      }
    }
  }, [noteId]);

  useEffect(() => {
    if (tasks.length > 0) {
      try {
        localStorage.setItem(noteId, JSON.stringify(tasks));
      } catch (error) {
        console.error("Error saving tasks to localStorage:", error);
      }
    }
  }, [tasks, noteId]);

  const addTask = () => {
    if (inputText.trim()) {
      const newTask = { id: generateId(), text: inputText, completed: false };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setInputText("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const downloadNote = () => {
    const blob = new Blob([JSON.stringify(tasks)], {
      type: "text/plain;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `note_${noteId}.txt`;
    link.click();
  };

  return (
    <Draggable draggableId={noteId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`relative flex flex-col-reverse p-4 m-4 border rounded-lg shadow-lg ${color}`}
        >
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
              <div
                key={task.id}
                className="flex items-center justify-between gap-8"
              >
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
                  className="text-red-500"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={inputText}
              onKeyDown={handleKeyDown}
              placeholder="Type note"
              onChange={(e) => setInputText(e.target.value)}
              className="mt-2 w-full p-2 border rounded h-10"
            />
            <button
              onClick={addTask}
              className="mt-2 bg-green-500 text-white p-2 rounded h-10 w-24"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Note;
