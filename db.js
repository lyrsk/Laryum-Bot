const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./basicamente.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to database.");
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS counts (
    username TEXT PRIMARY KEY,
    count INTEGER DEFAULT 0
  )`);
});

module.exports = db;
