import React, { useCallback, useRef } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { colors } from '../../globalVariables';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccoutText,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { navigate } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(
            6,
            'Digite uma senha com no mínimo de 6 caracteres',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn(data);
        formRef.current?.reset();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validationErrors = getValidationErrors(err);
          const errorMessages = Object.values(validationErrors);

          formRef.current?.setErrors(validationErrors);
          Alert.alert(
            'Login inválido!',
            `Ocorreu um erro ao realizar o login, verifique as credenciais pois: ${errorMessages.join(
              '; ',
            )}.`,
            [{ text: 'ok', style: 'default' }],
          );
          return;
        }

        Alert.alert(
          'Login inválido!',
          'Ocorreu um erro ao realizar o login, verifique suas credenciais.',
          [{ text: 'ok', style: 'default' }],
        );
      }
    },
    [signIn],
  );

  const handleForgotPassword = useCallback(() => {
    // TODO
    Alert.alert(
      'Falta criar tela!',
      'Criar tela de resetar a senha. Provavelmente precisará de uma nova feature no back-end, para suportar o reset pelo aplicativo, pois não teria como redirecionar do e-mail. Ou então ver uma forma de identificar se o usuário possui o aplicativo instalado, a partir do link que chega para o e-mail, mas de alguma forma precisaria passar o token como parâmetro da rota.',
    );
  }, []);

  const handleCreateAccount = useCallback(() => {
    navigate('SignUp');
  }, [navigate]);

  return (
    <>
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
            <View>
              <Title>Faça o seu logon</Title>
            </View>
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
    </>
  );
};

export default SignIn;
