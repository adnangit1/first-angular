import fs from "node:fs/promises";
<<<<<<< HEAD
 
import bodyParser from "body-parser";
import express from "express";
 
const app = express();
 
app.use(bodyParser.json());
 
// CORS
 
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
 
  next();
});
 
app.get("/todos", async (req, res) => {
 
  const fileContent = await fs.readFile("./data/todo.json");
 
  const tododata = JSON.parse(fileContent);
 
  res.status(200).json({ todos: tododata });
});


app.get("/users", async (req, res) => {
  const fileContent = await fs.readFile("./data/users.json");
  const users = JSON.parse(fileContent);

  res.status(200).json({ users });
});

=======

import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// GET /todos — fetch all tasks
app.get("/todos", async (req, res) => {
  const fileContent = await fs.readFile("./data/todo.json");
  const todos = JSON.parse(fileContent);
  res.status(200).json({ todos });
});

// GET /todos/:userId — fetch tasks for a specific user
app.get("/todos/:userId", async (req, res) => {
  const userId = req.params.userId;
  const fileContent = await fs.readFile("./data/todo.json");
  const todos = JSON.parse(fileContent);
  const userTodos = todos.filter((t) => t.userId === userId);
  res.status(200).json({ todos: userTodos });
});

// GET /users — fetch all users
app.get("/users", async (req, res) => {
  const fileContent = await fs.readFile("./data/users.json");
  const users = JSON.parse(fileContent);
  res.status(200).json({ users });
});

// POST /todos — add a new task and persist it
app.post("/todos", async (req, res) => {
  const newTask = req.body;

  const fileContent = await fs.readFile("./data/todo.json");
  const todos = JSON.parse(fileContent);

  todos.unshift(newTask);

  await fs.writeFile("./data/todo.json", JSON.stringify(todos, null, 2));

  res.status(201).json({ todo: newTask });
});

// PUT /todos/:id — update an existing task by id
app.put("/todos/:id", async (req, res) => {
  const taskId = req.params.id;
  const updatedFields = req.body;

  const fileContent = await fs.readFile("./data/todo.json");
  const todos = JSON.parse(fileContent);

  const index = todos.findIndex((t) => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  todos[index] = { ...todos[index], ...updatedFields, id: taskId };

  await fs.writeFile("./data/todo.json", JSON.stringify(todos, null, 2));

  res.status(200).json({ todo: todos[index] });
});

// DELETE /todos/:id — remove a task by id
app.delete("/todos/:id", async (req, res) => {
  const taskId = req.params.id;

  const fileContent = await fs.readFile("./data/todo.json");
  const todos = JSON.parse(fileContent);

  const index = todos.findIndex((t) => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  todos.splice(index, 1);

  await fs.writeFile("./data/todo.json", JSON.stringify(todos, null, 2));

  res.status(200).json({ message: "Task deleted" });
});

>>>>>>> 36a15547 (Delete-Put-requests implemented into backend)
// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

<<<<<<< HEAD

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
=======
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
>>>>>>> 36a15547 (Delete-Put-requests implemented into backend)
