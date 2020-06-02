import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';

import { Container, Content, BackgroundImg } from './styles';

const SingUp: React.FC = () => {
  const handleSubmit = useCallback( async (data: object) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().required('E-mail é obrigatório'),
        password: Yup.string().min(6, 'Senha obrigatória com no mínimo 6 caracteres'),
      })

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log('data: ', data);
    } catch(err) {
      console.error(err)
    }
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
