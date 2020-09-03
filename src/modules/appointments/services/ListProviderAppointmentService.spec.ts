import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/Fakes/FakeAppointmentRepository';
import ListProviderAppointmentService from './ListProviderAppointmentService';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let listProviderAppointmentService: ListProviderAppointmentService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointmentService = new ListProviderAppointmentService(
      fakeAppointmentRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list the appointments on a specific date', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user2',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user2',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointmentService.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
