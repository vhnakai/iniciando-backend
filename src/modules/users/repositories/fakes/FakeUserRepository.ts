import IUsersRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';
import IFindAllProviderDTO from '@modules/users/dtos/IFindAllProviderDTO';

import Users from '../../infra/typeorm/entities/Users';

class FakeUsersRepository implements IUsersRepository {
  private users: Users[] = [];

  public async findAllProviders({
    except_user_id,
  }: IFindAllProviderDTO): Promise<Users[]> {
    let { users } = this;

    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id);
    }

    return users;
  }

  public async findById(id: string): Promise<Users | undefined> {
    const findedUser = this.users.find(user => user.id === id);
    return findedUser;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const findedUser = this.users.find(user => user.email === email);
    return findedUser;
  }

  public async create(userData: ICreateUserDTO): Promise<Users> {
    const user = new Users();
    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);
    return user;
  }

  public async save(user: Users): Promise<Users> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }
}

export default FakeUsersRepository;
