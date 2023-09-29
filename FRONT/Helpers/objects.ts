export function convertKeysToLowercase(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const newKey = key.charAt(0).toLowerCase() + key.slice(1);
            result[newKey] = obj[key];
        }
    }
    return result;
}
