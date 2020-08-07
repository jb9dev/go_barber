import React from 'react';
import { TouchableOpacity } from 'react-native';

import { useAuth } from '../../hooks/auth';

import { Container, Title, Logout } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Title>Dashboard</Title>
      <TouchableOpacity onPress={signOut}>
        <Logout name="power" size={30} />
      </TouchableOpacity>
    </Container>
  );
};

export default Dashboard;
