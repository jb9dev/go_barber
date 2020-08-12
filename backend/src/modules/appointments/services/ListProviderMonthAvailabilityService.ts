import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, isAfter, getDate } from 'date-fns';

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

    const today = new Date(Date.now());
    const daysInMonth = getDaysInMonth(new Date(year, month - 1));
    const daysInMonthArray = Array.from(
      { length: daysInMonth },
      (_, index) => index + 1,
    );

    const appointmentsAvailability = daysInMonthArray.map(day => {
      const providerDayAvailability = providerMonthAvailability.filter(
        availability => getDate(availability.date) === day,
      );
      const dateAvailable = isAfter(new Date(year, month - 1, day), today);

      return {
        day,
        available: dateAvailable && providerDayAvailability.length < 10,
      };
    });

    return appointmentsAvailability;
  }
}

export default ListProviderMonthAvailabilityService;
