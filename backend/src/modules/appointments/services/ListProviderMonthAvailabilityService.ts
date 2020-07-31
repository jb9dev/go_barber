import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, getMonth } from 'date-fns';

// import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequestDTO): Promise<IResponse> {
    const providerMonthAvailability = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        month,
        year,
      },
    );

    const now = new Date(Date.now());
    const currentMonth = getMonth(now);
    const currentDay = getDate(now);
    const monthAvailable = currentMonth <= month - 1;

    const daysInMonth = getDaysInMonth(new Date(year, month - 1));
    const daysInMonthArray = Array.from(
      { length: daysInMonth },
      (_, index) => index + 1,
    );

    const appointmentsAvailability = daysInMonthArray.map(day => {
      const providerDayAvailability = providerMonthAvailability.filter(
        availability => getDate(availability.date) === day,
      );

      const dayAvailable = month - 1 <= currentMonth ? currentDay <= day : true;

      return {
        day,
        available:
          dayAvailable && monthAvailable && providerDayAvailability.length < 10,
      };
    });

    return appointmentsAvailability;
  }
}

export default ListProviderMonthAvailabilityService;
