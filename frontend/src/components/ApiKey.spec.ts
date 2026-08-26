import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ApiKey from "./ApiKey.vue";
import { apiKey } from "@/states/apiKey.ts";

describe("ApiKey", () => {
    it("shows an input and a button", () => {
        const wrapper = mount(ApiKey);

        const input = wrapper.find("input");
        const button = wrapper.find("button");

        expect(input.exists()).toBe(true);
        expect(button.exists()).toBe(true);
    });

    it("updates the apiKey with the input value when the button is pressed", () => {
        const wrapper = mount(ApiKey);

        const input = wrapper.find("input");
        input.setValue("API-KEY");

        const button = wrapper.find("button");
        button.trigger("click");

        expect(apiKey.value).toBe("API-KEY");
    });
});
