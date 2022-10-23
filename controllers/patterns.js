const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(__dirname + "/../database.db");

const getPatterns = (req, res) => {
  /* function for when the user requests the patterns
   *
   */
  console.log("getPatterns");
  db.all("SELECT * from patterns", (err, rows) => {
    if (err) return console.error(err.message);
    res.status(200).json(rows);
  });
};

const queryPattern = (req, res) => {
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

    // filter the rows based on the search query
    if (search) {
      rows = rows.filter((row) => {
        return row.name.toLowerCase().startsWith(search.toLowerCase());
      });
    }

    // limit the rows based on the limit query
    if (limit) {
      rows = rows.slice(0, limit);
    }

    // send the rows to the client
    if (rows.length === 0) {
      res.status(401).send("No resource found");
    } else {
      res.status(200).json(rows);
    }
  });
};

module.exports = { getPatterns, queryPattern };
