import React, { useCallback, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { colors } from '../../globalVariables';
import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();
  const routeParams = params as RouteParams;

  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE ', dia' dd 'de' MMMM 'de' yyyy 'às' HH'h'",
      { locale: ptBR },
    );
  }, [routeParams.date]);

  const handleOk = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);

  return (
    <Container>
      <Icon name="check" size={80} color={colors.lightGreen} />
      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>
      <OkButton onPress={handleOk}>
        <OkButtonText>ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
