import React from 'react';
import { FiPower } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.svg';
import { Container, Header, Profile, Logout } from './styles';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  return (
    <Container>
      <Header>
        <img src={logoImg} alt="Logo GoBarber" />
        <Profile>
          <img src={user.avatar_url} alt={`Foto perfil ${user.name}`} />
          <div>
            <span>Bem-vindo</span>
            <strong>{user.name}</strong>
          </div>
        </Profile>
        <Logout onClick={signOut}><FiPower size={20} /></Logout>
      </Header>
    </Container>
  )
};

export default Dashboard;
