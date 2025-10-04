/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchTodosRequested } from './features/todoSlice';
import { SETBYID, REMOVE } from './features/currentTodoSlice';

import { Status } from './types/Status';
import { SET_STATUS, SET_QUERY } from './features/filterSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(s => s.todos);
  //const [filterTodos, setFilterTodos] = useState<Filter>('all');
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { todo } = useAppSelector(s => s.currentTodo);
  //const [searchQuery, setSearchQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const { query, status } = useAppSelector(s => s.filter);

  useEffect(() => {
    dispatch(fetchTodosRequested());
  }, [dispatch]);

  const handleFilterChange = (filter: Status) => {
    dispatch(SET_STATUS({ status: filter }));
  };

  const handleTodoSelect = (Id: number, selectedTodo: Todo) => {
    setIsOpen(true);
    setSelectedTodoId(selectedTodo.id);
    dispatch(SETBYID(selectedTodo.id));
    setUser(null); // Reset user when opening modal
    getUser(Id).then(setUser);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    dispatch(REMOVE());
    setSelectedTodoId(null);
    setUser(null);
  };

  const handleTodoDeselect = () => {
    setSelectedTodoId(null);
  };

  const handleSearchChange = (searchQuery: string) => {
    dispatch(SET_QUERY({ query: searchQuery }));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={status}
                onFilterChange={handleFilterChange}
                searchQuery={query}
                onSearchChange={handleSearchChange}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={data}
                filter={status}
                onTodoSelect={handleTodoSelect}
                searchQuery={query}
                selectedTodoId={selectedTodoId}
                onTodoDeselect={handleTodoDeselect}
              />
            </div>
          </div>
        </div>
      </div>
      {isOpen && todo && (
        <TodoModal onClose={handleModalClose} user={user} todo={todo} />
      )}
    </>
  );
};
