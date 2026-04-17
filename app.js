// Imports
import express from "express";
import render from "./render.js"; // For rendering the file

// Declaration && Initialization
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(render("index/index.html"));
});

// listen to the port
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
