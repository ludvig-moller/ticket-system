import type { Ticket } from "../models/Ticket.ts";
import { TicketRepository } from "../repositories/ticketRepository.ts";

export class TicketService {
    private readonly ticketRepository: TicketRepository;

    constructor(ticketRepository: TicketRepository) {
        this.ticketRepository = ticketRepository;
    }

    get(): Ticket[] {
        return this.ticketRepository.get();
    }

    create(): string {
        const id = crypto.randomUUID().toString();
        this.ticketRepository.create(id);
        return id;
    }
}
