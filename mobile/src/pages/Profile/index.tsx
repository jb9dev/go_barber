import React, { useCallback, useRef } from 'react';
import {
  Alert,
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
import ImagePicker from 'react-native-image-picker';
import ImageEditor, {
  ImageCropData,
} from '@react-native-community/image-editor';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { colors } from '../../globalVariables';

import {
  Container,
  BackButton,
  AvatarImageButton,
  AvatarImage,
  TitleContainer,
  Title,
  SignOutButton,
  SignOutButtonText,
} from './styles';

interface ProfileFromData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { goBack } = useNavigation();
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);
  const { user, updateUser, signOut } = useAuth();

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione um avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      (response) => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          Alert.alert('Erro ao atualizar seu avatar');
          return;
        }

        const cropData = {
          offset: { x: 0, y: 0 },
          size: { width: response.width, height: response.height },
          displaySize: { width: 400, height: 400 },
          resizeMode: 'cover',
        } as ImageCropData;

        ImageEditor.cropImage(` file://${response.path}`, cropData)
          .then((url) => {
            const data = new FormData();
            data.append('avatar', {
              type: 'image/jpeg',
              name: `${user.id}.jpg`,
              uri: url,
            });
            api.patch('/users/avatar', data).then((apiResponse) => {
              updateUser(apiResponse.data);
            });
          })
          .catch(() => {
            Alert.alert(
              'Erro ao atualizar o avatar!',
              'Ocorreu um erro ao tentar atualizar o seu avatar, por favor tente novamente!',
              [{ text: 'ok', style: 'default' }],
            );
          });
      },
    );
  }, [user.id, updateUser]);

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  const handleProfile = useCallback(
    async (data: ProfileFromData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().min(6, 'Mínimo 6 caracteres'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string().min(6, 'Mínimo 6 caracteres'),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref('password'), undefined],
              'As senhas precisam coincidir',
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? { old_password, password, password_confirmation }
            : {}),
        };

        const response = await api.put('/profile', formData);
        updateUser(response.data);

        Alert.alert('Perfil alterado com sucesso!', '', [
          { text: 'ok', style: 'default' },
        ]);

        formRef.current?.reset();
        goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validationErrors = getValidationErrors(err);
          formRef.current?.setErrors(validationErrors);
          const errors = Object.entries(validationErrors);
          const errorMessages = errors.map((error: string[]) => error[1]);

          Alert.alert(
            'Erro ao atualizar perfil!',
            `Ocorreu um erro ao tentar atualizar o seu perfil, por favor tente novamente! Verifique os campos a seguir: ${errorMessages.join(
              '; ',
            )}`,
            [{ text: 'ok', style: 'default' }],
          );
          return;
        }

        Alert.alert(
          'Erro ao atualizar perfil!',
          'Ocorreu um erro ao tentar atualizar o seu perfil, por favor tente novamente ou verifique sua conexão com a internet!',
        );
      }
    },
    [goBack, updateUser],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <BackButton onPress={handleGoBack}>
            <Icon name="chevron-left" size={24} color={colors.lightGrey} />
          </BackButton>
          <AvatarImageButton onPress={handleUpdateAvatar}>
            <AvatarImage source={{ uri: user.avatar_url }} />
          </AvatarImageButton>
          <TitleContainer>
            <Title>Meu perfil</Title>
            <SignOutButton onPress={handleSignOut}>
              <Icon name="log-out" size={24} color={colors.light2} />
              <SignOutButtonText>Sair</SignOutButtonText>
            </SignOutButton>
          </TitleContainer>
          <Form ref={formRef} initialData={user} onSubmit={handleProfile}>
            <Input
              autoCapitalize="words"
              name="name"
              placeholder="Nome"
              icon="user"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />
            <Input
              ref={emailInputRef}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              name="email"
              placeholder="Email"
              icon="mail"
              returnKeyType="next"
              onSubmitEditing={() => oldPasswordInputRef.current?.focus()}
            />
            <Input
              ref={oldPasswordInputRef}
              secureTextEntry
              name="old_password"
              placeholder="Senha atual"
              icon="lock"
              containerStyle={{ marginTop: 20 }}
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
            <Input
              ref={passwordInputRef}
              secureTextEntry
              name="password"
              placeholder="Nova senha"
              icon="lock"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordConfirmationInputRef.current?.focus();
              }}
            />
            <Input
              ref={passwordConfirmationInputRef}
              secureTextEntry
              name="password"
              placeholder="Confirme nova senha"
              icon="lock"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <Button onPress={() => formRef.current?.submitForm()}>
              Confirmar mudanças
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
