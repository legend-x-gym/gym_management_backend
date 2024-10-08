const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 4000;


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
