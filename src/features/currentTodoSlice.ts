import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type State = { todo?: Todo };

const initialState: State = {};

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    SET: (state, action: PayloadAction<Todo>) => {
      state.todo = action.payload;
    },
    SETBYID: (_state, _action: PayloadAction<number>) => {
      // This reducer will be handled by middleware to find todo by ID
      // The actual todo will be set by setCurrentTodo action
    },
    REMOVE: (state) => {
      state.todo = undefined;
    },
  },
});

export const { SET, SETBYID, REMOVE } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
