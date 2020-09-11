import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateApponitmentDTO from '../dtos/ICreateAppointementDTO';
import IFindAllinMonthFromProviderDTO from '../dtos/IFindAllinMonthFromProviderDTO';
import IFindAllinDayFromProviderDTO from '../dtos/IFindAllinDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateApponitmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllinMonthFromProvider(
    data: IFindAllinMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllinDayFromProvider(
    data: IFindAllinDayFromProviderDTO,
  ): Promise<Appointment[]>;
}
