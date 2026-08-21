import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.ts";

describe("POST /api/tickets", () => {
    it("should create a ticket", async () => {
        const res = await request(app)
            .post("/api/tickets");
        
        expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
    });
});
