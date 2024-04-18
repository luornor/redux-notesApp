// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { addNote,editNote,deleteNote } from './features/notes/notesSlice';
// import { nanoid } from '@reduxjs/toolkit';
// import { useState } from 'react';

// const App = () => {
//   const dispatch = useDispatch();

//   const [editMode, setEditMode] = useState(false);
//   const [editNoteId, setEditNoteId] = useState(null);
  
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   const notes = useSelector((state) => state.notes);


//   const handleAddNote = () => {
//     if (title.trim() !== '' && content.trim() !== '') {
//       if (editMode) {
//         dispatch(editNote({ id: editNoteId, title, content }));
//         setEditMode(false);
//         setEditNoteId(null);
//       } else {
//         dispatch(addNote({ id: nanoid(), title, content }));
//       }
//       setTitle('');
//       setContent('');
//     }
//   };

//   const handleEditNote = (note) => {
//     setTitle(note.title);
//     setContent(note.content);
//     setEditMode(true);
//     setEditNoteId(note.id);
//   };
  
//   const handleDeleteNote = (id) => {
//     dispatch(deleteNote({ id }));
//   };


//   return (
//     <>
//     <section className="w-1/2 m-auto">
//     <h1 className='text-center'>Notes App</h1>
//       {/* Render form for adding/editing note */}
//       <form onSubmit={handleAddNote}>
//       <input
//         type="text"
//         className='text-black'
//         placeholder='Title'
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <textarea
//         className='text-black'
//         placeholder='Enter a new Note Here...'
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//       />
//       <button className="bg-blue-500 rounded-md px-3 py-1 text-white border border-blue-600 hover:bg-blue-600" type="submit"
//       onClick={handleAddNote}
//       >{editMode ? 'Update Note' : 'Add Note'}</button>
//     </form>
//     </section>  
//       <ul>
//       {notes.map((note) => (
//       <li className="grid lg:grid-cols-3" key={note.id}>
//         <h2>{note.title}</h2>
//         <p>{note.content}</p>
        
//         <button className="bg-green-500 text-sm rounded-md px-3 py-1 text-white border border-green-600 hover:bg-green-600"
//         onClick={() => handleEditNote(note.id)}>Edit</button>
//         <button className="bg-red-500 text-sm rounded-md px-3 py-1 text-white border border-red-600 hover:bg-red-600"
//          onClick={() => handleDeleteNote(note.id)}>Delete</button>
        
//       </li>
//     ))}
//       </ul>
  
//     </>
//   );
// };

// export default App;
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNote, editNote, deleteNote } from './features/notes/notesSlice';

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
    <div className="w-1/2 m-auto">
      <h1>Notes App</h1>

      <form className='flex justify-center' onSubmit={handleAddNote}>
        <input
          type="text"
          className='text-black'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className='text-black'
        />
        <div className='flex justify-center'>
        <button className='w-1/2  bg-blue-500 rounded-md px-3 py-1 text-white border border-blue-600 hover:bg-blue-600"' onClick={handleAddNote}>
          {editMode ? 'Save Changes' : 'Add Note'}
        </button>
        </div>
      </form>

        <ul className='grid grid-col-3' >
          {notes.map((note) => (
  
            <li className='bg-white border border-white ' key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => handleEditNote(note)} className='edit'>Edit</button>
              <button onClick={() => handleDeleteNote(note.id)} className='delete'>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
  );
}

export default App;
