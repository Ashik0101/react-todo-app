import React from "react";
import { useState } from "react";
import "../styles/CreateTodo.css";
import { url } from "./url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateTodo() {
  const [todo, setTodo] = useState({ title: "", description: "" });

  const notifyAfterCreate = () => {
    toast.success("Todo Created Successfully!", {
      position: "top-center",
      theme: "colored",
    });
  };

  const notifyTitleMissing = () => {
    toast.error("Please give a title!", {
      position: "top-center",
      theme: "colored",
    });
  };
  const notifyDescriptionMissing = () => {
    toast.error("Please give description!", {
      position: "top-center",
      theme: "colored",
    });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!todo.title) {
      notifyTitleMissing();
      return;
    }
    if (!todo.description) {
      notifyDescriptionMissing();
      return;
    }
    // Make a POST request to the backend here
    const res = await fetch(`${url}/todos`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (res.status == 201) {
      notifyAfterCreate();
    }
    // Reset the todo input fields
    setTodo({ title: "", description: "" });
  };

  return (
    <>
      <h1 className="heading">Create Todo</h1>
      <form id="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">
            <h3>Title</h3>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter title here..."
            name="title"
            value={todo.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">
            <h3>Description</h3>
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Enter description here..."
            name="description"
            value={todo.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          style={{ display: "block", margin: "auto" }}
          type="button submit"
          className="btn btn-primary"
        >
          Create
        </button>
      </form>
      <ToastContainer />
    </>
  );
}

export default CreateTodo;
