import { createSlice } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import { nanoid } from '@reduxjs/toolkit';


const initialState = [
  {
    id: nanoid(),
    title: 'Learning Redux Toolkit',
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 20 }).toISOString(),
  },
  {
    id: nanoid(),
    title: 'Slices...',
    content: "The more I say slice, the more I want pizza.",
    date: sub(new Date(), { minutes: 15 }).toISOString(),
  },
  {
    id: nanoid(),
    title: 'Toolkit...',
    content: "They say it's makes redux easier...i still don't see how.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  }
];

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.push(action.payload);
    },
    editNote: (state, action) => {
      const { id, title, content } = action.payload;
      const existingNote = state.find((note) => note.id === id);
      if (existingNote) {
        existingNote.title = title;
        existingNote.content = content;
        existingNote.date = new Date().toISOString();
      }
    },
    deleteNote: (state, action) => {
      const id = action.payload;
      const index = state.findIndex((note) => note.id === id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addNote, editNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
