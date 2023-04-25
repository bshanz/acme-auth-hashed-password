import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, createNote, deleteNote } from "./store"; // Make sure to implement these actions in your store

const Notes = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { auth, notes } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotes(auth.id));
  }, [auth, dispatch]);

  const addNote = (ev) => {
    ev.preventDefault();
    dispatch(createNote({ userId: auth.id, title, content }));
    setTitle("");
    setContent("");
  };

  const removeNote = (id) => {
    dispatch(deleteNote(id));
  };

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={addNote}>
        <input
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(ev) => setContent(ev.target.value)}
        />
        <button disabled={!title || !content}>Add Note</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => removeNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
