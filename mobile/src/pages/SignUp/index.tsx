import React, { useCallback } from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';

const SignUp: React.FC = () => {
  const handledSubmit = useCallback(() => {
    console.log('Sign up submited')
  }, [])
  return (
    <Container>
      <Title>Faça o seu cadastro</Title>
      <Input name="name" placeholder="Nome" icon="user" />
      <Input name="email" placeholder="Email" icon="mail" />
      <Input name="password" placeholder="Senha" icon="lock" />
      <Button onPress={handledSubmit}>Cadastrar</Button>
    </Container>
  );
};

export default SignUp;
