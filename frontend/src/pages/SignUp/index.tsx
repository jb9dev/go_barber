import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';

import { Container, Content, BackgroundImg } from './styles';

const SingUp: React.FC = () => {
  const handleSubmit = useCallback((data: object):void => {
    console.log('data: ', data);
  }, []);

  return (
    <Container>
      <BackgroundImg />
      <Content>
        <img
          src={logoImg}
          alt="Logo Awesome Go Barber Haircuts and shaves"
          title="Logo Go Barber"
        />
        <Form onSubmit={handleSubmit}>
          <h1>Faça o seu cadastro</h1>
          <Input
            name="name"
            type="text"
            placeholder="Nome"
            icon={FiUser}
          />
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
        </Form>
        <Link to="/" className="back-to-logon">
          <FiArrowLeft />
          Voltar para logon
        </Link>
      </Content>

    </Container>
  );
};

export default SingUp;