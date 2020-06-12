import React, { useCallback } from 'react';
import { Image } from 'react-native';

import logoImg from '../../assets/logo.png'
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  const handleSubmit = useCallback(() => {
    console.log('Sign in submited');
  }, []);

  return (
    <Container>
      <Image source={logoImg} />
      <Title>Faça o seu logon</Title>
      <Input name="email" placeholder="Email" icon="mail" />
      <Input name="password" placeholder="Senha" icon="lock" />
      <Button onPress={handleSubmit}>Entrar</Button>
    </Container>
  );
};

export default SignIn;
