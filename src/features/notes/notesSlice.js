import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
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
