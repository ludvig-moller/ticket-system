import { type Database } from "better-sqlite3";

export class TicketRepository {
    private readonly db: Database;

    constructor(db: Database) { 
        this.db = db;
    }

    create(id: string) {
        this.db
            .prepare("INSERT INTO tickets (id) VALUES (?)")
            .run(id);
    }
}
