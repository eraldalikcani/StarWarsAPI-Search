const express = require("express");
const cors = require("cors");
const stmtDb = require("./db.ts");

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint to receive API call data
app.post("/api/calls", async (req, res) => {
  const { endpoint } = req.body;
  console.log(`Received API call for endpoint "${endpoint}"`);

  // Check if a row with the given endpoint exists in the table
  stmtDb.selectByEndpoint.get(endpoint, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    const count = row ? row.count + 1 : 1;

    // Insert a new row or update the existing one
    stmtDb.insertOrUpdate.run(endpoint, count, (err) => {
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
