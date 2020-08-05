import React, { useState } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';

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
        <Calendar></Calendar>
      </Body>
    </Container>
  )
};

export default Dashboard;
