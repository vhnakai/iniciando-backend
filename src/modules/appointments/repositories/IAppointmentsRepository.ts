import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateApponitmentDTO from '../dtos/ICreateAppointementDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateApponitmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllinMonthFromProvider(): Promise<>;
}
