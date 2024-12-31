export type EnvironmentOptions = {
    normalized?: boolean;
    prefix: string;
    separator: string;
};

const defaults: EnvironmentOptions = {
    normalized: false,
    prefix: "APP_",
    separator: "_",
}

export function environment<T extends unknown>(options?: EnvironmentOptions): T {
    options = { ...defaults, ...options };
    
    let config: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(process.env)) {
        if (options?.prefix && !key.startsWith(options?.prefix)) continue;
        const path: string[] = options.separator !== "" ? key.replace(options.prefix, "").split(options.separator) : [ key ];
        let current = config;
        for (let i = 0; i < path.length; i++) {
            let part: string;
            if (i === path.length - 1) {
                part = path[i].startsWith(options.prefix) ? path[i].replace(options.prefix, "") : path[i];
            } else {
                part = path[i];
            }

            if (options.normalized) part = part.toLowerCase();

            if (i === path.length - 1) {
                current[part] = value;
            } else {
                if (typeof current[part] !== "object") current[part] = {}
                current = current[part] = current[part] || {};
            }
        }
    }

    return config as T;
}
