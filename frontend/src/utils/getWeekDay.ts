interface WeekDay {
  [key: number]: string;
}

export default function getWeekDay(date: Date): string {
  const weekDays: WeekDay = {
    1: 'Segunda-feira',
    2: 'Terça-feira',
    3: 'Quarta-feira',
    4: 'Quinta-feira',
    5: 'Sexta-feira',
    6: 'Sábado',
    7: 'Domingo',
  };

  return weekDays[date.getDay()];
}
