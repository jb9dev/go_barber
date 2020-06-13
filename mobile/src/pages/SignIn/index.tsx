import React, { useCallback, useRef } from 'react';
import { Image, ScrollView, View, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

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
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignIn = useCallback((data: any) => {
    console.log('Sign in data: ', data);
  }, []);

  const handleForgotPassword = useCallback(() => {
    console.log('Handle forgot password');
  }, []);

  const handleCreateAccount = useCallback(() => {
    navigation.navigate('SignUp');
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
            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                placeholder="Email"
                icon="mail"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                placeholder="Senha"
                icon="lock"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>
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
