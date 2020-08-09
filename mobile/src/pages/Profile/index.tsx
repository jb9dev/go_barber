import React from 'react';
import { TouchableOpacity } from 'react-native';

import { useAuth } from '../../hooks/auth';

import { Container, Title } from './styles';

const Profile: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <TouchableOpacity onPress={signOut}>
        <Title>Profile</Title>
      </TouchableOpacity>
    </Container>
  );
};

export default Profile;
