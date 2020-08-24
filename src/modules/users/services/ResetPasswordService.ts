/* eslint-disable class-methods-use-this */
import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
// import User from '../infra/typeorm/entities/User';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('UserTokensRepositoy')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByUserToken(token);

    if (!userToken) {
      throw new AppError('User token do not exit');
    }
    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exit');
    }

    user.password = password;

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
