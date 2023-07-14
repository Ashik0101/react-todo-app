const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
// Creating Express app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Event handlers for MongoDB connection
db.on("connected", () => {
  console.log("Connected to MongoDB 😎😍");
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

// Define the todo schema
const todoSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false },
  description: String,
});

// Create the Todo model
const Todo = mongoose.model("Todo", todoSchema);

// Routes
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error("Failed to retrieve todos:", error);
    res.status(500).json({ error: "Failed to retrieve todos" });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      completed: false,
      description: req.body.description,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.error("Failed to create a todo:", error);
    res.status(500).json({ error: "Failed to create a todo" });
  }
});

app.patch("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(todo);
  } catch (error) {
    console.error("Failed to update the todo:", error);
    res.status(500).json({ error: "Failed to update the todo" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndRemove(req.params.id);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Failed to delete the todo:", error);
    res.status(500).json({ error: "Failed to delete the todo" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} ✌️✌️✌️`);
});
