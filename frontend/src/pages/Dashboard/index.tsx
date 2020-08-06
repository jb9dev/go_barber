import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { isToday, isTomorrow, format, getHours, parseISO, getMinutes } from 'date-fns';
import { FiPower, FiClock, FiCamera } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import getWeekDay from '../../utils/getWeekDay';

import logoImg from '../../assets/logo.svg';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  ProfileImg,
  ProfileInfos,
  Logout,
  Body,
  Schedule,
  NextAppointment,
  Section,
  Calendar,
  Appointment,
} from './styles';

interface MonthAvailability {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  client: {
    name: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailability[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const dayReference = useMemo(() => {
    if(isToday(selectedDate)) {
      return 'Hoje'
    }

    if(isTomorrow(selectedDate)) {
      return 'Amanhã'
    }

    return format(selectedDate, 'dd/MM/yyyy');
  }, [selectedDate])
  const dayDate = useMemo(
    () => String(selectedDate.getDate()).padStart(2, '0'), [selectedDate]
  );
  const weekDay = useMemo(() => getWeekDay(selectedDate), [selectedDate]);
  const weekdaysShort = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const disabledDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    return monthAvailability.filter(
      monthDay => monthDay.available === false
    ).map(date => new Date(year, month, date.day))
  }, [currentMonth, monthAvailability])

  const handleModifier = useCallback((day: Date, modifiers: DayModifiers) => {
    if(modifiers.available) {
      setSelectedDate(day);
    }
  }, [])

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, [])

  const getAppointmentTime = useCallback((date: string) => {
    return `${getHours(parseISO(date))}:${String(getMinutes(parseISO(date))).padStart(2, '0')}`
  }, [])

  useEffect(() => {
    api.get(`/availability/${user.id}/month`, {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1,
      },
    }).then(response => {
      setMonthAvailability(response.data);
    })
  }, [currentMonth, user.id])

  useEffect(() => {
    api.get('/appointments/me', {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate(),
      },
    }).then(response => {
      setAppointments(response.data);
    })
  }, [selectedDate])

  const nextAppointment = useMemo(() => {
    const [filteredNextAppointment] = appointments.filter(appointment => {
      const parsedDate = parseISO(appointment.date);
      const now = new Date();
      return getHours(parsedDate) === getHours(now) + 1;
    })

    return filteredNextAppointment;
  }, [appointments]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      const parsedDate = parseISO(appointment.date)
      return getHours(parsedDate) <= 12;
    })
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      const parsedDate = parseISO(appointment.date)
      return getHours(parsedDate) > 12;
    })
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Logo GoBarber" />
          <Profile  onClick={() => history.push('/profile')}>
            <ProfileImg>
              {
                user.avatar_url
                ? <img src={user.avatar_url} alt={`Foto perfil ${user.name}`} />
                : <FiCamera size={20} />
              }
            </ProfileImg>
            <ProfileInfos>
              <span>Bem-vindo</span>
              <strong>{user.name}</strong>
            </ProfileInfos>
          </Profile>
          <Logout onClick={signOut}><FiPower size={20} /></Logout>
        </HeaderContent>
      </Header>

      <Body>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>{dayReference}</span>
            {
              (dayReference === 'Hoje' || dayReference === 'Amanhã') &&
                <span>{dayDate}</span>
            }
            <span>{weekDay}</span>
          </p>
          {
            nextAppointment && nextAppointment.client
              ? <NextAppointment>
                  <strong>Agendamento a seguir</strong>
                  <div>
                    {
                      nextAppointment.client.avatar_url
                      ? <img src={nextAppointment.client.avatar_url} alt={nextAppointment.client.name} />
                      : <FiCamera size={15} />
                    }
                    <strong>{nextAppointment.client.name}</strong>
                    <span>
                      <FiClock />
                      {getAppointmentTime(nextAppointment.date)}
                    </span>
                  </div>
                </NextAppointment>
              : <React.Fragment />
          }
          {
            !morningAppointments.length
              && !afternoonAppointments.length
                && <Section>
                    <strong>Não há agendamentos para este dia</strong>
                  </Section>
          }
          {
            morningAppointments.length
            ? <Section>
                <strong>Manhã</strong>
                {
                  morningAppointments.map(appointment => (
                    <Appointment key={appointment.id}>
                      <span>
                        <FiClock />
                        {getAppointmentTime(appointment.date)}
                      </span>
                      <div>
                      {
                        appointment.client.avatar_url
                        ? <img
                            src={appointment.client.avatar_url}
                            alt={appointment.client.name}
                          />
                        : <FiCamera size={15} />
                      }
                        <strong>{appointment.client.name}</strong>
                      </div>
                    </Appointment>
                  ))
                }
              </Section>
            : <React.Fragment />
          }
          {
            afternoonAppointments.length
              ? <Section>
                <strong>Tarde</strong>
                {
                  afternoonAppointments.map(appointment => (
                    <Appointment key={appointment.id}>
                      <span>
                        <FiClock />
                        {getAppointmentTime(appointment.date)}
                      </span>
                      <div>
                      {
                        appointment.client.avatar_url
                        ? <img
                            src={appointment.client.avatar_url}
                            alt={appointment.client.name}
                          />
                        : <FiCamera size={15} />
                      }
                        <strong>{appointment.client.name}</strong>
                      </div>
                    </Appointment>
                  ))
                }
              </Section>
            : <React.Fragment />
          }

        </Schedule>
        <Calendar weekDay={weekDay}>
          <DayPicker
            weekdaysShort={weekdaysShort}
            months={months}
            fromMonth={new Date()}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5]}
            }}
            disabledDays={[
              {daysOfWeek: [0, 6]},
              ...disabledDays,
            ]}
            selectedDays={selectedDate}
            onDayClick={handleModifier}
            onMonthChange={handleMonthChange}
          />
        </Calendar>
      </Body>
    </Container>
  )
};

export default Dashboard;
