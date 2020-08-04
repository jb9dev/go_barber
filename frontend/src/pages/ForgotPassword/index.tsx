import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiArrowLeft, FiMail } from 'react-icons/fi';

import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors'

import logoImg from '../../assets/logo.svg';

import { Container, Content, AnimationContainer, BackgroundImg } from './styles';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback( async (data: ForgotPasswordFormData) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      formRef.current?.reset();
      // history.push('/dashboard');
    } catch(err) {
      console.error(err);
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      addToast({
        type: 'error',
        title: 'Erro ao recuperar senha',
        description: 'Ocorreu um erro ao tentar recuperar sua senha, por favor tente novamente.',
      })
    }
  }, [addToast, history]);

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
            <h1>Recuperar senha</h1>
            <Input
              name="email"
              type="email"
              placeholder="E-mail"
              icon={FiMail}
            />
            <Button type="submit">Recuperar</Button>
          </Form>
          <Link to="/" className="back-to-logon">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
      <BackgroundImg />
    </Container>
  );
};

export default ForgotPassword;
