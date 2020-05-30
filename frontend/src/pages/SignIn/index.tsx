import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import SignInBackgroundImg from '../../assets/sign-in-background.png';

import { Container, Content, BackgroundImg } from './styles';

const SingIn: React.FC = () => (
  <Container>
    <Content>
      <img
        src={logoImg}
        alt="Logo Awesome Go Barber Haircuts and shaves"
        title="Logo Go Barber"
      />
      <form>
        <h1>Faça o seu logon</h1>
        <input type="email" placeholder="E-mail"/>
        <input type="password" placeholder="Senha"/>
        <button type="submit">Entrar</button>
        <a href="forgot-password">Esqueci minha senha</a>
      </form>
      <a href="register">
        <FiLogIn />
        Criar conta
      </a>
    </Content>
    <BackgroundImg />
  </Container>
);

export default SingIn;
