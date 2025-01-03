import * as fs from "fs";

interface LoadOptions {
    filter?: (data: any) => boolean;
    map?: (data: any) => any;
}

export function file(filePath: string, options?: LoadOptions): any {
    if (!fs.existsSync(filePath)) {
        return {};
    }
    const fileContent = fs.readFileSync(filePath, "utf-8");
    let data = JSON.parse(fileContent);
    if (options?.filter && !options.filter(data)) {
        return {};
    }
    if (options?.map) {
        data = options.map(data);
    }
    return data;
}

export function files(filePaths: string[], options?: LoadOptions): any[] {
    return filePaths.map(filePath => file(filePath, options));
}
