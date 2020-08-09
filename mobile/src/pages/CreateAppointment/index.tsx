import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useAuth } from '../../hooks/auth';
import Provider from '../../interfaces/Provider';
import api from '../../services/api';

import { colors } from '../../globalVariables';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  UserAvatarContainer,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatarContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
} from './styles';

interface RouteParams {
  providerId: string;
}

interface MonthAvailability {
  available: boolean;
  day: number;
}
interface DayAvailability {
  available: boolean;
  hour: number;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const { goBack } = useNavigation();
  const route = useRoute();
  const routeParams = route.params as RouteParams;
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );
  const today = new Date();
  const [providerDayAvailability, setProviderDayAvailability] = useState<
    DayAvailability[]
  >([]);
  const [providerMonthAvailability, setProviderMonthAvailability] = useState<
    DayAvailability[]
  >([]);

  const handleBackNavigation = useCallback(() => {
    goBack();
  }, [goBack]);

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  // useEffect(() => {
  //   api
  //     .get(`/availability/${selectedProvider}/month`, {
  //       params: {
  //         year: today.getFullYear(),
  //         month: today.getMonth() + 1,
  //       },
  //     })
  //     .then((response) => {
  //       setProviderMonthAvailability(response.data);
  //     });
  // }, [selectedProvider, today]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBackNavigation}>
          <Icon name="chevron-left" size={24} color={colors.lightGrey} />
        </BackButton>
        <HeaderTitle>Cabeleireiros</HeaderTitle>
        <UserAvatarContainer>
          {user.avatar_url ? (
            <UserAvatar source={{ uri: user.avatar_url }} />
          ) : (
            <Icon name="camera" size={24} color={colors.darkGrey} />
          )}
        </UserAvatarContainer>
      </Header>
      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(provider) => provider.id}
          data={providers}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => handleSelectProvider(provider.id)}
              selected={selectedProvider === provider.id}
            >
              <ProviderAvatarContainer>
                {provider.avatar_url ? (
                  <ProviderAvatar source={{ uri: provider.avatar_url }} />
                ) : (
                  <Icon name="camera" size={16} color={colors.darkGrey} />
                )}
              </ProviderAvatarContainer>
              <ProviderName selected={selectedProvider === provider.id}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>
      <Calendar>
        <Title>Escolha a data</Title>
        <DateTimePicker
          onChange={() => {}}
          display="calendar"
          textColor={colors.light2}
          mode="date"
          value={today}
        />
      </Calendar>
    </Container>
  );
};

export default CreateAppointment;
