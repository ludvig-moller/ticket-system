import Database from "better-sqlite3";

const db = new Database("ticket.db", { verbose: console.log });

db.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
        id TEXT PRIMARY KEY,
        used INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
        used_at TIMESTAMP
    )
`);

export default db;
