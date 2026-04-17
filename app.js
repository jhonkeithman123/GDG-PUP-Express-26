// Declarations
import express from "express";
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello</title>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>
`);
});

// listen to the port
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
