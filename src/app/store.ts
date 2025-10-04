import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import todoReducer, {
  fetchTodosRequested,
  fetchTodosSucceeded,
  fetchTodosFailed,
} from '../features/todoSlice';
import currentTodoReducer, { SET, SETBYID } from '../features/currentTodoSlice';
import filterReducer from '../features/filterSlice';

import { getTodos } from '../api';

const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: fetchTodosRequested,
  effect: async (_action, api) => {
    try {
      const data = await getTodos();

      api.dispatch(fetchTodosSucceeded(data));
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'Failed to load user';

      api.dispatch(fetchTodosFailed(errorMessage));
    }
  },
});

listener.startListening({
  actionCreator: SETBYID,
  effect: (action, api) => {
    const state = api.getState() as RootState;
    const todoId = action.payload;
    const foundTodo = state.todos.data.find(todo => todo.id === todoId);

    if (foundTodo) {
      api.dispatch(SET(foundTodo));
    }
  },
});

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    currentTodo: currentTodoReducer,
    filter: filterReducer,
  },
  middleware: gDM => gDM().prepend(listener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
