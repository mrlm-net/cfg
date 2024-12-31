import { describe, it, expect, vi, beforeEach } from "vitest";
import { environment } from "./environment";

// As we are testing the environment function, 
// we need to stub the process.env object
// to avoid side effects between tests 
// and executor machine environment variables
beforeEach(async () => {
    process.env = {};
});

describe("environment function", () => {
    it("should create nested objects based on the path length", () => {
        vi.stubEnv("APP_DB_HOST", "localhost");
        vi.stubEnv("APP_DB_PORT", "5432");
        const result: { [key: string]: unknown } = environment({ prefix: "", separator: "_" });
        expect(result["APP"]).toStrictEqual({
            DB: {
                HOST: "localhost",
                PORT: "5432"
            }
        });
    });

    it("should respect the prefix option", () => {
        vi.stubEnv("MYAPP_DB_HOST", "localhost");
        vi.stubEnv("MYAPP_DB_PORT", "5432");
        const result: { [key: string]: unknown } = environment({ prefix: "MYAPP_", separator: "_" });
        expect(result["DB"]).toStrictEqual({
            HOST: "localhost",
            PORT: "5432"
        });
    });

    it("should handle different separators", () => {
        vi.stubEnv("APP.DB.HOST", "localhost");
        vi.stubEnv("APP.DB.PORT", "5432");
        const result: { [key: string]: unknown } = environment({ prefix: "", separator: "." });
        expect(result["APP"]).toStrictEqual({
            DB: {
                HOST: "localhost",
                PORT: "5432"
            }
        });
    });

    it("should handle default prefix and default separator", () => {
        vi.stubEnv("APP_DB_HOST", "localhost");
        vi.stubEnv("APP_DB_PORT", "5432");
        const result: { [key: string]: unknown } = environment();
        expect(result["DB"]).toStrictEqual({
            HOST: "localhost",
            PORT: "5432"
        });
    });

    it("should handle empty environment variables", () => {
        vi.stubEnv("APP_DB_HOST", "");
        const result: { [key: string]: unknown } = environment({ prefix: "", separator: "_" });
        expect(result["APP"]).toStrictEqual({
            DB: {
                HOST: ""
            }
        });
    });

    it("should handle environment variables with no separator", () => {
        vi.stubEnv("APPDBHOST", "localhost");
        const result: { [key: string]: unknown } = environment({ prefix: "APP", separator: "_" });
        expect(result["DBHOST"]).toBe("localhost");
    });

    it("should handle environment variables with multiple separators", () => {
        vi.stubEnv("APP_DB__HOST", "localhost");
        const result: { [key: string]: unknown } = environment({ prefix: "", separator: "_" });
        expect(result["APP"]).toStrictEqual({
            DB: {
                "": {
                    HOST: "localhost"
                }
            }
        });
    });

    it("should handle environment variables with numeric keys", () => {
        vi.stubEnv("APP_DB_1_HOST", "localhost");
        const result: { [key: string]: unknown } = environment({ prefix: "", separator: "_" });
        expect(result["APP"]).toStrictEqual({
            DB: {
                "1": {
                    HOST: "localhost"
                }
            }
        });
    });

    it("should handle environment variables with special characters", () => {
        vi.stubEnv("APP_DB_HO$T", "localhost");
        const result: { [key: string]: unknown } = environment({ prefix: "", separator: "_" });
        expect(result["APP"]).toEqual({
            DB: {
                "HO$T": "localhost"
            }
        });
    });

    it("should handle environment variables with empty prefix", () => {
        vi.stubEnv("DB_HOST", "localhost");
        const result: { [key: string]: unknown } = environment({ prefix: "", separator: "_" });
        expect(result["DB"]).toStrictEqual({
            HOST: "localhost"
        });
    });

    it("should handle environment variables with empty separator", () => {
        vi.stubEnv("APPDBHOST", "localhost");
        const result: { [key: string]: unknown } = environment({ prefix: "APP", separator: "" });
        expect(result["DBHOST"]).toEqual("localhost");
    });
});
