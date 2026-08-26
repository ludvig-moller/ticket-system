import { Router } from "express";
import { TicketController } from "../controller/ticketController.ts";
import apiKeyAuth from "../middleware/apiKeyAuth.ts";

export const createTicketRoutes = (ticketController: TicketController) => {
    const router = Router();

    router.get("/", apiKeyAuth, ticketController.get);
    router.post("/", ticketController.create);

    return router;
} 