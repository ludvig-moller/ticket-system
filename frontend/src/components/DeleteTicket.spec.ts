import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import DeleteTicket from "./DeleteTicket.vue";
import { deleteTicket } from "@/services/ticketService.ts";

vi.mock("@/services/ticketService.ts", () => ({
    deleteTicket: vi.fn(),
}));

describe("DeleteTicket", () => {
    it("shows a button", () => {
        const wrapper = mount(DeleteTicket);

        const button = wrapper.find("button");

        expect(button.exists()).toBe(true);
    });

    it("sends an API request when the button is pressed", async () => {
        const wrapper = mount(DeleteTicket);
        
        const button = wrapper.find("button");
        await button.trigger("click");

        expect(deleteTicket).toHaveBeenCalled();
    });
});
