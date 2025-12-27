const express = require("express");
const path = require("path");
const app = express();
const staticPath = path.join(__dirname, "./public");

app.use(express.static(staticPath));

app.use((req, res) => {
  res.status(404);
  res.send(`<h1>Not Found NO PAGE</h1>`);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
  console.log("static path is " + staticPath);
});
0;
