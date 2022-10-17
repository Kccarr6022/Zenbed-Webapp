const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const path = require("path");
const { readFileSync } = require("fs");
const app = express();
const db = new sqlite3.Database('./zenbed.db', sqlite3.OPEN_READWRITE, (err)=>{
  if (err) return console.error(err.message);
  console.log('connection successful')
})

// setup static and middleware
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./index.html"));
  console.log(req.url);
});

app.post("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./index.html"));
  console.log("post");
  console.log(req.url);
});

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(5000, () => {
  console.log("Listining on port 5000...");
});


db.close((err) => {
  if (err) return console.error(err.meesage);
});