import { describe, it, expect, vi } from "vitest";
import { file, files } from "./file";
import * as fs from "fs";

vi.mock("fs");

describe("loadFile", () => {
    it("should return parsed JSON data from file", () => {
        const filePath = "test.json";
        const fileContent = "{\"key\": \"value\"}";
        vi.spyOn(fs, "existsSync").mockReturnValue(true);
        vi.spyOn(fs, "readFileSync").mockReturnValue(fileContent);

        const result = file(filePath);
        expect(result).toEqual({ key: "value" });
    });

    it("should return empty object if file does not exist", () => {
        const filePath = "nonexistent.json";
        vi.spyOn(fs, "existsSync").mockReturnValue(false);

        const result = file(filePath);
        expect(result).toEqual({});
    });

    it("should apply filter and return empty object if filter fails", () => {
        const filePath = "test.json";
        const fileContent = "{\"key\": \"value\"}";
        vi.spyOn(fs, "existsSync").mockReturnValue(true);
        vi.spyOn(fs, "readFileSync").mockReturnValue(fileContent);

        const result = file(filePath, { filter: data => data.key !== "value" });
        expect(result).toEqual({});
    });

    it("should apply map function to the data", () => {
        const filePath = "test.json";
        const fileContent = "{\"key\": \"value\"}";
        vi.spyOn(fs, "existsSync").mockReturnValue(true);
        vi.spyOn(fs, "readFileSync").mockReturnValue(fileContent);

        const result = file(filePath, { map: data => ({ ...data, newKey: "newValue" }) });
        expect(result).toEqual({ key: "value", newKey: "newValue" });
    });
});

describe("loadMultipleFiles", () => {
    it("should return array of parsed JSON data from multiple files", () => {
        const filePaths = ["test1.json", "test2.json"];
        const fileContents = ["{\"key1\": \"value1\"}", "{\"key2\": \"value2\"}"];
        vi.spyOn(fs, "existsSync").mockReturnValue(true);
        vi.spyOn(fs, "readFileSync")
            .mockReturnValueOnce(fileContents[0])
            .mockReturnValueOnce(fileContents[1]);

        const result = files(filePaths);
        expect(result).toEqual([{ key1: "value1" }, { key2: "value2" }]);
    });

    it("should apply filter and map functions to multiple files", () => {
        const filePaths = ["test1.json", "test2.json"];
        const fileContents = ["{\"key1\": \"value1\"}", "{\"key2\": \"value2\"}"];
        vi.spyOn(fs, "existsSync").mockReturnValue(true);
        vi.spyOn(fs, "readFileSync")
            .mockReturnValueOnce(fileContents[0])
            .mockReturnValueOnce(fileContents[1]);

        const options = {
            filter: (data: any) => data.key1 !== "value1",
            map: (data: any) => ({ ...data, newKey: "newValue" })
        };

        const result = files(filePaths, options);
        expect(result).toEqual([{}, { key2: "value2", newKey: "newValue" }]);
    });
});
