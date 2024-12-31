import { describe, it, expect } from "vitest";
import { environment } from "./environment";

describe("environment function", () => {
    it("should return an empty object if no environment variables match the prefix", () => {
        process.env = { TEST_VAR: "^4.6.7" };
        const result = environment("PREFIX_");
        expect(result).toEqual({});
    });

    it("should return a flat object if no separator is found", () => {
        process.env = { PREFIX_VAR: "value" };
        const result = environment("PREFIX_");
        expect(result).toEqual({ var: "value" });
    });

    it("should return a nested object based on the separator", () => {
        process.env = { PREFIX_VAR_ONE: "value1", PREFIX_VAR_TWO: "value2" };
        const result = environment("PREFIX_", "_");
        expect(result).toEqual({ var: { one: "value1", two: "value2" } });
    });

    it("should handle custom separators", () => {
        process.env = { "PREFIX_VAR-ONE": "value1", "PREFIX_VAR-TWO": "value2" };
        const result = environment("PREFIX_", "-");
        expect(result).toEqual({ var: { one: "value1", two: "value2" } });
    });

    it("should handle no prefix", () => {
        process.env = { VAR_ONE: "value1", VAR_TWO: "^4.6.7" };
        const result = environment("", "_");
        expect(result).toEqual({ var: { one: "value1", two: "^4.6.7" } });
    });
});

describe("environment function with lowerCase option", () => {
    it("should return keys in lower case by default", () => {
        process.env = { PREFIX_VAR_ONE: "value1", PREFIX_VAR_TWO: "value2" };
        const result = environment("PREFIX_", "_");
        expect(result).toEqual({ var: { one: "value1", two: "value2" } });
    });

    it("should return keys in original case when lowerCase is false", () => {
        process.env = { PREFIX_VAR_ONE: "value1", PREFIX_VAR_TWO: "value2" };
        const result = environment("PREFIX_", "_", false);
        expect(result).toEqual({ VAR: { ONE: "value1", TWO: "value2" } });
    });

    it("should handle mixed case keys when lowerCase is false", () => {
        process.env = { PREFIX_Var_One: "value1", PREFIX_Var_Two: "value2" };
        const result = environment("PREFIX_", "_", false);
        expect(result).toEqual({ Var: { One: "value1", Two: "value2" } });
    });
});
