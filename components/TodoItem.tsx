import React, { useState, useRef, useEffect } from 'react';
import type { Todo } from '../types';
import TrashIcon from './icons/TrashIcon';
import SaveIcon from './icons/SaveIcon';
import CancelIcon from './icons/CancelIcon';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editText.trim()) {
      editTodo(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <li className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="h-6 w-6 rounded-md border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isEditing}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      {isEditing ? (
        <div className="flex-grow mx-4 flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleCancel} // Cancel on blur for better UX
            className="flex-grow p-1 text-lg border-b-2 border-blue-500 bg-transparent dark:text-gray-200 focus:outline-none"
            aria-label="Edit todo text"
          />
          <button
            onClick={handleSave}
            className="text-gray-400 hover:text-green-500 dark:hover:text-green-400 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Save changes"
          >
            <SaveIcon className="w-6 h-6" />
          </button>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Cancel edit"
          >
            <CancelIcon className="w-6 h-6" />
          </button>
        </div>
      ) : (
        <>
          <span
            onClick={() => setIsEditing(true)}
            className={`flex-grow mx-4 text-lg cursor-pointer ${
              todo.completed
                ? 'line-through text-gray-400 dark:text-gray-500'
                : 'text-gray-800 dark:text-gray-200'
            } transition-colors`}
          >
            {todo.text}
          </span>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full p-1"
            aria-label={`Delete todo: "${todo.text}"`}
          >
            <TrashIcon className="w-6 h-6" />
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
