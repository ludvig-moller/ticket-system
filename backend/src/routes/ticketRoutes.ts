import { Router } from "express";
import { TicketController } from "../controller/ticketController.ts";

export const createTicketRoutes = (ticketController: TicketController) => {
    const router = Router();

    router.post("/", ticketController.create);

    return router;
} 