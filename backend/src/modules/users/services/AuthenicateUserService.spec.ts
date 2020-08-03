import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import AuthenicateUserService from './AuthenicateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenicateUserService: AuthenicateUserService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenicateUserService = new AuthenicateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenicate a user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    const response = await authenicateUserService.execute({
      email: 'johndoe@test.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenicate a user that do not exists', async () => {
    await expect(
      authenicateUserService.execute({
        email: 'johndoe@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenicate a user with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    await expect(
      authenicateUserService.execute({
        email: 'johndoe@test.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
