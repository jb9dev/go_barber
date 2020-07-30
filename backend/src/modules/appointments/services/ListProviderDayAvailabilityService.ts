import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequestDTO): Promise<IResponse> {
    const providerDayAvailability = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    const startFromHour = 8;
    const hoursIndayArray = Array.from(
      { length: 10 },
      (_, index) => index + startFromHour,
    );

    const currentDate = new Date(Date.now());

    const appointmentsAvailability = hoursIndayArray.map(hour => {
      const providerHourAvailability = providerDayAvailability.find(
        availability => getHours(availability.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available:
          !providerHourAvailability && isAfter(compareDate, currentDate),
      };
    });

    return appointmentsAvailability;
  }
}

export default ListProviderDayAvailabilityService;
