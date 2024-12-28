import { describe, it, expect } from "vitest";
import { deepmerge } from "./merge";

describe("deepmerge test suite", () => {
    it("should merge two plain objects", () => {
        const target = { a: 1, b: 2 };
        const source = { b: 3, c: 4 };
        
        const result = deepmerge(target, source);
        
        expect(result).toEqual({ a: 1, b: 3, c: 4 });
    });

    it("should merge nested objects", () => {
        const target = { a: { b: 1 } };
        const source = { a: { c: 2 } };
        
        const result = deepmerge(target, source);
        
        expect(result).toEqual({ a: { b: 1, c: 2 } });
    });

    it("should merge arrays", () => {
        const target = [1, 2];
        const source = [3, 4];
        
        const result = deepmerge(target, source);
        
        expect(result).toEqual([1, 2, 3, 4]);
    });

    it("should merge sets", () => {
        const target = new Set([1, 2]);
        const source = new Set([2, 3]);
        
        const result = deepmerge(target, source);
        
        expect(result).toEqual(new Set([1, 2, 3]));
    });

    it("should merge maps", () => {
        const target = new Map([["a", 1], ["b", 2]]);
        const source = new Map([["b", 3], ["c", 4]]);
        
        const result = deepmerge(target, source);

        expect(result).toEqual(new Map([["a", 1], ["b", 3], ["c", 4]]));
    });

    it("should handle different types", () => {
        const target = { a: 1, b: new Set([1, 2]), c: new Map([["a", 1]]) };
        const source = { b: new Set([2, 3]), c: new Map([["b", 2]]), d: [1, 2] };
        
        const result = deepmerge(target, source);

        expect(result).toEqual({
            a: 1,
            b: new Set([1, 2, 3]),
            c: new Map([["a", 1], ["b", 2]]),
            d: [1, 2]
        });
    });

    it("should handle primitive types", () => {
        expect(deepmerge(1, 2)).toBe(2);
        expect(deepmerge("a", "b")).toBe("b");
        expect(deepmerge(true, false)).toBe(false);
        expect(deepmerge(null, undefined)).toBe(undefined);
    });

    it("should handle custom-defined types", () => {
        class CustomType {
            constructor(public value: number) {}
        }

        const target = { a: new CustomType(1) };
        const source = { a: new CustomType(2) };
        const result = deepmerge(target, source);

        expect(result).toEqual({ a: new CustomType(2) });
    });

    it("should handle combined object structures", () => {
        const target = {
            a: { b: 1 },
            c: [1, 2],
            d: new Set([1, 2]),
            e: new Map([["a", 1]])
        };
        const source = {
            a: { c: 2 },
            c: [3, 4],
            d: new Set([2, 3]),
            e: new Map([["b", 2]])
        };
        
        const result = deepmerge(target, source);

        expect(result).toEqual({
            a: { b: 1, c: 2 },
            c: [1, 2, 3, 4],
            d: new Set([1, 2, 3]),
            e: new Map([["a", 1], ["b", 2]])
        });
    });

    it("should handle null and undefined values", () => {
        const target = { a: 1, b: null };
        const source = { b: 2, c: undefined };
        
        const result = deepmerge(target, source);

        expect(result).toEqual({ a: 1, b: 2, c: undefined });
    });

    it("should handle merging with non-object types", () => {
        const target = { a: 1 };
        const source = 2;
        
        const result = deepmerge(target, source);

        expect(result).toBe(2);
    });

    it("should handle merging with empty objects", () => {
        const target = {};
        const source = { a: 1 };
        
        const result = deepmerge(target, source);

        expect(result).toEqual({ a: 1 });
    });

    it("should handle merging with empty arrays", () => {
        const target: unknown[] = [];
        const source = [1, 2];
        
        const result = deepmerge(target, source);

        expect(result).toEqual([1, 2]);
    });

    it("should handle merging with empty sets", () => {
        const target = new Set();
        const source = new Set([1, 2]);
        
        const result = deepmerge(target, source);

        expect(result).toEqual(new Set([1, 2]));
    });

    it("should handle merging with empty maps", () => {
        const target = new Map();
        const source = new Map([["a", 1]]);
        
        const result = deepmerge(target, source);

        expect(result).toEqual(new Map([["a", 1]]));
    });

    it("should handle boolean values on top-level keys", () => {
        const target = { a: true };
        const source = { a: false };
        
        const result = deepmerge(target, source);

        expect(result).toEqual({ a: false });
    });

    it("should handle string values on top-level keys", () => {
        const target = { a: "hello" };
        const source = { a: "world" };
        
        const result = deepmerge(target, source);

        expect(result).toEqual({ a: "world" });
    });

    it("should handle number values on top-level keys", () => {
        const target = { a: 1 };
        const source = { a: 2 };
        
        const result = deepmerge(target, source);

        expect(result).toEqual({ a: 2 });
    });

    it("should merge multiple plain objects", () => {
        const target = { a: 1 };
        const source1 = { b: 2 };
        const source2 = { c: 3 };
        
        const result = deepmerge(target, source1, source2);
        
        expect(result).toEqual({ a: 1, b: 2, c: 3 });
    });

    it("should merge multiple nested objects", () => {
        const target = { a: { b: 1 } };
        const source1 = { a: { c: 2 } };
        const source2 = { a: { d: 3 } };
        
        const result = deepmerge(target, source1, source2);
        
        expect(result).toEqual({ a: { b: 1, c: 2, d: 3 } });
    });

    it("should merge multiple arrays", () => {
        const target = [1];
        const source1 = [2];
        const source2 = [3];
        
        const result = deepmerge(target, source1, source2);
        
        expect(result).toEqual([1, 2, 3]);
    });

    it("should merge multiple sets", () => {
        const target = new Set([1]);
        const source1 = new Set([2]);
        const source2 = new Set([3]);
        
        const result = deepmerge(target, source1, source2);
        
        expect(result).toEqual(new Set([1, 2, 3]));
    });

    it("should merge multiple maps", () => {
        const target = new Map([["a", 1]]);
        const source1 = new Map([["b", 2]]);
        const source2 = new Map([["c", 3]]);
        
        const result = deepmerge(target, source1, source2);

        expect(result).toEqual(new Map([["a", 1], ["b", 2], ["c", 3]]));
    });
});
