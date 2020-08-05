import React, { useCallback, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiLock } from 'react-icons/fi';

import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import queryMap from '../../utils/mapQueryString';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors'

import logoImg from '../../assets/logo.svg';

import { Container, Content, AnimationContainer, BackgroundImg } from './styles';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

// interface QueryMap {
//   [key: string]: string;
// }

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const location = useLocation();
  const { addToast } = useToast();

  const handleSubmit = useCallback( async (data: ResetPasswordFormData) => {
    const { password, password_confirmation } = data;
    const { token } = queryMap(location.search);

    try {
      const schema = Yup.object().shape({
        password: Yup.string().min(6, 'Mínimo de 6 caracteres'),
        password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'As senhas precisam coincidir')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      formRef.current?.reset();

      await api.post('/password/reset', {
        password,
        password_confirmation,
        token,
      })

      addToast({
        type: 'success',
        title: 'Senha resetada!',
        description: 'Sua senha foi resetada com sucesso, agora realize o login com essa nova senha'
      })

      setTimeout(() => history.push('/'), 5000 );

    } catch(err) {
      console.error(err);
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      addToast({
        type: 'error',
        title: 'Erro ao resetar senha',
        description: 'Ocorreu um erro ao resetar sua senha, por favor tente novamente',
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
            <h1>Resetar senha</h1>
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              icon={FiLock}
            />
            <Input
              name="password_confirmation"
              type="password"
              placeholder="Confirme sua senha"
              icon={FiLock}
            />
            <Button type="submit">Resetar</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <BackgroundImg />
    </Container>
  );
};

export default ResetPassword;
