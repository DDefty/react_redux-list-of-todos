import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodoState = {
  data: Todo[];
  loading: boolean;
  error?: string;
}

const initialState: TodoState = {data: [], loading: false};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchTodosRequested: (s) => { s.loading = true; s.error = undefined; },
    fetchTodosSucceeded: (s, a: PayloadAction<Todo[]>) => { s.loading = false; s.data = a.payload; },
    fetchTodosFailed: (s, a: PayloadAction<string>) => { s.loading = false; s.error = a.payload; },
  },
});

export const { fetchTodosRequested, fetchTodosSucceeded, fetchTodosFailed } = todoSlice.actions;
export default todoSlice.reducer;
