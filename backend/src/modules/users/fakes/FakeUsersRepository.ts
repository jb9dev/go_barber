import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(foundUser => foundUser.email === email);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(foundUser => foundUser.id === id);

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    delete user.password;

    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(
      foundUser => foundUser.id === user.id,
    );

    this.users[userIndex] = user;
    return this.users[userIndex];
  }
}

export default UsersRepository;
