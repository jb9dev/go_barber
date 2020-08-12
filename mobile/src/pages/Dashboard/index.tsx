import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import Provider from '../../interfaces/Provider';

import Avatar from '../../components/Avatar';

import { colors } from '../../globalVariables';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProvidersList,
  ProvidersListTitle,
  ProviderContent,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles';

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api
      .get('/providers')
      .then((response) => {
        setProviders(response.data);
      })
      .catch((error) => {
        console.log('error.code: ', error.code); // eslint-disable-line

        if (error.code === 401) {
          signOut();
        }
      });
  }, [signOut]);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,
          {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <Avatar
          callback={navigateToProfile}
          size={56}
          imgSrc={user.avatar_url}
        />
      </Header>
      <ProvidersList
        keyExtractor={(provider) => provider.id}
        ListHeaderComponent={
          <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
        }
        data={providers}
        renderItem={({ item: provider }) => (
          <ProviderContent
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            <Avatar size={72} imgSrc={provider.avatar_url} />
            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>
              <ProviderMeta>
                <Icon name="calendar" size={14} color={colors.primary} />
                <ProviderMetaText>Segunda à sexta-feira</ProviderMetaText>
              </ProviderMeta>
              <ProviderMeta>
                <Icon name="clock" size={14} color={colors.primary} />
                <ProviderMetaText>8h à 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContent>
        )}
      />
    </Container>
  );
};

export default Dashboard;
