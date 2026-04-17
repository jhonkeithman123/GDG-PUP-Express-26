// Imports
import express from "express";
import route from "./routes/route.js";

// Declaration && Initialization
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

app.use("/", route);

// listen to the port
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
