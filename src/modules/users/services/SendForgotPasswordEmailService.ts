/* eslint-disable class-methods-use-this */
import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
// import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute(data: IRequest): Promise<void> {}
}

export default SendForgotPasswordEmailService;
