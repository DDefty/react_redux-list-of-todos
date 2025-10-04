import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodoState = {
  data: Todo[];
  loading: boolean;
  error?: string;
};

const initialState: TodoState = { data: [], loading: false };

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchTodosRequested: state => {
      return { ...state, loading: true, error: undefined };
    },
    fetchTodosSucceeded: (state, action: PayloadAction<Todo[]>) => {
      return { ...state, loading: false, data: action.payload };
    },
    fetchTodosFailed: (state, action: PayloadAction<string>) => {
      return { ...state, loading: false, error: action.payload };
    },
  },
});

export const { fetchTodosRequested, fetchTodosSucceeded, fetchTodosFailed } =
  todoSlice.actions;
export default todoSlice.reducer;
