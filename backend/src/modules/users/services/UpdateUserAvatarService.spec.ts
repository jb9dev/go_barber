import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakeCacheProvider: FakeCacheProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakeCacheProvider = new FakeCacheProvider();
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to update a user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatar_filename: 'user_avatar.jpg',
    });

    expect(user.avatar).toBe('user_avatar.jpg');
  });

  it('should not be able to update avatar from user that do not exists', async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: 'some-user-that-do-not-exists',
        avatar_filename: 'user_avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update a user avatar that already has an avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatar_filename: 'user_avatar.jpg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatar_filename: 'user_avatar_2.jpg',
    });

    expect(deleteFile).toBeCalledWith('user_avatar.jpg');
    expect(user.avatar).toBe('user_avatar_2.jpg');
  });
});
