import React, { useState, useCallback } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import getWeekDay from '../../utils/getWeekDay';
import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.svg';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Logout,
  Body,
  Schedule,
  NextAppointment,
  Section,
  Calendar,
  Appointment,
} from './styles';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { signOut, user } = useAuth();
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

  const handleModifier = useCallback((day: Date, modifiers: DayModifiers) => {
    if(modifiers.available) {
      setSelectedDate(day);
    }
  }, [])

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Logo GoBarber" />
          <Profile>
            <img src={user.avatar_url} alt={`Foto perfil ${user.name}`} />
            <div>
              <span>Bem-vindo</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <Logout onClick={signOut}><FiPower size={20} /></Logout>
        </HeaderContent>
      </Header>

      <Body>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>{String(selectedDate.getDate()).padStart(2, '0')}</span>
            <span>{getWeekDay(selectedDate)}</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src={user.avatar_url} alt={user.name} />
              <strong>{user.name}</strong>
              <span><FiClock /> 08:00</span>
            </div>
          </NextAppointment>
          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span><FiClock /> 09:00</span>
              <div>
                <img src={user.avatar_url} alt={user.name} />
                <strong>{user.name}</strong>
              </div>
            </Appointment>
            <Appointment>
              <span><FiClock /> 11:00</span>
              <div>
                <img src={user.avatar_url} alt={user.name} />
                <strong>{user.name}</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span><FiClock /> 13:00</span>
              <div>
                <img src={user.avatar_url} alt={user.name} />
                <strong>{user.name}</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={weekdaysShort}
            months={months}
            fromMonth={new Date()}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5]}
            }}
            disabledDays={[
              {daysOfWeek: [0, 6]}
            ]}
            selectedDays={selectedDate}
            onDayClick={handleModifier}
          />
        </Calendar>
      </Body>
    </Container>
  )
};

export default Dashboard;
