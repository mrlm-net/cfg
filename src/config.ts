import { deepmerge } from "./merge";

export interface ConfigObject {
    [key: string]: any;
}

export interface IConfig {
    get(key: string, fallback?: any): any;
    set(key: string, value: any): void;
}

export class Config implements IConfig {
    private config: ConfigObject;

    constructor(...configs: ConfigObject[]) {
        this.config = deepmerge({}, ...configs);
    }

    get(key: string, fallback?: any): any {
        const keys = key.split('.');
        let result = this.config;
        for (const k of keys) {
            result = result[k];
            if (result === undefined) {
                return fallback;
            }
        }
        return result;
    }

    set(key: string, value: any): void {
        const keys = key.split('.');
        let obj = this.config;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!obj[keys[i]]) {
                obj[keys[i]] = {};
            }
            obj = obj[keys[i]];
        }
        obj[keys[keys.length - 1]] = deepmerge(
            obj[keys[keys.length - 1]] || {}, value
        );
    }
}
