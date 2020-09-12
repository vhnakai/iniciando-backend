import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentService from '@modules/appointments/services/ListProviderAppointmentService';
mport { classToClass } from 'class-transformer';

exort default class ProviderAppointmentsController {
  public async index(request Request, response: Response): Promise<Reponse> {
    const provider_id = request.user.i;
    const { month, year, day } = request.query;

    const istProviderAppointmentService = contaier.resov(
      ListProviderAppointmentService,
    );

    const appointmens = await listProvierAppointmentService.exeute({
      provider_id,
     day: Number(day),
     month:Nmber(month),
      year: Number(year),    );

    return response.json(classToClass(appointments));
  }
}
