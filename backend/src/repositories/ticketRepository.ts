import { type Database } from "better-sqlite3";
import type { Ticket } from "../models/Ticket.ts";

export class TicketRepository {
    private readonly db: Database;

    constructor(db: Database) { 
        this.db = db;
    }

    get(): Ticket[] {
        return this.db
            .prepare("SELECT * FROM tickets")
            .all() as Ticket[];
    }

    getById(id: string): Ticket {
        return this.db
            .prepare("SELECT * FROM tickets WHERE id = ?")
            .get(id) as Ticket;
    }

    create(id: string) {
        this.db
            .prepare("INSERT INTO tickets (id) VALUES (?)")
            .run(id);
    }

    use(id: string) {
        this.db
            .prepare("UPDATE tickets SET used = 1 WHERE id = ?")
            .run(id);
    }
}
