import { describe, it, expect, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import TicketList from "./TicketList.vue";
import { type Ticket } from "@/types/ticket.ts";
import { getTickets } from "@/services/ticketService.ts";
import { errors } from "@/states/errors.ts";

vi.mock("@/services/ticketService.ts", () => ({
    getTickets: vi.fn(),
}));

describe("TicketList", () => {
    it("updates errors", async () => {
        vi.mocked(getTickets).mockRejectedValue(new Error("Testing error"));

        mount(TicketList);
        await flushPromises();

        expect(errors.value.length).toBeGreaterThan(0);
    });

    it("shows all tickets", async () => {
        const newTicketList: Ticket[] = [
            {
                id: "ABC-123",
                used: false,
                created_at: "",
                used_at: "",
            },
            {
                id: "DEF-456",
                used: false,
                created_at: "",
                used_at: "",
            }
        ]

        vi.mocked(getTickets).mockResolvedValue(newTicketList);

        const wrapper = mount(TicketList);

        await flushPromises();

        expect(wrapper.text()).toContain("ABC-123");
        expect(wrapper.text()).toContain("DEF-456");
    });
});
