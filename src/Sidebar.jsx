import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ toggleTheme, darkMode, onTaskStatusChange, currentStatus }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''} ${darkMode ? 'dark-mode' : ''}`}>
        <h2>My Day</h2>
        <ul>
          <li className={currentStatus === 'todo' ? 'active' : ''} onClick={() => onTaskStatusChange('todo')}>To Do</li>
          <li className={currentStatus === 'in-progress' ? 'active' : ''} onClick={() => onTaskStatusChange('in-progress')}>In Progress</li>
          <li className={currentStatus === 'done' ? 'active' : ''} onClick={() => onTaskStatusChange('done')}>Done</li>
        </ul>
        <button onClick={toggleTheme} className="theme-toggle">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button className="close-button" onClick={handleCloseSidebar}>
          Close
        </button>
      </div>

      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>
    </>
  );
};

export default Sidebar;
