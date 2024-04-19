
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNote, editNote, deleteNote } from './features/notes/notesSlice';
import TimeAgo from './features/notes/TimeAgo';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (title.trim() !== '' && content.trim() !== '') {
      if (editMode) {
        dispatch(editNote({ id: editNoteId, title, content }));
        setEditMode(false);
        setEditNoteId(null);
      } else {
        dispatch(addNote({ id: Date.now(), title, content }));
      }
      setTitle('');
      setContent('');
    }
  };

  const handleEditNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditMode(true);
    setEditNoteId(note.id);
  };

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };

  return (
    <>
    <main className="w-1/2 m-auto border border-white p-6 rounded-lg shadow-md">
      <h1 className='text-center text-4xl font-bold mb-4'>Notes App</h1>

      <form onSubmit={handleAddNote} className="space-y-4">
        <input
          type="text"
          className='text-black block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your Notes Here..."
          className='text-black block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          rows='4'
        />
        <div className='flex justify-center'>
        <button className='w-1/2 bg-blue-500 rounded-md px-3 py-1 text-white border border-blue-600 hover:bg-blue-600'
         onClick={handleAddNote}>
          {editMode ? 'Save Changes' : 'Add Note'}
        </button>
        </div>
      </form>
      </main>
        <section className='grid grid-cols-3' >
          {notes.map((note) => (

            <article className='relative' key={note.id}>
              <h3 className='relative inline-block'>{note.title}
              <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>
              </h3>
              <p  className='mb-5'>{note.content.substring(0, 100)}</p>

              <div className='space-x-3 absolute bottom-0 left-2 '>
              <button onClick={() => handleEditNote(note)} 
              className="bg-green-500 rounded-md text-sm px-3 py-1 text-white border border-green-600 hover:bg-green-600">Edit</button>
              <button className="bg-red-500 text-sm rounded-md px-3 py-1 text-white border border-red-600 hover:bg-red-600"
               onClick={() => handleDeleteNote(note.id)} >
                Delete
              </button>
              </div>
              <span className="absolute font-light text-sm italic bottom-0 right-2">
              <TimeAgo timestamp={note.date} />
            </span>
            </article>
          ))}
        </section>
    </>
      
  );
}

export default App;
