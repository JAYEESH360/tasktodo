import React, { useState } from 'react';

const TaskList = ({ board, addTaskToBoard, currentStatus }) => {
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddTask = () => {
    if (!newTask.trim()) {
      setErrorMessage('Task cannot be empty');
      return;
    }
    setErrorMessage('');
    const newTaskObject = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
      status: currentStatus, // Set initial status based on currentStatus prop
    };

    const updatedBoard = {
      ...board,
      columns: [
        {
          ...board.columns[0],
          tasks: [...board.columns[0].tasks, newTaskObject],
        },
        ...board.columns.slice(1),
      ],
    };

    addTaskToBoard(board.id, updatedBoard);
    setNewTask('');
  };

  const handleEditTask = (taskId, currentText) => {
    setEditTaskId(taskId);
    setEditTaskValue(currentText);
    setErrorMessage('');
  };

  const handleSaveEditTask = (taskId) => {
    if (!editTaskValue.trim()) {
      setErrorMessage('Task cannot be empty');
      return;
    }
    setErrorMessage('');

    const updatedTasks = board.columns[0].tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, text: editTaskValue.trim() };
      }
      return task;
    });

    const updatedBoard = {
      ...board,
      columns: [
        {
          ...board.columns[0],
          tasks: updatedTasks,
        },
        ...board.columns.slice(1),
      ],
    };

    addTaskToBoard(board.id, updatedBoard);
    setEditTaskId(null);
    setEditTaskValue('');
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = board.columns[0].tasks.filter((task) => task.id !== taskId);
    const updatedBoard = {
      ...board,
      columns: [
        {
          ...board.columns[0],
          tasks: updatedTasks,
        },
        ...board.columns.slice(1),
      ],
    };

    addTaskToBoard(board.id, updatedBoard);
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = board.columns[0].tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    const updatedBoard = {
      ...board,
      columns: [
        {
          ...board.columns[0],
          tasks: updatedTasks,
        },
        ...board.columns.slice(1),
      ],
    };

    addTaskToBoard(board.id, updatedBoard);
  };

  const handleMoveTask = (taskId, newStatus) => {
    const updatedTasks = board.columns[0].tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: newStatus }; // Update task status
      }
      return task;
    });

    const updatedBoard = {
      ...board,
      columns: [
        {
          ...board.columns[0],
          tasks: updatedTasks,
        },
        ...board.columns.slice(1),
      ],
    };

    addTaskToBoard(board.id, updatedBoard);
  };

  const filteredTasks = board.columns[0].tasks.filter((task) => task.status === currentStatus);

  return (
    <div className="task-list">
      <h2>{board.name}</h2>

      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
            setErrorMessage('');
          }}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask}>Add</button>
        {errorMessage && <span className="error-message">{errorMessage}</span>}
      </div>

      <div>
        {filteredTasks.map((task) => (
          <div key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <span className={task.completed ? 'completed-task' : ''}>
              {editTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editTaskValue}
                    onChange={(e) => {
                      setEditTaskValue(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="Edit task"
                  />
                  <button onClick={() => handleSaveEditTask(task.id)}>Save</button>
                </>
              ) : (
                <>
                  {task.text}
                  <button onClick={() => handleEditTask(task.id, task.text)}>Edit</button>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                  <button onClick={() => handleMoveTask(task.id, 'in-progress')}>Move to In Progress</button>
                  <button onClick={() => handleMoveTask(task.id, 'done')}>Move to Done</button>
                </>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
