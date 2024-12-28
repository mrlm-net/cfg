export function environment(prefix: string = '', separator: string = '_'): Record<string, any> {
    const config: Record<string, any> = {};

    for (const [key, value] of Object.entries(process.env)) {
        if (prefix && !key.startsWith(prefix)) continue;

        const path = key.replace(prefix, '').split(separator).filter(Boolean);
        let current = config;

        for (let i = 0; i < path.length; i++) {
            const part = path[i];
            if (i === path.length - 1) {
                current[part.toLowerCase()] = value;
            } else {
                current = current[part.toLowerCase()] = current[part.toLowerCase()] || {};
            }
        }
    }

    return config;
}

