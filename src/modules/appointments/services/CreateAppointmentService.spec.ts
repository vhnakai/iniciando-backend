import FakeAppointmentRepository from '../repositories/Fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    createAppointment.execute({
      date: new Date(),
      provider_id: '12311313123',
    });
  });
});
