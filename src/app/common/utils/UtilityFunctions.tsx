import { Task } from "../types";

export const generateId = (): string =>
  `_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;

export const downloadNoteContent = (noteId: string, tasks: Task[]): void => {
  const blob = new Blob([JSON.stringify(tasks)], {
    type: "text/plain;charset=utf-8",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `note_${noteId}.txt`;
  link.click();
};

export const loadTasksFromLocalStorage = (noteId: string): Task[] => {
  try {
    const storedTasks = localStorage.getItem(noteId);
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error("Error parsing tasks from localStorage:", error);
    return [];
  }
};

export const saveTasksToLocalStorage = (
  noteId: string,
  tasks: Task[]
): void => {
  try {
    localStorage.setItem(noteId, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
};
