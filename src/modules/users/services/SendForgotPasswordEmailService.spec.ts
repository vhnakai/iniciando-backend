import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/Fake/FakeUserRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPawoordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUserRepository = new FakeUserRepository();

    const sendForgotEmailPassowrdService = new SendForgotPasswordEmailService(
      fakeUserRepository,
    );

    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });
});
