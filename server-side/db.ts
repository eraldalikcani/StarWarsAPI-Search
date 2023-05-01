const sqlite3 = require("sqlite3").verbose();

// Open SQLite database connection
const db = new sqlite3.Database("./analytics.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the database.");
});

// Create Table api_calls_counter if it does not exist
db.run(`
CREATE TABLE IF NOT EXISTS api_calls_counter (
    endpoint TEXT PRIMARY KEY,
    count INTEGER NOT NULL
  )
`);

// Delete all records of api_calls_counter Table
//db.run(`DELETE FROM api_calls_counter`);

// Create a pool of prepared statements for the api_calls_counter table
const stmtPool = {
  selectByEndpoint: db.prepare(
    "SELECT * FROM api_calls_counter WHERE endpoint = ?;"
  ),
  insertOrUpdate: db.prepare(
    "INSERT OR REPLACE INTO api_calls_counter (endpoint, count) VALUES (?, ?);"
  ),
};

// Close the prepared statements and database connection when the process is exiting
process.on("exit", () => {
  stmtPool.selectByEndpoint.finalize();
  stmtPool.insertOrUpdate.finalize();
  db.close();
});

// Signal Interrupt
process.on("SIGINT", () => {
  process.exit();
});
// Signal Termination
process.on("SIGTERM", () => {
  process.exit();
});

module.exports = stmtPool;
