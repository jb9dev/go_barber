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
    const cacheKeys = Object.keys(this.cache);

    cacheKeys.forEach(key => {
      if (key.match(prefixCategory) && key.match(prefixCategory[0])) {
        delete this.cache[key];
      }
    });

    console.log('cache: ', this.cache); // eslint-disable-line
  }
}

export default FakeCacheProvider;
