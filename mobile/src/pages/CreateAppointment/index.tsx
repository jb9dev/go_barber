import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

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
  OpenDatePickerButton,
  OpenDatePickerButtonText,
} from './styles';

interface RouteParams {
  providerId: string;
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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availability, setAvailability] = useState<DayAvailability[]>([]);

  const handleBackNavigation = useCallback(() => {
    goBack();
  }, [goBack]);

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`/availability/${selectedProvider}/day`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        setAvailability(response.data);
      });
  }, [selectedProvider, selectedDate]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour <= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          hourformatted: format(new Date().setHours(hour), 'HH:00'),
          available,
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour > 12)
      .map(({ hour, available }) => {
        return {
          hour,
          hourformatted: format(new Date().setHours(hour), 'HH:00'),
          available,
        };
      });
  }, [availability]);

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
        <OpenDatePickerButton onPress={handleToggleDatePicker}>
          <OpenDatePickerButtonText>
            Selecionar outra data
          </OpenDatePickerButtonText>
        </OpenDatePickerButton>
        {showDatePicker && (
          <DateTimePicker
            onChange={handleDateChanged}
            display="calendar"
            textColor={colors.light2}
            mode="date"
            value={selectedDate}
          />
        )}
      </Calendar>
      <Title>Manhã</Title>
      {morningAvailability.map(({ hourformatted, available }) => {
        if (available) {
          return <HeaderTitle key={hourformatted}>{hourformatted}</HeaderTitle>;
        }
        return <></>;
      })}
      <Title>Tarde</Title>
      {afternoonAvailability.map(({ hourformatted, available }) => {
        if (available) {
          return <HeaderTitle key={hourformatted}>{hourformatted}</HeaderTitle>;
        }
        return <></>;
      })}
    </Container>
  );
};

export default CreateAppointment;
