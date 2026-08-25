import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.ts";
import db from "../src/config/db.ts";

const deleteTicket = db.prepare("DELETE FROM tickets WHERE id = (?)");

describe("POST /api/tickets", () => {
    it("should create a ticket and return the id", async () => {
        const res = await request(app)
            .post("/api/tickets");
        
        expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();

        deleteTicket.run(res.body.id);
    });
});
