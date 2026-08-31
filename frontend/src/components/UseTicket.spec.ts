import { describe, it, expect, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import UseTicket from "./UseTicket.vue";
import { useTicket } from "@/services/ticketService.ts";

vi.mock("@/services/ticketService.ts", () => ({
    useTicket: vi.fn(),
}));

describe("UseTicket", () => {
    it("shows an input and a button", () => {
        const wrapper = mount(UseTicket);

        const input = wrapper.find("input");
        const button = wrapper.find("button");

        expect(input.exists()).toBe(true);
        expect(button.exists()).toBe(true);
    });

    it("sends an API request when the button is pressed", async () => {
        const wrapper = mount(UseTicket);
        
        const input = wrapper.find("input");
        input.setValue("TICKET-CODE");
        const button = wrapper.find("button");
        await button.trigger("click");

        expect(useTicket).toHaveBeenCalled();
    });

    it("shows errors", async () => {
        vi.mocked(useTicket).mockRejectedValue(new Error("Testing error"));

        const wrapper = mount(UseTicket);

        const button = wrapper.find("button");
        await button.trigger("click");

        await flushPromises();

        const error = wrapper.find(".error");
        expect(error.exists()).toBe(true);
    });
});
