const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Open SQLite database connection
const db = new sqlite3.Database("./analytics.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQLite database.");
});

db.run(`
CREATE TABLE IF NOT EXISTS api_calls_counter (
    endpoint TEXT PRIMARY KEY,
    count INTEGER NOT NULL
  )
`);
//db.run(`DELETE FROM api_calls_counter`);


// Endpoint to receive API call data
app.post("/api/calls", async (req, res) => {
  const { endpoint } = req.body;
  console.log(`Received API call for endpoint "${endpoint}"`);

  // Check if a row with the given endpoint exists in the table
  db.get(
    "SELECT * FROM api_calls_counter WHERE endpoint = ?;",
    [endpoint],
    (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      const count = row ? row.count + 1 : 1;

      // Insert a new row or update the existing one
      const stmt = db.prepare(
        "INSERT OR REPLACE INTO api_calls_counter (endpoint, count) VALUES (?, ?);"
      );
      stmt.run(endpoint, count, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Added or updated endpoint "${endpoint}" to database.`);
        res.sendStatus(200);
      });
      stmt.finalize();
    }
  );
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
