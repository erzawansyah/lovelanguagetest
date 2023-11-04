const hashKey: string = process.env.NEXT_PUBLIC_SECRET_HASH_KEY || '';

export const secretStorage = {
    encryptValue(value: string) {
        const encryptedValue = Buffer.from(`${value}###${hashKey}###`).toString('base64');
        return encryptedValue;
    },
    decryptValue(value: string) {
        const decryptedValue = Buffer.from(value, 'base64')
            .toString('ascii')
            .replace(`###${hashKey}###`, '');
        return decryptedValue;
    },
    prefix: '@1is:',
    setItem(key: string, value: string | null | undefined) {
        if (value === '' || value === null || value === undefined) return;
        localStorage.setItem(`${this.prefix}${key}`, this.encryptValue(value));
    },
    getItem(key: string) {
        const value = localStorage.getItem(`${this.prefix}${key}`);
        if (!value) return null;
        return this.decryptValue(value);
    },
    removeItem(key: string) {
        localStorage.removeItem(`${this.prefix}${key}`);
    },
    clear() {
        localStorage.clear();
    },
}