import React from 'react';
import { Image } from 'react-native';

import logoImg from '../../assets/logo.png'

import { Container, Title, InputIcon } from './styles';

const SignIn: React.FC = () => {

  return (
    <Container>
      <Image source={logoImg} />
      {/* Fiz assim só para lembrar como fazia para importar o ícone pelo style e usar o componente pelo index. Precisa fazer isso para incluir no componente de input que será criado */}
      <InputIcon name="mail" size={18} />
      <Title>SignIn</Title>
    </Container>
  );
};

export default SignIn;
