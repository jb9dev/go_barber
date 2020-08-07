import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors'

import logoImg from '../../assets/logo.svg';

import { Container, Content, AnimationContainer, BackgroundImg } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SingIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback( async (data: SignInFormData) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail é obrigatório'),
        password: Yup.string().min(6, 'Mínimo de 6 caracteres')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      await signIn(data);
      formRef.current?.reset();
      history.push('/dashboard');
    } catch(err) {
      console.error(err);
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      addToast({
        type: 'error',
        title: 'Login inválido',
        description: 'Ocorreu um erro ao realizar o login, verifique as credenciais',
      })
    }
  }, [addToast, signIn, history]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
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
        </AnimationContainer>
      </Content>
      <BackgroundImg />
    </Container>
  );
};

export default SingIn;
