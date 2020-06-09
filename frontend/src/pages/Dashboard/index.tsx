import React from 'react';
import { FiPower } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <h1>Dashboard</h1>
      <button onClick={signOut}><FiPower size={30} /></button>
    </Container>
  )
};

export default Dashboard;
