import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

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
        <Link
          to="forgot-password"
          className="forgot-password"
        >
          Esqueci minha senha
        </Link>
      </form>
      <Link to="register" className="register">
        <FiLogIn />
        Criar conta
      </Link>
    </Content>
    <BackgroundImg />
  </Container>
);

export default SingIn;
