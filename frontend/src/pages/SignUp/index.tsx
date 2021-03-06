import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';

import { useToast } from '../../hooks/toast'

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import { Container, Content, AnimationContainer, BackgroundImg } from './styles';
import api from '../../services/api';

interface SignUpFromData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback( async (data: SignUpFromData) => {

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().required('E-mail é obrigatório'),
        password: Yup.string().min(6, 'Mínimo 6 caracteres'),
      })

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('users', data);
      formRef.current?.reset();
      history.push('/');

      addToast({
        type: 'success',
        title: 'Cadastrado com sucesso!',
        description: 'Você já pode realizar o seu logon no GoBarber!'
      });

    } catch(err) {
      console.error(err)
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      addToast({
        type: 'error',
        title: 'Erro ao cadastrar!',
        description: 'Ocorreu um erro ao realizar o cadastro, por favor tente novamente!'
      });
    }
  }, [history, addToast]);

  return (
    <Container>
      <BackgroundImg />
      <Content>
        <AnimationContainer>

          <img
            src={logoImg}
            alt="Logo Awesome Go Barber Haircuts and shaves"
            title="Logo Go Barber"
          />
          <Form ref={formRef} onSubmit={handleSubmit}>
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
        </AnimationContainer>
      </Content>

    </Container>
  );
};

export default SignUp;
