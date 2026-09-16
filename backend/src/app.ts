import express, { type Express, type Request, type Response } from "express";
import cors from "cors";

import db from "./config/db.ts";

import { TicketRepository } from "./repositories/ticketRepository.ts";
import { TicketService } from "./services/ticketService.ts";
import { TicketController } from "./controller/ticketController.ts";
import { createTicketRoutes } from "./routes/ticketRoutes.ts";

const app: Express = express();

const allowedOrigins = process.env.CORS_ALLOW_ORIGINS?.split(",");

app.use(cors({
    origin: allowedOrigins,
    allowedHeaders: ["content-type", "x-api-key"],
}));

const ticketRepository = new TicketRepository(db);
const ticketService = new TicketService(ticketRepository);
const ticketController = new TicketController(ticketService);

app.use("/api/tickets", createTicketRoutes(ticketController));

export default app;
