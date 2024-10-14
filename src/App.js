import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import Sidebar from './Sidebar';
import data from './data.json';
import './App.css';

const App = () => {
  const [boards, setBoards] = useState([]);
  const [activeBoard, setActiveBoard] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('todo'); // State for current task status

  useEffect(() => {
    setBoards(data.boards); 
  }, []);

  const handleBoardChange = (index) => {
    setActiveBoard(index);
  };

  const addTaskToBoard = (boardId, updatedBoard) => {
    setBoards((prevBoards) => {
      return prevBoards.map((board) => (board.id === boardId ? updatedBoard : board));
    });
  };

  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const handleTaskStatusChange = (status) => {
    setCurrentStatus(status); // Update the current status based on sidebar button clicks
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Sidebar 
        onBoardChange={handleBoardChange} 
        toggleTheme={toggleTheme} 
        darkMode={darkMode} 
        currentStatus={currentStatus} // Pass current status
        onTaskStatusChange={handleTaskStatusChange} // Pass function to change status
      />
      {boards.length > 0 && (
        <TaskList
          board={boards[activeBoard]}
          addTaskToBoard={addTaskToBoard}
          darkMode={darkMode} 
          currentStatus={currentStatus} // Pass current status to TaskList
        />
      )}
    </div>
  );
};

export default App;
