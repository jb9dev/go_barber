import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset a user password', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    const userToken = await fakeUserTokensRepository.generate(user.id);

    await resetPasswordService.execute({
      token: userToken.token,
      password: '123123',
    });

    expect(generateHash).toBeCalledWith('123123');
    expect(user.password).toBe('123123');
  });

  it('should not be able to reset password to a non-existing user token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-user-token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password to a non-existing user', async () => {
    const userToken = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPasswordService.execute({
        token: userToken.token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password after 2 hours from request', async () => {
    // TODO
  });
});
