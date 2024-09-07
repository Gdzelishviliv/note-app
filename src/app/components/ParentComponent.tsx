import React, { useState } from "react";
import Note from "./Note";

interface Note {
  id: string;
  color: string;
}

const ParentComponent = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const handleRemoveNote = (noteId: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    localStorage.removeItem(noteId);
  };

  const addNote = (color: string) => {
    const newNote = { id: generateId(), color };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const generateId = () => {
    return `_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
  };

  return (
    <div>
      {notes.map((note, index) => (
        <Note
          key={note.id}
          noteId={note.id}
          color={note.color}
          index={index}
          onRemove={handleRemoveNote}
        />
      ))}
      <button
        onClick={() => addNote("bg-yellow-200")}
        className="mt-4 bg-gray-300 p-2 rounded"
      >
        Add Note
      </button>
    </div>
  );
};

export default ParentComponent;
