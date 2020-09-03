import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let listProviderService: ListProviderService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProfiles', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderService = new ListProviderService(
      fakeUserRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list the provider', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'Aya',
      email: 'aya@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'Ayaya',
      email: 'ayaya@example.com',
      password: '123456',
    });

    const providers = await listProviderService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
