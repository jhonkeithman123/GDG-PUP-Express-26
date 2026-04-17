import { Router } from "express";
import fs from "fs";
import render from "../render.js";
import path from "path";

const router = Router();

// Fix __dirname for ES modules
const __dirname = import.meta.dirname;

// Path to our JSON storage file
const todoFile = path.join(__dirname, "../", "todo.json");

// Helper: read todos from file
function readTodo() {
  if (!fs.existsSync(todoFile)) return [];
  const data = fs.readFileSync(todoFile, "utf-8").trim();
  if (!data) return [];
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Helper: write todos to file
function writeTodo(todos) {
  fs.writeFileSync(todoFile, JSON.stringify(todos, null, 2));
}

// ROUTES
router.get("/", (req, res) => {
  res.sendFile(render("index.html"));
});

router.get("/todos", (req, res) => {
  res.json(readTodo());
});

router.post("/todos", (req, res) => {
  const task = typeof req.body.task === "string" ? req.body.task.trim() : "";
  if (!task) return res.status(400).json({ error: "Task is required" });

  const todos = readTodo();
  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    task,
    done: false,
  };
  todos.push(newTodo);
  writeTodo(todos);
  res.json(newTodo);
});

router.get("/todos/:id", (req, res) => {
  const todos = readTodo();
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Todo not found");
  res.json(todo);
});

router.patch("/todos/:id", (req, res) => {
  const todos = readTodo();
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Todo not found");

  todo.task = req.body.task ?? todo.task;
  todo.done = req.body.done ?? todo.done;

  writeTodo(todos);
  res.json(todo);
});

router.delete("/todos/:id", (req, res) => {
  let todos = readTodo();
  const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Todo not found");

  const deleted = todos.splice(index, 1);
  writeTodo(todos);
  res.json(deleted[0]);
});

export default router;
