const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const app = express();
const path = require("path");
const patterns = require("./routes/patterns");
const { readFileSync } = require("fs");
const { builtinModules } = require("module");

// setup static and middleware
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));

let db = new sqlite3.Database(
  __dirname + "/database.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
    console.log("connection successful");
  }
);

//routes
app.use("/api/patterns", patterns);

app.get("/", (req, res) => {
  /*  Function for the home page
   *
   */

  res.status(200).sendFile(path.resolve(__dirname, "./index.html"));
  console.log(req.url);
});

app.post("/", (req, res) => {
  /* function for when the user submits the form
   *
   */
  var id;
  try {
    const { patternname, sequence } = req.body;
    db.all("SELECT * from patterns", [], (err, rows) => {
      if (err) return console.error(err.message);

      const sql = `INSERT INTO patterns (id, name, sequence)
                  VALUES(?, ?, ?)`;
      db.run(sql, [rows.length, patternname, sequence], (err) => {
        if (err) return console.error(err.message);
        console.log(`Pattern ${patternname} has been added to patterns.`);
        return res
          .status(200)
          .sendFile(path.resolve(__dirname, "./index.html"));
      });
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("Server is listining on port 5000...");
});
