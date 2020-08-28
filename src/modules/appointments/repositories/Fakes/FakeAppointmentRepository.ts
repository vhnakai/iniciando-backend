import { uuid } from 'uuidv4';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointementDTO from '@modules/appointments/dtos/ICreateAppointementDTO';
import IFindAllinMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllinMonthFromProviderDTO';

import { isEqual, getYear, getMonth, getDate } from 'date-fns';
import IFindAllinDayFromProviderDTO from '@modules/appointments/dtos/IFindAllinDayFromProviderDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async findAllinMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllinMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findAllinDayFromProvider({
    provider_id,
    month,
    year,
    day,
  }: IFindAllinDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointementDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
