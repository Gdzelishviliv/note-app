"use client";

import React from "react";
import Note from "./components/Note";

const colors = [
  "bg-yellow-200",
  "bg-green-200",
  "bg-blue-200",
  "bg-red-200",
  "bg-purple-200",
];

const Home: React.FC = () => {
  const [notes, setNotes] = React.useState<{ id: string; color: string }[]>([]);
  const [showColorSelector, setShowColorSelector] = React.useState(false);

  const addNote = (color: string) => {
    setNotes([...notes, { id: Date.now().toString(), color }]);
    setShowColorSelector(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4">
      <div className="relative">
        {notes.map((note) => (
          <Note key={note.id} color={note.color} />
        ))}
        <div
          className={`fixed bottom-4 right-4 ${
            showColorSelector ? "flex" : "hidden"
          } flex-col space-y-2`}
        >
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => addNote(color)}
              className={`w-12 h-12 rounded-full ${color}`}
            />
          ))}
        </div>
        <button
          onClick={() => setShowColorSelector(!showColorSelector)}
          className="fixed bottom-4 right-4 w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Home;
