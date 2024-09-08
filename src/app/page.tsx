"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { NoteProps } from "./common/types";

const Note = dynamic(() => import("./common/components/Note"), { ssr: false });

const colors = [
  "bg-yellow-200",
  "bg-green-200",
  "bg-blue-200",
  "bg-red-200",
  "bg-purple-200",
];

const Home: React.FC = () => {
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [showColorSelector, setShowColorSelector] = useState(false);

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

  const handleRemoveNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    localStorage.removeItem(id);
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
                <Note
                  key={note.id}
                  color={note.color}
                  noteId={note.id}
                  index={index}
                  onRemove={handleRemoveNote}
                />
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
