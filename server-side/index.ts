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
  console.log("Connected to the database.");
});

//Create Table api_calls_counter if it does not exist
db.run(`
CREATE TABLE IF NOT EXISTS api_calls_counter (
    endpoint TEXT PRIMARY KEY,
    count INTEGER NOT NULL
  )
`);

//Delete all records of api_calls_counter Table
//db.run(`DELETE FROM api_calls_counter`);

// Create a pool of prepared statements for the api_calls_counter table
const stmtPool = {
  selectByEndpoint: db.prepare("SELECT * FROM api_calls_counter WHERE endpoint = ?;"),
  insertOrUpdate: db.prepare("INSERT OR REPLACE INTO api_calls_counter (endpoint, count) VALUES (?, ?);"),
};

// Endpoint to receive API call data
app.post("/api/calls", async (req, res) => {
  const { endpoint } = req.body;
  console.log(`Received API call for endpoint "${endpoint}"`);

  // Check if a row with the given endpoint exists in the table
  stmtPool.selectByEndpoint.get(endpoint, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    const count = row ? row.count + 1 : 1;

    // Insert a new row or update the existing one
    stmtPool.insertOrUpdate.run(endpoint, count, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Added or updated endpoint "${endpoint}" to database.`);
      res.sendStatus(200);
    });
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Close the prepared statements and database connection when the process is exiting
process.on("exit", () => {
  stmtPool.selectByEndpoint.finalize();
  stmtPool.insertOrUpdate.finalize();
  db.close();
});

//Signal Interrupt
process.on("SIGINT", () => {
  process.exit();
});
//Signal Termination
process.on("SIGTERM", () => {
  process.exit();
});
