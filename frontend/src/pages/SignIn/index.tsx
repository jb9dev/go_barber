import React, { useCallback, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { AuthContext } from '../../context/AuthContext';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors'

import logoImg from '../../assets/logo.svg';

import { Container, Content, BackgroundImg } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SingIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn, email } = useContext(AuthContext);

  const handleSubmit = useCallback( async (data: SignInFormData) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail é obrigatório'),
        password: Yup.string().min(6, 'Senha obrigatória')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      console.log('data: ', data)
      signIn(data);
    } catch(err) {
      console.error(err);

      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, [signIn]);

  return (
    <Container>
      <Content>
        <img
          src={logoImg}
          alt="Logo Awesome Go Barber Haircuts and shaves"
          title="Logo Go Barber"
        />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça o seu logon</h1>
          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            icon={FiMail}
            defaultValue={email}
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
