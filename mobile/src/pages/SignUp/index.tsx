import React, { useCallback } from 'react';
import {
  Image,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { colors } from '../../styles/variables';

import { Container, Title, GoBack, GoBackText } from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const handledSubmit = useCallback(() => {
    console.log('Sign up submited')
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
            <Input name="name" placeholder="Nome" icon="user" />
            <Input name="email" placeholder="Email" icon="mail" />
            <Input name="password" placeholder="Senha" icon="lock" />
            <Button onPress={handledSubmit}>Cadastrar</Button>
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
