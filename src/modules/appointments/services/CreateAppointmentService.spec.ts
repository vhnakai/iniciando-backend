import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/Fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '12311313123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12311313123');
  });

  it('should not be able to create two appointments on the save time', async () => {
    const appointmentDate = new Date(2020, 7, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '12311313123',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '12311313123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
