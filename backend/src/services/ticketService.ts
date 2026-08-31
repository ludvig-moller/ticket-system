import type { Ticket } from "../models/Ticket.ts";
import { TicketRepository } from "../repositories/ticketRepository.ts";
import NotFoundError from "../errors/NotFoundError.ts";
import ConflictError from "../errors/ConflictError.ts";

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

    use(id: string) {
        const ticket = this.ticketRepository.getById(id);

        if (ticket === undefined)
            throw new NotFoundError("Ticket not found");
        else if (Boolean(ticket.used))
            throw new ConflictError("Ticket already used");

        this.ticketRepository.use(id);
    }
}
