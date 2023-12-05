export class Dictionary<K, V> {
    private dict = new Map<K, V>();

    constructor(iterable?: Iterable<[K, V]>) {
        this.init(iterable);
    }

    private init(iterable?: Iterable<[K, V]>) {
        if (!iterable) return;

        for (const [key, value] of iterable) {
            this.dict.set(key, value);
        }
    }

    set(key: K, value: V) {
        this.dict.set(key, value);
    }

    get(key: K) {
        return this.dict.get(key);
    }

    delete(key: K) {
        this.dict.delete(key);
    }

    has(key: K): boolean {
        return this.dict.has(key);
    }

    clear() {
        this.dict.clear();
    }

    get size() {
        return this.dict.size;
    }

    keys() {
        return this.dict.keys();
    }

    values() {
        return this.dict.values();
    }

    entries() {
        return this.dict.entries();
    }

    [Symbol.iterator]() {
        return this.dict[Symbol.iterator]();
    }
}