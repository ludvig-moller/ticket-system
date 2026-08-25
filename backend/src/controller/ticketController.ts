import { type Request, type Response } from "express";
import type { TicketService } from "../services/ticketService.ts";

export class TicketController {
    private readonly ticketService: TicketService;

    constructor(ticketService: TicketService) {
        this.ticketService = ticketService;
    }

    create = (
        req: Request,
        res: Response,
    ) => {
        const ticketId = this.ticketService.create();
        res.status(201).json(
            {
                "id": ticketId,
            }
        );
    }
}
