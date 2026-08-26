import { type Request, type Response } from "express";
import type { TicketService } from "../services/ticketService.ts";

export class TicketController {
    private readonly ticketService: TicketService;

    constructor(ticketService: TicketService) {
        this.ticketService = ticketService;
    }

    get = (req: Request, res: Response) => {
        const tickets = this.ticketService.get();
        res.status(200).json(tickets);
    }

    create = (req: Request, res: Response) => {
        const ticketId = this.ticketService.create();
        res.status(201).json({
            id: ticketId,
        });
    }
}
