import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import UpdateProfileService from './UpdateProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    await updateProfile.execute({
      user_id: user.id,
      name: 'John Dude',
      email: 'johndude@test.com',
    });

    expect(user.name).toBe('John Dude');
    expect(user.email).toBe('johndude@test.com');
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    await updateProfile.execute({
      user_id: user.id,
      name: 'John Dude',
      email: 'johndude@test.com',
      old_password: '123456',
      password: '123123',
    });

    expect(user.password).toBe('123123');
  });

  it('should not be able to update the profile with e-mail from another user', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'User Test',
      email: 'user@test.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user2.id,
        name: 'John Doe',
        email: 'johndoe@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with out old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Dude',
        email: 'johndude@test.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Dude',
        email: 'johndude@test.com',
        old_password: '465789',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
