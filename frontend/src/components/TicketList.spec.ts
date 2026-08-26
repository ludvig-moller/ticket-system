import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TicketList from "./TicketList.vue";
import { ticketList } from "@/states/ticketList.ts";
import { type Ticket } from "@/types/ticket.ts";

describe("TicketList", () => {
    it("shows all tickets in ticketList state", () => {
        const wrapper = mount(TicketList);

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

        ticketList.value = newTicketList;

        expect(wrapper.text()).toContain("ABC-123");
        expect(wrapper.text()).toContain("DEF-456");
    });
});
