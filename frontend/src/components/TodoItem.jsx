import React from "react";

const TodoItem = ({
  id,
  title,
  completed,
  description,
  onDelete,
  onMarkCompleted,
}) => {
  const handleDelete = () => {
    onDelete(id);
  };

  const handleMarkCompleted = () => {
    onMarkCompleted(id);
  };

  return (
    <div className={`todo-item ${completed ? "task-completed-item" : ""}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="button-container">
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
        {!completed && (
          <button className="update-btn" onClick={handleMarkCompleted}>
            Mark as Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
