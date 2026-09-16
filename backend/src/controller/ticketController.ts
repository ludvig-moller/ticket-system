import { type Request, type Response } from "express";
import type { TicketService } from "../services/ticketService.ts";
import NotFoundError from "../errors/NotFoundError.ts";
import ConflictError from "../errors/ConflictError.ts";

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

    use = (req: Request, res: Response) => {
        const { id } = req.params;

        if (typeof id !== "string") {
            return res.status(400).json({ error: "Invalid ticket ID" });
        }

        try {
            this.ticketService.use(id);
        } catch(err) {
            if (err instanceof NotFoundError) {
                return res.status(404).json({ error: err.message });
            }
            else if (err instanceof ConflictError) {
                return res.status(409).json({ error: err.message });
            }
            return res.status(500).json({ error: "Internal server error" });
        }

        res.status(204).send();
    }

    delete = (req: Request, res: Response) => {
        const { id } = req.params;

        if (typeof id !== "string") {
            return res.status(400).json({ error: "Invalid ticket ID" });
        }

        try {
            this.ticketService.delete(id);
        } catch(err) {
            if (err instanceof NotFoundError) {
                return res.status(404).json({ error: err.message });
            }
            else if (err instanceof ConflictError) {
                return res.status(409).json({ error: err.message });
            }
            return res.status(500).json({ error: "Internal server error" });
        }

        res.status(204).send();
    }
}
