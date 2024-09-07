"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Note = dynamic(() => import("./components/Note"), { ssr: false });

const colors = [
  "bg-yellow-200",
  "bg-green-200",
  "bg-blue-200",
  "bg-red-200",
  "bg-purple-200",
];

interface Note {
  id: string;
  color: string;
}

const Home: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showColorSelector, setShowColorSelector] = useState(false);
  const [savedNotes, setSavedNotes] = useState<Note[]>([]);

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (color: string) => {
    const newNote = { id: Date.now().toString(), color };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setShowColorSelector(false);
  };

  const removeNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const reorderedNotes = Array.from(notes);
    const [movedNote] = reorderedNotes.splice(source.index, 1);
    reorderedNotes.splice(destination.index, 0, movedNote);

    setNotes(reorderedNotes);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppableNotes" direction="vertical">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="relative"
            >
              {notes.map((note, index) => (
                <Note key={note.id} color={note.color} noteId={note.id} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

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
  );
};

export default Home;
