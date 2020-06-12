import React, { useCallback } from 'react';
import { Image, ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png'
import Input from '../../components/Input';
import Button from '../../components/Button';

import { colors } from '../../styles/variables';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccoutText
} from './styles';

const SignIn: React.FC = () => {
  const handleSubmit = useCallback(() => {
    console.log('Sign in submited');
  }, []);

  const handleForgotPassword = useCallback(() => {
    console.log('Handle forgot password');
  }, []);

  const handleCreateAccount = useCallback(() => {
    console.log('Handle create account');
  }, []);

  return (
    <React.Fragment>
      <KeyboardAvoidingView
        style={{ flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <View><Title>Faça o seu logon</Title></View>
            <Input name="email" placeholder="Email" icon="mail" />
            <Input name="password" placeholder="Senha" icon="lock" />
            <Button onPress={handleSubmit}>Entrar</Button>
            <ForgotPassword onPress={handleForgotPassword}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccount onPress={handleCreateAccount}>
        <Icon name="log-in" size={20} color={colors.primary} />
        <CreateAccoutText>Criar uma conta</CreateAccoutText>
      </CreateAccount>
    </React.Fragment>
  );
};

export default SignIn;
