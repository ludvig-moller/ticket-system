import { Router } from "express";
import { TicketController } from "../controller/ticketController.ts";
import apiKeyAuth from "../middleware/apiKeyAuth.ts";

export const createTicketRoutes = (ticketController: TicketController) => {
    const router = Router();

    router.get("/", apiKeyAuth, ticketController.get);
    router.post("/", ticketController.create);
    router.post("/:id", ticketController.use);
    router.delete("/:id", apiKeyAuth, ticketController.delete);

    return router;
} 