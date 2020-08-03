import ICacheProvider from '../models/ICacheProvider';

interface ICache {
  [key: string]: string;
}

class FakeCacheProvider implements ICacheProvider {
  private cache: ICache = {};

  public async save(key: string, value: any): Promise<void> {
    const parsedValue = JSON.stringify(value);
    this.cache[key] = parsedValue;
  }

  public async recover<T>(key: string): Promise<T> {
    const parsedCache = JSON.parse(this.cache[key]);

    return parsedCache;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const prefixCategory = prefix.split(':')[0];
    const cachekeys = Object.keys(this.cache).filter(
      key => key === prefixCategory,
    );

    console.log('cachekeys: ', cachekeys);
  }
}

export default FakeCacheProvider;
