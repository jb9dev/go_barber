import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';

import { Container, Content, BackgroundImg } from './styles';

const SingIn: React.FC = () => {
  const handleSubmit = (data: object): void => {
    console.log(data)
  };

  return (
    <Container>
      <Content>
        <img
          src={logoImg}
          alt="Logo Awesome Go Barber Haircuts and shaves"
          title="Logo Go Barber"
        />
        <Form onSubmit={handleSubmit}>
          <h1>Faça o seu logon</h1>
          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            icon={FiMail}
          />
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            icon={FiLock}
          />
          <Button type="submit">Entrar</Button>
          <Link
            to="/forgot-password"
            className="forgot-password"
          >
            Esqueci minha senha
          </Link>
        </Form>
        <Link to="/register" className="register">
          <FiLogIn />
          Criar conta
        </Link>
      </Content>
      <BackgroundImg />
    </Container>
  );
};

export default SingIn;
