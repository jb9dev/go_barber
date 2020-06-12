import React, { useCallback, useRef } from 'react';
import {
  Image,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { colors } from '../../styles/variables';

import { Container, Title, GoBack, GoBackText } from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation();

  const handledSignUp = useCallback((data: object) => {
    console.log('Sign up data: ', data)
  }, [])

  const handledGoBack = useCallback(() => {
    navigation.goBack();
  }, [])

  return (
    <React.Fragment>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <Title>Crie sua conta</Title>
            <Form ref={formRef} onSubmit={handledSignUp}>
              <Input name="name" placeholder="Nome" icon="user" />
              <Input name="email" placeholder="Email" icon="mail" />
              <Input name="password" placeholder="Senha" icon="lock" />
              <Button onPress={() => formRef.current?.submitForm()}>
                Cadastrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <GoBack onPress={handledGoBack}>
        <Icon name="arrow-left" size={20} color={colors.light2} />
        <GoBackText>Voltar para logon</GoBackText>
      </GoBack>
    </React.Fragment>
  );
};

export default SignUp;
