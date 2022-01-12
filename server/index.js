const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "../src")));

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "../src/index.html"));
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
