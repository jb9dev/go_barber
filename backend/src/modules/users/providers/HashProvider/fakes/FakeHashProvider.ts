import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
    // return Buffer.from(payload).toString('base64');
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
    // return Buffer.from(payload, 'base64').toString('ascii') === hashed;
  }
}

export default BCryptHashProvider;
