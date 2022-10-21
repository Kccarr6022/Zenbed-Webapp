const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const path = require("path");
const { readFileSync } = require("fs");
const app = express();
const db = new sqlite3.Database(
  "./zenbed.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
    console.log("connection successful");
  }
);

// setup static and middleware
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));

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

  const { patternname, sequence } = req.body;
  db.all("SELECT * from patterns", [], (err, rows) => {
    if (err) return console.error(err.message);

    const sql = `INSERT INTO patterns (id, name, sequence)
                  VALUES(?, ?, ?)`;
    db.run(sql, [rows.length, patternname, sequence], (err) => {
      if (err) return console.error(err.message);
      console.log(`Pattern ${patternname} has been added to patterns.`);
    });
  });

  res.status(200).sendFile(path.resolve(__dirname, "./index.html"));
});

app.get("/api/patterns", (req, res) => {
  /* function for when the user requests the patterns
   *
   */
  console.log(req.query);
  const { search, limit } = req.query;
  db.all("SELECT * from patterns", (err, rows) => {
    if (err) {
      res.send("No resource found");
      return console.error(err.message);
    }
    if (search) {
      const filter = rows.filter((row) => {
        return row.name.toLowerCase().startsWith(search.toLowerCase());
      });
    }
    if (limit) {
      const rows = rows.slice(0, limit);
    }
    return res.status(200).json(rows);
  });
});

app.get("/api/patterns", (req, res) => {
  /* function for when the user requests a specific pattern
   *
   */

  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  if (sortedProducts < 1) {
    res.status(200).json({ success: true, data: [] });
  }

  res.status(200).json(sortedProducts);
});

app.listen(5000, () => {
  console.log("Listining on port 5000...");
});

const cleanup = (event) => {
  db.close((err) => {
    if (err) return console.error(err.meesage);
  });
  console.log("database closed");
  console.log("process closed");
  process.exit();
};

// run cleanup function when the node process ends
process.on("exit", cleanup);
