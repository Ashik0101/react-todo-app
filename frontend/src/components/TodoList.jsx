import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { url } from "./url";
import "../styles/TodoList.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const notifyAfterDelete = () =>
    toast.success("Todo Deleted Successfully!", {
      position: "top-center",
      theme: "colored",
    });
  const notifyAfterUpdate = () =>
    toast.success("Todo  marked as completed!", {
      position: "top-center",
      theme: "colored",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/todos`);
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleDeleteTodo = async (id) => {
    console.log("id  after delete : ", id);
    try {
      const resp = await fetch(`${url}/todos/${id}`, {
        method: "DELETE",
      });

      const res = await resp.json();
      if (res.message == "Todo deleted successfully") {
        notifyAfterDelete();
      }

      // Update the state to remove the deleted todo
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleMarkCompletedTodo = async (id) => {
    try {
      const resppnseObject = await fetch(`${url}/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: true }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response object :", resppnseObject);
      if (resppnseObject.status == 200) {
        notifyAfterUpdate();
      }
      // Update the state to mark the todo as completed
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: true } : todo
        )
      );
      console.log("after :", todos);
    } catch (error) {
      console.error("Error marking todo as completed:", error);
    }
  };

  return (
    <>
      {todos.length && (
        <div className="todo-item-conatainer">
          {todos.map((todo) => {
            return (
              <TodoItem
                key={todo._id}
                id={todo._id}
                title={todo.title}
                completed={todo.completed}
                description={todo.description}
                onDelete={handleDeleteTodo}
                onMarkCompleted={handleMarkCompletedTodo}
              />
            );
          })}
        </div>
      )}
      {isLoading && (
        <div className="loading">
          <h1>Loading....</h1>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default TodoList;
