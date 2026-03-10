interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

interface CacheOptions {
  ttlMs: number;
}

export class TTLCache<K, V> {
  private readonly ttlMs: number;
  private readonly store = new Map<K, CacheEntry<V>>();

  public constructor(options: CacheOptions) {
    this.ttlMs = options.ttlMs;
  }

  public get(key: K): V | null {
    const entry = this.store.get(key);

    if (!entry) {
      return null;
    }

    if (entry.expiresAt <= Date.now()) {
      this.store.delete(key);
      return null;
    }

    return entry.value;
  }

  public set(key: K, value: V): void {
    this.store.set(key, {
      expiresAt: Date.now() + this.ttlMs,
      value,
    });
  }

  public delete(key: K): void {
    this.store.delete(key);
  }

  public clear(): void {
    this.store.clear();
  }
}
