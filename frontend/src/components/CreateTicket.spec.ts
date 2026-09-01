import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import CreateTicket from "./CreateTicket.vue";
import { createTicket } from "@/services/ticketService.ts";
import { errors } from "@/states/errors.ts";

vi.mock("@/services/ticketService.ts", () => ({
    createTicket: vi.fn(),
}));

describe("CreateTicket", () => {
    it("shows a button", () => {
        const wrapper = mount(CreateTicket);

        const button = wrapper.find("button");

        expect(button.exists()).toBe(true);
    });

    it("sends an api request when the button has been pressed", async () => {
        const wrapper = mount(CreateTicket);

        const button = wrapper.find("button");
        await button.trigger("click");

        expect(createTicket).toHaveBeenCalled();
    });

    it("shows the ticket code when a ticket has been created", async () => {
        vi.mocked(createTicket).mockResolvedValue("abc-123");

        const wrapper = mount(CreateTicket);

        const button = wrapper.find("button");
        await button.trigger("click");

        expect(wrapper.text()).toContain("abc-123");
    });

    it("updates errors", async () => {
        vi.mocked(createTicket).mockResolvedValue(null);

        const wrapper = mount(CreateTicket);

        const button = wrapper.find("button");
        await button.trigger("click");

        expect(errors.value.length).toBeGreaterThan(0);
    });
});
