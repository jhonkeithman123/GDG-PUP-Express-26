// Imports
import express from "express";
import route from "./routes/route.js";

// Declaration && Initialization
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
// serve static assets (css/js) from the views folder
app.use(express.static("views"));

app.use("/", route);

// listen to the port
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
