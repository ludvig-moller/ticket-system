import { describe, it, expect} from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import ErrorDisplay from "./ErrorDisplay.vue";
import { errors } from "@/states/errors";

describe("ErrorDisplay", () => {
    it("shows errors", async () => {
        const wrapper = mount(ErrorDisplay);

        errors.value.push("Testing error");
        await flushPromises();

        expect(wrapper.text()).toContain("Testing error");
    });

    it("only shows clear errors button when there are errors", async () => {
        errors.value = [];

        const wrapper = mount(ErrorDisplay);

        expect(wrapper.find("button").exists()).toBe(false);

        errors.value.push("Testing error");
        await flushPromises();

        expect(wrapper.find("button").exists()).toBe(true);
    });
});
