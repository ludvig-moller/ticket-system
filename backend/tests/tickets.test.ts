import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.ts";
import db from "../src/config/db.ts";

const insertTicket = db.prepare("INSERT INTO tickets (id) VALUES (?)");
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

describe("GET /api/tickets", () => {
    it("should return unauthorized response when no API key is provided", async () => {
        const res = await request(app)
            .get("/api/tickets");

        expect(res.status).toBe(401)
    });

    it("should return forbidden response when an invalid API key is provided", async () => {
        const res = await request(app)
            .get("/api/tickets")
            .set("x-api-key", "invalid-key");

        expect(res.status).toBe(401)
    });

    it("should return ok when the correct API key is provided", async () => {
        const api_key = process.env.API_KEY;
        if (!api_key) {
            throw Error("API_KEY field in .env file is required");
        }

        const res = await request(app)
            .get("/api/tickets")
            .set("x-api-key", api_key);
        
        expect(res.status).toBe(200);
    });

    it("should return all tickets when correct API key is provided", async () => {
        const api_key = process.env.API_KEY;
        if (!api_key) {
            throw Error("API_KEY field in .env file is required");
        }

        const before = await request(app)
            .get("/api/tickets")
            .set("x-api-key", api_key);
        
        const newTicketId = crypto.randomUUID();
        insertTicket.run(newTicketId);

        const after = await request(app)
            .get("/api/tickets")
            .set("x-api-key", api_key);
        
        expect(after.status).toBe(200);
        expect(after.body).toHaveLength(before.body.length + 1);
        expect(after.body[before.body.length].id).toBe(newTicketId);

        deleteTicket.run(newTicketId);
    });
});
