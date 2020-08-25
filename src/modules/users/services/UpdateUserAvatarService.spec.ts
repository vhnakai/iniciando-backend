import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/fakeStorageProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to update a user avatar', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });
  it('should not be able to update avatar from non existing user', async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: 'non-exist-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should delete old update when upload a new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar1.jpg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar1.jpg');

    expect(user.avatar).toBe('avatar2.jpg');
  });
});
