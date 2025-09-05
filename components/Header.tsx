
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 py-2">
        Todo App
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        Stay organized and productive
      </p>
    </header>
  );
};

export default Header;
