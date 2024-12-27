export function deepmerge(target: any, ...sources: any[]): any {
    for (const source of sources) {
        if (target === source) continue;

        if (Array.isArray(target) && Array.isArray(source)) {
            target = [...target, ...source];
            continue;
        }

        if (target instanceof Set && source instanceof Set) {
            target = new Set([...target, ...source]);
            continue;
        }

        if (target instanceof Map && source instanceof Map) {
            const result = new Map(target);
            for (const [key, value] of source) {
                result.set(key, deepmerge(result.get(key), value));
            }
            target = result;
            continue;
        }

        if (typeof target === 'object' && typeof source === 'object') {
            const result: any = { ...target };
            for (const key of Object.keys(source)) {
                if (key in target) {
                    result[key] = deepmerge(target[key], source[key]);
                } else {
                    result[key] = source[key];
                }
            }
            target = result;
            continue;
        }

        target = source;
    }

    return target;
}
